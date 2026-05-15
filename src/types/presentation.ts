export type SlideTone = 'cover' | 'dark' | 'light' | 'danger' | 'closing';

export type VisualType =
  | 'cover'
  | 'questionMap'
  | 'brokenFlow'
  | 'impactDashboard'
  | 'crossingChart'
  | 'segmentMap'
  | 'shieldAssets'
  | 'beforeAfter'
  | 'checklist'
  | 'timeline'
  | 'riskMatrix'
  | 'orgChart'
  | 'documentCards'
  | 'hubMock'
  | 'indicatorDashboard'
  | 'gauges'
  | 'competencyTable'
  | 'progressFlow'
  | 'storyboard'
  | 'cycle'
  | 'redButton'
  | 'confidential'
  | 'sharedResponsibility'
  | 'comparison'
  | 'investmentDashboard'
  | 'pricingTiers'
  | 'balance'
  | 'steps'
  | 'closing';

export type VisualColumn = {
  title: string;
  items: string[];
  note?: string;
  price?: string;
};

export type VisualRow = {
  label: string;
  value: string;
  reason: string;
};

export type SlideVisual = {
  type: VisualType;
  center?: string;
  caption?: string;
  items?: string[];
  steps?: string[];
  columns?: VisualColumn[];
  rows?: VisualRow[];
  quadrants?: string[];
};

export type PresentationSlide = {
  eyebrow: string;
  title: string;
  text: string[];
  tone?: SlideTone;
  visual: SlideVisual;
};
