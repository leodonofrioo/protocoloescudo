import { type ReactNode, useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

export type DocumentSection = {
  id: string;
  title: string;
};

type DocumentShellProps = {
  sections: readonly DocumentSection[];
  children: ReactNode;
};

export default function DocumentShell({ sections, children }: DocumentShellProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const scrollableHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      setScrollProgress(
        scrollableHeight > 0 ? Math.min((totalScroll / scrollableHeight) * 100, 100) : 0,
      );

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="detalhamento-layout">
      <div className="progress-bar-container no-print">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <aside className="toc-sidebar no-print">
        <div className="toc-header">
          <h3>Índice</h3>
          <button className="print-btn" onClick={() => window.print()} title="Exportar PDF">
            <Printer size={16} /> Exportar
          </button>
        </div>
        <nav className="toc-nav">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <article className="document-paper">{children}</article>
    </div>
  );
}
