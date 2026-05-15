import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  buildSlidesForVersion,
  createSlideLibrary,
  findPresentationVersion,
  getDefaultPresentationSystem,
  normalizePresentationSystem,
  type PresentationSystemConfig,
} from '../data/presentationSystem';
import { loadPresentationSystem } from '../services/presentationsApi';
import { completePresentationSlides, PresentationDeck } from './Apresentacao';
import { summarySlides } from './ApresentacaoResumida';

type PresentationRuntimeProps = {
  fixedSlug?: string;
};

export default function PresentationRuntime({ fixedSlug }: PresentationRuntimeProps) {
  const params = useParams();
  const [config, setConfig] = useState<PresentationSystemConfig>(() =>
    normalizePresentationSystem(getDefaultPresentationSystem()),
  );

  useEffect(() => {
    let isMounted = true;

    loadPresentationSystem()
      .then(serverConfig => {
        if (!isMounted) return;
        setConfig(serverConfig);
      })
      .catch(() => {
        if (!isMounted) return;
        setConfig(normalizePresentationSystem(getDefaultPresentationSystem()));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const library = useMemo(
    () => createSlideLibrary(completePresentationSlides, summarySlides, config.customSlides),
    [config.customSlides],
  );

  const version = useMemo(
    () => findPresentationVersion(config, fixedSlug ?? params.slug ?? 'completa'),
    [config, fixedSlug, params.slug],
  );

  const slides = useMemo(
    () => buildSlidesForVersion(version, library, config.commercial),
    [config.commercial, library, version],
  );

  return (
    <PresentationDeck
      slides={slides.length > 0 ? slides : completePresentationSlides}
      deckLabel={version.deckLabel}
    />
  );
}
