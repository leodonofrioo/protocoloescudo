import type { PresentationSlide, VisualColumn } from '../types/presentation';

export type PresentationPlan = {
  id: string;
  name: string;
  shortName: string;
  minValue: number;
  maxValue: number;
  description: string;
  items: string[];
};

export type PresentationCommercialConfig = {
  plans: PresentationPlan[];
  investmentFactors: string[];
};

export type PresentationCustomSlide = PresentationSlide & {
  id: string;
  libraryLabel: string;
};

export type PresentationVersionConfig = {
  id: string;
  slug: string;
  name: string;
  deckLabel: string;
  description: string;
  slideKeys: string[];
  updatedAt: string;
  locked?: boolean;
};

export type PresentationSystemConfig = {
  version: number;
  updatedAt: string;
  commercial: PresentationCommercialConfig;
  customSlides: PresentationCustomSlide[];
  versions: PresentationVersionConfig[];
};

export type SlideLibraryItem = PresentationSlide & {
  id: string;
  libraryLabel: string;
  source: 'complete' | 'summary' | 'custom';
  originalIndex?: number;
};

const COMPLETE_SLIDE_KEYS = Array.from({ length: 29 }, (_, index) => `complete-${index + 1}`);
const SUMMARY_SLIDE_KEYS = Array.from({ length: 15 }, (_, index) => `summary-${index + 1}`);

export const DEFAULT_PRESENTATION_SYSTEM: PresentationSystemConfig = {
  version: 1,
  updatedAt: '2026-05-15T00:00:00.000Z',
  commercial: {
    investmentFactors: [
      'Número de lideranças envolvidas',
      'Quantidade de unidades, áreas ou filiais',
      'Gravidade dos riscos mapeados',
      'Intensidade das simulações',
      'Necessidade de suporte recorrente',
      'Participação de especialistas externos',
      'Profundidade da Central Escudo',
    ],
    plans: [
      {
        id: 'essential',
        name: 'Escopo Essencial',
        shortName: 'Essencial',
        minValue: 50000,
        maxValue: 90000,
        description: 'Estrutura essencial para empresas com liderança centralizada e necessidade inicial de resposta.',
        items: ['Diagnóstico', 'Gabinete de Crise', 'Fluxos essenciais', 'Capacitação base', 'Simulação controlada'],
      },
      {
        id: 'executive',
        name: 'Escopo Executivo',
        shortName: 'Executivo',
        minValue: 100000,
        maxValue: 180000,
        description: 'Implantação executiva para empresas com múltiplas áreas, riscos relevantes e maior exposição.',
        items: ['Riscos ampliados', 'Central Escudo mais completa', 'Mais lideranças capacitadas', 'Testes adicionais'],
      },
      {
        id: 'institutional',
        name: 'Escopo Institucional',
        shortName: 'Institucional',
        minValue: 200000,
        maxValue: 300000,
        description: 'Blindagem institucional para empresas complexas, conselhos, múltiplas unidades ou alta exposição.',
        items: ['Implantação ampliada', 'Simulações avançadas', 'Suporte estratégico intenso', 'Blindagem robusta'],
      },
    ],
  },
  customSlides: [],
  versions: [
    {
      id: 'complete',
      slug: 'completa',
      name: 'Protocolo Escudo - Apresentação Completa',
      deckLabel: 'Apresentação completa',
      description: 'Versão comercial completa para reuniões com decisores, conselhos e lideranças.',
      slideKeys: COMPLETE_SLIDE_KEYS,
      updatedAt: '2026-05-15T00:00:00.000Z',
      locked: true,
    },
    {
      id: 'summary',
      slug: 'resumida',
      name: 'Protocolo Escudo - Versão Resumida',
      deckLabel: 'Versão resumida',
      description: 'Versão curta para abertura de reunião, diagnóstico comercial rápido e follow-up executivo.',
      slideKeys: SUMMARY_SLIDE_KEYS,
      updatedAt: '2026-05-15T00:00:00.000Z',
      locked: true,
    },
  ],
};

export function getDefaultPresentationSystem() {
  return structuredClone(DEFAULT_PRESENTATION_SYSTEM);
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback;
}

function normalizeString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return [...fallback];

  const normalized = value
    .filter(item => typeof item === 'string')
    .map(item => item.trim())
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [...fallback];
}

function normalizeSlug(value: unknown, fallback: string) {
  const base = normalizeString(value, fallback)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return base || fallback;
}

function normalizePlan(payload: unknown, fallback: PresentationPlan): PresentationPlan {
  const source = typeof payload === 'object' && payload !== null ? payload as Partial<PresentationPlan> : {};

  return {
    id: normalizeSlug(source.id, fallback.id),
    name: normalizeString(source.name, fallback.name),
    shortName: normalizeString(source.shortName, fallback.shortName),
    minValue: normalizeNumber(source.minValue, fallback.minValue),
    maxValue: Math.max(
      normalizeNumber(source.minValue, fallback.minValue),
      normalizeNumber(source.maxValue, fallback.maxValue),
    ),
    description: normalizeString(source.description, fallback.description),
    items: normalizeStringArray(source.items, fallback.items),
  };
}

function normalizeCommercial(payload: unknown): PresentationCommercialConfig {
  const source =
    typeof payload === 'object' && payload !== null
      ? payload as Partial<PresentationCommercialConfig>
      : DEFAULT_PRESENTATION_SYSTEM.commercial;

  const incomingPlans = Array.isArray(source.plans) ? source.plans : [];
  const plans = DEFAULT_PRESENTATION_SYSTEM.commercial.plans.map(defaultPlan => {
    const match = incomingPlans.find(plan => {
      return typeof plan === 'object' && plan !== null && 'id' in plan && plan.id === defaultPlan.id;
    });

    return normalizePlan(match, defaultPlan);
  });

  return {
    plans,
    investmentFactors: normalizeStringArray(
      source.investmentFactors,
      DEFAULT_PRESENTATION_SYSTEM.commercial.investmentFactors,
    ),
  };
}

function normalizeCustomSlide(payload: unknown): PresentationCustomSlide | null {
  const source = typeof payload === 'object' && payload !== null ? payload as Partial<PresentationCustomSlide> : null;
  if (!source) return null;

  const id = normalizeSlug(source.id, `custom-${Date.now()}`);
  const title = normalizeString(source.title, '');
  if (!title) return null;

  return {
    id,
    libraryLabel: normalizeString(source.libraryLabel, title),
    eyebrow: normalizeString(source.eyebrow, 'Slide personalizado'),
    title,
    text: normalizeStringArray(source.text, ['Conteúdo comercial a revisar.']),
    tone: source.tone ?? 'dark',
    visual: source.visual ?? {
      type: 'checklist',
      items: ['Ponto principal', 'Decisão necessária', 'Próximo passo'],
    },
  };
}

function normalizeVersion(payload: unknown, fallback: PresentationVersionConfig): PresentationVersionConfig {
  const source = typeof payload === 'object' && payload !== null ? payload as Partial<PresentationVersionConfig> : {};

  return {
    id: normalizeSlug(source.id, fallback.id),
    slug: normalizeSlug(source.slug, fallback.slug),
    name: normalizeString(source.name, fallback.name),
    deckLabel: normalizeString(source.deckLabel, fallback.deckLabel),
    description: normalizeString(source.description, fallback.description),
    slideKeys: normalizeStringArray(source.slideKeys, fallback.slideKeys),
    updatedAt: normalizeString(source.updatedAt, new Date().toISOString()),
    locked: Boolean(source.locked ?? fallback.locked),
  };
}

export function normalizePresentationSystem(payload: unknown): PresentationSystemConfig {
  const source =
    typeof payload === 'object' && payload !== null
      ? payload as Partial<PresentationSystemConfig>
      : DEFAULT_PRESENTATION_SYSTEM;

  const incomingVersions = Array.isArray(source.versions) ? source.versions : [];
  const defaultVersions = DEFAULT_PRESENTATION_SYSTEM.versions.map(defaultVersion => {
    const match = incomingVersions.find(version => {
      return typeof version === 'object' && version !== null && 'id' in version && version.id === defaultVersion.id;
    });

    return normalizeVersion(match, defaultVersion);
  });

  const customVersions = incomingVersions
    .filter(version => {
      return (
        typeof version === 'object' &&
        version !== null &&
        'id' in version &&
        !DEFAULT_PRESENTATION_SYSTEM.versions.some(defaultVersion => defaultVersion.id === version.id)
      );
    })
    .map((version, index) => normalizeVersion(version, {
      id: `custom-version-${index + 1}`,
      slug: `versao-${index + 1}`,
      name: `Versão personalizada ${index + 1}`,
      deckLabel: `Versão personalizada ${index + 1}`,
      description: 'Versão criada a partir do montador de apresentações.',
      slideKeys: COMPLETE_SLIDE_KEYS.slice(0, 5),
      updatedAt: new Date().toISOString(),
    }));

  const customSlides = (Array.isArray(source.customSlides) ? source.customSlides : [])
    .map(normalizeCustomSlide)
    .filter((slide): slide is PresentationCustomSlide => Boolean(slide));

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    commercial: normalizeCommercial(source.commercial),
    customSlides,
    versions: [...defaultVersions, ...customVersions],
  };
}

export function createSlideLibrary(
  completeSlides: PresentationSlide[],
  summarySlides: PresentationSlide[],
  customSlides: PresentationCustomSlide[],
): SlideLibraryItem[] {
  const completeLibrary = completeSlides.map((slide, index) => ({
    ...slide,
    id: `complete-${index + 1}`,
    libraryLabel: `${String(index + 1).padStart(2, '0')} - ${slide.eyebrow}`,
    source: 'complete' as const,
    originalIndex: index + 1,
  }));

  const summaryLibrary = summarySlides.map((slide, index) => ({
    ...slide,
    id: `summary-${index + 1}`,
    libraryLabel: `${String(index + 1).padStart(2, '0')} - ${slide.eyebrow}`,
    source: 'summary' as const,
    originalIndex: index + 1,
  }));

  const customLibrary = customSlides.map(slide => ({
    ...slide,
    source: 'custom' as const,
  }));

  return [...completeLibrary, ...summaryLibrary, ...customLibrary];
}

export function buildSlidesForVersion(
  version: PresentationVersionConfig,
  library: SlideLibraryItem[],
  commercial: PresentationCommercialConfig,
) {
  const slideMap = new Map(library.map(slide => [slide.id, slide]));

  return version.slideKeys
    .map(key => slideMap.get(key))
    .filter((slide): slide is SlideLibraryItem => Boolean(slide))
    .map(slide => applyCommercialDataToSlide(slide, commercial));
}

export function findPresentationVersion(config: PresentationSystemConfig, slugOrId: string) {
  return config.versions.find(version => version.slug === slugOrId || version.id === slugOrId) ?? config.versions[0];
}

export function formatCompactCurrency(value: number) {
  const rounded = Math.round(value / 1000);
  return `R$ ${rounded} mil`;
}

export function formatPlanRange(plan: PresentationPlan) {
  return `${formatCompactCurrency(plan.minValue)} a ${formatCompactCurrency(plan.maxValue)}`;
}

export function formatCommercialRange(plans: PresentationPlan[]) {
  const minValue = Math.min(...plans.map(plan => plan.minValue));
  const maxValue = Math.max(...plans.map(plan => plan.maxValue));
  return `${formatCompactCurrency(minValue)} a ${formatCompactCurrency(maxValue)}`;
}

function formatCommercialTitleRange(plans: PresentationPlan[]) {
  const minValue = Math.min(...plans.map(plan => plan.minValue));
  const maxValue = Math.max(...plans.map(plan => plan.maxValue));
  return `${formatCompactCurrency(minValue)} e ${formatCompactCurrency(maxValue)}`;
}

function buildPricingColumns(commercial: PresentationCommercialConfig): VisualColumn[] {
  return commercial.plans.map(plan => ({
    title: plan.name,
    price: formatPlanRange(plan),
    note: plan.description,
    items: plan.items,
  }));
}

function buildInvestmentColumns(commercial: PresentationCommercialConfig): VisualColumn[] {
  return commercial.investmentFactors.slice(0, 6).map(item => ({
    title: item.split(' ')[0] ?? item,
    items: [item],
  }));
}

export function applyCommercialDataToSlide(
  slide: PresentationSlide,
  commercial: PresentationCommercialConfig,
): PresentationSlide {
  if (slide.visual.type === 'pricingTiers') {
    return {
      ...slide,
      title: `Projetos entre ${formatCommercialTitleRange(commercial.plans)}.`,
      visual: {
        ...slide.visual,
        columns: buildPricingColumns(commercial),
      },
    };
  }

  if (slide.visual.type === 'investmentDashboard') {
    return {
      ...slide,
      visual: {
        ...slide.visual,
        items: commercial.investmentFactors,
        columns: buildInvestmentColumns(commercial),
      },
    };
  }

  return slide;
}
