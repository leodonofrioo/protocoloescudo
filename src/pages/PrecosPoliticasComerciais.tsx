import { useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw, RotateCcw, Server, ShieldCheck } from 'lucide-react';
import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import {
  type CommercialPricingConfig,
  type CommercialVariableItem,
} from '../data/commercialPricing';
import {
  getDefaultCommercialPricing,
  loadCommercialPricing,
  resetCommercialPricing,
  saveCommercialPricing,
} from '../services/commercialPricingApi';
import './Detalhamento.css';
import './PrecosPoliticasComerciais.css';

type CacheStatus = 'loading' | 'synced' | 'saving' | 'offline' | 'error';

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'calculadora', title: 'Calculadora de preco' },
  { id: 'faixas', title: 'Faixas comerciais' },
  { id: 'politicas', title: 'Politicas comerciais' },
  { id: 'pagamento', title: 'Pagamento e validade' },
  { id: 'governanca', title: 'Governanca comercial' },
];

const commercialPolicies = [
  [
    'Preco minimo inegociavel',
    'Nenhuma proposta do Protocolo Escudo deve sair abaixo de R$ 50.000 por projeto, salvo decisao expressa da direcao.',
  ],
  [
    'Dois responsaveis incluidos',
    'O valor base contempla ate 2 responsaveis diretos. A partir do terceiro, aplica-se valor adicional por pessoa.',
  ],
  [
    'Escopo fechado por fase',
    'Cada fase precisa registrar entregaveis, responsaveis da contratante, criterios de aceite e limites de revisao.',
  ],
  [
    'Agenda condicionada ao aceite',
    'Datas criticas so ficam reservadas apos aceite formal e pagamento da entrada combinada.',
  ],
  [
    'Mudanca de escopo',
    'Novas unidades, liderancas, materiais, simulados ou frentes de risco geram reprecificacao antes da execucao.',
  ],
  [
    'Sigilo e informacao sensivel',
    'Qualquer acesso a dados internos, riscos, entrevistas e materiais deve estar coberto por NDA ou clausula equivalente.',
  ],
  [
    'Despesas externas',
    'Viagens, hospedagem, locacoes, deslocamentos, fornecedores e custos de terceiros nao entram no preco base.',
  ],
  [
    'Suspensao por inadimplencia',
    'Atrasos de pagamento podem pausar agenda, reunioes sensiveis, simulados e entrega de materiais finais.',
  ],
];

const pricingTiers = [
  [
    'Essencial',
    'A partir de R$ 50.000',
    'Projeto base com ate 2 responsaveis, diagnostico, gabinete, matriz inicial e materiais essenciais.',
  ],
  [
    'Profissional',
    'R$ 75.000 a R$ 120.000',
    'Inclui maior volume de responsaveis, Central Escudo, governanca executiva e materiais adicionais.',
  ],
  [
    'Corporativo',
    'Acima de R$ 120.000',
    'Indicado para grupos com unidades multiplas, alta exposicao, porta-vozes, recorrencia e simulados extras.',
  ],
];

const governanceRules = [
  ['Validade padrao', '7 dias corridos ou ate esgotamento da agenda proposta.'],
  ['Reajuste', 'Propostas vencidas podem ser reajustadas por agenda, escopo, custo de equipe ou urgencia.'],
  ['Desconto', 'So deve existir com contrapartida: pagamento a vista, escopo fechado, recorrencia ou aceite rapido.'],
  ['Bonificacao', 'Inclusoes extras devem constar como cortesia limitada, com valor de referencia preservado.'],
  ['Faturamento', 'Retencoes, impostos, nota fiscal e centro de custo precisam ser confirmados antes do contrato.'],
  ['Propriedade', 'Materiais finais pertencem a contratante; metodologia, modelos mestres e know-how permanecem protegidos.'],
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function normalizeNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function normalizeRate(value: number) {
  return Number.isFinite(value) ? value : 0;
}

function getStatusLabel(status: CacheStatus) {
  const labels = {
    loading: 'Carregando cache do servidor',
    synced: 'Salvo no servidor',
    saving: 'Salvando no servidor',
    offline: 'Servidor indisponivel',
    error: 'Falha ao salvar',
  };

  return labels[status];
}

export default function PrecosPoliticasComerciais() {
  const [config, setConfig] = useState<CommercialPricingConfig>(() => getDefaultCommercialPricing());
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>('loading');
  const skipNextSaveRef = useRef(true);
  const saveTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    loadCommercialPricing()
      .then(serverConfig => {
        if (!isMounted) return;
        skipNextSaveRef.current = true;
        setConfig(serverConfig);
        setCacheStatus('synced');
      })
      .catch(() => {
        if (!isMounted) return;
        skipNextSaveRef.current = true;
        setConfig(getDefaultCommercialPricing());
        setCacheStatus('offline');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    window.clearTimeout(saveTimerRef.current);
    setCacheStatus('saving');

    saveTimerRef.current = window.setTimeout(() => {
      saveCommercialPricing(config)
        .then(() => setCacheStatus('synced'))
        .catch(() => setCacheStatus('error'));
    }, 550);

    return () => window.clearTimeout(saveTimerRef.current);
  }, [config]);

  const selectedPaymentOption =
    config.paymentOptions.find(option => option.id === config.selectedPaymentOptionId) ??
    config.paymentOptions[0];

  const fixedTotal = useMemo(
    () =>
      config.fixedItems.reduce(
        (sum, item) => sum + (item.enabled || item.locked ? normalizeNumber(item.value) : 0),
        0,
      ),
    [config.fixedItems],
  );

  const responsibleCount = Math.max(
    config.includedResponsibles,
    Math.floor(normalizeNumber(config.responsibleCount)),
  );
  const extraResponsibleCount = Math.max(0, responsibleCount - config.includedResponsibles);
  const extraResponsibleTotal =
    extraResponsibleCount * normalizeNumber(config.extraResponsibleUnitValue);

  const variableLineItemsTotal = useMemo(
    () =>
      config.variableItems.reduce(
        (sum, item) => sum + normalizeNumber(item.quantity) * normalizeNumber(item.unitValue),
        0,
      ),
    [config.variableItems],
  );

  const variableTotal = extraResponsibleTotal + variableLineItemsTotal;
  const subtotal = fixedTotal + variableTotal;
  const paymentAdjustmentValue = subtotal * (selectedPaymentOption.rateAdjustment / 100);
  const commercialAdjustmentValue = subtotal * (config.commercialAdjustmentRate / 100);
  const finalTotal = subtotal + paymentAdjustmentValue + commercialAdjustmentValue;

  const updateConfig = (updater: (current: CommercialPricingConfig) => CommercialPricingConfig) => {
    setConfig(current => updater({ ...current, updatedAt: new Date().toISOString() }));
  };

  const updateFixedItem = (id: string, field: 'enabled' | 'value', value: boolean | number) => {
    updateConfig(current => ({
      ...current,
      fixedItems: current.fixedItems.map(item =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === 'value' && typeof value === 'number'
                  ? normalizeNumber(value)
                  : Boolean(value),
              enabled: item.locked ? true : field === 'enabled' ? Boolean(value) : item.enabled,
            }
          : item,
      ),
    }));
  };

  const updateVariableItem = (
    id: string,
    field: keyof Pick<CommercialVariableItem, 'quantity' | 'unitValue'>,
    value: number,
  ) => {
    updateConfig(current => ({
      ...current,
      variableItems: current.variableItems.map(item =>
        item.id === id ? { ...item, [field]: normalizeNumber(value) } : item,
      ),
    }));
  };

  const handleReset = async () => {
    setCacheStatus('saving');
    try {
      const defaults = await resetCommercialPricing();
      skipNextSaveRef.current = true;
      setConfig(defaults);
      setCacheStatus('synced');
    } catch {
      setCacheStatus('error');
    }
  };

  return (
    <DocumentShell sections={sections}>
      <section className="page cover" id="capa">
        <div>
          <div className="cover-top">
            <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
            <div className="cover-meta">
              Documento comercial<br />
              Precificacao, cache e politicas de contratacao<br />
              Restrito e confidencial
            </div>
          </div>

          <div className="cover-title">
            <div className="pill">Politica comercial viva e compartilhada</div>
            <h1>Pre&ccedil;os e Pol&iacute;ticas comerciais</h1>
            <p className="lead">
              A camada comercial do Protocolo Escudo com valores oficiais, calculo de responsaveis
              adicionais, condicoes de pagamento e cache de servidor para manter a proposta acessivel
              em diferentes acessos.
            </p>
          </div>

          <div className="cover-grid">
            <div className="quote-box">
              <h3>Regra de entrada</h3>
              <p className="lead" style={{ fontSize: '16px', marginBottom: 0 }}>
                Todo projeto parte de R$ 50.000 e inclui ate 2 responsaveis diretos. Acima disso, o
                preco cresce por pessoa, volume, complexidade e intensidade operacional.
              </p>
            </div>

            <div className="card dark">
              <div className="icon-title">
                <span className="icon">
                  <Server size={14} />
                </span>
                <h3 style={{ margin: 0 }}>Cache compartilhado</h3>
              </div>
              <p className="muted">
                Alteracoes feitas nesta tela sao salvas no servidor local do projeto. Outro navegador
                acessando o mesmo servidor recebe a ultima politica comercial gravada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page" id="calculadora">
        <div className="section-head">
          <div className="section-number">01</div>
          <div>
            <div className="eyebrow">Calculadora comercial</div>
            <h2>Composicao profissional de preco</h2>
            <p className="muted">
              Valores oficiais ja entram preenchidos. A combinacao de fixos, responsaveis adicionais,
              variaveis e condicao de pagamento gera o total estimado da proposta.
            </p>
          </div>
        </div>

        <div className="commercial-toolbar no-print">
          <div className={`cache-status ${cacheStatus}`}>
            <Server size={14} />
            <span>{getStatusLabel(cacheStatus)}</span>
          </div>
          <button className="toolbar-button" type="button" onClick={() => void handleReset()}>
            <RotateCcw size={14} />
            Restaurar oficiais
          </button>
        </div>

        <div className="pricing-hero">
          <div>
            <span>Valor minimo</span>
            <strong>{currencyFormatter.format(50000)}</strong>
            <small>ate {config.includedResponsibles} responsaveis</small>
          </div>
          <div>
            <span>Responsavel adicional</span>
            <strong>{currencyFormatter.format(config.extraResponsibleUnitValue)}</strong>
            <small>por pessoa acima do limite</small>
          </div>
          <div>
            <span>Total estimado</span>
            <strong>{currencyFormatter.format(finalTotal)}</strong>
            <small>{selectedPaymentOption.label}</small>
          </div>
        </div>

        <div className="pricing-calculator">
          <div className="pricing-panel">
            <div className="pricing-panel-head">
              <h3>Precos fixos</h3>
              <span>{currencyFormatter.format(fixedTotal)}</span>
            </div>

            <div className="fixed-price-list">
              {config.fixedItems.map(item => (
                <div className="fixed-price-item" key={item.id}>
                  <label className="fixed-price-toggle">
                    <input
                      type="checkbox"
                      checked={item.enabled || Boolean(item.locked)}
                      disabled={item.locked}
                      onChange={event =>
                        updateFixedItem(item.id, 'enabled', event.currentTarget.checked)
                      }
                    />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={item.value}
                    onChange={event => updateFixedItem(item.id, 'value', event.currentTarget.valueAsNumber)}
                    aria-label={`Valor - ${item.label}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-panel">
            <div className="pricing-panel-head">
              <h3>Responsaveis</h3>
              <span>{currencyFormatter.format(extraResponsibleTotal)}</span>
            </div>

            <div className="responsible-controls">
              <label className="pricing-field">
                <span>Total de responsaveis</span>
                <input
                  type="number"
                  min={config.includedResponsibles}
                  step="1"
                  value={responsibleCount}
                  onChange={event =>
                    updateConfig(current => ({
                      ...current,
                      responsibleCount: Math.max(
                        current.includedResponsibles,
                        Math.floor(normalizeNumber(event.currentTarget.valueAsNumber)),
                      ),
                    }))
                  }
                  aria-label="Total de responsaveis"
                />
              </label>

              <div className="included-badge">
                <span>Incluidos</span>
                <strong>{config.includedResponsibles}</strong>
              </div>

              <label className="pricing-field">
                <span>Valor adicional</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={config.extraResponsibleUnitValue}
                  onChange={event =>
                    updateConfig(current => ({
                      ...current,
                      extraResponsibleUnitValue: normalizeNumber(event.currentTarget.valueAsNumber),
                    }))
                  }
                  aria-label="Valor por responsavel adicional"
                />
              </label>

              <div className="responsible-total">
                <span>Extras</span>
                <strong>{extraResponsibleCount}</strong>
                <small>{currencyFormatter.format(extraResponsibleTotal)}</small>
              </div>
            </div>
          </div>

          <div className="pricing-panel">
            <div className="pricing-panel-head">
              <h3>Precos variaveis</h3>
              <span>{currencyFormatter.format(variableLineItemsTotal)}</span>
            </div>

            <div className="variable-price-grid variable-price-header">
              <span>Item</span>
              <span>Qtd.</span>
              <span>Valor unit.</span>
              <span>Total</span>
            </div>

            {config.variableItems.map(item => {
              const itemTotal = normalizeNumber(item.quantity) * normalizeNumber(item.unitValue);

              return (
                <div className="variable-price-grid" key={item.id}>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.quantity}
                    onChange={event =>
                      updateVariableItem(item.id, 'quantity', event.currentTarget.valueAsNumber)
                    }
                    aria-label={`Quantidade - ${item.label}`}
                  />
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={item.unitValue}
                    onChange={event =>
                      updateVariableItem(item.id, 'unitValue', event.currentTarget.valueAsNumber)
                    }
                    aria-label={`Valor unitario - ${item.label}`}
                  />
                  <strong>{currencyFormatter.format(itemTotal)}</strong>
                </div>
              );
            })}
          </div>

          <div className="pricing-panel">
            <div className="pricing-panel-head">
              <h3>Pagamento e ajustes</h3>
              <span>{selectedPaymentOption.rateAdjustment}%</span>
            </div>

            <div className="payment-grid">
              {config.paymentOptions.map(option => (
                <label className="payment-option" key={option.id}>
                  <input
                    type="radio"
                    name="payment-option"
                    checked={option.id === config.selectedPaymentOptionId}
                    onChange={() =>
                      updateConfig(current => ({ ...current, selectedPaymentOptionId: option.id }))
                    }
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.milestones}</small>
                  </span>
                </label>
              ))}
            </div>

            <label className="pricing-adjustment">
              <span>Ajuste comercial adicional (%)</span>
              <input
                type="number"
                step="1"
                value={config.commercialAdjustmentRate}
                onChange={event =>
                  updateConfig(current => ({
                    ...current,
                    commercialAdjustmentRate: normalizeRate(event.currentTarget.valueAsNumber),
                  }))
                }
                aria-label="Ajuste comercial percentual"
              />
            </label>
          </div>

          <div className="pricing-summary">
            <div>
              <span>Fixos ativos</span>
              <strong>{currencyFormatter.format(fixedTotal)}</strong>
            </div>
            <div>
              <span>Responsaveis extras</span>
              <strong>{currencyFormatter.format(extraResponsibleTotal)}</strong>
            </div>
            <div>
              <span>Outros variaveis</span>
              <strong>{currencyFormatter.format(variableLineItemsTotal)}</strong>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>{currencyFormatter.format(subtotal)}</strong>
            </div>
            <div>
              <span>Ajuste pagamento</span>
              <strong>{currencyFormatter.format(paymentAdjustmentValue)}</strong>
            </div>
            <div>
              <span>Ajuste comercial</span>
              <strong>{currencyFormatter.format(commercialAdjustmentValue)}</strong>
            </div>
            <div className="pricing-total">
              <span>Total estimado</span>
              <strong>{currencyFormatter.format(finalTotal)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="page" id="faixas">
        <div className="section-head">
          <div className="section-number">02</div>
          <div>
            <div className="eyebrow">Faixas comerciais</div>
            <h2>Referencia de enquadramento</h2>
            <p className="muted">
              As faixas ajudam a defender preco, escopo e nivel de envolvimento sem transformar a
              proposta em uma lista fria de horas.
            </p>
          </div>
        </div>

        <div className="tier-grid">
          {pricingTiers.map(([title, price, description]) => (
            <div className="tier-card" key={title}>
              <span>{title}</span>
              <strong>{price}</strong>
              <p className="muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="quote-box" style={{ marginTop: '12px' }}>
          <h3>Como defender o valor</h3>
          <p className="lead" style={{ marginBottom: 0 }}>
            A conversa comercial deve sair de "quantas reunioes estao inclusas" e ir para "quanto
            custa a empresa descobrir seu protocolo apenas no dia da crise". O preco remunera
            prontidao, julgamento e reducao de improviso institucional.
          </p>
        </div>
      </section>

      <section className="page" id="politicas">
        <div className="section-head">
          <div className="section-number">03</div>
          <div>
            <div className="eyebrow">Politicas comerciais</div>
            <h2>Regras para proteger margem e entrega</h2>
            <p className="muted">
              A politica comercial precisa impedir que excecoes virem obrigacoes invisiveis durante a
              implantacao.
            </p>
          </div>
        </div>

        <div className="policy-grid">
          {commercialPolicies.map(([title, description], index) => (
            <div className="policy-card" key={title}>
              <div className="policy-index">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <h3>{title}</h3>
                <p className="muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page" id="pagamento">
        <div className="section-head">
          <div className="section-number">04</div>
          <div>
            <div className="eyebrow">Pagamento e validade</div>
            <h2>Condicoes financeiras oficiais</h2>
            <p className="muted">
              O pagamento protege agenda, senioridade da equipe e velocidade de implantacao. Quanto
              mais longa a condicao, maior deve ser a compensacao comercial.
            </p>
          </div>
        </div>

        <div className="graphic">
          <table>
            <thead>
              <tr>
                <th>Condicao</th>
                <th>Marco financeiro</th>
                <th>Ajuste</th>
              </tr>
            </thead>
            <tbody>
              {config.paymentOptions.map(option => (
                <tr key={option.id}>
                  <td><strong>{option.label}</strong></td>
                  <td>{option.milestones}</td>
                  <td>{option.rateAdjustment}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="note">
          <strong>Politica de excecao:</strong> qualquer condicao diferente das opcoes acima precisa
          ficar registrada na proposta, incluindo responsavel pela aprovacao e impacto financeiro.
        </div>
      </section>

      <section className="page" id="governanca">
        <div className="section-head">
          <div className="section-number">05</div>
          <div>
            <div className="eyebrow">Governanca comercial</div>
            <h2>Regras finais de controle</h2>
            <p className="muted">
              A proposta deve ser clara o bastante para vender bem e rigorosa o bastante para impedir
              erosao de escopo.
            </p>
          </div>
        </div>

        <div className="decision-grid">
          {governanceRules.map(([title, description], index) => (
            <div className="decision-card" key={title}>
              <div className="index">{String.fromCharCode(65 + index)}</div>
              <div>
                <h3>{title}</h3>
                <p className="muted">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card dark" style={{ marginTop: '14px' }}>
          <div className="icon-title">
            <span className="icon">
              <ShieldCheck size={14} />
            </span>
            <h3 style={{ margin: 0 }}>Fechamento recomendado</h3>
          </div>
          <p style={{ color: '#fff', marginTop: '8px' }}>
            A proposta ideal preserva tres coisas ao mesmo tempo: preco minimo, autoridade do escopo
            e velocidade de resposta. O cliente compra uma estrutura de prontidao, nao uma colecao de
            reunioes.
          </p>
        </div>

        <div className="cache-footnote no-print">
          <RefreshCw size={13} />
          Ultima atualizacao compartilhada: {new Date(config.updatedAt).toLocaleString('pt-BR')}
        </div>
      </section>
    </DocumentShell>
  );
}
