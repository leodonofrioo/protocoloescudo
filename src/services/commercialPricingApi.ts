import {
  DEFAULT_COMMERCIAL_PRICING,
  type CommercialPricingConfig,
} from '../data/commercialPricing';

const DEV_API_PATH = '/api/commercial-pricing';
const HOSTINGER_API_PATH = '/api/commercial-pricing/index.php';
const API_PATH = import.meta.env.DEV ? DEV_API_PATH : HOSTINGER_API_PATH;
const RESET_PATH = import.meta.env.DEV
  ? `${DEV_API_PATH}/reset`
  : `${HOSTINGER_API_PATH}?reset=1`;

export async function loadCommercialPricing() {
  const response = await fetch(API_PATH);

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar a politica comercial.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export async function saveCommercialPricing(config: CommercialPricingConfig) {
  const response = await fetch(API_PATH, {
    method: import.meta.env.DEV ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Nao foi possivel salvar a politica comercial.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export async function resetCommercialPricing() {
  const response = await fetch(RESET_PATH, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Nao foi possivel restaurar os valores oficiais.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export function getDefaultCommercialPricing() {
  return structuredClone(DEFAULT_COMMERCIAL_PRICING);
}
