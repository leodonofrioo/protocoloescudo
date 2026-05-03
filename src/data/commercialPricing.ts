export type CommercialFixedItem = {
  id: string;
  label: string;
  description: string;
  value: number;
  enabled: boolean;
  locked?: boolean;
};

export type CommercialVariableItem = {
  id: string;
  label: string;
  description: string;
  quantity: number;
  unitValue: number;
  unitLabel: string;
};

export type PaymentOption = {
  id: string;
  label: string;
  description: string;
  rateAdjustment: number;
  milestones: string;
};

export type CommercialPricingConfig = {
  version: number;
  updatedAt: string;
  responsibleCount: number;
  includedResponsibles: number;
  extraResponsibleUnitValue: number;
  commercialAdjustmentRate: number;
  selectedPaymentOptionId: string;
  fixedItems: CommercialFixedItem[];
  variableItems: CommercialVariableItem[];
  paymentOptions: PaymentOption[];
};

export const DEFAULT_COMMERCIAL_PRICING: CommercialPricingConfig = {
  version: 1,
  updatedAt: '2026-05-03T00:00:00.000Z',
  responsibleCount: 2,
  includedResponsibles: 2,
  extraResponsibleUnitValue: 7500,
  commercialAdjustmentRate: 0,
  selectedPaymentOptionId: 'standard',
  fixedItems: [
    {
      id: 'base-project',
      label: 'Projeto base Protocolo Escudo',
      description:
        'Implantacao essencial com diagnostico, gabinete, matriz inicial, materiais base e ate 2 responsaveis.',
      value: 50000,
      enabled: true,
      locked: true,
    },
    {
      id: 'central-setup',
      label: 'Setup profissional da Central Escudo',
      description:
        'Organizacao da biblioteca operacional, trilhas, governanca de versoes e pacote inicial de evidencias.',
      value: 15000,
      enabled: false,
    },
    {
      id: 'executive-governance',
      label: 'Governanca executiva ampliada',
      description:
        'Ritos adicionais com sponsor, comite, atas decisorias, relatorio executivo e acompanhamento senior.',
      value: 12000,
      enabled: false,
    },
    {
      id: 'priority-response',
      label: 'Acionamento prioritario por 30 dias',
      description:
        'Canal de resposta sensivel para duvidas criticas, ajustes de mensagem e suporte de primeira decisao.',
      value: 18000,
      enabled: false,
    },
    {
      id: 'annual-retainer',
      label: 'Recorrencia anual de blindagem',
      description:
        'Ciclo anual com revisoes, simulados leves, atualizacao de riscos e suporte estrategico programado.',
      value: 72000,
      enabled: false,
    },
  ],
  variableItems: [
    {
      id: 'additional-units',
      label: 'Unidades ou operacoes adicionais',
      description: 'Filiais, plantas, marcas, regioes ou frentes operacionais alem do nucleo principal.',
      quantity: 0,
      unitValue: 12000,
      unitLabel: 'unidade',
    },
    {
      id: 'extra-simulations',
      label: 'Simulados extras / The Worst Day',
      description: 'Rodadas adicionais de pressao, stress test, debriefing e plano corretivo por simulacao.',
      quantity: 0,
      unitValue: 18000,
      unitLabel: 'simulado',
    },
    {
      id: 'spokespeople',
      label: 'Porta-vozes em preparacao intensiva',
      description: 'Treino individual, Q&A hostil, postura, entrevista simulada e feedback reservado.',
      quantity: 0,
      unitValue: 6500,
      unitLabel: 'porta-voz',
    },
    {
      id: 'critical-materials',
      label: 'Materiais criticos adicionais',
      description: 'Playbooks, notas, Q&A, comunicados internos ou fluxos extras fora do pacote base.',
      quantity: 0,
      unitValue: 2500,
      unitLabel: 'material',
    },
    {
      id: 'onsite-days',
      label: 'Dias presenciais / logistica tecnica',
      description: 'Dia presencial de equipe, facilitacao, deslocamento tecnico ou operacao assistida.',
      quantity: 0,
      unitValue: 4500,
      unitLabel: 'dia',
    },
  ],
  paymentOptions: [
    {
      id: 'standard',
      label: 'Padrao 50 / 30 / 20',
      description: 'Fluxo recomendado para preservar agenda, caixa do projeto e ritmo de implantacao.',
      rateAdjustment: 0,
      milestones: '50% no aceite, 30% no kickoff operacional e 20% antes da entrega final.',
    },
    {
      id: 'upfront',
      label: 'A vista no aceite',
      description: 'Condicao para fechamento rapido e menor custo administrativo.',
      rateAdjustment: -5,
      milestones: '100% no aceite da proposta, com 5% de desconto comercial automatico.',
    },
    {
      id: 'two-installments',
      label: 'Duas parcelas',
      description: 'Opcao simples para empresas que preferem dividir sem alongar demais o risco financeiro.',
      rateAdjustment: 0,
      milestones: '60% no aceite e 40% antes da simulacao principal ou entrega consolidada.',
    },
    {
      id: 'four-installments',
      label: 'Quatro parcelas mensais',
      description: 'Parcelamento com custo financeiro para compensar exposicao de agenda e equipe.',
      rateAdjustment: 4,
      milestones: '4 parcelas mensais, com acrescimo de 4% sobre o subtotal aprovado.',
    },
  ],
};
