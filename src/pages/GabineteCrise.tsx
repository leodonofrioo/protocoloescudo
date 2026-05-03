import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import './Detalhamento.css';
import './GabineteCrise.css';

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'premissas', title: 'Premissas' },
  { id: 'acionamento', title: 'Acionamento' },
  { id: 'papeis', title: 'Papéis e Autoridade' },
  { id: 'primeira-hora', title: 'Primeira Hora' },
  { id: 'sala-crise', title: 'Sala de Crise' },
  { id: 'comunicacao', title: 'Comunicação' },
  { id: 'checklists', title: 'Checklists' },
  { id: 'qa', title: 'Q&A Crítico' },
  { id: 'registros', title: 'Registros' },
  { id: 'encerramento', title: 'Encerramento' },
];

const activationLevels = [
  {
    level: 'N0',
    name: 'Monitoramento',
    trigger: 'Ruído isolado, reclamação pontual ou sinal fraco sem exposição relevante.',
    command: 'Área responsável acompanha e registra. Gabinete não é acionado.',
  },
  {
    level: 'N1',
    name: 'Alerta',
    trigger: 'Risco com potencial de escalada, menção pública sensível ou impacto operacional controlado.',
    command: 'Líder de Crise e Comunicação são avisados. Triagem em até 15 minutos.',
  },
  {
    level: 'N2',
    name: 'Crise',
    trigger: 'Exposição pública, dano a stakeholder, risco jurídico relevante ou paralisação parcial.',
    command: 'Gabinete ativado. Sala de crise aberta. Holding note preparada.',
  },
  {
    level: 'N3',
    name: 'Crise Crítica',
    trigger: 'Vítimas, regulador, imprensa nacional, dados sensíveis, continuidade do negócio ou C-Level exposto.',
    command: 'Comando executivo integral. CEO/conselho informados. Ritmo de decisão acelerado.',
  },
];

const roles = [
  ['Líder do Gabinete', 'Define prioridade, ritmo de decisão e linha final de comando.', 'Aprovar rumo estratégico e destravar conflitos.'],
  ['Secretaria de Crise', 'Mantém registro, agenda, pendências e relatório de status.', 'Garantir rastreabilidade de decisões e evidências.'],
  ['Operações', 'Apura fatos, contém dano e informa impacto real no negócio.', 'Separar fato confirmado de percepção ou hipótese.'],
  ['Jurídico / Compliance', 'Avalia risco legal, regulatório, trabalhista e contratual.', 'Reduzir exposição sem paralisar a resposta pública.'],
  ['Comunicação', 'Constrói narrativa, mensagens, Q&A, canais e monitoramento.', 'Manter coerência entre interno, imprensa, clientes e redes.'],
  ['Pessoas / RH', 'Cuida de colaboradores, lideranças locais, vítimas e clima interno.', 'Evitar rádio peão e orientar gestores sensíveis.'],
  ['Tecnologia / Segurança', 'Investiga incidentes digitais, preserva logs e executa contenção técnica.', 'Proteger sistemas, dados e cadeia de evidência.'],
  ['Comercial / Clientes', 'Mapeia contratos afetados, contas-chave e comunicação B2B.', 'Evitar perda de confiança por ausência de resposta.'],
  ['Porta-voz', 'Representa publicamente a empresa quando autorizado.', 'Falar apenas com briefing validado e limite claro.'],
];

const firstHour = [
  {
    time: '0-15 min',
    title: 'Receber e classificar',
    text: 'Confirmar origem do alerta, classificar nível, registrar horário e nomear responsável pela triagem.',
  },
  {
    time: '15-30 min',
    title: 'Ativar comando',
    text: 'Acionar líder do gabinete, abrir sala de crise e convocar apenas funções essenciais ao cenário.',
  },
  {
    time: '30-45 min',
    title: 'Fixar fatos mínimos',
    text: 'Separar confirmado, provável e desconhecido. Definir o que precisa ser apurado antes da primeira fala.',
  },
  {
    time: '45-60 min',
    title: 'Preparar posição',
    text: 'Criar holding note, perguntas críticas, orientação interna e limite de fala do porta-voz.',
  },
  {
    time: '60+ min',
    title: 'Operar ciclos',
    text: 'Rodar reuniões curtas, atualizar stakeholders, revisar risco e manter log de decisões em tempo real.',
  },
];

const checklist = [
  'Registrar alerta inicial com hora, origem, evidência e responsável.',
  'Classificar nível N0, N1, N2 ou N3 e justificar a decisão.',
  'Confirmar se há risco à vida, segurança, dados, regulador ou imprensa.',
  'Preservar evidências antes de qualquer exclusão, correção ou contato externo.',
  'Definir dono da contenção operacional e prazo de retorno.',
  'Abrir sala de crise e nomear secretaria de registro.',
  'Listar stakeholders afetados: colaboradores, clientes, parceiros, conselho, imprensa e reguladores.',
  'Congelar publicações programadas se houver risco de incoerência ou insensibilidade.',
  'Criar holding note mesmo que ainda não seja publicada.',
  'Preparar orientação interna para lideranças e áreas de atendimento.',
  'Definir porta-voz e limites do que ele pode afirmar.',
  'Agendar próximo ciclo de decisão com horário e pauta objetiva.',
];

const qaRows = [
  ['O que aconteceu?', 'Responder apenas fatos confirmados, sem especular causa ou culpado.'],
  ['Quem foi afetado?', 'Indicar grupos impactados quando houver segurança; se não houver, dizer que a apuração está em curso.'],
  ['A empresa assume responsabilidade?', 'Demonstrar compromisso com apuração e reparo, sem antecipar conclusões jurídicas.'],
  ['Por que demoraram a responder?', 'Explicar que a prioridade foi conter o impacto, proteger pessoas e confirmar informações antes de falar.'],
  ['Qual será a próxima atualização?', 'Dar janela objetiva de retorno e canal oficial para novas informações.'],
  ['Quem fala pela empresa?', 'Centralizar no porta-voz autorizado e reforçar que demais equipes receberam orientação interna.'],
];

export default function GabineteCrise() {
  return (
    <DocumentShell sections={sections}>
      <section className="page cover" id="capa">
        <div>
          <div className="cover-top">
            <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
            <div className="cover-meta">
              Documento Operacional<br />
              Manual do Gabinete de Crise<br />
              Confidencial
            </div>
          </div>

          <div className="cover-title">
            <div className="pill">Comando, decisão e primeira resposta</div>
            <h1>Manual do Gabinete de Crise</h1>
            <p className="lead">Um guia prático para acionar, organizar e conduzir a resposta institucional quando a empresa entra sob pressão real.</p>
          </div>

          <div className="cover-grid">
            <div className="quote-box">
              <h3>Finalidade do Manual</h3>
              <p className="lead" style={{ fontSize: '16px', marginBottom: 0 }}>Transformar um incidente sensível em uma operação coordenada: com comando definido, fatos verificados, comunicação coerente, registro de decisões e proteção da confiança pública.</p>
            </div>

            <div className="card dark">
              <div className="icon-title">
                <span className="icon" style={{ background: '#1b1b1b', borderColor: '#333' }}>
                  <svg viewBox="0 0 24 24" style={{ stroke: '#fff' }}><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"></path><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                </span>
                <h3 style={{ margin: 0 }}>Regra Central</h3>
              </div>
              <p className="muted">Crise não é reunião aberta. É uma estrutura temporária de comando, com papéis claros, informação controlada e decisão documentada.</p>
            </div>
          </div>

          <div className="manual-stat-grid">
            <div className="manual-stat"><strong>15</strong><span className="muted">minutos para triagem inicial e classificação do nível.</span></div>
            <div className="manual-stat"><strong>30</strong><span className="muted">minutos para ativar sala de crise quando N2 ou N3.</span></div>
            <div className="manual-stat"><strong>60</strong><span className="muted">minutos para primeira posição interna ou holding note.</span></div>
            <div className="manual-stat"><strong>24h</strong><span className="muted">para estabilizar narrativa, danos e próximos passos.</span></div>
          </div>
        </div>
      </section>

      <section className="page" id="premissas">
        <div className="section-head">
          <div className="section-number">01</div>
          <div>
            <div className="eyebrow">Premissas de Operação</div>
            <h2>Como o Gabinete deve pensar sob pressão</h2>
            <p className="muted">A função do gabinete não é discutir tudo. É reduzir incerteza, proteger pessoas, preservar valor e decidir com rastreabilidade.</p>
          </div>
        </div>

        <div className="grid-2">
          <div className="card dark">
            <h3>Princípios invioláveis</h3>
            <ul style={{ paddingLeft: '15px', color: '#fff' }}>
              <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Comando único:</strong> uma pessoa lidera o ritmo e arbitra conflitos.</li>
              <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Fato antes de opinião:</strong> toda decisão separa confirmado, provável e desconhecido.</li>
              <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Velocidade com registro:</strong> agir rápido sem perder memória do que foi decidido.</li>
              <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Empatia pública:</strong> a empresa fala com responsabilidade humana, não apenas defesa técnica.</li>
            </ul>
          </div>

          <div className="card soft">
            <h3>Quando este manual entra em uso</h3>
            <p className="muted">O manual deve ser acionado quando um evento ameaça reputação, continuidade operacional, segurança, dados, caixa, relação com reguladores ou confiança de stakeholders relevantes.</p>
            <div className="manual-page-note">
              <strong>Atalho de decisão:</strong> se a empresa já precisa alinhar Jurídico, Comunicação, Operações e Liderança antes de responder, o tema já deve passar pelo Gabinete.
            </div>
          </div>
        </div>

        <div className="manual-do-dont">
          <div className="comparison">
            <h3>O Gabinete é</h3>
            <ul>
              <li>uma sala de comando temporária;</li>
              <li>um mecanismo de decisão rápida;</li>
              <li>um sistema de coordenação entre áreas;</li>
              <li>um registro oficial do que foi feito.</li>
            </ul>
          </div>
          <div className="comparison">
            <h3>O Gabinete não é</h3>
            <ul>
              <li>uma reunião informativa sem dono;</li>
              <li>um grupo amplo de opiniões;</li>
              <li>um substituto da área responsável;</li>
              <li>um canal paralelo para falar com imprensa.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page" id="acionamento">
        <div className="section-head">
          <div className="section-number">02</div>
          <div>
            <div className="eyebrow">Critérios de Acionamento</div>
            <h2>Níveis de severidade e resposta esperada</h2>
            <p className="muted">Nem todo incidente exige gabinete completo. O critério correto evita tanto a paralisia quanto o excesso de mobilização.</p>
          </div>
        </div>

        <div className="manual-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nível</th>
                <th>Classificação</th>
                <th>Gatilho típico</th>
                <th>Resposta de comando</th>
              </tr>
            </thead>
            <tbody>
              {activationLevels.map(item => (
                <tr key={item.level}>
                  <td><strong>{item.level}</strong></td>
                  <td>{item.name}</td>
                  <td>{item.trigger}</td>
                  <td>{item.command}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="risk-strip">
          <div className="risk-card"><strong>Gatilhos automáticos de N3</strong><span className="muted">Vítima fatal, vazamento de dados sensíveis, regulador formalmente acionado, manchete nacional, ameaça à continuidade do negócio, exposição direta de alta liderança ou risco de colapso de confiança.</span></div>
          <div className="risk-card"><strong>Regra de escalonamento</strong><span className="muted">Quando houver dúvida entre dois níveis, classifique temporariamente no nível superior por 30 minutos. Rebaixar é simples; recuperar tempo perdido costuma ser impossível.</span></div>
        </div>

        <div className="manual-template">
          <div className="template-label">Registro mínimo de acionamento</div>
          <p><strong>Hora:</strong> __:__ | <strong>Origem do alerta:</strong> ______ | <strong>Nível inicial:</strong> N__</p>
          <p><strong>Fato conhecido:</strong> ______ | <strong>Risco percebido:</strong> ______ | <strong>Responsável pela triagem:</strong> ______</p>
          <p><strong>Próxima decisão até:</strong> __:__ | <strong>Participantes convocados:</strong> ______</p>
        </div>
      </section>

      <section className="page" id="papeis">
        <div className="section-head">
          <div className="section-number">03</div>
          <div>
            <div className="eyebrow">Composição do Gabinete</div>
            <h2>Papéis, autoridade e limites de decisão</h2>
            <p className="muted">O gabinete funciona quando cada cadeira existe por uma razão operacional. Pessoas sem papel claro aumentam ruído.</p>
          </div>
        </div>

        <div className="manual-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Papel</th>
                <th>Responsabilidade</th>
                <th>Decisão esperada</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(([role, responsibility, decision]) => (
                <tr key={role}>
                  <td><strong>{role}</strong></td>
                  <td>{responsibility}</td>
                  <td>{decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="manual-command-grid">
          <div className="quote-box">
            <h3>Mapa de autoridade</h3>
            <p className="lead" style={{ marginBottom: 0 }}>O Líder do Gabinete decide o ritmo. Jurídico e Comunicação validam risco de fala. Operações confirmam fatos. A Secretaria registra. O porta-voz só fala quando a linha de comunicação estiver aprovada.</p>
          </div>
          <div className="card soft">
            <h3>Quórum mínimo para N2/N3</h3>
            <ul>
              <li>Líder do Gabinete;</li>
              <li>Operações ou área dona do incidente;</li>
              <li>Jurídico / Compliance;</li>
              <li>Comunicação;</li>
              <li>Secretaria de Crise.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page" id="primeira-hora">
        <div className="section-head">
          <div className="section-number">04</div>
          <div>
            <div className="eyebrow">A Primeira Hora</div>
            <h2>Fluxo operacional de resposta imediata</h2>
            <p className="muted">A primeira hora não precisa resolver a crise inteira. Precisa impedir que a empresa perca comando, tempo e narrativa.</p>
          </div>
        </div>

        <div className="manual-flow">
          {firstHour.map(step => (
            <div className="manual-flow-step" key={step.time}>
              <div className="step-kicker">{step.time}</div>
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="timeline" style={{ marginTop: '14px' }}>
          <div className="timeline-item">
            <div className="period">Entrada</div>
            <div><h3>Incidente detectado</h3><p className="muted">Pode vir da operação, redes sociais, imprensa, cliente, colaborador, fornecedor, regulador ou monitoramento técnico.</p></div>
            <div className="result-badge">Alerta<br />registrado</div>
          </div>
          <div className="timeline-item">
            <div className="period">Triagem</div>
            <div><h3>Classificação e dono inicial</h3><p className="muted">O primeiro responsável não resolve tudo; ele garante que o tema chegue ao nível correto com informação mínima.</p></div>
            <div className="result-badge">N0-N3<br />definido</div>
          </div>
          <div className="timeline-item">
            <div className="period">Comando</div>
            <div><h3>Sala aberta e agenda curta</h3><p className="muted">A reunião inicial deve responder: o que sabemos, o que falta, quem contém, quem comunica e quando voltamos a decidir.</p></div>
            <div className="result-badge">Ciclo<br />ativo</div>
          </div>
        </div>
      </section>

      <section className="page" id="sala-crise">
        <div className="section-head">
          <div className="section-number">05</div>
          <div>
            <div className="eyebrow">Rotina da Sala de Crise</div>
            <h2>Como conduzir a operação sem virar debate infinito</h2>
            <p className="muted">Toda sala de crise precisa de cadência, pauta, registro e saída clara. Sem isso, o gabinete vira gargalo.</p>
          </div>
        </div>

        <div className="grid-3">
          <div className="card">
            <h3>Pauta fixa de abertura</h3>
            <ul>
              <li>nível atual;</li>
              <li>fato confirmado;</li>
              <li>dano em curso;</li>
              <li>risco de exposição;</li>
              <li>decisão pendente;</li>
              <li>próxima atualização.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Ritmo por severidade</h3>
            <ul>
              <li><strong>N1:</strong> revisão a cada 2h ou novo fato.</li>
              <li><strong>N2:</strong> ciclos de 60 minutos.</li>
              <li><strong>N3:</strong> ciclos de 30 minutos no pico.</li>
              <li><strong>Estabilização:</strong> ciclos de 4h a 24h.</li>
            </ul>
          </div>
          <div className="card dark">
            <h3>Regra da decisão</h3>
            <p className="muted">Toda rodada termina com dono, prazo e critério de sucesso. Se não houver decisão, deve haver decisão explícita de aguardar e o motivo registrado.</p>
          </div>
        </div>

        <div className="manual-template">
          <div className="template-label">Ata viva da sala de crise</div>
          <p><strong>Status:</strong> ______ | <strong>Nível:</strong> N__ | <strong>Risco dominante:</strong> ______</p>
          <p><strong>Decisões desta rodada:</strong> 1. ______ 2. ______ 3. ______</p>
          <p><strong>Pendências:</strong> ______ | <strong>Dono:</strong> ______ | <strong>Retorno até:</strong> __:__</p>
        </div>
      </section>

      <section className="page" id="comunicacao">
        <div className="section-head">
          <div className="section-number">06</div>
          <div>
            <div className="eyebrow">Comunicação e Porta-Voz</div>
            <h2>Uma única narrativa, adaptada por público</h2>
            <p className="muted">A empresa pode falar com vários públicos, mas não pode sustentar várias versões.</p>
          </div>
        </div>

        <div className="manual-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Público</th>
                <th>Objetivo da mensagem</th>
                <th>Dono</th>
                <th>Tempo recomendado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Colaboradores</strong></td><td>Reduzir boato, orientar conduta e proteger canais oficiais.</td><td>RH + Comunicação</td><td>Primeira hora</td></tr>
              <tr><td><strong>Clientes-chave</strong></td><td>Preservar confiança, explicar impacto e canal de atendimento.</td><td>Comercial + Comunicação</td><td>2 a 4 horas</td></tr>
              <tr><td><strong>Imprensa</strong></td><td>Reconhecer ciência do fato, demonstrar ação e prometer atualização.</td><td>Comunicação + Porta-voz</td><td>Quando houver demanda ou exposição</td></tr>
              <tr><td><strong>Redes sociais</strong></td><td>Evitar vácuo narrativo e centralizar posição oficial.</td><td>Comunicação</td><td>Conforme risco de viralização</td></tr>
              <tr><td><strong>Reguladores</strong></td><td>Cumprir prazo legal e demonstrar governança de resposta.</td><td>Jurídico / Compliance</td><td>Conforme obrigação aplicável</td></tr>
              <tr><td><strong>Conselho / Acionistas</strong></td><td>Informar impacto, risco, decisão tomada e próximo marco.</td><td>Líder do Gabinete</td><td>N2/N3: no primeiro ciclo</td></tr>
            </tbody>
          </table>
        </div>

        <div className="manual-template">
          <div className="template-label">Holding note base</div>
          <p>A empresa tomou conhecimento de [fato] em [data/hora] e ativou seus procedimentos internos de apuração e resposta.</p>
          <p>Neste momento, a prioridade é [proteger pessoas / conter impacto / preservar dados / apoiar afetados]. Novas informações serão comunicadas pelos canais oficiais assim que forem confirmadas.</p>
          <p>Contato oficial: [canal] | Próxima atualização prevista: [janela de tempo].</p>
        </div>

        <div className="manual-do-dont">
          <div className="comparison">
            <h3>Falar</h3>
            <ul>
              <li>o que está confirmado;</li>
              <li>o que a empresa já fez;</li>
              <li>qual é a prioridade humana e operacional;</li>
              <li>quando haverá nova atualização.</li>
            </ul>
          </div>
          <div className="comparison">
            <h3>Evitar</h3>
            <ul>
              <li>culpar terceiros antes de apurar;</li>
              <li>prometer prazo sem dono interno;</li>
              <li>minimizar dor ou impacto público;</li>
              <li>deixar porta-voz improvisar.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page" id="checklists">
        <div className="section-head">
          <div className="section-number">07</div>
          <div>
            <div className="eyebrow">Primeira Resposta</div>
            <h2>Checklist operacional do gabinete</h2>
            <p className="muted">Use como trilho de execução. O objetivo é reduzir omissões em meio à pressão.</p>
          </div>
        </div>

        <div className="check-grid">
          {checklist.map(item => (
            <div className="check-item" key={item}>{item}</div>
          ))}
        </div>

        <div className="quote-box" style={{ marginTop: '12px' }}>
          <h3>Regra de segurança</h3>
          <p className="lead" style={{ marginBottom: 0 }}>Se uma ação pode destruir evidência, ampliar exposição legal ou contradizer mensagem pública, ela precisa ser validada por Jurídico/Compliance e registrada antes da execução.</p>
        </div>
      </section>

      <section className="page" id="qa">
        <div className="section-head">
          <div className="section-number">08</div>
          <div>
            <div className="eyebrow">Perguntas Críticas</div>
            <h2>Q&A mínimo para porta-voz e lideranças</h2>
            <p className="muted">O Q&A não é roteiro para decorar. É uma grade de proteção contra respostas improvisadas.</p>
          </div>
        </div>

        <div className="manual-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pergunta hostil provável</th>
                <th>Linha de resposta recomendada</th>
              </tr>
            </thead>
            <tbody>
              {qaRows.map(([question, answer]) => (
                <tr key={question}>
                  <td><strong>{question}</strong></td>
                  <td>{answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-2" style={{ marginTop: '12px' }}>
          <div className="card soft">
            <h3>Briefing obrigatório do porta-voz</h3>
            <ul>
              <li>contexto em 5 linhas;</li>
              <li>3 mensagens-chave;</li>
              <li>perguntas proibidas e ponte de resposta;</li>
              <li>limite jurídico do que pode ser afirmado;</li>
              <li>frase de encerramento e canal oficial.</li>
            </ul>
          </div>
          <div className="card dark">
            <h3>Frase de controle</h3>
            <p className="muted">"Estamos tratando o tema com seriedade, já acionamos os procedimentos internos e vamos atualizar publicamente apenas informações confirmadas."</p>
          </div>
        </div>
      </section>

      <section className="page" id="registros">
        <div className="section-head">
          <div className="section-number">09</div>
          <div>
            <div className="eyebrow">Memória e Evidências</div>
            <h2>O que precisa ficar registrado</h2>
            <p className="muted">Crises são julgadas também pelo rastro de governança. O registro prova que a empresa decidiu com método.</p>
          </div>
        </div>

        <div className="manual-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Registro</th>
                <th>Conteúdo mínimo</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Log da crise</strong></td><td>Horário, fato novo, decisão, dono, prazo e status.</td><td>Secretaria de Crise</td></tr>
              <tr><td><strong>Registro de decisão</strong></td><td>Alternativas consideradas, critério usado e aprovador final.</td><td>Líder do Gabinete</td></tr>
              <tr><td><strong>Pacote de evidências</strong></td><td>Prints, logs, e-mails, vídeos, documentos, protocolos e preservação de cadeia.</td><td>Área técnica / Jurídico</td></tr>
              <tr><td><strong>Aprovação de mensagem</strong></td><td>Versão final, canal, horário, aprovadores e público-alvo.</td><td>Comunicação</td></tr>
              <tr><td><strong>Relatório pós-crise</strong></td><td>Linha do tempo, impacto, resposta, aprendizados e plano de correção.</td><td>Secretaria + Líder do Gabinete</td></tr>
            </tbody>
          </table>
        </div>

        <div className="manual-template">
          <div className="template-label">Registro de decisão</div>
          <p><strong>Decisão:</strong> ______ | <strong>Horário:</strong> __:__ | <strong>Aprovador:</strong> ______</p>
          <p><strong>Motivo:</strong> ______ | <strong>Risco aceito:</strong> ______ | <strong>Alternativas descartadas:</strong> ______</p>
          <p><strong>Execução:</strong> dono ______ | prazo ______ | evidência de conclusão ______</p>
        </div>
      </section>

      <section className="page" id="encerramento">
        <div className="section-head">
          <div className="section-number">10</div>
          <div>
            <div className="eyebrow">Estabilização e Aprendizado</div>
            <h2>Como encerrar sem perder a lição da crise</h2>
            <p className="muted">A crise não termina quando o pico público baixa. Termina quando danos, narrativas, responsabilidades e melhorias estão endereçados.</p>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <h3>Critérios para desmobilizar o gabinete</h3>
            <ul>
              <li>risco principal contido ou estabilizado;</li>
              <li>stakeholders prioritários informados;</li>
              <li>próxima atualização definida ou dispensada;</li>
              <li>pendências transferidas para donos operacionais;</li>
              <li>log e evidências preservados;</li>
              <li>plano de debriefing agendado.</li>
            </ul>
          </div>
          <div className="card soft">
            <h3>Debriefing obrigatório</h3>
            <p className="muted">Deve ocorrer em até 5 dias úteis após a estabilização. O encontro revisa linha do tempo, decisões, comunicação, falhas de acionamento, lacunas de autoridade e atualizações necessárias no Protocolo Escudo.</p>
          </div>
        </div>

        <div className="timeline" style={{ marginTop: '12px' }}>
          <div className="timeline-item">
            <div className="period">D+1</div>
            <div><h3>Resumo executivo</h3><p className="muted">Enviar status final preliminar para liderança, conselho e áreas envolvidas, com pendências e riscos residuais.</p></div>
            <div className="result-badge">Visão<br />única</div>
          </div>
          <div className="timeline-item">
            <div className="period">D+5</div>
            <div><h3>Debriefing e plano de correção</h3><p className="muted">Transformar falhas observadas em ações, donos, prazos e melhorias no fluxo de crise.</p></div>
            <div className="result-badge">Melhoria<br />ativa</div>
          </div>
          <div className="timeline-item">
            <div className="period">D+30</div>
            <div><h3>Revisão do protocolo</h3><p className="muted">Atualizar papéis, contatos, mensagens, checklists e cenários de simulação para manter o gabinete vivo.</p></div>
            <div className="result-badge">Manual<br />atualizado</div>
          </div>
        </div>

        <div className="card dark" style={{ marginTop: '14px' }}>
          <h3>Resultado esperado</h3>
          <p style={{ color: '#fff', marginBottom: 0 }}>Ao final de uma crise bem conduzida, a empresa deve conseguir explicar o que aconteceu, o que fez, quem decidiu, como protegeu os afetados, quais riscos permanecem e o que será corrigido para que o evento não se repita da mesma forma.</p>
        </div>
      </section>
    </DocumentShell>
  );
}
