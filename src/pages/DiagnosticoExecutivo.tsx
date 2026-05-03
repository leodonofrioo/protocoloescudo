import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import './Detalhamento.css';

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'objetivo', title: 'Objetivo Executivo' },
  { id: 'metodo', title: 'Metodo de Diagnostico' },
  { id: 'dimensoes', title: 'Dimensoes Avaliadas' },
  { id: 'entrevistas', title: 'Roteiro de Entrevistas' },
  { id: 'prioridades', title: 'Matriz de Prioridades' },
  { id: 'plano', title: 'Plano dos Primeiros 10 Dias' },
  { id: 'entregaveis', title: 'Entregaveis' },
];

export default function DiagnosticoExecutivo() {
  return (
    <DocumentShell sections={sections}>
      <section className="page cover" id="capa">
        <div>
          <div className="cover-top">
            <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
            <div className="cover-meta">
              Documento executivo<br />
              Imersao, risco e prioridade<br />
              Restrito e confidencial
            </div>
          </div>

          <div className="cover-title">
            <div className="pill">Mapa de vulnerabilidades e decisao</div>
            <h1>Diagnóstico Executivo</h1>
            <p className="lead">A primeira leitura objetiva da prontidão real da empresa antes da implantação do Protocolo Escudo.</p>
          </div>

          <div className="cover-grid">
            <div className="quote-box">
              <h3>Finalidade do diagnóstico</h3>
              <p className="lead" style={{ fontSize: '16px', marginBottom: 0 }}>
                Transformar percepções dispersas da liderança em um mapa claro de riscos, lacunas, responsáveis e prioridades para os primeiros 60 dias.
              </p>
            </div>

            <div className="card dark">
              <div className="icon-title">
                <span className="icon" style={{ background: '#1b1b1b', borderColor: '#333' }}>
                  <svg viewBox="0 0 24 24" style={{ stroke: '#fff' }}>
                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                  </svg>
                </span>
                <h3 style={{ margin: 0 }}>O que ele evita</h3>
              </div>
              <p className="muted">
                Evita iniciar a implantação por opinião, urgência isolada ou pressão política. O diagnóstico define o que precisa ser protegido primeiro.
              </p>
            </div>
          </div>

          <div className="stats">
            <div className="stat"><div className="n">10</div><strong>Dias iniciais</strong><p className="muted small" style={{ margin: '3px 0 0' }}>imersão e priorização</p></div>
            <div className="stat"><div className="n">06</div><strong>Dimensões</strong><p className="muted small" style={{ margin: '3px 0 0' }}>governança, operação e reputação</p></div>
            <div className="stat"><div className="n">01</div><strong>Matriz central</strong><p className="muted small" style={{ margin: '3px 0 0' }}>probabilidade, impacto e prontidão</p></div>
            <div className="stat"><div className="n">60</div><strong>Dias orientados</strong><p className="muted small" style={{ margin: '3px 0 0' }}>plano de implantação</p></div>
          </div>
        </div>
      </section>

      <section className="page" id="objetivo">
        <div className="section-head">
          <div className="section-number">01</div>
          <div>
            <div className="eyebrow">Objetivo executivo</div>
            <h2>Responder o que precisa ser protegido antes da crise</h2>
            <p className="muted">O diagnóstico cria uma leitura comum entre alta liderança, comunicação, jurídico, operação e pessoas.</p>
          </div>
        </div>

        <div className="quote-box">
          <h3>Sem diagnóstico, o protocolo nasce genérico</h3>
          <p className="lead" style={{ marginBottom: 0 }}>
            O Protocolo Escudo começa identificando onde a empresa está exposta, quais decisões travam a resposta e quais riscos precisam entrar imediatamente no centro da implantação.
          </p>
        </div>

        <div className="grid-3" style={{ marginTop: '10px' }}>
          <div className="card">
            <h3>O que está vulnerável</h3>
            <p className="muted">Processos, públicos, lideranças, narrativas e dependências que podem quebrar sob pressão.</p>
          </div>
          <div className="card">
            <h3>Quem decide</h3>
            <p className="muted">Autoridades reais de aprovação, cadeia de comando, zonas cinzentas e substituições necessárias.</p>
          </div>
          <div className="card">
            <h3>O que vem primeiro</h3>
            <p className="muted">Prioridades que precisam orientar a estrutura essencial de resposta nos primeiros 60 dias.</p>
          </div>
        </div>

        <div className="risk-strip">
          <div className="risk-card"><strong>Clareza de risco</strong><span className="muted">A liderança enxerga os cenários com maior capacidade de dano institucional.</span></div>
          <div className="risk-card"><strong>Clareza de lacuna</strong><span className="muted">A empresa entende onde não possui fluxo, responsável, mensagem ou autoridade.</span></div>
          <div className="risk-card"><strong>Clareza de prioridade</strong><span className="muted">O programa deixa de competir com todas as urgências internas e passa a atacar o essencial.</span></div>
          <div className="risk-card"><strong>Clareza de implantação</strong><span className="muted">O plano de ação nasce calibrado para a realidade da empresa, não para um modelo abstrato.</span></div>
        </div>
      </section>

      <section className="page" id="metodo">
        <div className="section-head">
          <div className="section-number">02</div>
          <div>
            <div className="eyebrow">Método de diagnóstico</div>
            <h2>Uma imersão curta, crítica e orientada à decisão</h2>
            <p className="muted">O objetivo não é produzir volume documental. É capturar evidências suficientes para decidir por onde a blindagem começa.</p>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item"><div className="period">Dia 1</div><div><h3>Abertura executiva</h3><p className="muted">Alinhamento de objetivo, sponsor, confidencialidade, áreas participantes e escopo inicial.</p><span className="tag">direção</span><span className="tag">sponsor</span></div><div className="result-badge"><strong>Saída:</strong><br />mandato do diagnóstico</div></div>
          <div className="timeline-item"><div className="period">Dias 2 a 4</div><div><h3>Entrevistas críticas</h3><p className="muted">Conversas com alta gestão, jurídico, comunicação, operação, RH e áreas expostas.</p><span className="tag">stakeholders</span><span className="tag">evidência</span></div><div className="result-badge"><strong>Saída:</strong><br />mapa de percepções</div></div>
          <div className="timeline-item"><div className="period">Dias 5 a 6</div><div><h3>Leitura de documentos e fluxos</h3><p className="muted">Análise de políticas, organogramas, canais, históricos de incidentes e materiais existentes.</p><span className="tag">documentos</span><span className="tag">processos</span></div><div className="result-badge"><strong>Saída:</strong><br />lacunas formais</div></div>
          <div className="timeline-item"><div className="period">Dias 7 a 8</div><div><h3>Classificação de riscos</h3><p className="muted">Aplicação da matriz de probabilidade, impacto, velocidade de propagação e prontidão atual.</p><span className="tag">score</span><span className="tag">prioridade</span></div><div className="result-badge"><strong>Saída:</strong><br />ranking executivo</div></div>
          <div className="timeline-item"><div className="period">Dias 9 a 10</div><div><h3>Síntese e plano</h3><p className="muted">Consolidação do diagnóstico e recomendação do plano de implantação dos primeiros 60 dias.</p><span className="tag">plano</span><span className="tag">implantação</span></div><div className="result-badge"><strong>Saída:</strong><br />documento final</div></div>
        </div>

        <div className="note">
          <strong>Regra metodológica:</strong> todo achado deve virar uma decisão, uma lacuna documentada ou uma prioridade de implantação. Informação sem consequência não entra no diagnóstico final.
        </div>
      </section>

      <section className="page" id="dimensoes">
        <div className="section-head">
          <div className="section-number">03</div>
          <div>
            <div className="eyebrow">Dimensões avaliadas</div>
            <h2>Seis lentes para enxergar a prontidão real</h2>
            <p className="muted">A análise cruza risco reputacional com capacidade prática de resposta. A empresa pode saber o que deve fazer e, ainda assim, não conseguir fazer.</p>
          </div>
        </div>

        <div className="track-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="track-card">
            <h3>Governança de crise</h3>
            <p className="muted">Quem decide, quem aprova, quem substitui, quais limites existem e onde a cadeia de comando fica ambígua.</p>
          </div>
          <div className="track-card">
            <h3>Risco reputacional</h3>
            <p className="muted">Temas sensíveis, histórico de exposição, narrativas prováveis, públicos críticos e vulnerabilidade pública.</p>
          </div>
          <div className="track-card">
            <h3>Operação e continuidade</h3>
            <p className="muted">Dependências operacionais, pontos únicos de falha, canais de escalonamento e impacto no serviço.</p>
          </div>
          <div className="track-card">
            <h3>Jurídico e compliance</h3>
            <p className="muted">Limites de fala, obrigações regulatórias, riscos de confissão indevida e interface com autoridades.</p>
          </div>
          <div className="track-card">
            <h3>Pessoas e cultura</h3>
            <p className="muted">Comunicação interna, rumores, liderança intermediária, segurança psicológica e conduta da equipe.</p>
          </div>
          <div className="track-card">
            <h3>Dados e canais</h3>
            <p className="muted">Acesso a informação, registros, fontes oficiais, canais de comunicação e rastreabilidade de decisões.</p>
          </div>
        </div>

        <div className="maturity">
          <div className="maturity-card"><div className="level">1</div><h3>Reativo</h3><p className="muted">Não há fluxo confiável. A resposta depende de pessoas específicas e improviso.</p></div>
          <div className="maturity-card"><div className="level">2</div><h3>Fragmentado</h3><p className="muted">Há iniciativas isoladas, mas sem coordenação entre áreas e liderança.</p></div>
          <div className="maturity-card"><div className="level">3</div><h3>Definido</h3><p className="muted">Papéis e materiais existem, mas ainda não foram testados sob pressão.</p></div>
          <div className="maturity-card"><div className="level">4</div><h3>Validado</h3><p className="muted">Fluxos foram testados, corrigidos e absorvidos pelos responsáveis.</p></div>
          <div className="maturity-card"><div className="level">5</div><h3>Maduro</h3><p className="muted">A empresa mede, treina, revisa e mantém a prontidão como rotina executiva.</p></div>
        </div>
      </section>

      <section className="page" id="entrevistas">
        <div className="section-head">
          <div className="section-number">04</div>
          <div>
            <div className="eyebrow">Roteiro de entrevistas</div>
            <h2>Perguntas que revelam o risco antes do incidente</h2>
            <p className="muted">As entrevistas são desenhadas para tirar a empresa do discurso institucional e chegar à operação real.</p>
          </div>
        </div>

        <table>
          <thead>
            <tr><th>Público entrevistado</th><th>Perguntas centrais</th><th>Evidência buscada</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>CEO ou sponsor</strong></td><td>Quais crises poderiam comprometer valor, confiança ou continuidade? Quem pode decidir em seu nome?</td><td>Mandato, apetite a risco e limites de decisão.</td></tr>
            <tr><td><strong>Jurídico e compliance</strong></td><td>Quais temas não podem ser comunicados sem validação? Quais obrigações têm prazo legal?</td><td>Restrições de fala, notificações e zonas de exposição.</td></tr>
            <tr><td><strong>Comunicação e marketing</strong></td><td>Quais canais oficiais respondem primeiro? Existe Q&A para temas sensíveis?</td><td>Capacidade de resposta pública e consistência narrativa.</td></tr>
            <tr><td><strong>Operação</strong></td><td>Onde um incidente se espalha mais rápido? Como a informação chega à liderança?</td><td>Pontos únicos de falha, escalonamento e tempo de reação.</td></tr>
            <tr><td><strong>RH e pessoas</strong></td><td>Como colaboradores recebem orientação em crise? Quem segura a comunicação interna?</td><td>Risco de rumor, desalinhamento e perda de confiança interna.</td></tr>
            <tr><td><strong>TI, dados e segurança</strong></td><td>Quais sistemas sustentam a operação? Quem confirma a verdade técnica durante crise?</td><td>Integridade de dados, acesso, logs e continuidade digital.</td></tr>
          </tbody>
        </table>

        <div className="grid-3" style={{ marginTop: '12px' }}>
          <div className="card soft"><h3>O que ouvir</h3><p className="muted">Contradições, dependências invisíveis, decisões sem dono e riscos tratados como tabu.</p></div>
          <div className="card soft"><h3>O que pedir</h3><p className="muted">Organogramas, fluxos, políticas, comunicados antigos, incidentes anteriores e canais oficiais.</p></div>
          <div className="card soft"><h3>O que registrar</h3><p className="muted">Achado, impacto, evidência, responsável, urgência e recomendação de resposta.</p></div>
        </div>
      </section>

      <section className="page" id="prioridades">
        <div className="section-head">
          <div className="section-number">05</div>
          <div>
            <div className="eyebrow">Matriz de prioridades</div>
            <h2>Nem todo risco é prioridade de implantação</h2>
            <p className="muted">A matriz separa riscos graves de riscos que realmente exigem ação imediata dentro do Protocolo Escudo.</p>
          </div>
        </div>

        <div className="graphic">
          <h3>Critérios de classificação executiva</h3>
          <table>
            <thead><tr><th>Critério</th><th>Leitura</th><th>Peso prático</th></tr></thead>
            <tbody>
              <tr><td><strong>Probabilidade</strong></td><td>Chance do evento ocorrer considerando histórico, setor e controles atuais.</td><td>Define recorrência e necessidade de monitoramento.</td></tr>
              <tr><td><strong>Impacto</strong></td><td>Dano financeiro, operacional, jurídico, reputacional e humano.</td><td>Define o nível de proteção exigido.</td></tr>
              <tr><td><strong>Velocidade</strong></td><td>Tempo para o incidente sair do controle interno e virar pressão externa.</td><td>Define urgência de resposta e canais.</td></tr>
              <tr><td><strong>Prontidão atual</strong></td><td>Existência de papéis, fluxos, mensagens, treinamento e autoridade.</td><td>Define se a empresa consegue responder hoje.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="matrix">
          <div></div><div className="axis">Baixa prontidão</div><div className="axis">Alta prontidão</div>
          <div className="axis y">Alto impacto</div>
          <div className="matrix-cell dark"><strong>Prioridade 1</strong><span>Implantar estrutura imediata e testar no The Worst Day.</span></div>
          <div className="matrix-cell soft"><strong>Prioridade 2</strong><span>Revisar fluxo, mensagem e responsáveis antes da simulação.</span></div>
          <div className="axis y">Baixo impacto</div>
          <div className="matrix-cell soft"><strong>Prioridade 3</strong><span>Criar controle, orientar gestores e monitorar evolução.</span></div>
          <div className="matrix-cell"><strong>Registro</strong><span>Manter documentado e revisar em ciclo recorrente.</span></div>
        </div>

        <div className="note">
          <strong>Critério de corte:</strong> se um risco tem alto impacto e baixa prontidão, ele entra no plano dos primeiros 60 dias mesmo que a probabilidade pareça moderada.
        </div>
      </section>

      <section className="page" id="plano">
        <div className="section-head">
          <div className="section-number">06</div>
          <div>
            <div className="eyebrow">Plano dos primeiros 10 dias</div>
            <h2>O diagnóstico precisa sair com decisão, não com contemplação</h2>
            <p className="muted">Ao fim da imersão, a empresa recebe uma lista objetiva do que deve ser feito primeiro e por quê.</p>
          </div>
        </div>

        <div className="decision-grid">
          <div className="decision-card"><div className="index">1</div><div><strong>Nomear sponsor e comitê mínimo</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Definir autoridade executiva, substitutos e áreas essenciais para condução.</p></div></div>
          <div className="decision-card"><div className="index">2</div><div><strong>Selecionar riscos prioritários</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Escolher os cenários que entram no plano central de resposta e na simulação.</p></div></div>
          <div className="decision-card"><div className="index">3</div><div><strong>Mapear lacunas de resposta</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Identificar onde faltam papel, fluxo, mensagem, canal, aprovação ou treinamento.</p></div></div>
          <div className="decision-card"><div className="index">4</div><div><strong>Definir entregas dos 60 dias</strong><p className="muted small" style={{ margin: '2px 0 0' }}>Organizar o plano de implantação com responsáveis, sequência e critérios de validação.</p></div></div>
        </div>

        <div className="grid-2" style={{ marginTop: '12px' }}>
          <div className="card dark">
            <h3>Saída executiva</h3>
            <p>Um plano curto, hierarquizado e defensável para orientar a implantação da estrutura essencial de resposta.</p>
          </div>
          <div className="card">
            <h3>Saída operacional</h3>
            <p className="muted">Uma lista de ações que pode ser distribuída por área, responsável, prazo e evidência de conclusão.</p>
          </div>
        </div>

        <table>
          <thead><tr><th>Decisão</th><th>Responsável típico</th><th>Prazo sugerido</th></tr></thead>
          <tbody>
            <tr><td>Confirmar sponsor e autoridade final</td><td>CEO, conselho ou diretoria designada</td><td>Dia 1</td></tr>
            <tr><td>Validar áreas entrevistadas</td><td>Sponsor e liderança Escudo</td><td>Dia 1</td></tr>
            <tr><td>Consolidar riscos de Prioridade 1</td><td>Comitê mínimo</td><td>Dia 8</td></tr>
            <tr><td>Aprovar plano dos primeiros 60 dias</td><td>Sponsor executivo</td><td>Dia 10</td></tr>
          </tbody>
        </table>
      </section>

      <section className="page" id="entregaveis">
        <div className="section-head">
          <div className="section-number">07</div>
          <div>
            <div className="eyebrow">Entregáveis</div>
            <h2>O que a empresa recebe ao final da imersão</h2>
            <p className="muted">O diagnóstico executivo é a ponte entre intenção estratégica e implantação prática.</p>
          </div>
        </div>

        <div className="deliveries">
          <div className="delivery-card"><h3>Mapa de riscos</h3><p className="muted">Cenários críticos organizados por impacto, probabilidade, velocidade e prontidão.</p></div>
          <div className="delivery-card"><h3>Mapa de lacunas</h3><p className="muted">Ausências de papel, fluxo, mensagem, canal, evidência e autoridade.</p></div>
          <div className="delivery-card"><h3>Mapa de stakeholders</h3><p className="muted">Públicos que pressionam, aprovam, fiscalizam, propagam ou sofrem impacto direto.</p></div>
          <div className="delivery-card"><h3>Ranking executivo</h3><p className="muted">Lista de prioridades para orientar gabinete, matriz, mensagens e simulação.</p></div>
          <div className="delivery-card"><h3>Plano 60 dias</h3><p className="muted">Sequência recomendada de implantação com responsáveis e evidências de avanço.</p></div>
        </div>

        <div className="quote-box" style={{ marginTop: '12px' }}>
          <h3>Texto padrão para apresentação</h3>
          <p>
            O Diagnóstico Executivo do Protocolo Escudo identifica, nos primeiros 10 dias, as vulnerabilidades mais relevantes da empresa, as lacunas de resposta e as prioridades de implantação. A entrega final orienta os primeiros 60 dias do programa, conectando riscos reais a decisões, responsáveis, fluxos e materiais que precisam ser estruturados antes de uma crise.
          </p>
        </div>

        <div className="check-grid">
          <div className="check-item">Riscos prioritários validados pela liderança.</div>
          <div className="check-item">Lacunas críticas documentadas com evidência.</div>
          <div className="check-item">Stakeholders e canais sensíveis mapeados.</div>
          <div className="check-item">Autoridades de decisão e substitutos identificados.</div>
          <div className="check-item">Plano dos primeiros 60 dias aprovado.</div>
          <div className="check-item">Base para matriz de riscos, gabinete e The Worst Day definida.</div>
        </div>

        <div className="card dark" style={{ marginTop: '12px' }}>
          <h3>Fechamento executivo</h3>
          <p style={{ color: '#fff', marginBottom: 0 }}>
            Diagnosticar não é atrasar a implantação. É impedir que a empresa construa um protocolo bonito para o risco errado.
          </p>
        </div>
      </section>
    </DocumentShell>
  );
}
