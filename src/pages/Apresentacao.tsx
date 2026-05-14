import { type PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Target,
} from 'lucide-react';
import './Apresentacao.css';

type Slide = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets?: string[];
  metrics?: { value: string; label: string }[];
  kind?: 'cover' | 'problem' | 'method' | 'offer' | 'close';
};

const slides: Slide[] = [
  {
    eyebrow: 'Protocolo Escudo',
    title: 'A empresa não improvisa no pior dia.',
    lead:
      'Um sistema executivo para preparar liderança, porta-vozes e áreas críticas antes que uma crise pressione reputação, caixa e confiança.',
    metrics: [
      { value: '60 dias', label: 'implantação essencial' },
      { value: '120 dias', label: 'acompanhamento assistido' },
      { value: '1 sistema', label: 'governança, treino e resposta' },
    ],
    kind: 'cover',
  },
  {
    eyebrow: 'O risco real',
    title: 'Crise não espera alinhamento interno.',
    lead:
      'Quando a pressão chega, a empresa precisa saber quem decide, quem fala, qual fluxo aciona e quais mensagens sustentam a resposta.',
    bullets: [
      'Lideranças expostas a decisões fragmentadas.',
      'Porta-vozes sem treino para ambiente hostil.',
      'Áreas críticas sem gatilhos claros de escalonamento.',
      'Narrativas públicas e internas sendo criadas tarde demais.',
    ],
    kind: 'problem',
  },
  {
    eyebrow: 'A solução',
    title: 'O Escudo instala capacidade de resposta.',
    lead:
      'O programa combina diagnóstico, gabinete de crise, playbooks, mensagens, trilhas de prontidão e simulação realista.',
    bullets: [
      'Diagnóstico executivo da prontidão atual.',
      'Desenho do gabinete, papéis, fluxos e critérios de acionamento.',
      'Central Escudo de Prontidão com materiais e trilhas por perfil.',
      'Simulação The Worst Day para testar resposta sob pressão.',
    ],
    kind: 'method',
  },
  {
    eyebrow: 'Jornada de implantação',
    title: 'Da leitura do risco ao ensaio do pior cenário.',
    lead:
      'A implantação cria uma base objetiva, organiza a governança, capacita perfis-chave e valida a resposta em ambiente controlado.',
    metrics: [
      { value: '1-10', label: 'diagnóstico e prioridades' },
      { value: '11-40', label: 'estrutura, fluxos e materiais' },
      { value: '41-60', label: 'treinos, validação e simulação' },
    ],
    kind: 'method',
  },
  {
    eyebrow: 'O que o cliente recebe',
    title: 'Entregáveis que ficam dentro da operação.',
    lead:
      'O resultado não é uma apresentação de consultoria: é uma estrutura utilizável quando a organização precisar responder.',
    bullets: [
      'Mapa de riscos prioritários e lacunas de prontidão.',
      'Manual do Gabinete de Crise com papéis e ritos.',
      'Matriz de mensagens críticas e Q&A.',
      'Central de Prontidão com trilhas, materiais e evidências.',
      'Relatório de simulação com plano corretivo.',
    ],
    kind: 'offer',
  },
  {
    eyebrow: 'Valor para a liderança',
    title: 'Mais velocidade, menos ruído, mais autoridade.',
    lead:
      'O Escudo reduz improviso, protege a tomada de decisão e cria linguagem comum entre conselho, presidência, jurídico, comunicação, operação e RH.',
    bullets: [
      'Decisão concentrada nos papéis certos.',
      'Resposta pública mais consistente.',
      'Menos dependência de memória individual.',
      'Evolução mensurável da prontidão.',
    ],
    kind: 'offer',
  },
  {
    eyebrow: 'Fechamento',
    title: 'A pergunta não é se a empresa terá crise.',
    lead:
      'A pergunta é se, quando ela chegar, a liderança já terá método, linguagem, autoridade e treino para responder.',
    metrics: [
      { value: 'Pronto', label: 'para diagnosticar' },
      { value: 'Pronto', label: 'para treinar' },
      { value: 'Pronto', label: 'para responder' },
    ],
    kind: 'close',
  },
];

const slideIcons = {
  cover: ShieldCheck,
  problem: Target,
  method: Clock3,
  offer: Building2,
  close: CheckCircle2,
};

export default function Apresentacao() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const progress = useMemo(
    () => Math.round(((activeSlide + 1) / slides.length) * 100),
    [activeSlide],
  );

  const goToSlide = (index: number) => {
    setActiveSlide(Math.max(0, Math.min(slides.length - 1, index)));
  };

  const nextSlide = () => goToSlide(activeSlide + 1);
  const previousSlide = () => goToSlide(activeSlide - 1);

  useEffect(() => {
    document.body.classList.add('presentation-mode');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setActiveSlide(slide => Math.min(slides.length - 1, slide + 1));
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setActiveSlide(slide => Math.max(0, slide - 1));
      }

      if (event.key === 'Escape' && isFullscreen && !document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.body.classList.remove('presentation-mode');
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await stageRef.current?.requestFullscreen();
        if (!document.fullscreenElement) setIsFullscreen(true);
      } catch {
        setIsFullscreen(true);
      }
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 48) return;
    if (delta < 0) nextSlide();
    if (delta > 0) previousSlide();
  };

  return (
    <section
      ref={stageRef}
      className={`presentation-stage animate-fade-in-up${isFullscreen ? ' presentation-stage-fullscreen' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="presentation-topline">
        <Link to="/" className="presentation-back">
          <ArrowLeft size={17} />
          Central
        </Link>
        <div className="presentation-counter">
          {activeSlide + 1} / {slides.length}
        </div>
        <button
          type="button"
          className="presentation-fullscreen"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          {isFullscreen ? 'Sair' : 'Fullscreen'}
        </button>
      </div>

      <div className="presentation-progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      <button
        type="button"
        className="presentation-side-control presentation-side-control-left"
        onClick={previousSlide}
        disabled={activeSlide === 0}
        title="Slide anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="presentation-viewport">
        <div
          className="presentation-track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map(slide => {
            const SlideIcon = slideIcons[slide.kind ?? 'method'];

            return (
              <article className={`sales-slide sales-slide-${slide.kind ?? 'method'}`} key={slide.title}>
                <div className="slide-brand">
                  <img src="/images/Logo.webp" alt="Protocolo Escudo" />
                  <span>Protocolo Escudo</span>
                </div>

                <div className="slide-content">
                  <div className="slide-icon">
                    <SlideIcon size={30} />
                  </div>

                  <div>
                    <p className="slide-eyebrow">{slide.eyebrow}</p>
                    <h1>{slide.title}</h1>
                    <p className="slide-lead">{slide.lead}</p>
                  </div>

                  {slide.metrics && (
                    <div className="slide-metrics">
                      {slide.metrics.map(metric => (
                        <div className="slide-metric" key={`${slide.title}-${metric.label}`}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.bullets && (
                    <div className="slide-bullets">
                      {slide.bullets.map(item => (
                        <div className="slide-bullet" key={`${slide.title}-${item}`}>
                          <CheckCircle2 size={18} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="slide-footer">
                  <span>Apresentação comercial</span>
                  <span>{slide.eyebrow}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="presentation-side-control presentation-side-control-right"
        onClick={nextSlide}
        disabled={activeSlide === slides.length - 1}
        title="Próximo slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="presentation-controls">
        <button type="button" onClick={previousSlide} disabled={activeSlide === 0}>
          <ChevronLeft size={18} />
          Anterior
        </button>

        <div className="presentation-dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              className={index === activeSlide ? 'active' : ''}
              onClick={() => goToSlide(index)}
              title={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        <button type="button" onClick={nextSlide} disabled={activeSlide === slides.length - 1}>
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="presentation-mobile-hint">
        Arraste para o lado ou toque nas setas para avançar.
      </div>
    </section>
  );
}
