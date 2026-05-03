import { Link } from 'react-router-dom';
import { protocolData } from '../data/protocol';
import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import './Hub.css';

export default function Hub() {
  const documentsList: { title: string; progress: number; status: string; route: string | null }[] = [
    { title: 'Documento Executivo', progress: 100, status: 'Concluído', route: '/detalhamento' },
    { title: 'Diagnóstico Executivo', progress: 0, status: 'Pendente', route: null },
    { title: 'Matriz de Riscos', progress: 100, status: 'Concluído', route: '/matriz-riscos' },
    { title: 'Manual do Gabinete de Crise', progress: 0, status: 'Pendente', route: null },
    { title: 'Mensagens Críticas e Q&A', progress: 0, status: 'Pendente', route: null },
    { title: 'Fluxo de Acionamento', progress: 0, status: 'Pendente', route: null },
    { title: 'Relatórios de Prontidão', progress: 0, status: 'Pendente', route: null },
    { title: 'The Worst Day (Simulação)', progress: 100, status: 'Concluído', route: '/the-worst-day' },
    { title: 'Central Escudo de Prontidão', progress: 0, status: 'Pendente', route: null },
  ];

  const completedDocs = documentsList.filter(d => d.progress === 100).length;
  const totalDocs = documentsList.length;
  const overallProgress = Math.round((completedDocs / totalDocs) * 100);

  return (
    <div className="hub-container animate-fade-in-up">
      <div className="hero-section">
        <div className="hero-pill">{protocolData.subtitle}</div>
        <h1 className="hero-title">{protocolData.title}</h1>
        <p className="hero-desc">{protocolData.description}</p>
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
              Progresso Geral — {completedDocs}/{totalDocs} documentos
            </h3>
            <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '24px' }}>{overallProgress}%</span>
          </div>

          <div style={{ width: '100%', height: '6px', background: 'var(--line)', borderRadius: '999px', overflow: 'hidden', marginBottom: '32px' }}>
            <div style={{ width: `${overallProgress}%`, height: '100%', background: 'var(--accent)', transition: 'width 1s ease-out' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documentsList.map((doc, i) => {
              const inner = (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {doc.progress === 100 ? (
                        <CheckCircle size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                      ) : doc.progress > 0 ? (
                        <Clock size={18} color="var(--accent)" style={{ flexShrink: 0, opacity: 0.8 }} />
                      ) : (
                        <AlertCircle size={18} color="var(--muted)" style={{ flexShrink: 0, opacity: 0.5 }} />
                      )}
                      <span style={{
                        fontSize: '15px',
                        color: doc.progress === 100 ? 'var(--text)' : 'var(--muted)',
                        fontWeight: doc.progress === 100 ? 600 : 400,
                      }}>
                        {doc.title}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: doc.progress > 0 ? 'var(--accent)' : 'var(--muted)',
                      }}>
                        {doc.progress}%
                      </span>
                      {doc.route && <ArrowRight size={16} color="var(--accent)" />}
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '4px', background: 'var(--line)', borderRadius: '999px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{
                      width: `${doc.progress}%`,
                      height: '100%',
                      background: 'var(--accent)',
                      opacity: doc.progress === 100 ? 1 : 0.5,
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                </>
              );

              const baseStyle: React.CSSProperties = {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px',
                background: doc.progress === 100 ? 'transparent' : 'var(--soft)',
                borderRadius: '10px',
                border: doc.progress === 100 ? '1px solid var(--line)' : '1px dashed var(--line)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s, transform 0.2s',
              };

              return doc.route ? (
                <Link
                  key={i}
                  to={doc.route}
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
                  {inner}
                </Link>
              ) : (
                <div key={i} style={{ ...baseStyle, cursor: 'default' }}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
