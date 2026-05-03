import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import './Detalhamento.css'; // Reusing A4 document styles
import './MatrizRiscos.css';

export default function MatrizRiscos() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('capa');

  const sections = [
    { id: 'capa', title: 'Capa' },
    { id: 'metodologia', title: 'Metodologia' },
    { id: 'matriz-calor', title: 'Mapa de Calor' },
    { id: 'riscos-operacionais', title: 'Riscos Operacionais' },
    { id: 'riscos-reputacionais', title: 'Riscos Reputacionais' },
    { id: 'planos-acao', title: 'Planos de Ação' }
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
                Documento Oficial<br />
                Mapeamento e Classificação de Ameaças<br />
                Estritamente Confidencial
              </div>
            </div>

            <div className="cover-title">
              <div className="pill">Diagnóstico Priorizado</div>
              <h1>Matriz de Riscos</h1>
              <p className="lead">Identificação, avaliação de impacto e protocolos de contingência para os cenários críticos da organização.</p>
            </div>

            <div className="cover-grid">
              <div className="quote-box">
                <h3>Objetivo do Documento</h3>
                <p className="lead" style={{fontSize:"16px",marginBottom:"0"}}>Mapear as vulnerabilidades operacionais e reputacionais de maior impacto, fornecendo à alta liderança clareza sobre o nível de exposição atual e os protocolos de mitigação pré-estabelecidos.</p>
              </div>

              <div className="card dark">
                <div className="icon-title">
                  <span className="icon" style={{background:"#1b1b1b",borderColor:"#333"}}>
                    <svg viewBox="0 0 24 24" style={{stroke:"#fff"}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </span>
                  <h3 style={{margin:"0"}}>Visão Preditiva</h3>
                </div>
                <p className="muted">Transformar a incerteza em processos. Categorizar a probabilidade e o impacto de cada crise para não depender de improviso da equipe quando o cenário hostil se concretizar.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page" id="metodologia">
          <div className="section-head">
            <div className="section-number">01</div>
            <div>
              <div className="eyebrow">Critérios de Avaliação</div>
              <h2>Metodologia de Classificação</h2>
              <p className="muted">Como os riscos são identificados, avaliados e priorizados pela nossa equipe.</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card soft">
              <h3>Eixo Y: Probabilidade</h3>
              <p className="muted">Qual a chance do evento ocorrer considerando o histórico do setor, da empresa e as defesas atuais.</p>
              <ul style={{ paddingLeft: '15px' }}>
                <li><strong>Rara (1):</strong> Evento atípico e altamente improvável.</li>
                <li><strong>Possível (2):</strong> Cenário que ocorre no mercado, mas com controles internos.</li>
                <li><strong>Provável (3):</strong> Evento frequente no setor, com defesas frágeis.</li>
                <li><strong>Quase Certa (4):</strong> Ocorrência iminente devido a histórico de falhas.</li>
              </ul>
            </div>
            <div className="card soft">
              <h3>Eixo X: Impacto</h3>
              <p className="muted">O nível de dano operacional, financeiro e reputacional se o evento se materializar.</p>
              <ul style={{ paddingLeft: '15px' }}>
                <li><strong>Baixo (1):</strong> Absorvido pela operação sem exposição pública.</li>
                <li><strong>Moderado (2):</strong> Impacto local, atenção da imprensa regional.</li>
                <li><strong>Grave (3):</strong> Danos financeiros severos, exposição nacional.</li>
                <li><strong>Crítico (4):</strong> Risco de continuidade do negócio, colapso de reputação.</li>
              </ul>
            </div>
          </div>

          <div className="quote-box" style={{ marginTop: '12px' }}>
            <h3>Score de Risco = Probabilidade × Impacto</h3>
            <p className="lead" style={{ marginBottom: 0 }}>O Score final (de 1 a 16) determina a zona de calor do risco e a urgência no preparo da resposta do Gabinete de Crise.</p>
          </div>
        </section>

        <section className="page" id="matriz-calor">
          <div className="section-head">
            <div className="section-number">02</div>
            <div>
              <div className="eyebrow">Diagnóstico Visual</div>
              <h2>O Mapa de Calor (Heatmap)</h2>
              <p className="muted">Distribuição dos riscos mapeados conforme as zonas de criticidade e atenção gerencial.</p>
            </div>
          </div>

          <div className="heatmap-container">
            <div className="heatmap-y-axis">PROBABILIDADE</div>
            <div className="heatmap-grid">
              <div className="heatmap-cell medium">4 (Q. Certa)<br/><span>Baixo (4)</span></div>
              <div className="heatmap-cell high">4 (Q. Certa)<br/><span>Moderado (8)</span></div>
              <div className="heatmap-cell extreme">4 (Q. Certa)<br/><span>Grave (12)</span></div>
              <div className="heatmap-cell extreme">4 (Q. Certa)<br/><span>Crítico (16)</span></div>
              
              <div className="heatmap-cell low">3 (Provável)<br/><span>Baixo (3)</span></div>
              <div className="heatmap-cell medium">3 (Provável)<br/><span>Moderado (6)</span></div>
              <div className="heatmap-cell high">3 (Provável)<br/><span>Grave (9)</span></div>
              <div className="heatmap-cell extreme">3 (Provável)<br/><span>Crítico (12)</span></div>
              
              <div className="heatmap-cell low">2 (Possível)<br/><span>Baixo (2)</span></div>
              <div className="heatmap-cell low">2 (Possível)<br/><span>Moderado (4)</span></div>
              <div className="heatmap-cell medium">2 (Possível)<br/><span>Grave (6)</span></div>
              <div className="heatmap-cell high">2 (Possível)<br/><span>Crítico (8)</span></div>
              
              <div className="heatmap-cell low">1 (Rara)<br/><span>Baixo (1)</span></div>
              <div className="heatmap-cell low">1 (Rara)<br/><span>Moderado (2)</span></div>
              <div className="heatmap-cell low">1 (Rara)<br/><span>Grave (3)</span></div>
              <div className="heatmap-cell medium">1 (Rara)<br/><span>Crítico (4)</span></div>
            </div>
            <div className="heatmap-x-axis">IMPACTO</div>
          </div>

          <div className="heatmap-legend">
            <div className="legend-item"><span className="color-box extreme-color"></span><strong>Crítico (12-16):</strong> Intervenção Imediata. Requer plano de ação detalhado e aprovação do CEO.</div>
            <div className="legend-item"><span className="color-box high-color"></span><strong>Alto (8-9):</strong> Mitigação Mandatória. Processos de controle devem ser implantados.</div>
            <div className="legend-item"><span className="color-box medium-color"></span><strong>Médio (4-6):</strong> Monitoramento Ativo. Planos de contenção revisados trimestralmente.</div>
            <div className="legend-item"><span className="color-box low-color"></span><strong>Baixo (1-3):</strong> Risco Aceitável. Gerenciado através de rotinas operacionais padrão.</div>
          </div>
        </section>

        <section className="page" id="riscos-operacionais">
          <div className="section-head">
            <div className="section-number">03</div>
            <div>
              <div className="eyebrow">Categoria de Risco</div>
              <h2>Riscos Operacionais e Jurídicos</h2>
              <p className="muted">Eventos que comprometem a capacidade de entrega, segurança da informação ou conformidade regulatória.</p>
            </div>
          </div>

          <div className="risk-table">
            <div className="risk-row header">
              <div className="r-id">ID</div>
              <div className="r-desc">Descrição do Cenário</div>
              <div className="r-score">Score</div>
              <div className="r-status">Classificação</div>
            </div>
            <div className="risk-row">
              <div className="r-id">RO-01</div>
              <div className="r-desc"><strong>Vazamento Massivo de Dados (LGPD)</strong><br/><span className="muted">Invasão cibernética expondo dados sensíveis de clientes e parceiros.</span></div>
              <div className="r-score">12</div>
              <div className="r-status"><span className="badge extreme">Crítico</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RO-02</div>
              <div className="r-desc"><strong>Acidente Fatal em Operação</strong><br/><span className="muted">Acidente envolvendo frota, maquinário ou espaço físico com vítima fatal.</span></div>
              <div className="r-score">9</div>
              <div className="r-status"><span className="badge high">Alto</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RO-03</div>
              <div className="r-desc"><strong>Interrupção Severa de Sistema Core</strong><br/><span className="muted">Indisponibilidade prolongada (24h+) de sistema central paralisando as vendas.</span></div>
              <div className="r-score">6</div>
              <div className="r-status"><span className="badge medium">Médio</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RO-04</div>
              <div className="r-desc"><strong>Ação Trabalhista Coletiva e Abusiva</strong><br/><span className="muted">Movimento orquestrado por sindicatos gerando multas milionárias e bloqueios judiciais.</span></div>
              <div className="r-score">4</div>
              <div className="r-status"><span className="badge medium">Médio</span></div>
            </div>
          </div>
        </section>

        <section className="page" id="riscos-reputacionais">
          <div className="section-head">
            <div className="section-number">04</div>
            <div>
              <div className="eyebrow">Categoria de Risco</div>
              <h2>Riscos Reputacionais e Digitais</h2>
              <p className="muted">Cenários que afetam diretamente a percepção pública, imagem da marca e confiança do consumidor.</p>
            </div>
          </div>

          <div className="risk-table">
            <div className="risk-row header">
              <div className="r-id">ID</div>
              <div className="r-desc">Descrição do Cenário</div>
              <div className="r-score">Score</div>
              <div className="r-status">Classificação</div>
            </div>
            <div className="risk-row">
              <div className="r-id">RR-01</div>
              <div className="r-desc"><strong>Campanha de Cancelamento em Redes Sociais</strong><br/><span className="muted">Viralização de vídeo/áudio fora de contexto envolvendo a marca de forma hostil.</span></div>
              <div className="r-score">12</div>
              <div className="r-status"><span className="badge extreme">Crítico</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RR-02</div>
              <div className="r-desc"><strong>Exposição Negativa de Alta Liderança</strong><br/><span className="muted">Escândalo envolvendo C-Level (assédio, fala preconceituosa) divulgado pela grande mídia.</span></div>
              <div className="r-score">16</div>
              <div className="r-status"><span className="badge extreme">Crítico</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RR-03</div>
              <div className="r-desc"><strong>Associação com Fornecedor Escandaloso</strong><br/><span className="muted">Fornecedor principal indiciado por práticas de trabalho análogas à escravidão.</span></div>
              <div className="r-score">8</div>
              <div className="r-status"><span className="badge high">Alto</span></div>
            </div>
            <div className="risk-row">
              <div className="r-id">RR-04</div>
              <div className="r-desc"><strong>Reclamação Sistêmica por Quebra de Expectativa</strong><br/><span className="muted">Produto/serviço que não entrega promessa causando revolta massiva organizada.</span></div>
              <div className="r-score">6</div>
              <div className="r-status"><span className="badge medium">Médio</span></div>
            </div>
          </div>
        </section>

        <section className="page" id="planos-acao">
          <div className="section-head">
            <div className="section-number">05</div>
            <div>
              <div className="eyebrow">Ações Práticas</div>
              <h2>Planos de Contenção (Mitigação)</h2>
              <p className="muted">Estratégias definidas pelo Protocolo Escudo para lidar imediatamente com os riscos de criticidade extrema e alta.</p>
            </div>
          </div>

          <div className="track-grid" style={{ gridTemplateColumns: '1fr', marginTop: '12px', gap: '16px' }}>
            <div className="track-card">
              <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RR-02: Exposição de Alta Liderança</span>
                <span className="badge extreme">Score: 16</span>
              </h3>
              <p className="muted">Afastamento temporário imediato do executivo envolvido. Acionamento do Comitê de Ética externo para apuração. Preparo de nota pública focando na aderência irrestrita aos valores da corporação e zero complacência com desvios, comunicada em até 2 horas. Porta-voz: Presidente do Conselho.</p>
            </div>
            <div className="track-card">
              <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RO-01: Vazamento de Dados (LGPD)</span>
                <span className="badge extreme">Score: 12</span>
              </h3>
              <p className="muted">Isolamento de servidores, acionamento de forense computacional. Comunicado pró-ativo à ANPD em até 48h. Disparo de e-mail transparente aos clientes afetados informando ações corretivas e canais de dúvidas. Disponibilização de monitoramento de crédito gratuito como compensação.</p>
            </div>
            <div className="track-card">
              <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RR-01: Cancelamento em Redes</span>
                <span className="badge extreme">Score: 12</span>
              </h3>
              <p className="muted">Pausa imediata em todas as campanhas de marketing pagas (Dark Post e Ads). Escuta ativa de menções (Social Listening). Resposta não reativa e empática apenas em nota oficial centralizada, sem embate 1:1. Acionamento de advogados para remoção de conteúdos caluniosos identificados.</p>
            </div>
            <div className="track-card">
              <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RO-02: Acidente Fatal</span>
                <span className="badge high">Score: 9</span>
              </h3>
              <p className="muted">Isolamento imediato do local, colaboração total com autoridades e interrupção da operação na unidade. Equipe de assistência social enviada imediatamente à família da vítima. Nota à imprensa restrita à solidariedade e colaboração investigativa, sem assunção de culpa prévia.</p>
            </div>
          </div>
          
          <div className="card dark" style={{ marginTop: '24px' }}>
            <h3>Próximos Passos (Gabinete de Crise)</h3>
            <p style={{ marginTop: '8px', color: '#fff' }}>A Matriz de Riscos é um documento vivo. Os cenários classificados como Críticos devem ter seus simulados previstos na próxima rodada do <strong>The Worst Day</strong> para avaliar a efetividade da comunicação tática desenhada na resposta.</p>
          </div>
        </section>

      </article>
    </div>
  );
}
