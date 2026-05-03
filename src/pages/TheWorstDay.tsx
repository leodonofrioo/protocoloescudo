import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import './Detalhamento.css';

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'objetivo', title: 'O Objetivo do Ensaio' },
  { id: 'regras', title: 'Regras de Engajamento' },
  { id: 'fases', title: 'As 5 Fases do Caos' },
  { id: 'cenarios', title: 'Vetores de Ataque' },
  { id: 'avaliacao', title: 'Métricas de Colapso' },
  { id: 'debriefing', title: 'Debriefing e Reconstrução' },
];

export default function TheWorstDay() {
  return (
    <DocumentShell sections={sections}>
        <section className="page cover" id="capa">
          <div>
            <div className="cover-top">
              <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
              <div className="cover-meta">
                Documento Executivo<br />
                Ensaio Prático de Alta Pressão<br />
                Restrito e Confidencial
              </div>
            </div>

            <div className="cover-title">
              <div className="pill">The Worst Day</div>
              <h1>O Pior Dia</h1>
              <p className="lead">Onde o planejamento estratégico encontra a brutalidade da realidade operacional.</p>
            </div>

            <div className="cover-grid">
              <div className="quote-box">
                <h3>A Finalidade do Ensaio</h3>
                <p className="lead" style={{fontSize:"16px",marginBottom:"0"}}>Testar os limites do Gabinete de Crise não é um exercício acadêmico. É a única forma de descobrir onde a cadeia de comando irá falhar antes que o mercado e a imprensa o façam.</p>
              </div>

              <div className="card dark">
                <div className="icon-title">
                  <span className="icon" style={{background:"#1b1b1b",borderColor:"#333"}}>
                    <svg viewBox="0 0 24 24" style={{stroke:"#fff"}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </span>
                  <h3 style={{margin:"0"}}>Estresse Institucional</h3>
                </div>
                <p className="muted">O The Worst Day aplica sobrecarga na matriz de aprovação, no controle emocional e na coesão do conselho diretor. Submetemos o papel à prova de fogo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page" id="objetivo">
          <div className="section-head">
            <div className="section-number">01</div>
            <div>
              <div className="eyebrow">Razão de Existir</div>
              <h2>O Objetivo do Ensaio</h2>
              <p className="muted">Saber o que fazer na teoria raramente resiste ao caos prático da perda de controle.</p>
            </div>
          </div>

          <div className="quote-box">
            <h3>Ninguém sobrevive ao ringue usando apenas manual</h3>
            <p className="lead" style={{marginBottom:"0"}}>O objetivo primordial do The Worst Day não é verificar se a liderança leu o protocolo, mas observar em quanto tempo o protocolo é abandonado diante do pânico e da surpresa.</p>
          </div>

          <div className="risk-strip">
            <div className="risk-card"><strong>Verificação de Velocidade</strong><span className="muted">O problema escala mais rápido do que a capacidade do conselho de convocar uma reunião?</span></div>
            <div className="risk-card"><strong>Ruído na Comunicação</strong><span className="muted">A informação chega enviesada até o C-Level, forçando decisões baseadas em inverdades?</span></div>
            <div className="risk-card"><strong>Paralisia Analítica</strong><span className="muted">O medo das consequências legais trava o posicionamento público imediato da marca?</span></div>
            <div className="risk-card"><strong>Desalinhamento Interno</strong><span className="muted">Lideranças operacionais começam a tentar apagar o incêndio por conta própria sem aviso prévio?</span></div>
          </div>
        </section>

        <section className="page" id="regras">
          <div className="section-head">
            <div className="section-number">02</div>
            <div>
              <div className="eyebrow">Contenção e Segurança</div>
              <h2>Regras de Engajamento</h2>
              <p className="muted">O ensaio exige hiper-realismo, mas a integridade estrutural e psíquica da companhia permanece resguardada.</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card dark">
              <h3>Diretrizes Invioláveis</h3>
              <ul style={{ paddingLeft: '15px', color: '#fff' }}>
                <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Isolamento:</strong> Nenhuma injeção de cenário deve transbordar para o cliente final.</li>
                <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Código de Parada:</strong> Uso da palavra-chave "Índigo" para paralisar imediatamente a simulação em caso de crise real sobreposta.</li>
                <li style={{ color: '#d5d5d5', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Blindagem Legal:</strong> Jurídico ciente (apenas o VP) para garantir que respostas simuladas não interfiram em compliances.</li>
              </ul>
            </div>
            <div className="card soft">
              <h3>Regras para a Liderança</h3>
              <ul style={{ paddingLeft: '15px' }}>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Trate como Real:</strong> Qualquer delegação passiva ("Na vida real eu ligaria para X") será considerada falha. Ligue para X no simulador.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>Não Quebre a Parede:</strong> Interagir com os facilitadores para perguntar o que deve ser feito resulta em quebra de protocolo.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--ink)' }}>O Tempo Não Para:</strong> A ausência de uma decisão é, por definição no ensaio, uma decisão de omissão com consequências pesadas.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page" id="fases">
          <div className="section-head">
            <div className="section-number">03</div>
            <div>
              <div className="eyebrow">A Estrutura da Simulação</div>
              <h2>As 5 Fases do Caos</h2>
              <p className="muted">Como a arquitetura de um incidente grave cresce de um rumor até a asfixia total da reputação da empresa.</p>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-item"><div className="period">Fase 1</div><div><h3>A Ignição Oculta (Minuto 0)</h3><p className="muted">O incidente acontece. Uma reclamação obscura em rede social ou um e-mail interno alertando sobre um vazamento. Avalia-se se o nível tático identifica e escala ao Gabinete antes da explosão pública.</p></div><div className="result-badge">Detecção</div></div>
            <div className="timeline-item"><div className="period">Fase 2</div><div><h3>A Primeira Ondulação (Minuto 30)</h3><p className="muted">A imprensa envia e-mail cobrando prazo de 10 minutos. O primeiro pânico se instaura. A equipe precisa emitir a holding statement ("holding note") sem expor responsabilidades ainda indefinidas.</p></div><div className="result-badge">Primeira<br/>Resposta</div></div>
            <div className="timeline-item"><div className="period">Fase 3</div><div><h3>Deterioração e Vazamento (Hora 1)</h3><p className="muted">Injeção de fake news e áudios falsos de diretores vazam em grupos de WhatsApp. O jurídico e a comunicação entram em colisão e precisam decidir entre negar, assumir ou processar agressivamente.</p></div><div className="result-badge">Pressão<br/>Máxima</div></div>
            <div className="timeline-item"><div className="period">Fase 4</div><div><h3>O Acuamento (Hora 2)</h3><p className="muted">O presidente/CEO é abordado agressivamente (simulação com ator jornalístico). O porta-voz principal é posto à prova sem roteiro fechado, precisando ancorar a autoridade da marca sob fogo pesado.</p></div><div className="result-badge">Porta-Voz</div></div>
            <div className="timeline-item"><div className="period">Fase 5</div><div><h3>Contenção e Exaustão (Hora 3)</h3><p className="muted">O pico recua, deixando o rastro de danos. A liderança precisa desenhar a estabilização financeira e traçar a ação reparatória sem confessar descontrole contínuo.</p></div><div className="result-badge">Descompressão</div></div>
          </div>
        </section>

        <section className="page" id="cenarios">
          <div className="section-head">
            <div className="section-number">04</div>
            <div>
              <div className="eyebrow">Modelagem Tática</div>
              <h2>Vetores de Ataque</h2>
              <p className="muted">Cenários são moldados sob medida a partir da Matriz de Riscos da empresa. Não usamos roteiros genéricos de mercado.</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card soft">
              <h3>Risco Cibernético e Extorsão</h3>
              <p className="muted">Ataque ransomware trava 100% da operação faturada. Os invasores divulgam dados bancários de clientes VIP no Twitter. A pressão é: Pagar o resgate contra o compliance, ou sangrar a imagem institucional?</p>
            </div>
            <div className="card soft">
              <h3>Risco Operacional com Vítimas</h3>
              <p className="muted">Falha na infraestrutura central gera hospitalizações. Vídeos do incidente viralizam enquanto diretores estão em voo ou incomunicáveis, deixando a equipe local sem cobertura de decisão C-Level.</p>
            </div>
            <div className="card soft">
              <h3>Ruptura Reputacional e Assédio</h3>
              <p className="muted">Dossiê anônimo acusa membros chave do conselho de assédio estrutural e lavagem de dinheiro, com prints fabricados mas convincentes. Parceiros comerciais ameaçam rasgar contratos no mesmo dia.</p>
            </div>
            <div className="card soft">
              <h3>Boicote Institucional Ativo</h3>
              <p className="muted">Posicionamento equivocado de um diretor gera boicote ideológico brutal nas redes. Funcionários exigem demissão do diretor, enquanto o conselho resiste. A empresa racha de dentro para fora.</p>
            </div>
          </div>

          <div className="note" style={{marginTop: '15px'}}><strong>Ajuste Cego:</strong> Os diretores participantes do simulado <strong>jamais</strong> saberão qual cenário foi escolhido até o exato segundo em que o primeiro alerta disparar.</div>
        </section>

        <section className="page" id="avaliacao">
          <div className="section-head">
            <div className="section-number">05</div>
            <div>
              <div className="eyebrow">Diagnóstico em Tempo Real</div>
              <h2>Métricas de Colapso</h2>
              <p className="muted">Durante o ensaio, observadores silenciosos da Equipe Escudo avaliam a performance cirurgicamente através de KPIs de Crise.</p>
            </div>
          </div>

          <div className="graphic">
            <table style={{ marginTop: '0px' }}>
              <thead><tr><th>Indicador Tático</th><th>Comportamento Alvo (O que esperamos)</th><th>Comportamento Falho (O que penalizamos)</th></tr></thead>
              <tbody>
                <tr><td><strong>Velocidade de Isolamento</strong></td><td>Isolar o vetor do problema em até 15 minutos do alerta vermelho.</td><td>Ficar debatendo de quem foi a culpa antes de focar na contenção do dano.</td></tr>
                <tr><td><strong>Clareza de Comando</strong></td><td>Uma voz final ditando o passo (CEO/Líder de Crise).</td><td>Sub-reuniões paralelas, hierarquia diluída, líderes anulados pela pressão.</td></tr>
                <tr><td><strong>Criação da Holding Note</strong></td><td>Nota de posicionamento inicial emitida à imprensa em até 30 minutos.</td><td>Silêncio corporativo por mais de uma hora. Deixar o mercado falar pela marca.</td></tr>
                <tr><td><strong>Filtro Jurídico vs Comercial</strong></td><td>Equilíbrio; não assumir culpa fatal, mas não ignorar a dor da vítima/público.</td><td>Jurídico censurando qualquer posicionamento e gerando imagem de arrogância fria.</td></tr>
                <tr><td><strong>Resiliência do Porta-Voz</strong></td><td>Manter controle emocional frente ao bombardeio hostil da mídia simulada.</td><td>Irritabilidade, negação leviana, mentiras para ganhar tempo ou gagueira.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="page" id="debriefing">
          <div className="section-head">
            <div className="section-number">06</div>
            <div>
              <div className="eyebrow">O Retorno à Normalidade</div>
              <h2>Debriefing e Reconstrução</h2>
              <p className="muted">A simulação não termina no encerramento da ameaça, mas na autópsia impiedosa das decisões tomadas.</p>
            </div>
          </div>

          <div className="quote-box">
            <h3>A Crítica Direta como Ferramenta de Crescimento</h3>
            <p className="lead" style={{marginBottom:"0"}}>O debriefing do The Worst Day não é para poupar egos. É a apresentação fria do log de falhas do conselho. Se há buracos na hierarquia, eles serão expostos.</p>
          </div>

          <div className="track-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '12px' }}>
            <div className="track-card">
              <h3>Autópsia das Decisões</h3>
              <p className="muted">Repasse minuto a minuto das ordens dadas. Verificação se os líderes ignoraram dados cruciais que estavam à disposição ou se superdimensionaram ameaças irreais.</p>
            </div>
            <div className="track-card">
              <h3>Refino do Protocolo</h3>
              <p className="muted">Ajuste definitivo do Manual de Crise. Se o papel diz que a aprovação passa por três pessoas, mas no calor da batalha só houve tempo para uma, o manual deve ser reescrito.</p>
            </div>
            <div className="track-card">
              <h3>Direcionamento Individual</h3>
              <p className="muted">Feedbacks restritos aos porta-vozes. Avaliação da postura perante câmeras e pressão, encaminhando executivos frágeis para mentorias singulares urgentes.</p>
            </div>
          </div>

          <div className="card dark" style={{ marginTop: '15px' }}>
            <h3>A Blindagem Final</h3>
            <p style={{ marginTop: '8px', color: '#fff' }}>Concluído o The Worst Day, a corporação deixa de operar no reino da teoria. Aqueles que passaram pelo estresse simulado entram na verdadeira maturidade da prontidão. Estão, a partir deste ponto, autorizados e capacitados a acionar o Protocolo Escudo na vida real.</p>
          </div>
        </section>

    </DocumentShell>
  );
}
