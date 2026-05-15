import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  Plus,
  RotateCcw,
  Save,
  Server,
  Trash2,
} from 'lucide-react';
import {
  createSlideLibrary,
  formatPlanRange,
  getDefaultPresentationSystem,
  normalizePresentationSystem,
  type PresentationCustomSlide,
  type PresentationPlan,
  type PresentationSystemConfig,
  type PresentationVersionConfig,
  type SlideLibraryItem,
} from '../data/presentationSystem';
import {
  getDefaultPresentations,
  loadPresentationSystem,
  resetPresentationSystem,
  savePresentationSystem,
} from '../services/presentationsApi';
import { completePresentationSlides } from './Apresentacao';
import { summarySlides } from './ApresentacaoResumida';
import './PresentationManager.css';

type CacheStatus = 'loading' | 'synced' | 'saving' | 'offline' | 'error' | 'dirty';

type DraftSlide = {
  title: string;
  eyebrow: string;
  text: string;
  items: string;
};

const statusLabels: Record<CacheStatus, string> = {
  loading: 'Carregando servidor',
  synced: 'Salvo no servidor',
  saving: 'Salvando no servidor',
  offline: 'Servidor indisponível',
  error: 'Falha ao salvar',
  dirty: 'Alterações não salvas',
};

function makeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `versao-${Date.now()}`;
}

function linesToList(value: string) {
  return value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);
}

function listToLines(value: string[]) {
  return value.join('\n');
}

function getStatusLabel(status: CacheStatus) {
  return statusLabels[status];
}

function sourceLabel(source: SlideLibraryItem['source']) {
  if (source === 'complete') return 'Completa';
  if (source === 'summary') return 'Resumida';
  return 'Programado';
}

function createEmptyDraft(): DraftSlide {
  return {
    title: '',
    eyebrow: 'Slide programado',
    text: '',
    items: '',
  };
}

export default function PresentationManager() {
  const [config, setConfig] = useState<PresentationSystemConfig>(() =>
    normalizePresentationSystem(getDefaultPresentationSystem()),
  );
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>('loading');
  const [activeVersionId, setActiveVersionId] = useState('complete');
  const [draftSlide, setDraftSlide] = useState<DraftSlide>(() => createEmptyDraft());

  useEffect(() => {
    let isMounted = true;

    loadPresentationSystem()
      .then(serverConfig => {
        if (!isMounted) return;
        setConfig(serverConfig);
        setActiveVersionId(serverConfig.versions[0]?.id ?? 'complete');
        setCacheStatus('synced');
      })
      .catch(() => {
        if (!isMounted) return;
        setConfig(normalizePresentationSystem(getDefaultPresentations()));
        setCacheStatus('offline');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const library = useMemo(
    () => createSlideLibrary(completePresentationSlides, summarySlides, config.customSlides),
    [config.customSlides],
  );

  const slideMap = useMemo(() => new Map(library.map(slide => [slide.id, slide])), [library]);
  const activeVersion = config.versions.find(version => version.id === activeVersionId) ?? config.versions[0];

  const selectedSlides = useMemo(
    () => activeVersion.slideKeys
      .map(slideKey => slideMap.get(slideKey))
      .filter((slide): slide is SlideLibraryItem => Boolean(slide)),
    [activeVersion.slideKeys, slideMap],
  );

  const markDirty = (updater: (current: PresentationSystemConfig) => PresentationSystemConfig) => {
    setConfig(current => normalizePresentationSystem(updater({ ...current, updatedAt: new Date().toISOString() })));
    setCacheStatus(current => (current === 'loading' ? current : 'dirty'));
  };

  const updatePlan = (planId: string, updater: (plan: PresentationPlan) => PresentationPlan) => {
    markDirty(current => ({
      ...current,
      commercial: {
        ...current.commercial,
        plans: current.commercial.plans.map(plan => plan.id === planId ? updater(plan) : plan),
      },
    }));
  };

  const updateVersion = (
    versionId: string,
    updater: (version: PresentationVersionConfig) => PresentationVersionConfig,
  ) => {
    markDirty(current => ({
      ...current,
      versions: current.versions.map(version => version.id === versionId ? updater(version) : version),
    }));
  };

  const setVersionSlideKeys = (slideKeys: string[]) => {
    updateVersion(activeVersion.id, version => ({
      ...version,
      slideKeys,
      updatedAt: new Date().toISOString(),
    }));
  };

  const toggleSlide = (slideId: string) => {
    const exists = activeVersion.slideKeys.includes(slideId);
    setVersionSlideKeys(exists
      ? activeVersion.slideKeys.filter(item => item !== slideId)
      : [...activeVersion.slideKeys, slideId]);
  };

  const moveSelectedSlide = (slideId: string, direction: -1 | 1) => {
    const currentIndex = activeVersion.slideKeys.indexOf(slideId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= activeVersion.slideKeys.length) return;

    const nextSlideKeys = [...activeVersion.slideKeys];
    [nextSlideKeys[currentIndex], nextSlideKeys[nextIndex]] = [nextSlideKeys[nextIndex], nextSlideKeys[currentIndex]];
    setVersionSlideKeys(nextSlideKeys);
  };

  const createVersion = () => {
    const source = activeVersion;
    const id = `version-${Date.now()}`;
    const name = `${source.name} - Nova versão`;
    const newVersion: PresentationVersionConfig = {
      id,
      slug: makeSlug(name),
      name,
      deckLabel: 'Versão personalizada',
      description: 'Versão criada no montador de apresentações.',
      slideKeys: source.slideKeys,
      updatedAt: new Date().toISOString(),
    };

    markDirty(current => ({
      ...current,
      versions: [...current.versions, newVersion],
    }));
    setActiveVersionId(id);
  };

  const removeVersion = (versionId: string) => {
    const version = config.versions.find(item => item.id === versionId);
    if (!version || version.locked) return;

    markDirty(current => ({
      ...current,
      versions: current.versions.filter(item => item.id !== versionId),
    }));
    setActiveVersionId('complete');
  };

  const createCustomSlide = () => {
    const title = draftSlide.title.trim();
    if (!title) return;

    const id = `custom-${Date.now()}`;
    const customSlide: PresentationCustomSlide = {
      id,
      libraryLabel: title,
      eyebrow: draftSlide.eyebrow.trim() || 'Slide programado',
      title,
      text: linesToList(draftSlide.text).length > 0 ? linesToList(draftSlide.text) : ['Conteúdo comercial a revisar.'],
      tone: 'dark',
      visual: {
        type: 'checklist',
        items: linesToList(draftSlide.items).length > 0
          ? linesToList(draftSlide.items)
          : ['Ponto principal', 'Decisão necessária', 'Próximo passo'],
      },
    };

    markDirty(current => ({
      ...current,
      customSlides: [...current.customSlides, customSlide],
      versions: current.versions.map(version =>
        version.id === activeVersion.id
          ? { ...version, slideKeys: [...version.slideKeys, id], updatedAt: new Date().toISOString() }
          : version,
      ),
    }));
    setDraftSlide(createEmptyDraft());
  };

  const saveConfig = async () => {
    setCacheStatus('saving');
    try {
      const saved = await savePresentationSystem(config);
      setConfig(saved);
      setCacheStatus('synced');
    } catch {
      setCacheStatus('error');
    }
  };

  const resetConfig = async () => {
    setCacheStatus('saving');
    try {
      const defaults = await resetPresentationSystem();
      setConfig(defaults);
      setActiveVersionId(defaults.versions[0]?.id ?? 'complete');
      setCacheStatus('synced');
    } catch {
      setCacheStatus('error');
    }
  };

  return (
    <div className="presentation-manager animate-fade-in-up">
      <section className="manager-hero">
        <div>
          <span className="manager-kicker">Sistema de apresentações</span>
          <h1>Versões, valores e slides em uma única fonte.</h1>
          <p>
            Configure planos comerciais, monte novas versões e grave tudo no servidor.
            As apresentações completa, resumida e personalizadas usam o mesmo padrão visual.
          </p>
        </div>

        <div className="manager-actions">
          <div className={`manager-status ${cacheStatus}`}>
            <Server size={15} />
            {getStatusLabel(cacheStatus)}
          </div>
          <button type="button" onClick={() => void saveConfig()}>
            <Save size={15} />
            Salvar no servidor
          </button>
          <button type="button" onClick={() => void resetConfig()} className="ghost">
            <RotateCcw size={15} />
            Restaurar padrão
          </button>
        </div>
      </section>

      <section className="manager-grid manager-grid-3">
        {config.commercial.plans.map(plan => (
          <article className="manager-card" key={plan.id}>
            <div className="manager-card-head">
              <span>Plano comercial</span>
              <strong>{formatPlanRange(plan)}</strong>
            </div>

            <label>
              Nome
              <input
                value={plan.name}
                onChange={event => updatePlan(plan.id, current => ({ ...current, name: event.currentTarget.value }))}
              />
            </label>

            <div className="manager-field-row">
              <label>
                Mínimo
                <input
                  type="number"
                  min="0"
                  value={plan.minValue}
                  onChange={event => {
                    const value = event.currentTarget.valueAsNumber;
                    updatePlan(plan.id, current => ({ ...current, minValue: Number.isFinite(value) ? value : 0 }));
                  }}
                />
              </label>
              <label>
                Máximo
                <input
                  type="number"
                  min="0"
                  value={plan.maxValue}
                  onChange={event => {
                    const value = event.currentTarget.valueAsNumber;
                    updatePlan(plan.id, current => ({ ...current, maxValue: Number.isFinite(value) ? value : 0 }));
                  }}
                />
              </label>
            </div>

            <label>
              Descrição
              <textarea
                value={plan.description}
                onChange={event => updatePlan(plan.id, current => ({ ...current, description: event.currentTarget.value }))}
              />
            </label>

            <label>
              Entregáveis
              <textarea
                value={listToLines(plan.items)}
                onChange={event => updatePlan(plan.id, current => ({ ...current, items: linesToList(event.currentTarget.value) }))}
              />
            </label>
          </article>
        ))}
      </section>

      <section className="manager-grid manager-grid-main">
        <aside className="manager-card versions-panel">
          <div className="manager-card-head">
            <span>Versões salvas</span>
            <button type="button" onClick={createVersion}>
              <Copy size={14} />
              Duplicar
            </button>
          </div>

          <div className="version-list">
            {config.versions.map(version => (
              <button
                type="button"
                key={version.id}
                className={version.id === activeVersion.id ? 'active' : ''}
                onClick={() => setActiveVersionId(version.id)}
              >
                <strong>{version.deckLabel}</strong>
                <span>{version.slideKeys.length} slides</span>
              </button>
            ))}
          </div>

          {!activeVersion.locked && (
            <button type="button" className="danger-button" onClick={() => removeVersion(activeVersion.id)}>
              <Trash2 size={14} />
              Excluir versão
            </button>
          )}
        </aside>

        <div className="manager-card">
          <div className="manager-card-head">
            <span>Configuração da versão</span>
            <Link to={`/apresentacao/${activeVersion.slug}`} target="_blank">
              <Eye size={14} />
              Abrir versão
            </Link>
          </div>

          <div className="manager-field-row">
            <label>
              Nome
              <input
                value={activeVersion.name}
                onChange={event => updateVersion(activeVersion.id, current => ({
                  ...current,
                  name: event.currentTarget.value,
                }))}
              />
            </label>
            <label>
              Slug
              <input
                value={activeVersion.slug}
                onChange={event => updateVersion(activeVersion.id, current => ({
                  ...current,
                  slug: makeSlug(event.currentTarget.value),
                }))}
              />
            </label>
          </div>

          <label>
            Tag exibida na capa
            <input
              value={activeVersion.deckLabel}
              onChange={event => updateVersion(activeVersion.id, current => ({
                ...current,
                deckLabel: event.currentTarget.value,
              }))}
            />
          </label>

          <label>
            Descrição interna
            <textarea
              value={activeVersion.description}
              onChange={event => updateVersion(activeVersion.id, current => ({
                ...current,
                description: event.currentTarget.value,
              }))}
            />
          </label>

          <div className="selected-slide-list">
            <div className="manager-card-head compact">
              <span>Ordem da versão</span>
              <strong>{selectedSlides.length} slides</strong>
            </div>

            {selectedSlides.map((slide, index) => (
              <div className="selected-slide-row" key={`${slide.id}-${index}`}>
                <span>{index + 1}</span>
                <div>
                  <strong>{slide.title}</strong>
                  <small>{sourceLabel(slide.source)} - {slide.libraryLabel}</small>
                </div>
                <button type="button" onClick={() => moveSelectedSlide(slide.id, -1)} disabled={index === 0}>
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveSelectedSlide(slide.id, 1)}
                  disabled={index === selectedSlides.length - 1}
                >
                  <ArrowDown size={14} />
                </button>
                <button type="button" onClick={() => toggleSlide(slide.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manager-grid manager-grid-main">
        <div className="manager-card">
          <div className="manager-card-head">
            <span>Biblioteca de slides</span>
            <strong>{library.length} disponíveis</strong>
          </div>

          <div className="slide-picker">
            {library.map(slide => (
              <label className="slide-picker-row" key={slide.id}>
                <input
                  type="checkbox"
                  checked={activeVersion.slideKeys.includes(slide.id)}
                  onChange={() => toggleSlide(slide.id)}
                />
                <span>
                  <strong>{slide.title}</strong>
                  <small>{sourceLabel(slide.source)} - {slide.libraryLabel}</small>
                </span>
              </label>
            ))}
          </div>
        </div>

        <aside className="manager-card">
          <div className="manager-card-head">
            <span>Criar slide por programação</span>
            <Plus size={16} />
          </div>

          <label>
            Etiqueta
            <input
              value={draftSlide.eyebrow}
              onChange={event => setDraftSlide(current => ({ ...current, eyebrow: event.currentTarget.value }))}
            />
          </label>

          <label>
            Título
            <input
              value={draftSlide.title}
              onChange={event => setDraftSlide(current => ({ ...current, title: event.currentTarget.value }))}
            />
          </label>

          <label>
            Textos principais
            <textarea
              placeholder="Um parágrafo por linha"
              value={draftSlide.text}
              onChange={event => setDraftSlide(current => ({ ...current, text: event.currentTarget.value }))}
            />
          </label>

          <label>
            Itens do visual
            <textarea
              placeholder="Um item por linha"
              value={draftSlide.items}
              onChange={event => setDraftSlide(current => ({ ...current, items: event.currentTarget.value }))}
            />
          </label>

          <button type="button" onClick={createCustomSlide}>
            <Plus size={15} />
            Criar e adicionar à versão
          </button>
        </aside>
      </section>
    </div>
  );
}
