import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import './Detalhamento.css';
import './MatrizRiscos.css';

type Severity = 'extreme' | 'high' | 'medium' | 'low';

type RiskItem = {
  id: string;
  title: string;
  category: string;
  probability: number;
  impact: number;
  velocity: string;
  owner: string;
  responseWindow: string;
  trigger: string;
  mechanism: string;
  warningSignals: string[];
  firstMoves: string[];
  narrative: string;
  controls: string[];
};

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'metodo', title: 'Método Executivo' },
  { id: 'taxonomia', title: 'Taxonomia' },
  { id: 'calor', title: 'Mapa de Calor' },
  { id: 'radar', title: 'Radar de Sinais' },
  { id: 'registro', title: 'Registro Priorizado' },
  { id: 'resposta', title: 'Planos de Contenção' },
  { id: 'governanca', title: 'Governança' },
];

const severityLabel: Record<Severity, string> = {
  extreme: 'Crítico',
  high: 'Alto',
  medium: 'Médio',
  low: 'Baixo',
};

const severityCommand: Record<Severity, string> = {
  extreme: 'Gabinete ativo, CEO/conselho informados e plano executado em horas.',
  high: 'Mitigação mandatória, dono formal e revisão semanal até estabilizar.',
  medium: 'Monitoramento ativo, controles reforçados e simulado trimestral.',
  low: 'Acompanhamento de rotina, evidência arquivada e gatilhos definidos.',
};

const getSeverity = (score: number): Severity => {
  if (score >= 12) return 'extreme';
  if (score >= 8) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
};

const riskPortfolio: RiskItem[] = [
  {
    id: 'RR-01',
    title: 'Exposição negativa de alta liderança',
    category: 'Reputacional / Governança',
    probability: 4,
    impact: 4,
    velocity: 'Explosiva',
    owner: 'CEO, Conselho e Jurídico',
    responseWindow: '0-2h',
    trigger:
      'Denúncia pública, fala discriminatória, investigação, conduta incompatível com valores ou conflito ético envolvendo C-Level.',
    mechanism:
      'O julgamento público deixa de mirar o fato isolado e passa a avaliar o caráter da organização, sua coerência moral e a tolerância real da liderança.',
    warningSignals: [
      'Rumores internos recorrentes sem fechamento formal',
      'Questionamentos de imprensa sobre conduta de executivos',
      'Histórico de denúncias arquivadas sem narrativa de resolução',
    ],
    firstMoves: [
      'Afastar preventivamente quando houver risco de interferência',
      'Abrir apuração independente com prazo e escopo',
      'Definir porta-voz institucional acima do envolvido',
    ],
    narrative:
      'A empresa reconhece a gravidade, protege pessoas afetadas e submete a liderança ao mesmo padrão que exige da organização.',
    controls: [
      'Comitê de ética independente',
      'Política pública de consequências',
      'Treino anual de liderança exposta',
    ],
  },
  {
    id: 'RR-02',
    title: 'Viralização de acusação contra a marca',
    category: 'Digital / Opinião pública',
    probability: 4,
    impact: 3,
    velocity: 'Explosiva',
    owner: 'Comunicação e Jurídico',
    responseWindow: '0-90min',
    trigger:
      'Vídeo, áudio, relato ou thread com alto potencial emocional, mesmo antes de verificação completa dos fatos.',
    mechanism:
      'A velocidade da indignação cria uma verdade social antes da apuração. O dano cresce quando a empresa parece fria, lenta ou defensiva.',
    warningSignals: [
      'Aceleração anormal de menções negativas',
      'Influenciadores ou perfis de denúncia entrando no tema',
      'Colaboradores pedindo orientação interna',
    ],
    firstMoves: [
      'Congelar mídia paga e conteúdo programado',
      'Separar fatos confirmados, prováveis e desconhecidos',
      'Publicar holding note se houver exposição relevante',
    ],
    narrative:
      'Estamos apurando com seriedade, protegendo os envolvidos e atualizando apenas fatos confirmados pelos canais oficiais.',
    controls: [
      'Social listening 24/7 em crise',
      'Biblioteca de holding statements',
      'Critério de pausa de campanhas',
    ],
  },
  {
    id: 'RO-01',
    title: 'Vazamento de dados pessoais ou sensíveis',
    category: 'Cyber / LGPD',
    probability: 3,
    impact: 4,
    velocity: 'Rápida',
    owner: 'Tecnologia, DPO e Jurídico',
    responseWindow: '0-4h',
    trigger:
      'Indício de intrusão, exfiltração, credenciais comprometidas, exposição em fórum ou comunicação de terceiro afetado.',
    mechanism:
      'O público mede confiança pelo controle demonstrado: clareza sobre escopo, proteção dos afetados, cooperação regulatória e ausência de minimização.',
    warningSignals: [
      'Aumento de tentativas de acesso indevido',
      'Alertas de credenciais vazadas',
      'Fornecedores reportando incidente correlato',
    ],
    firstMoves: [
      'Isolar vetor sem destruir evidências',
      'Acionar forense e preservar logs',
      'Preparar comunicação a titulares e regulador',
    ],
    narrative:
      'A prioridade é conter o incidente, proteger pessoas impactadas e informar com precisão assim que o escopo estiver confirmado.',
    controls: [
      'Plano LGPD testado',
      'Runbook de forense',
      'Simulado de vazamento com diretoria',
    ],
  },
  {
    id: 'RO-02',
    title: 'Acidente grave com vítima ou dano humano',
    category: 'Operacional / Segurança',
    probability: 2,
    impact: 4,
    velocity: 'Imediata',
    owner: 'Operações, RH e Jurídico',
    responseWindow: '0-60min',
    trigger:
      'Morte, ferimento grave, risco à vida, evacuação, falha operacional com impacto humano ou acionamento de autoridade.',
    mechanism:
      'A reputação será definida pela prioridade humana percebida: assistência, respeito à família, transparência investigativa e postura pública.',
    warningSignals: [
      'Quase acidentes recorrentes',
      'Manutenção adiada em ativo crítico',
      'Pressão por produtividade acima de segurança',
    ],
    firstMoves: [
      'Proteger pessoas e isolar o local',
      'Acionar assistência à família e equipe local',
      'Centralizar porta-voz e cooperação com autoridades',
    ],
    narrative:
      'Antes de qualquer defesa, a empresa prioriza pessoas, apoia os afetados e colabora integralmente com a apuração.',
    controls: [
      'Mapa de unidades críticas',
      'Checklist de apoio humanizado',
      'Treino de líderes locais',
    ],
  },
  {
    id: 'RR-03',
    title: 'Crise de cultura interna e assédio',
    category: 'Pessoas / Cultura',
    probability: 3,
    impact: 3,
    velocity: 'Rápida',
    owner: 'RH, Compliance e Comunicação',
    responseWindow: '0-6h',
    trigger:
      'Relato público de assédio, discriminação, retaliação, ambiente tóxico ou exposição coletiva de colaboradores.',
    mechanism:
      'A crise cresce quando colaboradores validam publicamente a acusação. O público passa a enxergar padrão, não exceção.',
    warningSignals: [
      'Alta rotatividade em área específica',
      'Canais internos desacreditados',
      'Denúncias repetidas contra a mesma liderança',
    ],
    firstMoves: [
      'Proteger denunciantes e evitar retaliação',
      'Reabrir trilha investigativa com independência',
      'Orientar gestores antes de qualquer fala pública',
    ],
    narrative:
      'O compromisso é com segurança psicológica, escuta responsável e consequência proporcional aos fatos apurados.',
    controls: [
      'Canal de denúncia confiável',
      'Auditoria de clima por área',
      'Matriz de consequência trabalhista',
    ],
  },
  {
    id: 'RJ-01',
    title: 'Investigação regulatória ou judicial sensível',
    category: 'Jurídico / Regulatório',
    probability: 2,
    impact: 4,
    velocity: 'Progressiva',
    owner: 'Jurídico, Compliance e Relações Institucionais',
    responseWindow: '0-24h',
    trigger:
      'Operação, ofício, ação civil pública, investigação setorial, intimação relevante ou vazamento de processo.',
    mechanism:
      'A percepção de culpa nasce do silêncio desorganizado. A empresa precisa demonstrar cooperação sem antecipar tese jurídica.',
    warningSignals: [
      'Pedidos de informação recorrentes de autoridades',
      'Auditorias com achados críticos sem correção',
      'Cobertura setorial negativa em evolução',
    ],
    firstMoves: [
      'Preservar documentos e bloquear destruição de evidências',
      'Montar sala jurídica de resposta',
      'Alinhar mensagem técnica, institucional e interna',
    ],
    narrative:
      'A empresa coopera com as autoridades, respeita o processo e manterá suas operações orientadas por conformidade e transparência responsável.',
    controls: [
      'Legal hold imediato',
      'Mapa de processos sensíveis',
      'Comitê de resposta regulatória',
    ],
  },
  {
    id: 'RC-01',
    title: 'Falha sistêmica de produto ou serviço',
    category: 'Cliente / Operação',
    probability: 3,
    impact: 2,
    velocity: 'Rápida',
    owner: 'Operações, Produto e Atendimento',
    responseWindow: '0-4h',
    trigger:
      'Queda prolongada, erro em massa, cobrança indevida, entrega crítica interrompida ou frustração coletiva de clientes.',
    mechanism:
      'Clientes aceitam falha mais facilmente do que descaso. A reputação se perde quando a empresa não reconhece impacto nem dá horizonte.',
    warningSignals: [
      'Picos de reclamação no atendimento',
      'Reincidência de incidentes sem causa raiz',
      'Aumento de chargeback ou cancelamento',
    ],
    firstMoves: [
      'Abrir status page ou canal único',
      'Dar previsão de atualização mesmo sem solução final',
      'Definir compensação proporcional quando aplicável',
    ],
    narrative:
      'Reconhecemos o impacto, estamos corrigindo a causa e manteremos os clientes informados até a normalização completa.',
    controls: [
      'Status page aprovada',
      'Critérios de compensação',
      'War room de atendimento',
    ],
  },
  {
    id: 'RR-04',
    title: 'Associação com fornecedor ou parceiro problemático',
    category: 'Cadeia / ESG',
    probability: 2,
    impact: 3,
    velocity: 'Progressiva',
    owner: 'Suprimentos, Jurídico e ESG',
    responseWindow: '0-12h',
    trigger:
      'Fornecedor envolvido em trabalho análogo à escravidão, fraude, corrupção, dano ambiental ou violação de direitos.',
    mechanism:
      'A marca absorve parte da culpa por proximidade. O público cobra diligência prévia, ruptura responsável e plano de reparação.',
    warningSignals: [
      'Auditorias de fornecedor vencidas',
      'Denúncias setoriais sobre parceiros críticos',
      'Dependência excessiva de um fornecedor de risco',
    ],
    firstMoves: [
      'Suspender novas ordens quando houver materialidade',
      'Exigir esclarecimento documentado e auditoria externa',
      'Preparar plano de substituição e comunicação a clientes',
    ],
    narrative:
      'A empresa não terceiriza seus padrões. Relações comerciais dependem de conduta compatível com seus compromissos.',
    controls: [
      'Due diligence reputacional',
      'Cláusulas de ruptura',
      'Mapa de fornecedores críticos',
    ],
  },
  {
    id: 'RI-01',
    title: 'Vazamento interno, boato ou sabotagem informacional',
    category: 'Interno / Informação',
    probability: 3,
    impact: 2,
    velocity: 'Rápida',
    owner: 'Comunicação Interna, RH e Segurança',
    responseWindow: '0-3h',
    trigger:
      'Documento interno vazado, áudio de reunião, boato sensível, rumor de demissão em massa ou informação incompleta viralizando entre colaboradores.',
    mechanism:
      'O ruído interno vira crise externa quando colaboradores deixam de acreditar nos canais oficiais e passam a alimentar versões paralelas.',
    warningSignals: [
      'Mensagens recorrentes em grupos informais',
      'Lideranças sem orientação sobre tema sensível',
      'Documentos estratégicos circulando sem controle',
    ],
    firstMoves: [
      'Orientar líderes antes do comunicado amplo',
      'Publicar versão interna objetiva e verificável',
      'Investigar vazamento sem clima persecutório',
    ],
    narrative:
      'A empresa informa primeiro seus colaboradores, com clareza sobre o que sabe, o que ainda será decidido e quais canais devem ser usados.',
    controls: [
      'Protocolo de comunicação interna sensível',
      'Controle de acesso a documentos',
      'Briefings de liderança',
    ],
  },
  {
    id: 'RF-01',
    title: 'Sinal de fragilidade financeira ou continuidade',
    category: 'Financeiro / Confiança',
    probability: 2,
    impact: 3,
    velocity: 'Progressiva',
    owner: 'CFO, Relações com Investidores e Jurídico',
    responseWindow: '0-24h',
    trigger:
      'Atraso relevante, rumor de insolvência, perda de contrato âncora, rebaixamento, corte abrupto ou crise de caixa exposta.',
    mechanism:
      'A reputação financeira se deteriora por incerteza. Fornecedores, clientes e talentos reagem antes de haver confirmação formal.',
    warningSignals: [
      'Perguntas repetidas de clientes estratégicos',
      'Fornecedores encurtando prazo de pagamento',
      'Rumores em canais de mercado ou imprensa local',
    ],
    firstMoves: [
      'Alinhar tese única com jurídico e financeiro',
      'Comunicar stakeholders críticos de forma segmentada',
      'Evitar promessas absolutas sem lastro financeiro',
    ],
    narrative:
      'A companhia está tratando o tema com disciplina, protegendo compromissos críticos e comunicará fatos materiais pelos canais adequados.',
    controls: [
      'Mapa de stakeholders financeiros',
      'Mensagens aprovadas por cenário',
      'Plano de continuidade comercial',
    ],
  },
];

const prioritizedRisks = [...riskPortfolio].sort((a, b) => b.probability * b.impact - a.probability * a.impact);
const criticalRisks = riskPortfolio.filter(risk => getSeverity(risk.probability * risk.impact) === 'extreme');
const highOrCriticalRisks = riskPortfolio.filter(risk => risk.probability * risk.impact >= 8);

const methodPillars = [
  {
    title: 'Materialidade reputacional',
    text: 'Mede se o evento altera confiança, intenção de compra, atração de talentos, licença social, relação com regulador ou valor percebido da liderança.',
  },
  {
    title: 'Velocidade de contágio',
    text: 'Diferencia risco lento, progressivo, rápido e explosivo. A prioridade sobe quando a narrativa pode se formar antes da apuração.',
  },
  {
    title: 'Capacidade de resposta',
    text: 'Avalia se existem dono, mensagem, evidência, canal, autoridade e decisão já preparados para a primeira hora.',
  },
  {
    title: 'Dano residual',
    text: 'Considera o que permanece depois da contenção: confiança abalada, investigação, perda comercial, clima interno ou precedente público.',
  },
];

const reputationLenses = [
  ['Pessoas', 'Há vítima, vulnerável, colaborador ou comunidade afetada?'],
  ['Verdade', 'Quais fatos podem ser provados sem especulação?'],
  ['Coerência', 'A conduta percebida confirma ou contradiz os valores declarados?'],
  ['Autoridade', 'Quem tem legitimidade para falar e decidir?'],
  ['Reparação', 'Que ação concreta demonstra cuidado antes da defesa?'],
];

const taxonomy = [
  ['Governança e liderança', 'Conduta de executivos, ética, conflito de interesse, conselho, cultura de consequência.'],
  ['Pessoas e cultura', 'Assédio, discriminação, segurança psicológica, relações trabalhistas, clima e retaliação.'],
  ['Operação crítica', 'Acidente, interrupção, falha de qualidade, atendimento, logística e continuidade.'],
  ['Dados e tecnologia', 'Vazamento, indisponibilidade, fraude digital, ransomware, erro sistêmico e privacidade.'],
  ['Regulatório e jurídico', 'Investigação, sanção, ação coletiva, autoridade pública, contratos e compliance.'],
  ['Cadeia e sociedade', 'Fornecedor, ESG, comunidade, impacto ambiental, parceria, influência e licença social.'],
];

const watchtowerSignals = [
  ['Redes sociais', 'Pico de menções negativas, mudança de sentimento, entrada de perfis amplificadores ou hashtags hostis.'],
  ['Imprensa', 'Pedido de posicionamento, apuração em andamento, vazamento de pauta ou busca por fontes internas.'],
  ['Atendimento', 'Fila anormal, tema recorrente, clientes estratégicos pedindo explicação ou queda brusca de satisfação.'],
  ['Pessoas', 'Boato interno, líderes sem resposta, denúncia repetida, afastamento sensível ou tensão em área crítica.'],
  ['Jurídico', 'Notificação, ofício, audiência, operação, ação coletiva, intimação ou novo entendimento regulatório.'],
  ['Tecnologia', 'Alerta de intrusão, credenciais vazadas, logs anômalos, parceiro comprometido ou indisponibilidade crítica.'],
  ['Fornecedores', 'Auditoria vencida, denúncia pública, ruptura de SLA, dependência excessiva ou prática incompatível com valores.'],
  ['Mercado', 'Rumor financeiro, perda de contrato, rebaixamento de confiança, questionamento de investidores ou clientes-chave.'],
];

const activationRules = [
  ['N1 - Atenção', 'Sinal sensível com baixa exposição pública. Dono definido, monitoramento intensivo e orientação interna.'],
  ['N2 - Crise', 'Exposição pública relevante, stakeholder afetado ou risco jurídico material. Gabinete ativado e ciclos de 60 minutos.'],
  ['N3 - Crise crítica', 'Vítima, dados sensíveis, regulador, imprensa nacional, C-Level exposto ou risco de continuidade. Comando executivo total.'],
];

const responsePlaybooks = prioritizedRisks.slice(0, 5).map(risk => ({
  ...risk,
  dont: [
    'Negar antes de confirmar fatos',
    'Culpar terceiros sem evidência',
    'Deixar áreas falando versões diferentes',
  ],
}));

const governanceRows = [
  ['Dono executivo', 'Cada risco crítico possui sponsor, substituto e autoridade para destravar decisão em janela definida.'],
  ['Mensagem pré-aprovada', 'Holding note, Q&A hostil, comunicado interno e orientação para atendimento ficam prontos por cenário.'],
  ['Evidência de controle', 'Logs, atas, aprovações, simulações, revisões e correções ficam registradas para defesa institucional.'],
  ['Ritmo de revisão', 'Riscos críticos mensalmente; altos bimestralmente; médios trimestralmente; baixos por gatilho.'],
  ['Simulado obrigatório', 'Todo risco crítico deve entrar em simulado The Worst Day ou mesa executiva antes de ser considerado maduro.'],
];

export default function MatrizRiscos() {
  return (
    <DocumentShell sections={sections}>
      <section className="page cover risk-cover" id="capa">
        <div>
          <div className="cover-top">
            <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
            <div className="cover-meta">
              Documento estratégico<br />
              Matriz reputacional priorizada<br />
              Restrito e confidencial
            </div>
          </div>

          <div className="cover-title">
            <div className="pill">Proteção de reputação, confiança e valor</div>
            <h1>Matriz de Riscos Reputacionais</h1>
            <p className="lead">
              Um instrumento executivo para antecipar crises, separar ruído de ameaça real, definir donos,
              ativar resposta na janela correta e proteger confiança pública antes que a narrativa seja
              capturada por terceiros.
            </p>
          </div>

          <div className="risk-cover-grid">
            <div className="quote-box">
              <h3>Leitura profissional</h3>
              <p className="lead" style={{ fontSize: '16px', marginBottom: 0 }}>
                Risco reputacional não é apenas probabilidade vezes impacto. É a combinação entre fato,
                percepção, velocidade, legitimidade da resposta e capacidade de provar controle enquanto
                a opinião pública ainda está formando juízo.
              </p>
            </div>

            <div className="risk-command-panel">
              <div>
                <span className="panel-label">Mapa atual</span>
                <strong>{riskPortfolio.length}</strong>
                <p>cenários de ameaça com gatilhos, donos, janela de resposta e controles.</p>
              </div>
              <div>
                <span className="panel-label">Zona crítica</span>
                <strong>{criticalRisks.length}</strong>
                <p>riscos exigem comando executivo imediato e simulado prioritário.</p>
              </div>
              <div>
                <span className="panel-label">Prioridade alta</span>
                <strong>{highOrCriticalRisks.length}</strong>
                <p>cenários pedem mitigação mandatória e revisão frequente.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="risk-thesis">
          <strong>Tese central:</strong> a organização não vence uma crise apenas tendo razão. Ela vence
          quando consegue agir cedo, provar cuidado, demonstrar comando e sustentar uma narrativa coerente
          com fatos, valores e reparação.
        </div>
      </section>

      <section className="page" id="metodo">
        <div className="section-head">
          <div className="section-number">01</div>
          <div>
            <div className="eyebrow">Método executivo</div>
            <h2>Da planilha de risco para a sala de decisão</h2>
            <p className="muted">
              A matriz passa a considerar reputação como ativo de confiança, não como efeito colateral
              de incidentes operacionais.
            </p>
          </div>
        </div>

        <div className="risk-method-grid">
          {methodPillars.map((pillar, index) => (
            <div className="risk-method-card" key={pillar.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{pillar.title}</h3>
              <p className="muted">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: '12px' }}>
          <div className="card soft">
            <h3>Score base</h3>
            <p className="muted">
              Probabilidade e impacto continuam definindo a zona de calor. A diferença é que todo risco
              agora recebe camada de velocidade, dono, janela de resposta, sinais precursores, narrativa
              e evidência de controle.
            </p>
            <div className="score-formula">Score = Probabilidade × Impacto</div>
          </div>

          <div className="card dark">
            <h3>Regra de reputação</h3>
            <p className="muted">
              Se o público pode interpretar o evento como negligência, incoerência, frieza ou ocultação,
              o risco sobe uma prioridade operacional até prova em contrário.
            </p>
          </div>
        </div>

        <div className="reputation-lens">
          {reputationLenses.map(([title, question]) => (
            <div className="lens-item" key={title}>
              <strong>{title}</strong>
              <span>{question}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page" id="taxonomia">
        <div className="section-head">
          <div className="section-number">02</div>
          <div>
            <div className="eyebrow">Taxonomia de ameaça</div>
            <h2>Famílias de risco e mecanismo de dano</h2>
            <p className="muted">
              O objetivo não é listar problemas. É entender como cada problema vira perda de confiança,
              pressão pública, exposição jurídica ou ruptura de relacionamento.
            </p>
          </div>
        </div>

        <div className="taxonomy-grid">
          {taxonomy.map(([title, description]) => (
            <div className="taxonomy-card" key={title}>
              <h3>{title}</h3>
              <p className="muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="damage-flow">
          <div>
            <span>1</span>
            <strong>Evento</strong>
            <p>Fato, denúncia, falha, vazamento, acidente ou comportamento.</p>
          </div>
          <div>
            <span>2</span>
            <strong>Percepção</strong>
            <p>Stakeholders perguntam se houve cuidado, verdade e responsabilidade.</p>
          </div>
          <div>
            <span>3</span>
            <strong>Narrativa</strong>
            <p>Imprensa, redes, colaboradores e afetados disputam a interpretação.</p>
          </div>
          <div>
            <span>4</span>
            <strong>Consequência</strong>
            <p>Perda de confiança, sanção, queda comercial, dano interno ou precedente.</p>
          </div>
        </div>

        <div className="note">
          <strong>Diretriz de análise:</strong> todo risco prioritário deve responder quatro perguntas:
          quem sofre, quem julga, quem decide e qual prova concreta mostra que a empresa está no controle.
        </div>
      </section>

      <section className="page" id="calor">
        <div className="section-head">
          <div className="section-number">03</div>
          <div>
            <div className="eyebrow">Diagnóstico visual</div>
            <h2>Mapa de calor com riscos posicionados</h2>
            <p className="muted">
              O heatmap indica prioridade executiva. Os códigos dentro das células mostram onde os
              cenários mapeados estão concentrados.
            </p>
          </div>
        </div>

        <div className="heatmap-container">
          <div className="heatmap-y-axis">Probabilidade</div>
          <div className="heatmap-shell">
            <div className="heatmap-impact-labels">
              <span>Baixo</span>
              <span>Moderado</span>
              <span>Grave</span>
              <span>Crítico</span>
            </div>
            <div className="heatmap-grid">
              {[4, 3, 2, 1].map(probability =>
                [1, 2, 3, 4].map(impact => {
                  const score = probability * impact;
                  const severity = getSeverity(score);
                  const codes = prioritizedRisks
                    .filter(risk => risk.probability === probability && risk.impact === impact)
                    .map(risk => risk.id);

                  return (
                    <div className={`heatmap-cell ${severity}`} key={`${probability}-${impact}`}>
                      <strong>{score}</strong>
                      <span>P{probability} × I{impact}</span>
                      {codes.length > 0 && <em>{codes.join(' · ')}</em>}
                    </div>
                  );
                }),
              )}
            </div>
            <div className="heatmap-probability-labels">
              <span>Quase certa</span>
              <span>Provável</span>
              <span>Possível</span>
              <span>Rara</span>
            </div>
          </div>
          <div className="heatmap-x-axis">Impacto reputacional</div>
        </div>

        <div className="heatmap-legend">
          {(['extreme', 'high', 'medium', 'low'] as Severity[]).map(severity => (
            <div className="legend-item" key={severity}>
              <span className={`color-box ${severity}-color`} />
              <div>
                <strong>{severityLabel[severity]}</strong>
                <p className="muted">{severityCommand[severity]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page" id="radar">
        <div className="section-head">
          <div className="section-number">04</div>
          <div>
            <div className="eyebrow">Radar de sinais precursores</div>
            <h2>A crise costuma avisar antes de romper</h2>
            <p className="muted">
              O papel da matriz é criar sensibilidade operacional. Sinal fraco ignorado vira crise forte
              quando ninguém assume a primeira decisão.
            </p>
          </div>
        </div>

        <div className="watchtower-grid">
          {watchtowerSignals.map(([channel, signal]) => (
            <div className="watchtower-card" key={channel}>
              <strong>{channel}</strong>
              <p className="muted">{signal}</p>
            </div>
          ))}
        </div>

        <div className="activation-strip">
          {activationRules.map(([level, rule]) => (
            <div className="activation-card" key={level}>
              <h3>{level}</h3>
              <p className="muted">{rule}</p>
            </div>
          ))}
        </div>

        <div className="card dark" style={{ marginTop: '14px' }}>
          <h3>Gatilhos automáticos de N3</h3>
          <p style={{ color: '#fff', marginBottom: 0 }}>
            Vítima, dados sensíveis, regulador formalmente acionado, imprensa nacional, C-Level exposto,
            ameaça à continuidade, forte comoção pública ou risco de acusação de omissão. Nesses casos,
            a empresa não espera confirmação completa para organizar comando.
          </p>
        </div>
      </section>

      <section className="page" id="registro">
        <div className="section-head">
          <div className="section-number">05</div>
          <div>
            <div className="eyebrow">Registro priorizado</div>
            <h2>Riscos com dono, janela, narrativa e controles</h2>
            <p className="muted">
              Cada item abaixo já nasce conectado à resposta. A matriz deixa de ser diagnóstico e vira
              uma agenda de comando.
            </p>
          </div>
        </div>

        <div className="risk-register">
          {prioritizedRisks.map(risk => {
            const score = risk.probability * risk.impact;
            const severity = getSeverity(score);

            return (
              <article className={`risk-register-card ${severity}`} key={risk.id}>
                <div className="risk-register-head">
                  <div>
                    <span>{risk.id}</span>
                    <h3>{risk.title}</h3>
                    <p className="muted">{risk.trigger}</p>
                  </div>
                  <div className="score-lockup">
                    <strong>{score}</strong>
                    <span className={`badge ${severity}`}>{severityLabel[severity]}</span>
                  </div>
                </div>

                <div className="risk-meta-grid">
                  <div><strong>Categoria</strong><span>{risk.category}</span></div>
                  <div><strong>Velocidade</strong><span>{risk.velocity}</span></div>
                  <div><strong>Dono</strong><span>{risk.owner}</span></div>
                  <div><strong>Janela</strong><span>{risk.responseWindow}</span></div>
                </div>

                <div className="risk-intel-grid">
                  <div>
                    <h4>Mecanismo de dano</h4>
                    <p>{risk.mechanism}</p>
                  </div>
                  <div>
                    <h4>Sinais precursores</h4>
                    <ul>
                      {risk.warningSignals.map(signal => <li key={signal}>{signal}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4>Primeiros movimentos</h4>
                    <ul>
                      {risk.firstMoves.map(move => <li key={move}>{move}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="narrative-box">
                  <strong>Tese narrativa:</strong> {risk.narrative}
                </div>

                <div className="control-tags">
                  {risk.controls.map(control => <span key={control}>{control}</span>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page" id="resposta">
        <div className="section-head">
          <div className="section-number">06</div>
          <div>
            <div className="eyebrow">Planos de contenção</div>
            <h2>Resposta inicial para os riscos que mais destroem confiança</h2>
            <p className="muted">
              O plano não tenta resolver toda a crise na primeira hora. Ele impede perda de comando,
              ruído interno, fala descoordenada e dano reputacional evitável.
            </p>
          </div>
        </div>

        <div className="playbook-grid">
          {responsePlaybooks.map(risk => {
            const score = risk.probability * risk.impact;
            const severity = getSeverity(score);

            return (
              <div className="playbook-card" key={risk.id}>
                <div className="playbook-head">
                  <div>
                    <span>{risk.id}</span>
                    <h3>{risk.title}</h3>
                  </div>
                  <span className={`badge ${severity}`}>{score}</span>
                </div>

                <div className="playbook-columns">
                  <div>
                    <h4>Primeira hora</h4>
                    <ul>
                      {risk.firstMoves.map(move => <li key={move}>{move}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4>Não fazer</h4>
                    <ul>
                      {risk.dont.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="statement-box">
                  <strong>Holding statement:</strong>
                  <p>{risk.narrative}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="response-rule">
          <strong>Regra de ouro:</strong> quanto maior a comoção, menor deve ser a vaidade da resposta.
          A empresa precisa demonstrar cuidado, precisão e responsabilidade antes de defender sua imagem.
        </div>
      </section>

      <section className="page" id="governanca">
        <div className="section-head">
          <div className="section-number">07</div>
          <div>
            <div className="eyebrow">Governança e prontidão</div>
            <h2>Como manter a matriz viva e defensável</h2>
            <p className="muted">
              Uma matriz profissional só tem valor se vira rotina: donos, evidências, revisão, simulado
              e decisão documentada.
            </p>
          </div>
        </div>

        <div className="governance-table">
          {governanceRows.map(([title, description]) => (
            <div className="governance-row" key={title}>
              <strong>{title}</strong>
              <p className="muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="readiness-board">
          <div className="readiness-card">
            <span>Mensal</span>
            <strong>Comitê de riscos críticos</strong>
            <p>Revisar sinais, dono, controles, mudança de contexto e pendências de mitigação.</p>
          </div>
          <div className="readiness-card">
            <span>Trimestral</span>
            <strong>Simulado de decisão</strong>
            <p>Testar a primeira hora, porta-voz, canal interno, jurídico e registro de decisões.</p>
          </div>
          <div className="readiness-card">
            <span>Pós-incidente</span>
            <strong>Debriefing obrigatório</strong>
            <p>Atualizar matriz, playbooks, mensagens, responsáveis e controles após qualquer evento real.</p>
          </div>
        </div>

        <div className="check-grid" style={{ marginTop: '14px' }}>
          <div className="check-item">Todo risco crítico possui sponsor executivo e substituto formal.</div>
          <div className="check-item">Toda mensagem sensível tem aprovador de Comunicação e Jurídico.</div>
          <div className="check-item">Todo risco com score 12+ possui simulado agendado.</div>
          <div className="check-item">Todo gatilho automático N3 está incorporado ao Gabinete de Crise.</div>
          <div className="check-item">Todo risco com stakeholder humano possui protocolo de cuidado e reparação.</div>
          <div className="check-item">Toda decisão crítica deixa rastro: hora, dono, alternativa e justificativa.</div>
        </div>

        <div className="card dark" style={{ marginTop: '16px' }}>
          <h3>Resultado esperado</h3>
          <p style={{ color: '#fff', marginBottom: 0 }}>
            A liderança passa a enxergar onde a reputação pode quebrar, quem decide, qual resposta já
            está pronta, que sinal aciona o gabinete e que prova demonstra maturidade antes, durante e
            depois da crise.
          </p>
        </div>
      </section>
    </DocumentShell>
  );
}
