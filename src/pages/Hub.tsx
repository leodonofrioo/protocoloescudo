import { Link } from 'react-router-dom';
import { protocolData } from '../data/protocol';
import { ArrowRight, Clock, FileText, Lock, Presentation, Settings2 } from 'lucide-react';
import './Hub.css';

export default function Hub() {
  const documentsList: { title: string; progress: number; status: string; route: string | null }[] = [
    { title: 'Documento Executivo', progress: 60, status: 'Em Produção', route: '/detalhamento' },
    { title: 'Diagnóstico Executivo', progress: 60, status: 'Em Produção', route: '/diagnostico' },
    { title: 'Matriz de Riscos', progress: 60, status: 'Em Produção', route: '/matriz-riscos' },
    { title: 'Manual do Gabinete de Crise', progress: 60, status: 'Em Produção', route: '/gabinete-crise' },
    { title: 'Preços e Políticas comerciais', progress: 60, status: 'Em Produção', route: '/precos-politicas-comerciais' },
    { title: 'Sistema de Apresentações', progress: 60, status: 'Em Produção', route: '/apresentacoes' },
    { title: 'Apresentação Completa', progress: 60, status: 'Em Produção', route: '/apresentacao' },
    { title: 'Apresentação Resumida', progress: 60, status: 'Em Produção', route: '/apresentacao-resumida' },
    { title: 'Mensagens Críticas e Q&A', progress: 60, status: 'Em Produção', route: null },
    { title: 'Fluxo de Acionamento', progress: 60, status: 'Em Produção', route: null },
    { title: 'Relatórios de Prontidão', progress: 60, status: 'Em Produção', route: null },
    { title: 'The Worst Day (Simulação)', progress: 60, status: 'Em Produção', route: '/the-worst-day' },
    { title: 'Central Escudo de Prontidão', progress: 60, status: 'Em Produção', route: '/central-prontidao' },
  ];

  const totalDocs = documentsList.length;
  const overallProgress = Math.round(
    documentsList.reduce((total, doc) => total + doc.progress, 0) / totalDocs,
  );

  return (
    <div className="hub-container animate-fade-in-up">
      <div className="hero-section">
        <div className="hero-pill">{protocolData.subtitle}</div>
        <h1 className="hero-title">{protocolData.title}</h1>
        <p className="hero-desc">{protocolData.description}</p>
        <div className="presentation-actions">
          <Link to="/apresentacao" className="presentation-cta">
            <Presentation size={18} />
            Apresentação Completa
          </Link>
          <Link to="/apresentacao-resumida" className="presentation-cta presentation-cta-secondary">
            <Presentation size={18} />
            Versão Resumida
          </Link>
          <Link to="/apresentacoes" className="presentation-cta presentation-cta-secondary">
            <Settings2 size={18} />
            Gerenciar Apresentações
          </Link>
        </div>
      </div>

      <div className="stats-row">
        {protocolData.stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="hub-section">
        <h2 className="section-label">📋 Progresso dos Documentos e Ferramentas</h2>

        <div className="premium-card standard-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
            <h3 className="card-title" style={{ margin: 0 }}>
              Progresso Geral - {totalDocs} arquivos em produção
            </h3>
            <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '24px' }}>{overallProgress}%</span>
          </div>

          <div style={{ width: '100%', height: '6px', background: 'var(--line)', borderRadius: '999px', overflow: 'hidden', marginBottom: '32px' }}>
            <div style={{ width: `${overallProgress}%`, height: '100%', background: 'var(--accent)', transition: 'width 1s ease-out' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documentsList.map(doc => {
              const baseStyle: React.CSSProperties = {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px',
                background: 'transparent',
                borderRadius: '10px',
                border: '1px solid var(--line)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s, transform 0.2s',
              };

              return (
                <div
                  key={doc.title}
                  style={{ ...baseStyle, cursor: 'pointer' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    el.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="document-card-header">
                    <div className="document-card-title">
                      <Clock size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <div>
                        <span>{doc.title}</span>
                        <div className="document-card-status">{doc.status}</div>
                      </div>
                    </div>
                    <div className="document-card-progress">
                      <span>{doc.progress}%</span>
                      {doc.route && <ArrowRight size={16} color="var(--accent)" />}
                    </div>
                  </div>

                  <div className="document-progress-track">
                    <div className="document-progress-fill" style={{ width: `${doc.progress}%` }} />
                  </div>

                  <div className="document-card-actions">
                    {doc.route ? (
                      <Link to={doc.route} className="internal-file-button">
                        <FileText size={15} />
                        Arquivo interno
                      </Link>
                    ) : (
                      <button className="internal-file-button" type="button" disabled>
                        <FileText size={15} />
                        Arquivo interno
                      </button>
                    )}

                    <button className="client-model-button" type="button" disabled>
                      <Lock size={15} />
                      Modelo do cliente: Em Produção
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
