import { mkdir, readFile, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { dirname, resolve } from 'node:path'
import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import {
  DEFAULT_COMMERCIAL_PRICING,
  type CommercialFixedItem,
  type CommercialPricingConfig,
  type CommercialVariableItem,
  type PaymentOption,
} from './src/data/commercialPricing'
import {
  DEFAULT_PRESENTATION_SYSTEM,
  normalizePresentationSystem,
  type PresentationSystemConfig,
} from './src/data/presentationSystem'

const apiPath = '/api/commercial-pricing'
const cacheFilePath = resolve(process.cwd(), '.server-cache', 'commercial-pricing.json')
const presentationsApiPath = '/api/presentations'
const presentationsCacheFilePath = resolve(process.cwd(), '.server-cache', 'presentations.json')

function normalizeNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback
}

function normalizeRate(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function mergeFixedItems(items: unknown): CommercialFixedItem[] {
  const incoming = Array.isArray(items) ? items : []

  return DEFAULT_COMMERCIAL_PRICING.fixedItems.map(defaultItem => {
    const match = incoming.find(
      item => typeof item === 'object' && item !== null && 'id' in item && item.id === defaultItem.id,
    ) as Partial<CommercialFixedItem> | undefined

    return {
      ...defaultItem,
      value: normalizeNumber(match?.value, defaultItem.value),
      enabled: defaultItem.locked ? true : Boolean(match?.enabled ?? defaultItem.enabled),
    }
  })
}

function mergeVariableItems(items: unknown): CommercialVariableItem[] {
  const incoming = Array.isArray(items) ? items : []

  return DEFAULT_COMMERCIAL_PRICING.variableItems.map(defaultItem => {
    const match = incoming.find(
      item => typeof item === 'object' && item !== null && 'id' in item && item.id === defaultItem.id,
    ) as Partial<CommercialVariableItem> | undefined

    return {
      ...defaultItem,
      quantity: normalizeNumber(match?.quantity, defaultItem.quantity),
      unitValue: normalizeNumber(match?.unitValue, defaultItem.unitValue),
    }
  })
}

function mergePaymentOptions(items: unknown): PaymentOption[] {
  const incoming = Array.isArray(items) ? items : []

  return DEFAULT_COMMERCIAL_PRICING.paymentOptions.map(defaultItem => {
    const match = incoming.find(
      item => typeof item === 'object' && item !== null && 'id' in item && item.id === defaultItem.id,
    ) as Partial<PaymentOption> | undefined

    return {
      ...defaultItem,
      rateAdjustment: normalizeRate(match?.rateAdjustment, defaultItem.rateAdjustment),
    }
  })
}

function normalizeCommercialPricing(payload: unknown): CommercialPricingConfig {
  const source =
    typeof payload === 'object' && payload !== null
      ? (payload as Partial<CommercialPricingConfig>)
      : DEFAULT_COMMERCIAL_PRICING

  const paymentOptions = mergePaymentOptions(source.paymentOptions)
  const selectedPaymentOptionId =
    typeof source.selectedPaymentOptionId === 'string' &&
    paymentOptions.some(option => option.id === source.selectedPaymentOptionId)
    ? source.selectedPaymentOptionId
    : DEFAULT_COMMERCIAL_PRICING.selectedPaymentOptionId

  return {
    ...DEFAULT_COMMERCIAL_PRICING,
    updatedAt: new Date().toISOString(),
    responsibleCount: Math.max(
      DEFAULT_COMMERCIAL_PRICING.includedResponsibles,
      Math.floor(normalizeNumber(source.responsibleCount, DEFAULT_COMMERCIAL_PRICING.responsibleCount)),
    ),
    extraResponsibleUnitValue: normalizeNumber(
      source.extraResponsibleUnitValue,
      DEFAULT_COMMERCIAL_PRICING.extraResponsibleUnitValue,
    ),
    commercialAdjustmentRate:
      typeof source.commercialAdjustmentRate === 'number' && Number.isFinite(source.commercialAdjustmentRate)
        ? source.commercialAdjustmentRate
        : DEFAULT_COMMERCIAL_PRICING.commercialAdjustmentRate,
    selectedPaymentOptionId,
    fixedItems: mergeFixedItems(source.fixedItems),
    variableItems: mergeVariableItems(source.variableItems),
    paymentOptions,
  }
}

async function readCachedPricing() {
  try {
    const fileContent = await readFile(cacheFilePath, 'utf8')
    return normalizeCommercialPricing(JSON.parse(fileContent))
  } catch {
    const defaults = normalizeCommercialPricing(DEFAULT_COMMERCIAL_PRICING)
    await writeCachedPricing(defaults)
    return defaults
  }
}

async function writeCachedPricing(config: CommercialPricingConfig) {
  await mkdir(dirname(cacheFilePath), { recursive: true })
  await writeFile(cacheFilePath, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
}

async function readCachedPresentations() {
  try {
    const fileContent = await readFile(presentationsCacheFilePath, 'utf8')
    return normalizePresentationSystem(JSON.parse(fileContent))
  } catch {
    const defaults = normalizePresentationSystem(DEFAULT_PRESENTATION_SYSTEM)
    await writeCachedPresentations(defaults)
    return defaults
  }
}

async function writeCachedPresentations(config: PresentationSystemConfig) {
  await mkdir(dirname(presentationsCacheFilePath), { recursive: true })
  await writeFile(presentationsCacheFilePath, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
}

function readRequestBody(request: IncomingMessage) {
  return new Promise<string>((resolveBody, rejectBody) => {
    let body = ''

    request.on('data', (chunk: Buffer) => {
      body += String(chunk)
    })

    request.on('end', () => resolveBody(body))
    request.on('error', rejectBody)
  })
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: unknown,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

function registerCommercialPricingApi(server: ViteDevServer | PreviewServer) {
  server.middlewares.use(async (request, response, next) => {
    const pathname = request.url?.split('?')[0] ?? ''

    if (!pathname.startsWith(apiPath)) {
      next()
      return
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
      response.statusCode = 204
      response.end()
      return
    }

    try {
      if (pathname === apiPath && request.method === 'GET') {
        sendJson(response, 200, await readCachedPricing())
        return
      }

      if (pathname === apiPath && request.method === 'PUT') {
        const body = await readRequestBody(request)
        const normalized = normalizeCommercialPricing(JSON.parse(body || '{}'))
        await writeCachedPricing(normalized)
        sendJson(response, 200, normalized)
        return
      }

      if (pathname === `${apiPath}/reset` && request.method === 'POST') {
        const defaults = normalizeCommercialPricing(DEFAULT_COMMERCIAL_PRICING)
        await writeCachedPricing(defaults)
        sendJson(response, 200, defaults)
        return
      }

      sendJson(response, 405, { error: 'Metodo nao permitido.' })
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Erro ao acessar o cache comercial.',
      })
    }
  })
}

function commercialPricingCachePlugin(): Plugin {
  return {
    name: 'commercial-pricing-cache',
    configureServer: registerCommercialPricingApi,
    configurePreviewServer: registerCommercialPricingApi,
  }
}

function registerPresentationsApi(server: ViteDevServer | PreviewServer) {
  server.middlewares.use(async (request, response, next) => {
    const pathname = request.url?.split('?')[0] ?? ''

    if (!pathname.startsWith(presentationsApiPath)) {
      next()
      return
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
      response.statusCode = 204
      response.end()
      return
    }

    try {
      if (pathname === presentationsApiPath && request.method === 'GET') {
        sendJson(response, 200, await readCachedPresentations())
        return
      }

      if (pathname === presentationsApiPath && request.method === 'PUT') {
        const body = await readRequestBody(request)
        const normalized = normalizePresentationSystem(JSON.parse(body || '{}'))
        await writeCachedPresentations(normalized)
        sendJson(response, 200, normalized)
        return
      }

      if (pathname === `${presentationsApiPath}/reset` && request.method === 'POST') {
        const defaults = normalizePresentationSystem(DEFAULT_PRESENTATION_SYSTEM)
        await writeCachedPresentations(defaults)
        sendJson(response, 200, defaults)
        return
      }

      sendJson(response, 405, { error: 'Metodo nao permitido.' })
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Erro ao acessar o cache de apresentacoes.',
      })
    }
  })
}

function presentationsCachePlugin(): Plugin {
  return {
    name: 'presentations-cache',
    configureServer: registerPresentationsApi,
    configurePreviewServer: registerPresentationsApi,
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commercialPricingCachePlugin(), presentationsCachePlugin()],
})
