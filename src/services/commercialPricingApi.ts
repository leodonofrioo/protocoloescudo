import {
  DEFAULT_COMMERCIAL_PRICING,
  type CommercialPricingConfig,
} from '../data/commercialPricing';

const API_PATH = '/api/commercial-pricing';

export async function loadCommercialPricing() {
  const response = await fetch(API_PATH);

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar a politica comercial.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export async function saveCommercialPricing(config: CommercialPricingConfig) {
  const response = await fetch(API_PATH, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Nao foi possivel salvar a politica comercial.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export async function resetCommercialPricing() {
  const response = await fetch(`${API_PATH}/reset`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Nao foi possivel restaurar os valores oficiais.');
  }

  return (await response.json()) as CommercialPricingConfig;
}

export function getDefaultCommercialPricing() {
  return structuredClone(DEFAULT_COMMERCIAL_PRICING);
}
