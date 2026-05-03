import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import './Detalhamento.css';

export default function Detalhamento() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('capa');

  const sections = [
    { id: 'capa', title: 'Capa' },
    { id: 'premissa', title: 'A Premissa e o Risco' },
    { id: 'o-que-e', title: 'O que é o Protocolo' },
    { id: 'papeis', title: 'Atuação Conjunta' },
    { id: 'cronograma', title: 'Cronograma Visual' },
    { id: 'gabinete', title: 'Gabinete de Crise' },
    { id: 'matriz', title: 'Matriz de Riscos' },
    { id: 'central', title: 'Central de Prontidão' },
    { id: 'certificacao', title: 'Certificação' },
    { id: 'worst-day', title: 'The Worst Day' },
    { id: 'blindagem', title: 'Blindagem e Recorrência' },
    { id: 'dimensionamento', title: 'Dimensionamento' },
    { id: 'confidencialidade', title: 'Confidencialidade' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="detalhamento-layout">
      {/* Progress Bar */}
      <div className="progress-bar-container no-print">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Floating TOC Sidebar */}
      <aside className="toc-sidebar no-print">
        <div className="toc-header">
          <h3>Índice</h3>
          <button className="print-btn" onClick={handlePrint} title="Exportar PDF">
            <Printer size={16} /> Exportar
          </button>
        </div>
        <nav className="toc-nav">
          {sections.map(sec => (
            <a 
              key={sec.id} 
              href={`#${sec.id}`}
              className={activeSection === sec.id ? 'active' : ''}
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Document Content */}
      <article className="document-paper">

    <section className="page cover" id="capa">
      <div>
        <div className="cover-top">
          <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
          <div className="cover-meta">
            Documento executivo<br />
            Implantação estratégica de prontidão corporativa<br />
            Confidencial
          </div>
        </div>

        <div className="cover-title">
          <div className="pill">Metodologia estratégica e implantação assistida</div>
          <h1>Protocolo Escudo</h1>
          <p className="lead">Sua empresa não pode descobrir como responder a uma crise apenas no dia em que ela acontece.</p>
        </div>

        <div className="cover-grid">
          <div className="quote-box">
            <h3>Nossa Promessa</h3>
            <p className="lead" style={{fontSize:"16px",marginBottom:"0"}}>Implantamos, junto com sua liderança, uma estrutura essencial de resposta em até 60 dias e validamos a operação por 120 dias através de testes controlados, ajustes finos e suporte estratégico.</p>
          </div>

          <div className="card dark">
            <div className="icon-title">
              <span className="icon" style={{background:"#1b1b1b",borderColor:"#333"}}>
                <svg viewBox="0 0 24 24" style={{stroke:"#fff"}}><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"></path><path d="M9.5 12l1.7 1.7L15 10"></path></svg>
              </span>
              <h3 style={{margin:"0"}}>Autonomia Operacional</h3>
            </div>
            <p className="muted">O Protocolo cria inteligência interna. A empresa passa a ter fluxos estruturados, liderança madura e autonomia para responder à pressão institucional de forma autossuficiente.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="page" id="premissa">
      <div className="section-head">
        <div className="section-number">01</div>
        <div>
          <div className="eyebrow">A Premissa de Negócio</div>
          <h2>O Risco de Improvisar</h2>
          <p className="muted">A pior hora para decidir quem fala, quem aprova e quem comanda é quando o mercado inteiro já exige uma resposta.</p>
        </div>
      </div>

      <div className="quote-box">
        <h3>Sem protocolo, a crise decide pela empresa</h3>
        <p className="lead" style={{marginBottom:"0"}}>A falta de coordenação em momentos críticos resulta em perda de autoridade, contratos rompidos, exposição negativa irreversível e destruição de valor institucional.</p>
      </div>

      <div className="risk-strip">
        <div className="risk-card"><strong>A liderança demora a responder</strong><span className="muted">O silêncio institucional é preenchido por ruído e especulação do mercado.</span></div>
        <div className="risk-card"><strong>Áreas emitem versões diferentes</strong><span className="muted">Operação, Jurídico e Comunicação entram em atrito público.</span></div>
        <div className="risk-card"><strong>Equipe absorve rádio peão</strong><span className="muted">Sem direcionamento claro, colaboradores viram difusores de desinformação.</span></div>
        <div className="risk-card"><strong>Stakeholders escalam a pressão</strong><span className="muted">Clientes, conselhos e parceiros exigem ações concretas não planejadas.</span></div>
        <div className="risk-card"><strong>Narrativa assumida por terceiros</strong><span className="muted">Imprensa e redes sociais assumem o protagonismo da percepção pública.</span></div>
        <div className="risk-card"><strong>A confiança cai antes do veredito</strong><span className="muted">A empresa é sentenciada pela demora na resposta, independente da culpa real.</span></div>
      </div>

    </section>

    <section className="page" id="o-que-e">
      <div className="section-head">
        <div className="section-number">02</div>
        <div>
          <div className="eyebrow">A Metodologia</div>
          <h2>O que é o Protocolo Escudo</h2>
          <p className="muted">Uma metodologia aplicada de implantação, capacitação e blindagem de resposta à crise.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card dark">
          <h3>O que o Protocolo É</h3>
          <ul style={{ paddingLeft: '15px', color: '#fff' }}>
            <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Metodologia estratégica:</strong> Implantação de estrutura de decisão rápida.</li>
            <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Capacitação aplicada:</strong> Treinamento da liderança para cenários reais de pressão.</li>
            <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Trabalho conjunto:</strong> Conduzimos a empresa na construção dos seus fluxos.</li>
            <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Geração de autonomia:</strong> A empresa aprende a operar seu próprio protocolo.</li>
          </ul>
        </div>
        <div className="card soft">
          <h3>O que o Protocolo NÃO É</h3>
          <ul style={{ paddingLeft: '15px' }}>
            <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Prestação de serviço pura:</strong> Não fazemos pela empresa, estruturamos com a empresa.</li>
            <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Um curso genérico:</strong> Não é uma sequência teórica, é validação operacional.</li>
            <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Consultoria passiva:</strong> Não entregamos apenas relatórios, entregamos capacidade.</li>
            <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Terceirização da crise:</strong> A decisão sempre permanece com a liderança interna.</li>
          </ul>
        </div>
      </div>

    </section>

    <section className="page" id="papeis">
      <div className="section-head">
        <div className="section-number">03</div>
        <div>
          <div className="eyebrow">Responsabilidade Compartilhada</div>
          <h2>Uma construção a quatro mãos</h2>
          <p className="muted">O sucesso do Protocolo Escudo exige alinhamento absoluto entre nossa metodologia e a imersão ativa da sua liderança.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="icon-title">
            <span className="icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>
            <h3 style={{ margin: 0 }}>O Papel da Equipe Escudo</h3>
          </div>
          <p className="muted" style={{ marginTop: '8px' }}>Nossa atuação foca na provocação estratégica e estruturação técnica:</p>
          <ul style={{ paddingLeft: '15px' }}>
            <li style={{ marginBottom: '6px' }}>Conduzimos e orientamos a definição dos fluxos.</li>
            <li style={{ marginBottom: '6px' }}>Estruturamos o Gabinete de Crise e Matriz de Riscos.</li>
            <li style={{ marginBottom: '6px' }}>Provocamos a alta gestão com cenários (The Worst Day).</li>
            <li style={{ marginBottom: '6px' }}>Capacitamos o time interno com a Central de Prontidão.</li>
            <li style={{ marginBottom: '6px' }}>Validamos os protocolos mediante testes controlados.</li>
          </ul>
        </div>

        <div className="card">
          <div className="icon-title">
            <span className="icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
            <h3 style={{ margin: 0 }}>O Papel da Liderança da Empresa</h3>
          </div>
          <p className="muted" style={{ marginTop: '8px' }}>A empresa é a dona da sua cultura e decisão operacional:</p>
          <ul style={{ paddingLeft: '15px' }}>
            <li style={{ marginBottom: '6px' }}>Nomeia responsáveis com real autoridade corporativa.</li>
            <li style={{ marginBottom: '6px' }}>Fornece dados sensíveis e transparência de riscos reais.</li>
            <li style={{ marginBottom: '6px' }}>Participa ativamente dos ensaios práticos de decisão.</li>
            <li style={{ marginBottom: '6px' }}>Aprova oficialmente os limites e o mapa de escalonamento.</li>
            <li style={{ marginBottom: '6px' }}>Assume a operação final para manter o sistema vivo.</li>
          </ul>
        </div>
      </div>

    </section>

    <section className="page" id="cronograma">
      <div className="section-head">
        <div className="section-number">04</div>
        <div>
          <div className="eyebrow">Implantação Executiva</div>
          <h2>Cronograma Visual de Aceleração</h2>
          <p className="muted">Focado em estruturação ágil, validação imediata e blindagem assistida. Sem pausas longas, sem treinamento genérico.</p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-item"><div className="period">Fase 1</div><div><h3>Diagnóstico e Mapeamento</h3><p className="muted">Imersão com stakeholders, mapeamento de fragilidades reais, identificação de processos sensíveis e prioridades estruturais.</p></div><div className="result-badge">Base<br/>Estratégica</div></div>
        <div className="timeline-item"><div className="period">Fase 2</div><div><h3>Gabinete e Estrutura de Resposta</h3><p className="muted">Nomeação de papéis, desenho de fluxos, matriz de riscos e materiais de primeira resposta operacional.</p></div><div className="result-badge">Prontidão<br/>Mínima</div></div>
        <div className="timeline-item"><div className="period">Fase 3</div><div><h3>Capacitação e Validação</h3><p className="muted">Disponibilização da Central Escudo e condução da certificação prática da liderança e responsáveis internos.</p></div><div className="result-badge">Qualificação<br/>Técnica</div></div>
        <div className="timeline-item"><div className="period">Fase 4</div><div><h3>Ensaio The Worst Day</h3><p className="muted">Aplicação de pressão realista sobre o gabinete. O protocolo é estressado expondo onde o sistema interno quebra.</p></div><div className="result-badge">Ajuste e<br/>Correção</div></div>
        <div className="timeline-item"><div className="period">Fase 5</div><div><h3>Blindagem Assistida</h3><p className="muted">Testes controlados, ajustes finos, suporte a decisões sensíveis e evolução do protocolo para manter a maturidade.</p></div><div className="result-badge">Manutenção<br/>Ativa</div></div>
      </div>

      <div className="grid-2" style={{ marginTop: '12px' }}>
        <div className="card soft">
          <h3>Primeiros 60 dias</h3>
          <p className="small muted">Fases 1 a 4: Diagnóstico, Estruturação do Gabinete, Capacitação da equipe e o estresse operacional definitivo (The Worst Day).</p>
        </div>
        <div className="card soft">
          <h3>120 dias seguintes</h3>
          <p className="small muted">Fase 5: Acompanhamento contínuo, Suporte estratégico para riscos emergentes, Testes controlados surpresa e Blindagem corporativa.</p>
        </div>
      </div>

    </section>

    <section className="page" id="gabinete">
      <div className="section-head">
        <div className="section-number">05</div>
        <div>
          <div className="eyebrow">Estrutura Operacional</div>
          <h2>O Gabinete de Crise</h2>
          <p className="muted">O Gabinete não é uma simples reunião. É um bloco robusto de entregáveis operacionais que garante ações rápidas e coordenação da corporação.</p>
        </div>
      </div>

      <div className="quote-box">
        <h3>Entregáveis da Estrutura de Resposta</h3>
        <p className="lead" style={{ marginBottom: 0, fontSize: '15px' }}>Construímos com a empresa o ecossistema completo para que a tomada de decisão em crise flua com previsibilidade técnica.</p>
      </div>

      <div className="track-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '12px' }}>
        <div className="track-card">
          <h3>Responsáveis e Papéis</h3>
          <p className="muted">Definição explícita de quem aprova e quem executa. Cada liderança nomeada saberá exatamente seu nível de decisão.</p>
        </div>
        <div className="track-card">
          <h3>Fluxos de Acionamento</h3>
          <p className="muted">Mapa logístico de como a informação escala da ponta operacional até a alta cúpula em tempo hábil e seguro.</p>
        </div>
        <div className="track-card">
          <h3>Checklist (Primeira Resposta)</h3>
          <p className="muted">Manual de providências emergenciais imediatas para estancar o sangramento operacional e acionar o comitê oficial.</p>
        </div>
        <div className="track-card">
          <h3>Mensagens Base</h3>
          <p className="muted">Modelos pré-construídos de comunicados para frear a especulação pública e posicionar a corporação com segurança.</p>
        </div>
        <div className="track-card">
          <h3>Perguntas Críticas (Q&A)</h3>
          <p className="muted">Catálogo atualizado de respostas para as perguntas mais hostis e difíceis que a crise levantará no mercado e na imprensa.</p>
        </div>
        <div className="track-card">
          <h3>Mapa de Aprovação</h3>
          <p className="muted">Rotina de atualização durante a crise garantindo que nenhum canal fale sem a anuência das chaves de aprovação do protocolo.</p>
        </div>
      </div>

    </section>

    <section className="page" id="matriz">
      <div className="section-head">
        <div className="section-number">06</div>
        <div>
          <div className="eyebrow">Diagnóstico Priorizado</div>
          <h2>Matriz de Riscos Prioritários</h2>
          <p className="muted">Conduzimos a empresa metodicamente a mapear riscos reais. Uma organização não prevê o futuro, mas antecipa todas as suas áreas de sombra com um monitoramento rigoroso.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Critérios de Avaliação e Priorização</h3>
          <ul style={{ paddingLeft: '15px' }}>
            <li>Velocidade de propagação do incidente.</li>
            <li>Probabilidade e grau de exposição pública.</li>
            <li>Impacto direto na reputação e no caixa.</li>
            <li>Área interna responsável e nível de preparo atual.</li>
          </ul>
        </div>
        <div className="card dark">
          <h3>Classificação de Atuação</h3>
          <ul style={{ paddingLeft: '15px', color: '#fff' }}>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Ação Imediata:</strong> Estruturar plano central de resposta.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Preparação Estruturada:</strong> Mapear fluxos preventivos.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Monitoramento Ativo:</strong> Observação ativa contínua.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Registro Preventivo:</strong> Documentado e sob controle base.</li>
          </ul>
        </div>
      </div>

      <div className="graphic" style={{ marginTop: '12px' }}>
        <h3>Escopo de Riscos Mapeados (Exemplos Práticos)</h3>
        <table style={{ marginTop: '8px' }}>
          <thead><tr><th>Categoria de Risco</th><th>Cenários Possíveis na Organização</th></tr></thead>
          <tbody>
            <tr><td><strong>Operacionais & Jurídicos</strong></td><td>Acidentes fatais, vazamentos LGPD, falhas críticas na entrega de serviço, multas e sanções regulatórias severas.</td></tr>
            <tr><td><strong>Reputacionais & Digitais</strong></td><td>Exposição pública em rede social, rádio peão incontrolável, matérias investigativas hostis na imprensa, deep fakes.</td></tr>
            <tr><td><strong>Liderança & Governança</strong></td><td>Pessoa inadequada em cargo sensível, conflitos entre sócios, nepotismo gerando crise interna, escândalos C-Level.</td></tr>
            <tr><td><strong>Comerciais & Setoriais</strong></td><td>Crise aguda no relacionamento com fornecedores estratégicos, perda silenciosa de grande carteira gerando pânico.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="note"><strong>Diretriz Corporativa:</strong> Nem todo risco mapeado demanda a construção de um plano hiper-complexo. Contudo, absolutamente todo risco capaz de comprometer a longevidade da empresa precisa estar visível para a alta gestão.</div>

    </section>

    <section className="page" id="central">
      <div className="section-head">
        <div className="section-number">07</div>
        <div>
          <div className="eyebrow">Padronização e Escala</div>
          <h2>A Central Escudo de Prontidão</h2>
          <p className="muted">Um hub corporativo de apoio para consulta e padronização. A Central funciona como o pilar estrutural que evita retrabalho e liberta a liderança de treinamentos massivos improdutivos.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card dark">
          <h3>Arquitetura Documental do Hub</h3>
          <p>A central agrega: check-lists práticos, templates de comunicados base, fluxos internos, protocolos de acionamento imediatos, mapas de decisão consolidados e planos de ação pós-incidente.</p>
        </div>
        <div className="card">
          <h3>Capacitação Dinâmica em Trilhas</h3>
          <p>Oferece vídeos corporativos curtos e diretos, exercícios táticos e estudos de caso focados por cargo, permitindo que a organização unifique a compreensão da segurança de forma pontual.</p>
        </div>
      </div>

      <div className="quote-box" style={{ marginTop: '12px' }}>
        <h3>Lógica de Eficiência Corporativa</h3>
        <p className="lead" style={{ marginBottom: 0 }}>O conteúdo da Central ensina o padrão. Os encontros presenciais ou ao vivo são reservados estritamente para decisões sensíveis, pressão real e alinhamentos cruciais.</p>
      </div>

      <div className="track-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '12px' }}>
        <div className="track-card"><h3>Ganho de Flexibilidade</h3><p className="muted">Profissionais acessam trilhas quando e como necessitam, sem paralisar a agenda integral da operação da companhia.</p></div>
        <div className="track-card"><h3>Redução do Retrabalho</h3><p className="muted">A organização não perde inteligência e memória quando executivos mudam; a cultura de segurança é retida e documentada.</p></div>
        <div className="track-card"><h3>Otimização do Ao Vivo</h3><p className="muted">Substituímos reuniões de conceitos genéricos por simulações ativas de alta eficiência para resolução prática de ameaças.</p></div>
        <div className="track-card"><h3>Onboarding Estratégico</h3><p className="muted">Novos colaboradores em posições de alto risco absorvem rapidamente a postura institucional sem fricção prolongada.</p></div>
      </div>

    </section>

    <section className="page" id="certificacao">
      <div className="section-head">
        <div className="section-number">08</div>
        <div>
          <div className="eyebrow">Validação de Competência</div>
          <h2>Capacitação e Certificação</h2>
          <p className="muted">A certificação não é uma chancela simbólica ou mero diploma. É uma bateria técnica e profunda para medir se os responsáveis possuem o estômago e a maturidade exigidos para atuar perante crise real.</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="card soft">
          <h3>Entrevistas com Stakeholders</h3>
          <p className="muted">Avaliação individual investigativa com os executivos para medir a absorção da cultura de risco e a clareza sobre processos que eles mesmos supervisionam.</p>
        </div>
        <div className="card soft">
          <h3>Análises por Função Operacional</h3>
          <p className="muted">Simulação focada na especialidade de cada gestor, provocando a tomada de decisão isolada para certificar o cumprimento autônomo do protocolo daquela área.</p>
        </div>
        <div className="card soft">
          <h3>Avaliação em Grupo do Gabinete</h3>
          <p className="muted">Exercícios conjuntos com restrição de tempo. Mensuramos a capacidade de alinhamento tático entre departamentos, fluxo do acionamento real e coesão da mensagem final.</p>
        </div>
      </div>

      <div className="graphic" style={{ marginTop: '12px' }}>
        <h3>Métricas da Avaliação de Lideranças</h3>
        <table style={{ marginTop: '6px' }}>
          <thead><tr><th>Dimensão de Análise Estrutural</th><th>Mecanismo Prático Avaliado pela Equipe Escudo</th></tr></thead>
          <tbody>
            <tr><td><strong>Comunicação Clara e Segura</strong></td><td>Se a postura do porta-voz minimiza o ruído, transmite autoridade institucional e resiste a investidas verbais hostis.</td></tr>
            <tr><td><strong>Tomada de Decisão sob Ambiguidade</strong></td><td>Se o critério de prioridade do executivo é lógico e preserva o valor de longo prazo, frente ao pânico de curto prazo.</td></tr>
            <tr><td><strong>Tempo Limite de Fluxo Tático</strong></td><td>Monitoramento exato do tempo decorrido entre a detecção do incidente inicial e a veiculação das ações corretivas.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="note"><strong>A Devoutiva (Feedback Real):</strong> Todo líder chave ganha registro de pontos fortes incontestáveis e mapeamento das fragilidades operacionais que exigem atenção na fase de testes do projeto.</div>

    </section>

    <section className="page" id="worst-day">
      <div className="section-head">
        <div className="section-number">09</div>
        <div>
          <div className="eyebrow">Estresse Institucional</div>
          <h2>The Worst Day e Testes Controlados</h2>
          <p className="muted">O coração técnico da metodologia. O momento definitivo onde o protocolo de mesa vira ação: uma simulação imersiva de pressão tática que submete o Gabinete de Crise à deterioração das circunstâncias.</p>
        </div>
      </div>

      <div className="sim-grid">
        <div className="graphic">
          <h3>Cadeia de Progressão do The Worst Day</h3>
          <div className="sim-steps">
            <div className="sim-step"><span>1</span><div><strong>Detecção Inicial Oculta</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Sinal periférico é inserido na operação; avalia-se se as equipes de base alertam e ativam as instâncias do comitê corretamente.</p></div></div>
            <div className="sim-step"><span>2</span><div><strong>Gabinete em Alerta Primário</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Convocação das lideranças, isolamento do evento base e formulação urgente do briefing para conter as especulações imediatas.</p></div></div>
            <div className="sim-step"><span>3</span><div><strong>O Escalonamento Agudo</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Injeções hostis entram no circuito. Imprensa ligando, denúncias falsas anexas e pressão nas redes, testando o colapso do alinhamento do comitê.</p></div></div>
            <div className="sim-step"><span>4</span><div><strong>Decisão Crítica (Clímax)</strong><p className="muted small" style={{ margin: '2px 0 0' }}>O dilema maior é imposto na sala; os executivos finalizam a tomada de posição que sela a integridade reputacional da corporação.</p></div></div>
            <div className="sim-step"><span>5</span><div><strong>Dissecação Final (Debriefing)</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Sessão aprofundada analisando cirurgicamente cada falha cometida para o recalibrar incontestável das diretrizes centrais.</p></div></div>
          </div>
        </div>

        <div className="card dark">
          <h3>Bateria de Testes Controlados</h3>
          <p style={{ marginTop: '10px' }}>Além da dinâmica monumental do The Worst Day, executamos verificações precisas:</p>
          <ul style={{ paddingLeft: '15px', color: '#fff', fontSize: '11px' }}>
            <li style={{ color: '#d5d5d5', marginBottom: '6px' }}><strong style={{ color: '#fff' }}>Simulação de Jornalismo Hostil:</strong> Porta-vozes sabatinados sob perguntas que não admitem improviso nem fuga retórica.</li>
            <li style={{ color: '#d5d5d5', marginBottom: '6px' }}><strong style={{ color: '#fff' }}>Limites de Acionamento Setorial:</strong> Eventos microscópicos inseridos e testados para verificar a velocidade orgânica do escalar de informação até o conselho.</li>
            <li style={{ color: '#d5d5d5', marginBottom: '6px' }}><strong style={{ color: '#fff' }}>Alinhamento Operacional Cego:</strong> Simulação isolada para medir adesão do protocolo na camada tática corporativa.</li>
          </ul>
        </div>
      </div>

      <div className="quote-box" style={{ marginTop: '10px' }}>
        <h3>Barreira Absoluta de Segurança e Integridade</h3>
        <p className="lead" style={{ marginBottom: 0 }}>Todo e qualquer ensaio operado é um teste controlado de ambiente interno. Não adotamos exposição desenfreada, riscos reais ao mercado ou táticas de sustos levianos. Construímos resiliência institucional sem traumatizar equipes desnecessariamente.</p>
      </div>

    </section>

    <section className="page" id="blindagem">
      <div className="section-head">
        <div className="section-number">10</div>
        <div>
          <div className="eyebrow">Sustentação Estratégica</div>
          <h2>Blindagem Assistida e Recorrência</h2>
          <p className="muted">O término dos 60 dias encerra a base, mas inaugura a vida real do protocolo. Crise não é evento congelado; riscos nascem e a cultura precisa de revisão recorrente. O sistema vira um ativo vivo.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Módulo de Blindagem Assistida (120 dias)</h3>
          <p>O apoio executivo que garante a sedimentação profunda do Protocolo Escudo:</p>
          <ul style={{ paddingLeft: '15px' }}>
            <li>Revisão periódica de normas, adequando o sistema às mudanças na estrutura societária ou expansões da empresa.</li>
            <li>Injeção contínua de testes controlados focais para garantir que a memória muscular não se dissipe no cotidiano pacífico.</li>
            <li>Reuniões de atualização para renovação orgânica da Matriz de Riscos.</li>
            <li>Treinamento veloz de repasse para novas lideranças contratadas no meio do ciclo operacional.</li>
          </ul>
        </div>
        <div className="card dark">
          <h3>O "Botão Vermelho"</h3>
          <p>Para empresas em operação continuada, o Protocolo Escudo garante um canal estratégico de <strong>Acionamento Prioritário</strong> em instantes emergenciais.</p>
          <p style={{ marginTop: '6px' }}>Assessoria executiva de crise em caráter sensível: um acompanhamento com visões analíticas maduras nas primeiras horas vitais onde se exigem definições irrevogáveis para o destino financeiro ou reputacional do negócio.</p>
        </div>
      </div>

      <div className="risk-strip" style={{ marginTop: '12px' }}>
        <div className="risk-card"><strong>Apoio Executivo Imediato</strong><span className="muted">Em crise profunda, a consultoria fornece a moderação tática para não permitir o desespero.</span></div>
        <div className="risk-card"><strong>Atualização Documental</strong><span className="muted">Evitamos o envelhecimento dos fluxos. O que foi estruturado há 6 meses recebe polimento frequente.</span></div>
        <div className="risk-card"><strong>Sincronia de Comunicação</strong><span className="muted">Modelos de notas de esclarecimento e pronunciamentos são readaptados a tempo real com precisão tática.</span></div>
        <div className="risk-card"><strong>Garantia de Manutenção Vital</strong><span className="muted">A organização nunca fica sozinha após o treinamento, e a responsabilidade de manter o protocolo permanece sob guarda unificada.</span></div>
      </div>

    </section>

    <section className="page" id="dimensionamento">
      <div className="section-head">
        <div className="section-number">11</div>
        <div>
          <div className="eyebrow">Arquitetura de Contrato</div>
          <h2>Dimensionamento do Projeto e Módulos</h2>
          <p className="muted">O programa possui formato orgânico, calcado em um escopo estrutural base anexado a fatores verticais de complexidade variáveis e adições modulares estratégicas para elevação extrema de maturidade.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card dark">
          <h3>Fatores Determinantes de Precificação (Variáveis)</h3>
          <ul style={{ paddingLeft: '15px', color: '#fff' }}>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Amplitude da Certificação:</strong> Volume de executivos e stakeholders essenciais.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Intensidade Operacional:</strong> Expansão do cronograma prático de testes e repetições de The Worst Day aplicadas para diretorias plurais.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Complexidade Territorial:</strong> Envolvimento simultâneo de unidades logísticas, industriais ou sucursais corporativas remotas.</li>
            <li style={{ color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>Gravidade do Risco:</strong> Profundidade dedicada na extensão das investigações e calibração fina perante setores ultra-regulamentados.</li>
          </ul>
        </div>

        <div className="card">
          <h3>Módulos de Continuidade e Autoridade Opcional</h3>
          <ul style={{ paddingLeft: '15px' }}>
            <li><strong>Recorrência Contínua (Suporte Anual):</strong> Renovação programada para blindagem ininterrupta e plantão estratégico de contingência (Botão Vermelho).</li>
            <li><strong>Autoridades Externas de Renome (Opcional):</strong> Validação executiva de extrema credibilidade. Módulos extras para Masterclass com convidados âncoras (Ex: Heródoto Barbeiro, entre outros especialistas não confirmados sem escopo) permitindo um grau super-premium para nivelamento dos conselheiros corporativos da contratante.</li>
            <li><strong>Mentorias Singulares:</strong> Sessões herméticas focadas no isolamento do Porta-Voz principal ou Presidente em cenários jornalísticos de grau severo.</li>
          </ul>
        </div>
      </div>

      <div className="quote-box" style={{ marginTop: '12px' }}>
        <h3>Níveis de Envolvimento na Implementação</h3>
        <p className="lead" style={{ marginBottom: 0 }}>Adequamos a proporção entre a mão de obra da própria empresa e a estruturação massiva delegada ao Protocolo Escudo (Implantação Orientada vs. Implantação Assistida Total), calibrando perfeitamente a urgência empresarial frente à capacidade operacional do próprio conselho diretivo local.</p>
      </div>

    </section>

    <section className="page" id="confidencialidade">
      <div className="section-head">
        <div className="section-number">12</div>
        <div>
          <div className="eyebrow">Diretriz de Sigilo Corporativo</div>
          <h2>Acordo Restrito de Confidencialidade</h2>
          <p className="muted">O êxito da formatação estrutural no campo da segurança preventiva exige diagnóstico intrusivo e escancaramento interno rigoroso. Para gerar blindagem, manipulamos na fonte informações e vulnerabilidades centrais das companhias as quais servimos.</p>
        </div>
      </div>

      <div className="quote-box">
        <h3>Garantia de Proteção Estrutural Total</h3>
        <p className="lead" style={{ marginBottom: 0 }}>O andamento de todas as imersões repousa invariavelmente sobre Acordos de Não Divulgação (NDAs) consolidados ou selos de sigilo corporativo explícitos de extrema maturidade mercadológica, gerando plena segurança aos executivos envolvidos no Protocolo.</p>
      </div>

      <div className="track-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '12px' }}>
        <div className="track-card">
          <h3>Restrição a Fragilidades Analisadas</h3>
          <p className="muted">Todos os vazios processuais e desfalques perigosos identificados na rotina da operação jamais serão convertidos em exposições gratuitas ou punitivas. Servirão única e cirurgicamente para as contenções na base da matriz analítica interna do Gabinete.</p>
        </div>
        <div className="track-card">
          <h3>Propriedade do Material Gerado</h3>
          <p className="muted">Mapas de processos, diagramas da Central de Prontidão e gabaritos de aprovação nascem e terminam blindados e lacrados na posse exclusiva da liderança designada pela organização contratante, inacessíveis a terceiros e competidores.</p>
        </div>
        <div className="track-card">
          <h3>Isolamento de Integridade Pessoal</h3>
          <p className="muted">Resultados e aferições sensíveis oriundas dos cenários caóticos no The Worst Day que revelarem defasagens dos diretores ou sócios não viram dossiês de julgamento. Convertem-se em trilhas restritíssimas de desenvolvimento direto ao porta-voz fragilizado.</p>
        </div>
      </div>

      <div className="card dark" style={{ marginTop: '12px' }}>
        <h3>Próximos Passos Corporativos</h3>
        <p style={{ marginTop: '8px', color: '#fff' }}>O progresso para o dimensionamento do Escopo do Projeto baseia-se na identificação da maturidade interna. Exigimos formalização precisa dos Sponsors da Implantação e agilidade no aceite da minuta contratual e sigilos, para travar imediatamente a agenda de imersão de Fase 1.</p>
        <p style={{ marginTop: '8px', color: '#d5d5d5' }}><strong style={{ color: '#fff' }}>O mercado e a crise não sofrem atrasos aguardando o alinhamento da corporação. Inicie a blindagem de seus ativos intelectuais e de imagem enquanto há tempo para prever.</strong></p>
      </div>

    </section>

      </article>
    </div>
  );
}
