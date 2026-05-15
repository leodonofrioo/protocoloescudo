import {
  getDefaultPresentationSystem,
  normalizePresentationSystem,
  type PresentationSystemConfig,
} from '../data/presentationSystem';

const DEV_API_PATH = '/api/presentations';
const HOSTINGER_API_PATH = '/api/presentations/index.php';
const API_PATH = import.meta.env.DEV ? DEV_API_PATH : HOSTINGER_API_PATH;
const RESET_PATH = import.meta.env.DEV
  ? `${DEV_API_PATH}/reset`
  : `${HOSTINGER_API_PATH}?reset=1`;

export async function loadPresentationSystem() {
  const response = await fetch(API_PATH);

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar as apresentacoes.');
  }

  return normalizePresentationSystem(await response.json());
}

export async function savePresentationSystem(config: PresentationSystemConfig) {
  const response = await fetch(API_PATH, {
    method: import.meta.env.DEV ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Nao foi possivel salvar as apresentacoes.');
  }

  return normalizePresentationSystem(await response.json());
}

export async function resetPresentationSystem() {
  const response = await fetch(RESET_PATH, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Nao foi possivel restaurar as apresentacoes oficiais.');
  }

  return normalizePresentationSystem(await response.json());
}

export function getDefaultPresentations() {
  return getDefaultPresentationSystem();
}
