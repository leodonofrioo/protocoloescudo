import { type PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ShieldCheck,
} from 'lucide-react';
import './Apresentacao.css';

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

const completePresentationSlides: PresentationSlide[] = [
  {
    eyebrow: 'Protocolo Escudo',
    title: 'Protocolo Escudo',
    tone: 'cover',
    text: [
      'Prontidão corporativa para empresas que não podem improvisar diante de uma crise.',
      'Implantação estratégica de resposta, proteção reputacional e governança em momentos críticos.',
    ],
    visual: { type: 'cover', caption: 'Resposta, comando e proteção institucional' },
  },
  {
    eyebrow: 'Pergunta de comando',
    title: 'Quando uma crise acontecer, quem decide o que a empresa faz primeiro?',
    tone: 'dark',
    text: [
      'Quem fala? Quem aprova? Quem aciona o jurídico? Quem comunica clientes, imprensa, colaboradores e parceiros?',
      'O primeiro problema não é falta de boa vontade. É falta de clareza sobre comando, autoridade e sequência de resposta.',
    ],
    visual: {
      type: 'questionMap',
      center: 'Decisão crítica',
      items: ['Liderança', 'Jurídico', 'Comunicação', 'Operação', 'Comercial'],
    },
  },
  {
    eyebrow: 'Risco do improviso',
    title: 'Sem protocolo, a crise toma o controle da empresa.',
    tone: 'danger',
    text: [
      'Quando não existe uma estrutura definida, a resposta depende de urgência, opinião, medo e tentativa.',
      'Isso gera demora, conflito entre áreas, comunicação desencontrada e perda de autoridade institucional.',
      'A empresa pode estar certa no mérito e ainda assim perder valor ao parecer desorganizada.',
    ],
    visual: {
      type: 'brokenFlow',
      steps: [
        'Incidente identificado',
        'Resposta atrasada',
        'Versões diferentes',
        'Pressão externa',
        'Perda de confiança',
      ],
    },
  },
  {
    eyebrow: 'Impacto percebido',
    title: 'O prejuízo nem sempre começa no processo. Muitas vezes começa na percepção.',
    tone: 'light',
    text: ['Uma resposta fraca pressiona reputação, caixa, liderança, confiança e operação ao mesmo tempo.'],
    visual: {
      type: 'impactDashboard',
      items: [
        'Perda de confiança de clientes',
        'Insegurança entre colaboradores',
        'Pressão de fornecedores e parceiros',
        'Ruído em redes sociais',
        'Exposição negativa na imprensa',
        'Desalinhamento entre liderança, jurídico e comunicação',
        'Queda no valor percebido da empresa',
      ],
    },
  },
  {
    eyebrow: 'Controle narrativo',
    title: 'Quando a empresa demora a responder, alguém responde por ela.',
    tone: 'dark',
    text: [
      'O silêncio institucional abre espaço para especulação.',
      'A ausência de posicionamento vira narrativa pública.',
      'A falta de alinhamento interno transforma colaboradores, clientes e terceiros em fontes de ruído.',
      'Em crise, quem não conduz a narrativa acaba sendo conduzido por ela.',
    ],
    visual: {
      type: 'crossingChart',
      items: ['Controle da empresa', 'Ruído externo', 'Perda de controle narrativo'],
    },
  },
  {
    eyebrow: 'Indicação',
    title: 'O Escudo é para organizações onde uma resposta errada custa caro.',
    tone: 'light',
    text: [
      'Empresas com exposição pública, clientes sensíveis, conselhos, investidores, risco jurídico ou operação complexa precisam responder com método.',
      'O Protocolo Escudo é indicado quando confiança, autoridade e continuidade operacional fazem parte do valor do negócio.',
    ],
    visual: {
      type: 'segmentMap',
      items: [
        'Saúde',
        'Agro',
        'Indústria',
        'Educação',
        'Tecnologia',
        'Serviços financeiros',
        'Empresas familiares',
        'Grupos empresariais regionais',
      ],
    },
  },
  {
    eyebrow: 'Ativos protegidos',
    title: 'Em uma crise, a empresa não protege apenas a imagem.',
    tone: 'dark',
    text: ['Ela protege ativos que sustentam receita, autoridade e continuidade.'],
    visual: {
      type: 'shieldAssets',
      items: [
        'Contratos',
        'Receita',
        'Licenças',
        'Relações institucionais',
        'Credibilidade da liderança',
        'Confiança do time',
        'Valor de mercado',
        'Continuidade da operação',
      ],
    },
  },
  {
    eyebrow: 'Estrutura de resposta',
    title: 'O Protocolo Escudo implanta uma estrutura real de resposta à crise dentro da empresa.',
    tone: 'dark',
    text: [
      'Nós conduzimos a liderança na criação de um sistema claro para identificar, escalar, decidir, comunicar e corrigir situações críticas.',
      'O objetivo é transformar improviso em método, medo em critério, ruído em alinhamento e demora em resposta coordenada.',
    ],
    visual: {
      type: 'beforeAfter',
      columns: [
        { title: 'Antes', items: ['Improviso', 'Demora', 'Conflito', 'Ruído'] },
        { title: 'Depois', items: ['Comando', 'Fluxo', 'Aprovação', 'Resposta'] },
      ],
    },
  },
  {
    eyebrow: 'Capacidade instalada',
    title: 'O cliente não compra uma consultoria. Compra capacidade instalada.',
    tone: 'light',
    text: [
      'Ao final da implantação, a empresa terá uma estrutura própria para responder a crises com mais clareza, velocidade e segurança.',
    ],
    visual: {
      type: 'checklist',
      items: [
        'Diagnóstico de riscos prioritários',
        'Gabinete de Crise estruturado',
        'Fluxos de acionamento',
        'Papéis e responsáveis definidos',
        'Mensagens base para situações críticas',
        'Perguntas e respostas estratégicas',
        'Central de Prontidão',
        'Capacitação da liderança',
        'Simulações práticas',
        'Acompanhamento de blindagem',
      ],
    },
  },
  {
    eyebrow: 'Implantação',
    title: 'A implantação acontece em duas etapas principais.',
    tone: 'dark',
    text: [
      'Não é palestra. É projeto com construção, validação e acompanhamento.',
      'A primeira etapa cria a estrutura essencial. A segunda testa, corrige e mantém a blindagem ativa.',
    ],
    visual: {
      type: 'timeline',
      columns: [
        {
          title: '60 dias',
          note: 'Implantação',
          items: [
            'Diagnóstico',
            'Mapeamento de riscos',
            'Gabinete de Crise',
            'Fluxos de decisão',
            'Capacitação',
            'Simulação The Worst Day',
          ],
        },
        {
          title: '120 dias',
          note: 'Validação e blindagem',
          items: [
            'Testes controlados',
            'Correções',
            'Suporte estratégico',
            'Atualização dos materiais',
            'Refinamento da operação',
          ],
        },
      ],
    },
  },
  {
    eyebrow: 'Fase 1',
    title: 'Antes de criar o protocolo, identificamos onde a empresa é mais vulnerável.',
    tone: 'light',
    text: [
      'Nesta fase, levantamos os riscos reais da organização, entendemos processos sensíveis e identificamos quais áreas podem gerar maior impacto.',
      'O diagnóstico considera riscos operacionais, jurídicos, reputacionais, comerciais, digitais, de liderança e de governança.',
    ],
    visual: {
      type: 'riskMatrix',
      quadrants: [
        'Baixa probabilidade e baixo impacto',
        'Baixa probabilidade e alto impacto',
        'Alta probabilidade e baixo impacto',
        'Alta probabilidade e alto impacto',
      ],
    },
  },
  {
    eyebrow: 'Fase 2',
    title: 'O Gabinete de Crise define quem decide, quem executa e quem aprova.',
    tone: 'dark',
    text: [
      'Não é uma reunião emergencial.',
      'É uma estrutura formal para coordenar a resposta da empresa quando existe pressão, exposição ou risco institucional.',
      'O Gabinete define participação, autoridade de aprovação, acionamento, porta-voz, validação de mensagens e execução das ações.',
    ],
    visual: {
      type: 'orgChart',
      steps: ['Incidente', 'Responsável inicial', 'Gabinete de Crise', 'Jurídico', 'Comunicação', 'Diretoria', 'Porta-voz'],
    },
  },
  {
    eyebrow: 'Entregáveis do gabinete',
    title: 'O Gabinete é construído com entregáveis práticos para uso real.',
    tone: 'light',
    text: ['Esses materiais reduzem a dependência de memória, opinião e urgência.'],
    visual: {
      type: 'documentCards',
      items: [
        'Mapa de responsáveis',
        'Fluxos de acionamento',
        'Checklist de primeira resposta',
        'Mapa de aprovação',
        'Mensagens base',
        'Q&A crítico',
        'Critérios de escalonamento',
        'Rotina de atualização durante a crise',
      ],
    },
  },
  {
    eyebrow: 'Fase 3',
    title: 'A Central Escudo organiza o conhecimento crítico da empresa em um único ambiente.',
    tone: 'dark',
    text: ['Ela funciona como um hub interno de consulta, padronização e treinamento.'],
    visual: {
      type: 'hubMock',
      items: [
        'Protocolos de acionamento',
        'Checklists operacionais',
        'Templates de comunicados',
        'Fluxos internos',
        'Mapas de decisão',
        'Trilhas rápidas por função',
        'Estudos de caso',
        'Planos de ação pós-incidente',
      ],
      steps: ['Protocolos', 'Checklists', 'Comunicação', 'Riscos', 'Treinamentos', 'Simulações'],
    },
  },
  {
    eyebrow: 'Valor permanente',
    title: 'O conhecimento não pode ficar preso em pessoas.',
    tone: 'light',
    text: [
      'Quando executivos mudam, quando áreas crescem ou quando novos líderes entram, a empresa precisa preservar sua inteligência de resposta.',
    ],
    visual: {
      type: 'indicatorDashboard',
      items: [
        'Onboarding mais rápido de novos responsáveis',
        'Padronização da comunicação',
        'Redução de retrabalho',
        'Consulta rápida em momentos críticos',
        'Continuidade da cultura de prontidão',
        'Menos reuniões teóricas e mais uso prático',
      ],
      columns: [
        { title: 'Tempo economizado', items: ['Menos busca por informação'] },
        { title: 'Padronização', items: ['Resposta mais consistente'] },
        { title: 'Retenção de conhecimento', items: ['Memória institucional preservada'] },
        { title: 'Resposta mais rápida', items: ['Consulta direta em crise'] },
      ],
    },
  },
  {
    eyebrow: 'Fase 4',
    title: 'O protocolo só funciona se a liderança souber operar sob pressão.',
    tone: 'dark',
    text: [
      'Nesta fase, os responsáveis internos são preparados para agir com clareza, critério e alinhamento.',
      'A capacitação avalia comunicação, tomada de decisão, velocidade, coesão, posicionamento e postura diante de perguntas difíceis.',
    ],
    visual: {
      type: 'gauges',
      items: ['Clareza', 'Velocidade', 'Alinhamento', 'Autoridade'],
    },
  },
  {
    eyebrow: 'Critérios de liderança',
    title: 'Cada liderança precisa saber seu papel antes do momento crítico.',
    tone: 'light',
    text: [
      'Avaliamos se os responsáveis conseguem entender a gravidade, acionar as pessoas certas, priorizar riscos e evitar respostas impulsivas.',
      'A liderança também precisa comunicar sem ampliar o problema e preservar o valor de longo prazo da empresa.',
    ],
    visual: {
      type: 'competencyTable',
      rows: [
        { label: 'Comunicação', value: 'Clareza, firmeza e precisão', reason: 'Reduz ruído e preserva confiança' },
        { label: 'Decisão', value: 'Critério sob ambiguidade', reason: 'Evita reação impulsiva' },
        { label: 'Coordenação', value: 'Acionamento correto das áreas', reason: 'Acelera a resposta institucional' },
      ],
    },
  },
  {
    eyebrow: 'Fase 5',
    title: 'The Worst Day é a simulação que testa se o protocolo funciona na prática.',
    tone: 'danger',
    text: [
      'A empresa é colocada diante de um cenário crítico controlado, com pressão realista, múltiplos envolvidos e necessidade de decisão rápida.',
      'O objetivo é encontrar falhas antes que uma crise real encontre.',
      'Durante a simulação, avaliamos ativação do Gabinete, tempo de resposta, alinhamento, qualidade das decisões, comunicação e controle sob pressão.',
    ],
    visual: {
      type: 'progressFlow',
      steps: ['Alerta inicial', 'Gabinete acionado', 'Pressão externa', 'Decisão crítica', 'Debriefing'],
    },
  },
  {
    eyebrow: 'Dinâmica controlada',
    title: 'A simulação reproduz uma crise sem expor a empresa ao mercado.',
    tone: 'dark',
    text: [
      'O exercício pode incluir sinais iniciais de risco, ruído interno, pressão de stakeholders, demandas do jurídico, cobrança de clientes, imprensa hostil, redes sociais e necessidade de comunicado oficial.',
      'Ao final, a equipe recebe um debriefing com falhas, pontos fortes e ajustes necessários.',
    ],
    visual: {
      type: 'storyboard',
      steps: [
        'Operação detecta problema',
        'Diretoria é acionada',
        'Imprensa pressiona',
        'Porta-voz responde',
        'Equipe corrige falhas',
      ],
    },
  },
  {
    eyebrow: 'Blindagem assistida',
    title: 'A implantação cria a base. A Blindagem Assistida garante que ela funcione na rotina real.',
    tone: 'light',
    text: [
      'Durante 120 dias, acompanhamos a empresa para validar o protocolo, corrigir fragilidades e manter a estrutura ativa.',
      'A blindagem inclui testes controlados, ajustes nos fluxos, revisão da Matriz de Riscos, suporte estratégico, atualização de mensagens, treinamento de novas lideranças e correções após simulações.',
    ],
    visual: {
      type: 'cycle',
      steps: ['Testar', 'Medir', 'Corrigir', 'Atualizar', 'Reforçar'],
    },
  },
  {
    eyebrow: 'Botão Vermelho',
    title: 'Em momentos sensíveis, a liderança não precisa decidir sozinha.',
    tone: 'danger',
    text: [
      'O Botão Vermelho é um canal estratégico de acionamento prioritário para situações de alta criticidade.',
      'Ele permite apoio executivo quando a empresa precisa de análise rápida, visão externa e moderação tática.',
      'Esse suporte é especialmente relevante nas primeiras horas de uma crise, quando decisões mal calibradas podem ampliar o dano.',
    ],
    visual: {
      type: 'redButton',
      items: ['Análise rápida', 'Moderação tática', 'Direção estratégica'],
    },
  },
  {
    eyebrow: 'Sigilo',
    title: 'Para proteger a empresa, precisamos acessar informações sensíveis com responsabilidade absoluta.',
    tone: 'dark',
    text: [
      'Todo o processo deve operar sob confidencialidade.',
      'As fragilidades identificadas não são usadas para julgamento interno.',
      'Elas são transformadas em planos de contenção, melhoria e proteção.',
      'A empresa mantém a posse dos materiais, fluxos, mapas e documentos gerados durante o projeto.',
    ],
    visual: {
      type: 'confidential',
      items: ['Confidencialidade', 'Critério técnico', 'Posse dos materiais', 'Proteção de dados sensíveis'],
    },
  },
  {
    eyebrow: 'Responsabilidade compartilhada',
    title: 'O Protocolo Escudo é construído com a liderança, não imposto de fora para dentro.',
    tone: 'light',
    text: [
      'A Equipe Escudo conduz método, estrutura, provocação estratégica e validação.',
      'A empresa fornece realidade, dados, responsáveis, autoridade e tomada de decisão.',
      'Essa combinação garante que o protocolo nasça conectado à cultura, aos riscos e à operação real da organização.',
    ],
    visual: {
      type: 'sharedResponsibility',
      columns: [
        { title: 'Equipe Escudo', items: ['Método', 'Diagnóstico', 'Estrutura', 'Capacitação', 'Testes'] },
        { title: 'Empresa', items: ['Dados', 'Liderança', 'Decisão', 'Responsáveis', 'Execução'] },
      ],
    },
  },
  {
    eyebrow: 'Transformação',
    title: 'O que muda após o projeto.',
    tone: 'dark',
    text: ['A empresa sai de uma resposta dependente de improviso para uma capacidade validada de decisão, comunicação e comando.'],
    visual: {
      type: 'comparison',
      columns: [
        {
          title: 'Antes do Protocolo Escudo',
          items: [
            'A empresa depende de improviso',
            'As áreas respondem de forma isolada',
            'Jurídico, comunicação e liderança podem entrar em conflito',
            'A tomada de decisão fica lenta',
            'A narrativa externa ganha força',
          ],
        },
        {
          title: 'Depois do Protocolo Escudo',
          items: [
            'Fluxo claro',
            'Responsáveis definidos',
            'Gabinete de Crise estruturado',
            'Mensagens preparadas',
            'Liderança capacitada',
            'Testes realizados',
            'Capacidade de resposta validada',
          ],
        },
      ],
    },
  },
  {
    eyebrow: 'Investimento',
    title: 'O investimento depende da complexidade da operação e do nível de blindagem necessário.',
    tone: 'light',
    text: ['O projeto é dimensionado por risco, estrutura, intensidade de simulação, suporte e profundidade da Central Escudo.'],
    visual: {
      type: 'investmentDashboard',
      items: [
        'Número de lideranças envolvidas',
        'Quantidade de unidades, áreas ou filiais',
        'Gravidade dos riscos mapeados',
        'Intensidade das simulações',
        'Necessidade de suporte recorrente',
        'Participação de especialistas externos',
        'Profundidade da Central Escudo',
      ],
      columns: [
        { title: 'Liderança', items: ['pessoas-chave'] },
        { title: 'Complexidade', items: ['áreas e filiais'] },
        { title: 'Risco', items: ['exposição crítica'] },
        { title: 'Simulação', items: ['intensidade'] },
        { title: 'Suporte', items: ['recorrência'] },
        { title: 'Continuidade', items: ['central e blindagem'] },
      ],
    },
  },
  {
    eyebrow: 'Faixas de projeto',
    title: 'Projetos entre R$ 50 mil e R$ 300 mil.',
    tone: 'dark',
    text: ['As faixas organizam a conversa comercial por escopo, exposição e nível de blindagem necessário.'],
    visual: {
      type: 'pricingTiers',
      columns: [
        {
          title: 'Escopo Essencial',
          price: 'R$ 50 mil a R$ 90 mil',
          note: 'Para liderança centralizada e estrutura inicial de resposta.',
          items: ['Diagnóstico', 'Gabinete de Crise', 'Fluxos essenciais', 'Capacitação base', 'Simulação controlada'],
        },
        {
          title: 'Escopo Executivo',
          price: 'R$ 100 mil a R$ 180 mil',
          note: 'Para múltiplas áreas, maior exposição e certificação ampliada.',
          items: ['Riscos com maior profundidade', 'Mais lideranças capacitadas', 'Central mais completa', 'Testes adicionais'],
        },
        {
          title: 'Escopo Institucional',
          price: 'R$ 200 mil a R$ 300 mil',
          note: 'Para alta exposição, conselhos, riscos regulatórios ou operação complexa.',
          items: ['Implantação ampliada', 'Simulações avançadas', 'Suporte intenso', 'Blindagem institucional robusta'],
        },
      ],
    },
  },
  {
    eyebrow: 'Justificativa econômica',
    title: 'O custo de uma crise mal conduzida costuma ser maior do que o custo de se preparar.',
    tone: 'light',
    text: [
      'O investimento não está apenas no que é entregue.',
      'Está no que a empresa evita perder.',
    ],
    visual: {
      type: 'balance',
      columns: [
        { title: 'Investimento em prontidão', items: ['Método', 'Governança', 'Capacitação', 'Resposta validada'] },
        {
          title: 'Potenciais perdas por crise',
          items: ['Receita', 'Reputação', 'Contratos', 'Confiança dos clientes', 'Segurança da liderança', 'Continuidade da operação', 'Valor institucional'],
        },
      ],
    },
  },
  {
    eyebrow: 'Próximos passos',
    title: 'Para iniciar o dimensionamento do projeto, seguimos cinco etapas.',
    tone: 'dark',
    text: ['O caminho comercial precisa ser objetivo, confidencial e conectado aos riscos reais da empresa.'],
    visual: {
      type: 'steps',
      steps: [
        'Definição dos sponsors internos',
        'Assinatura de confidencialidade',
        'Reunião de diagnóstico inicial',
        'Dimensionamento do escopo',
        'Aprovação da proposta e início da Fase 1',
      ],
    },
  },
  {
    eyebrow: 'Fechamento',
    title: 'Sua empresa não precisa prever todas as crises.',
    tone: 'closing',
    text: [
      'Precisa estar preparada para responder às mais importantes.',
      'O Protocolo Escudo estrutura liderança, comunicação, decisão e resposta para proteger o que a empresa levou anos para construir.',
      'Reputação. Confiança. Valor. Continuidade.',
    ],
    visual: { type: 'closing', caption: 'Protocolo Escudo' },
  },
];

function renderVisual(visual: SlideVisual) {
  switch (visual.type) {
    case 'cover':
      return (
        <div className="visual-cover">
          <img src="/images/Logo.webp" alt="Protocolo Escudo" />
          <div className="visual-cover-shield"><ShieldCheck size={68} /></div>
          <span>{visual.caption}</span>
        </div>
      );

    case 'questionMap':
      return (
        <div className="question-map">
          <div className="question-center">{visual.center}</div>
          {visual.items?.map(item => <div className="question-node" key={item}>{item}</div>)}
        </div>
      );

    case 'brokenFlow':
    case 'progressFlow':
      return (
        <div className={`flow-visual ${visual.type === 'brokenFlow' ? 'flow-broken' : ''}`}>
          {visual.steps?.map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      );

    case 'impactDashboard':
    case 'segmentMap':
    case 'documentCards':
    case 'checklist':
      return (
        <div className={`visual-card-grid visual-${visual.type}`}>
          {visual.items?.map(item => (
            <div className="visual-card" key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      );

    case 'crossingChart':
      return (
        <div className="crossing-chart">
          <div className="chart-line chart-company" />
          <div className="chart-line chart-noise" />
          <div className="chart-cross">Perda de controle narrativo</div>
          <span className="chart-label chart-label-left">Controle da empresa</span>
          <span className="chart-label chart-label-right">Ruído externo</span>
        </div>
      );

    case 'shieldAssets':
      return (
        <div className="shield-assets">
          <div className="shield-core"><ShieldCheck size={54} /><span>Ativos protegidos</span></div>
          {visual.items?.map(item => <div className="shield-cell" key={item}>{item}</div>)}
        </div>
      );

    case 'beforeAfter':
    case 'comparison':
    case 'sharedResponsibility':
    case 'balance':
      return (
        <div className={`visual-columns visual-${visual.type}`}>
          {visual.columns?.map(column => (
            <div className="visual-column" key={column.title}>
              <h3>{column.title}</h3>
              {column.note && <p>{column.note}</p>}
              <ul>
                {column.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <div className="timeline-visual">
          {visual.columns?.map(column => (
            <div className="timeline-block" key={column.title}>
              <strong>{column.title}</strong>
              <span>{column.note}</span>
              <ul>{column.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      );

    case 'riskMatrix':
      return (
        <div className="risk-matrix-visual">
          {visual.quadrants?.map((item, index) => <div className={`risk-quadrant risk-${index + 1}`} key={item}>{item}</div>)}
          <span className="risk-axis risk-impact">Impacto</span>
          <span className="risk-axis risk-probability">Probabilidade</span>
        </div>
      );

    case 'orgChart':
      return (
        <div className="org-chart">
          {visual.steps?.map((step, index) => (
            <div className={`org-node org-node-${index}`} key={step}>{step}</div>
          ))}
        </div>
      );

    case 'hubMock':
      return (
        <div className="hub-mock">
          <div className="hub-sidebar">
            {visual.steps?.map(item => <span key={item}>{item}</span>)}
          </div>
          <div className="hub-panel">
            <strong>Central Escudo</strong>
            <div className="hub-panel-grid">
              {visual.items?.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      );

    case 'indicatorDashboard':
    case 'investmentDashboard':
      return (
        <div className={`indicator-dashboard visual-${visual.type}`}>
          {visual.columns?.map(column => (
            <div className="indicator-card" key={column.title}>
              <strong>{column.title}</strong>
              <span>{column.items[0]}</span>
            </div>
          ))}
        </div>
      );

    case 'gauges':
      return (
        <div className="gauge-panel">
          {visual.items?.map((item, index) => (
            <div className="gauge-card" key={item}>
              <div className="gauge-ring" style={{ '--gauge-value': `${72 + index * 6}%` } as React.CSSProperties}>
                <span>{72 + index * 6}%</span>
              </div>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      );

    case 'competencyTable':
      return (
        <div className="competency-table">
          <div className="table-head"><span>Competência</span><span>O que é observado</span><span>Por que importa</span></div>
          {visual.rows?.map(row => (
            <div className="table-row" key={row.label}>
              <strong>{row.label}</strong>
              <span>{row.value}</span>
              <span>{row.reason}</span>
            </div>
          ))}
        </div>
      );

    case 'storyboard':
    case 'steps':
      return (
        <div className={`storyboard visual-${visual.type}`}>
          {visual.steps?.map((step, index) => (
            <div className="story-card" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      );

    case 'cycle':
      return (
        <div className="cycle-visual">
          {visual.steps?.map(step => <div className="cycle-node" key={step}>{step}</div>)}
          <div className="cycle-center">Blindagem ativa</div>
        </div>
      );

    case 'redButton':
      return (
        <div className="red-button-visual">
          <div className="red-button-core">Botão Vermelho</div>
          <div className="red-button-cards">
            {visual.items?.map(item => <span key={item}>{item}</span>)}
          </div>
        </div>
      );

    case 'confidential':
      return (
        <div className="confidential-visual">
          <div className="confidential-seal">Confidencial</div>
          {visual.items?.map(item => <span key={item}>{item}</span>)}
        </div>
      );

    case 'pricingTiers':
      return (
        <div className="pricing-tiers">
          {visual.columns?.map(column => (
            <div className="pricing-tier" key={column.title}>
              <h3>{column.title}</h3>
              <strong>{column.price}</strong>
              <p>{column.note}</p>
              <ul>{column.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      );

    case 'closing':
      return (
        <div className="closing-visual">
          <img src="/images/Logo.webp" alt="Protocolo Escudo" />
          <ShieldCheck size={82} />
          <span>{visual.caption}</span>
        </div>
      );

    default:
      return null;
  }
}

type PresentationDeckProps = {
  slides: PresentationSlide[];
  deckLabel?: string;
};

export function PresentationDeck({ slides, deckLabel = 'Apresentação comercial' }: PresentationDeckProps) {
  const [activeSlide, setActiveSlide] = useState(() => {
    const requestedSlide = Number(new URLSearchParams(window.location.search).get('slide'));
    if (!Number.isFinite(requestedSlide)) return 0;
    return Math.max(0, Math.min(slides.length - 1, requestedSlide - 1));
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const progress = useMemo(() => ((activeSlide + 1) / slides.length) * 100, [activeSlide, slides.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(Math.max(0, Math.min(slides.length - 1, index)));
  };

  const nextSlide = () => goToSlide(activeSlide + 1);
  const previousSlide = () => goToSlide(activeSlide - 1);

  useEffect(() => {
    document.body.classList.add('presentation-mode');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setActiveSlide(slide => Math.min(slides.length - 1, slide + 1));
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setActiveSlide(slide => Math.max(0, slide - 1));
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.body.classList.remove('presentation-mode');
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [slides.length]);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await stageRef.current?.requestFullscreen();
        if (!document.fullscreenElement) setIsFullscreen(true);
      } catch {
        setIsFullscreen(true);
      }
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 48) return;
    if (delta < 0) nextSlide();
    if (delta > 0) previousSlide();
  };

  return (
    <section
      ref={stageRef}
      className={`presentation-stage animate-fade-in-up${isFullscreen ? ' presentation-stage-fullscreen' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="presentation-topline">
        <Link to="/" className="presentation-back">
          <ArrowLeft size={17} />
          Central
        </Link>
        <div className="presentation-counter">
          {activeSlide + 1} / {slides.length}
        </div>
        <button
          type="button"
          className="presentation-fullscreen"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          {isFullscreen ? 'Sair' : 'Fullscreen'}
        </button>
      </div>

      <div className="presentation-progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      <button
        type="button"
        className="presentation-side-control presentation-side-control-left"
        onClick={previousSlide}
        disabled={activeSlide === 0}
        title="Slide anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="presentation-viewport">
        <div className="presentation-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <article className={`sales-slide sales-slide-${slide.tone ?? 'dark'}`} key={slide.title}>
              {slide.tone === 'cover' ? (
                <div className="cover-minimal">
                  <div className="cover-version-tag">{deckLabel}</div>
                  <img className="cover-logo" src="/images/Logo.webp" alt="Protocolo Escudo" />
                  <h1>{slide.title}</h1>
                  <div className="cover-text">
                    {slide.text.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <div className="cover-shield" aria-hidden="true">
                    <ShieldCheck size={86} />
                  </div>
                </div>
              ) : (
                <div className="slide-content">
                  <div className="slide-copy">
                    <div className="slide-brand">
                      <img src="/images/Logo.webp" alt="Protocolo Escudo" />
                      <span>Protocolo Escudo</span>
                    </div>
                    <p className="slide-eyebrow">{slide.eyebrow}</p>
                    <h1>{slide.title}</h1>
                    <div className="slide-text">
                      {slide.text.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </div>

                  <div className="slide-visual">{renderVisual(slide.visual)}</div>
                </div>
              )}

              <div className="slide-footer">
                <span>{deckLabel}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="presentation-side-control presentation-side-control-right"
        onClick={nextSlide}
        disabled={activeSlide === slides.length - 1}
        title="Próximo slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="presentation-controls">
        <button type="button" onClick={previousSlide} disabled={activeSlide === 0}>
          <ChevronLeft size={18} />
          Anterior
        </button>

        <div className="presentation-dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={`${slide.title}-${index}`}
              className={index === activeSlide ? 'active' : ''}
              onClick={() => goToSlide(index)}
              title={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        <button type="button" onClick={nextSlide} disabled={activeSlide === slides.length - 1}>
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default function Apresentacao() {
  return <PresentationDeck slides={completePresentationSlides} deckLabel="Apresentação completa" />;
}
