import { PresentationDeck, type PresentationSlide } from './Apresentacao';

const summarySlides: PresentationSlide[] = [
  {
    eyebrow: 'Protocolo Escudo',
    title: 'Protocolo Escudo',
    tone: 'cover',
    text: [
      'Prontidão corporativa para empresas que não podem improvisar diante de uma crise.',
    ],
    visual: { type: 'cover', caption: 'Versão resumida' },
  },
  {
    eyebrow: 'Pergunta central',
    title: 'Quando a crise chegar, quem assume o comando?',
    tone: 'dark',
    text: [
      'Quem decide? Quem aprova? Quem fala? Quem aciona o jurídico? Quem alinha as áreas? Quem protege a reputação da empresa?',
    ],
    visual: {
      type: 'questionMap',
      center: 'Comando da Crise',
      items: ['Liderança', 'Jurídico', 'Comunicação', 'Operação', 'Comercial'],
    },
  },
  {
    eyebrow: 'O problema',
    title: 'Sem protocolo, a crise decide pela empresa.',
    tone: 'danger',
    text: [
      'A liderança demora. As áreas se contradizem. A comunicação falha. O jurídico trava. A equipe espalha ruído. O mercado cria sua própria narrativa.',
    ],
    visual: {
      type: 'brokenFlow',
      steps: ['Incidente', 'Demora', 'Ruído', 'Pressão', 'Perda de controle'],
    },
  },
  {
    eyebrow: 'Custo do improviso',
    title: 'A empresa pode estar certa e ainda assim perder confiança.',
    tone: 'dark',
    text: [
      'Em crise, percepção vale velocidade. Demora parece culpa. Silêncio parece omissão. Desalinhamento parece despreparo.',
    ],
    visual: {
      type: 'crossingChart',
      items: ['Confiança', 'Ruído externo'],
    },
  },
  {
    eyebrow: 'Ativos em risco',
    title: 'A crise não ameaça apenas a imagem.',
    tone: 'dark',
    text: ['Ela ameaça ativos que sustentam receita, autoridade e continuidade institucional.'],
    visual: {
      type: 'shieldAssets',
      items: [
        'Receita',
        'Contratos',
        'Clientes',
        'Sócios',
        'Conselho',
        'Equipe',
        'Licenças',
        'Reputação',
        'Valor institucional',
      ],
    },
  },
  {
    eyebrow: 'A solução',
    title: 'O Protocolo Escudo instala comando, clareza e resposta.',
    tone: 'dark',
    text: [
      'Criamos uma estrutura para a empresa saber quem decide, quem aprova, quem comunica, quem executa, o que fazer primeiro e como responder sem ampliar o dano.',
    ],
    visual: {
      type: 'beforeAfter',
      columns: [
        { title: 'Antes', items: ['Improviso', 'Demora', 'Ruído', 'Conflito'] },
        { title: 'Depois', items: ['Comando', 'Fluxo', 'Mensagem', 'Controle'] },
      ],
    },
  },
  {
    eyebrow: 'Capacidade instalada',
    title: 'Capacidade real de resposta à crise.',
    tone: 'light',
    text: ['A empresa passa a ter estrutura, responsáveis, fluxos, mensagens, simulações e suporte para responder com mais segurança.'],
    visual: {
      type: 'checklist',
      items: [
        'Gabinete de Crise estruturado',
        'Mapa de responsáveis',
        'Fluxos de acionamento',
        'Mensagens base',
        'Q&A crítico',
        'Matriz de riscos',
        'Central de prontidão',
        'Liderança preparada',
        'Simulações de pressão',
        'Blindagem assistida',
      ],
    },
  },
  {
    eyebrow: 'Diferencial',
    title: 'Não é palestra. Não é curso. Não é relatório para arquivar.',
    tone: 'light',
    text: [
      'É uma implantação prática para transformar risco invisível em resposta coordenada.',
      'A empresa sai com estrutura, responsáveis, fluxos, mensagens, simulações e suporte estratégico.',
    ],
    visual: {
      type: 'indicatorDashboard',
      columns: [
        { title: 'Estrutura', items: ['Comando e fluxos definidos'] },
        { title: 'Validação', items: ['Simulação e correção'] },
        { title: 'Blindagem', items: ['Suporte e continuidade'] },
      ],
    },
  },
  {
    eyebrow: 'The Worst Day',
    title: 'O protocolo só tem valor se funcionar sob pressão.',
    tone: 'danger',
    text: [
      'Simulamos um cenário crítico controlado para testar velocidade de resposta, alinhamento entre áreas, qualidade da decisão, postura da liderança e controle da comunicação.',
    ],
    visual: {
      type: 'progressFlow',
      steps: ['Alerta', 'Pressão', 'Decisão', 'Resposta', 'Correção'],
    },
  },
  {
    eyebrow: 'Blindagem assistida',
    title: 'A implantação cria a base. A blindagem mantém o sistema vivo.',
    tone: 'light',
    text: [
      'Durante a validação, a empresa corrige falhas, atualiza riscos, testa fluxos e fortalece a resposta interna.',
      'Crise muda. Risco muda. A empresa precisa continuar pronta.',
    ],
    visual: {
      type: 'cycle',
      steps: ['Testar', 'Corrigir', 'Atualizar', 'Reforçar'],
    },
  },
  {
    eyebrow: 'Valor do investimento',
    title: 'O investimento é pequeno perto do custo de uma crise mal conduzida.',
    tone: 'light',
    text: [
      'Uma resposta errada pode custar contratos, confiança, reputação, liderança e anos de construção institucional.',
      'O Protocolo Escudo protege o que a empresa não pode reconstruir rapidamente.',
    ],
    visual: {
      type: 'balance',
      columns: [
        { title: 'Investimento em prontidão', items: ['Comando', 'Governança', 'Resposta validada'] },
        { title: 'Perdas por crise', items: ['Contratos', 'Confiança', 'Reputação', 'Continuidade'] },
      ],
    },
  },
  {
    eyebrow: 'Faixas de investimento',
    title: 'Projetos entre R$ 50 mil e R$ 300 mil.',
    tone: 'dark',
    text: ['O valor acompanha complexidade, exposição, número de áreas envolvidas e nível de blindagem necessário.'],
    visual: {
      type: 'pricingTiers',
      columns: [
        {
          title: 'Essencial',
          price: 'R$ 50 mil a R$ 90 mil',
          note: 'Estrutura essencial para empresas com liderança centralizada.',
          items: ['Diagnóstico', 'Gabinete', 'Fluxos', 'Capacitação base'],
        },
        {
          title: 'Executivo',
          price: 'R$ 100 mil a R$ 180 mil',
          note: 'Implantação executiva para empresas com mais áreas, riscos e exposição.',
          items: ['Riscos ampliados', 'Central mais completa', 'Mais lideranças', 'Testes adicionais'],
        },
        {
          title: 'Institucional',
          price: 'R$ 200 mil a R$ 300 mil',
          note: 'Blindagem institucional para empresas complexas, conselhos, múltiplas unidades ou alta exposição.',
          items: ['Implantação ampliada', 'Simulações avançadas', 'Suporte intenso', 'Blindagem robusta'],
        },
      ],
    },
  },
  {
    eyebrow: 'A decisão',
    title: 'A pergunta não é se a empresa terá uma crise.',
    tone: 'dark',
    text: [
      'A pergunta é: quando ela acontecer, a empresa vai responder com método ou com improviso?',
    ],
    visual: {
      type: 'beforeAfter',
      columns: [
        { title: 'Improviso', items: ['Demora', 'Ruído', 'Conflito', 'Perda de controle'] },
        { title: 'Método', items: ['Comando', 'Critério', 'Mensagem', 'Resposta coordenada'] },
      ],
    },
  },
  {
    eyebrow: 'Próximo passo',
    title: 'O próximo passo é dimensionar a blindagem necessária.',
    tone: 'light',
    text: ['O dimensionamento começa com alinhamento executivo, confidencialidade e leitura inicial dos riscos reais.'],
    visual: {
      type: 'steps',
      steps: [
        'Definir os sponsors internos',
        'Assinar confidencialidade',
        'Realizar diagnóstico inicial',
        'Dimensionar o escopo',
        'Iniciar a implantação',
      ],
    },
  },
  {
    eyebrow: 'Fechamento',
    title: 'Sua empresa levou anos para construir reputação.',
    tone: 'closing',
    text: [
      'Não permita que uma crise mal conduzida coloque tudo em risco.',
      'Protocolo Escudo. Comando, resposta e blindagem institucional para momentos críticos.',
    ],
    visual: { type: 'closing', caption: 'Protocolo Escudo - Versão Resumida' },
  },
];

export default function ApresentacaoResumida() {
  return <PresentationDeck slides={summarySlides} deckLabel="Versão resumida" />;
}
