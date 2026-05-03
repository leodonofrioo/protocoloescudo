import DocumentShell, { type DocumentSection } from '../components/DocumentShell';
import './Detalhamento.css';
import './CentralProntidao.css';

const sections: DocumentSection[] = [
  { id: 'capa', title: 'Capa' },
  { id: 'funcao', title: 'Funcao da Central' },
  { id: 'trilhas', title: 'Trilhas por Perfil' },
  { id: 'jornada', title: 'Jornada de Prontidao' },
  { id: 'biblioteca', title: 'Biblioteca Operacional' },
  { id: 'governanca', title: 'Governanca e Evidencias' },
  { id: 'metricas', title: 'Metricas de Evolucao' },
];

const tracks = [
  {
    role: 'Alta Lideranca',
    focus: 'Decisao sob pressao, preservacao de valor e alinhamento institucional.',
    deliverables: 'Briefings executivos, matriz de decisao, mensagens de autoridade e simulados de conselho.',
  },
  {
    role: 'Gabinete de Crise',
    focus: 'Comando, escalonamento, aprovacao e coordenacao entre areas sensiveis.',
    deliverables: 'Playbooks por cenario, checklists de acionamento, salas de decisao e registro de decisoes.',
  },
  {
    role: 'Porta-Vozes',
    focus: 'Clareza, postura, controle emocional e consistencia publica da narrativa.',
    deliverables: 'Roteiros de resposta, Q&A hostil, treino de camera e protocolo de entrevistas.',
  },
  {
    role: 'Gestores Criticos',
    focus: 'Deteccao precoce, primeira resposta e fluxo correto ate o gabinete.',
    deliverables: 'Alarmes por area, mapas de risco, guias de escalonamento e casos praticos.',
  },
  {
    role: 'Colaboradores Sensíveis',
    focus: 'Conduta segura, sigilo, canais oficiais e reducao de ruido interno.',
    deliverables: 'Microaulas, comunicados internos, protocolos de reporte e termos de ciencia.',
  },
];

const libraryItems = [
  ['Playbooks de crise', 'Protocolos por risco prioritario, com gatilhos, donos e primeira resposta.'],
  ['Checklists taticos', 'Listas curtas para acionamento, isolamento, comunicacao e aprovacao.'],
  ['Mensagens criticas', 'Holding statements, comunicados internos, notas publicas e Q&A de imprensa.'],
  ['Estudos de caso', 'Cenarios reais e simulados para treinar julgamento sob ambiguidade.'],
  ['Evidencias de prontidao', 'Presenca, conclusao de trilhas, avaliacoes, simulados e planos corretivos.'],
];

export default function CentralProntidao() {
  return (
    <DocumentShell sections={sections}>
      <section className="page cover central-cover" id="capa">
        <div>
          <div className="cover-top">
            <img className="logo" src="/images/Logo.webp" alt="Logo Protocolo Escudo" />
            <div className="cover-meta">
              Documento operacional<br />
              Hub de capacitacao e evidencia<br />
              Restrito e confidencial
            </div>
          </div>

          <div className="cover-title">
            <div className="pill">Padronizacao, escala e memoria institucional</div>
            <h1>Central Escudo de Prontidão</h1>
            <p className="lead">
              A camada permanente do Protocolo Escudo que organiza trilhas, materiais, rotinas,
              evidencias e consulta operacional para que a empresa mantenha prontidao viva antes,
              durante e depois de uma crise.
            </p>
          </div>

          <div className="cover-grid">
            <div className="quote-box">
              <h3>Promessa da Central</h3>
              <p className="lead" style={{ fontSize: '16px', marginBottom: 0 }}>
                Transformar conhecimento critico em um sistema acessivel, rastreavel e acionavel,
                evitando que a organizacao dependa de memoria individual, treinamento pontual ou
                improviso no dia de maior pressao.
              </p>
            </div>

            <div className="card dark">
              <div className="icon-title">
                <span className="icon" style={{ background: '#1b1b1b', borderColor: '#333' }}>
                  <svg viewBox="0 0 24 24" style={{ stroke: '#fff' }}>
                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                    <path d="M9 12l2 2 4-5" />
                  </svg>
                </span>
                <h3 style={{ margin: 0 }}>Prontidao Continua</h3>
              </div>
              <p className="muted">
                A Central nao substitui o gabinete. Ela prepara, sustenta e documenta a maturidade
                necessaria para que o gabinete funcione quando o ambiente estiver hostil.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page" id="funcao">
        <div className="section-head">
          <div className="section-number">01</div>
          <div>
            <div className="eyebrow">Funcao estrategica</div>
            <h2>O que a Central resolve</h2>
            <p className="muted">
              A Central concentra o conhecimento operacional do Protocolo Escudo e reduz a distancia
              entre treinamento, decisao e resposta real.
            </p>
          </div>
        </div>

        <div className="quote-box">
          <h3>Sem central, a empresa treina uma vez e esquece sob pressao</h3>
          <p className="lead" style={{ marginBottom: 0 }}>
            A prontidao corporativa nao pode depender de uma reuniao de lancamento. Ela precisa estar
            disponivel por funcao, por risco e por momento de acionamento, com versao atualizada e
            evidencias claras de absorcao.
          </p>
        </div>

        <div className="readiness-kpi-grid">
          <div className="readiness-kpi-card">
            <span>01</span>
            <strong>Padroniza a resposta</strong>
            <p className="muted">Todos consultam a mesma fonte, com mensagens e criterios aprovados.</p>
          </div>
          <div className="readiness-kpi-card">
            <span>02</span>
            <strong>Escala a capacitacao</strong>
            <p className="muted">Conteudo curto e segmentado por responsabilidade, sem paralisar a operacao.</p>
          </div>
          <div className="readiness-kpi-card">
            <span>03</span>
            <strong>Retem memoria critica</strong>
            <p className="muted">Mudancas de pessoas nao apagam fluxos, aprendizados e decisoes anteriores.</p>
          </div>
          <div className="readiness-kpi-card">
            <span>04</span>
            <strong>Comprova evolucao</strong>
            <p className="muted">Aderencia, avaliacoes e simulados viram evidencia de maturidade.</p>
          </div>
        </div>
      </section>

      <section className="page" id="trilhas">
        <div className="section-head">
          <div className="section-number">02</div>
          <div>
            <div className="eyebrow">Arquitetura de aprendizagem</div>
            <h2>Trilhas por perfil de responsabilidade</h2>
            <p className="muted">
              Cada grupo recebe apenas o que precisa saber para agir bem. A Central evita excesso de
              informacao e entrega clareza por papel.
            </p>
          </div>
        </div>

        <div className="graphic">
          <table className="central-table">
            <thead>
              <tr>
                <th>Perfil</th>
                <th>Foco da trilha</th>
                <th>Entregaveis de apoio</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map(track => (
                <tr key={track.role}>
                  <td><strong>{track.role}</strong></td>
                  <td>{track.focus}</td>
                  <td>{track.deliverables}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="note">
          <strong>Regra de desenho:</strong> a trilha nao e um curso generico. Ela e uma rota de
          prontidao por papel, com conteudo aplicado, criterio de conclusao e ligacao direta com os
          riscos mapeados na empresa.
        </div>
      </section>

      <section className="page" id="jornada">
        <div className="section-head">
          <div className="section-number">03</div>
          <div>
            <div className="eyebrow">Experiencia de uso</div>
            <h2>Jornada de prontidao dentro da Central</h2>
            <p className="muted">
              O usuario deve entender rapidamente seu papel, consumir os materiais essenciais e saber
              quando escalar uma situacao real.
            </p>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="period">Entrada</div>
            <div>
              <h3>Diagnostico de perfil</h3>
              <p className="muted">
                Identificacao do papel do usuario, area, nivel de autoridade e riscos associados.
              </p>
            </div>
            <div className="result-badge">Trilha<br />correta</div>
          </div>
          <div className="timeline-item">
            <div className="period">Base</div>
            <div>
              <h3>Conteudos essenciais</h3>
              <p className="muted">
                Microaulas, resumos executivos, checklists e estudos de caso para formar o padrao.
              </p>
            </div>
            <div className="result-badge">Nivel<br />minimo</div>
          </div>
          <div className="timeline-item">
            <div className="period">Aplicacao</div>
            <div>
              <h3>Exercicios e decisoes guiadas</h3>
              <p className="muted">
                Cenarios curtos exigem decisao, escalonamento e escolha de mensagem sob restricao.
              </p>
            </div>
            <div className="result-badge">Aderencia<br />pratica</div>
          </div>
          <div className="timeline-item">
            <div className="period">Validacao</div>
            <div>
              <h3>Avaliacao e certificacao</h3>
              <p className="muted">
                Registro de conclusao, nota, lacunas e recomendacoes por usuario, area e perfil.
              </p>
            </div>
            <div className="result-badge">Evidencia<br />gerencial</div>
          </div>
          <div className="timeline-item">
            <div className="period">Rotina</div>
            <div>
              <h3>Recorrencia e atualizacao</h3>
              <p className="muted">
                Reforcos periodicos, novas versoes de playbook, testes controlados e reciclagens.
              </p>
            </div>
            <div className="result-badge">Protocolo<br />vivo</div>
          </div>
        </div>
      </section>

      <section className="page" id="biblioteca">
        <div className="section-head">
          <div className="section-number">04</div>
          <div>
            <div className="eyebrow">Biblioteca operacional</div>
            <h2>Materiais que precisam estar a um clique</h2>
            <p className="muted">
              A Central e o repositório vivo de materiais aprovados. Em crise, ninguem deve procurar
              arquivos perdidos ou reconstruir comunicados do zero.
            </p>
          </div>
        </div>

        <div className="track-grid central-library-grid">
          {libraryItems.map(([title, description]) => (
            <div className="track-card" key={title}>
              <h3>{title}</h3>
              <p className="muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: '12px' }}>
          <div className="card dark">
            <h3>Busca por contexto</h3>
            <p>
              Os materiais devem ser encontrados por risco, area, publico afetado, canal de comunicacao,
              criticidade e fase da crise. O criterio de busca precisa seguir a logica de quem esta sob
              pressao, nao a organizacao interna dos arquivos.
            </p>
          </div>
          <div className="card soft">
            <h3>Controle de versao</h3>
            <p className="muted">
              Cada documento critico deve ter dono, data de revisao, status de aprovacao e historico
              de alteracoes. A versao errada de uma mensagem pode se tornar um novo incidente.
            </p>
          </div>
        </div>
      </section>

      <section className="page" id="governanca">
        <div className="section-head">
          <div className="section-number">05</div>
          <div>
            <div className="eyebrow">Governanca da prontidao</div>
            <h2>Como a Central permanece confiavel</h2>
            <p className="muted">
              O valor da Central depende de curadoria, responsabilidade clara e rotina de atualizacao.
            </p>
          </div>
        </div>

        <div className="decision-grid">
          <div className="decision-card">
            <div className="index">A</div>
            <div>
              <h3>Dono por material critico</h3>
              <p className="muted">
                Todo playbook, checklist ou mensagem possui responsavel formal por validade e revisao.
              </p>
            </div>
          </div>
          <div className="decision-card">
            <div className="index">B</div>
            <div>
              <h3>Fluxo de aprovacao</h3>
              <p className="muted">
                Conteudos sensiveis passam por Comunicacao, Juridico e lideranca definida antes de publicar.
              </p>
            </div>
          </div>
          <div className="decision-card">
            <div className="index">C</div>
            <div>
              <h3>Registro de aderencia</h3>
              <p className="muted">
                Conclusoes, avaliacoes, simulados e pendencias ficam registradas para leitura executiva.
              </p>
            </div>
          </div>
          <div className="decision-card">
            <div className="index">D</div>
            <div>
              <h3>Ciclo de revisao</h3>
              <p className="muted">
                Materiais sao revisitados apos simulados, incidentes reais, troca de lideranca ou mudanca regulatoria.
              </p>
            </div>
          </div>
        </div>

        <div className="quote-box" style={{ marginTop: '12px' }}>
          <h3>Principio de confiabilidade</h3>
          <p className="lead" style={{ marginBottom: 0 }}>
            Se a Central nao disser quem aprovou, quando foi revisado e para qual cenario serve, ela
            deixa de ser uma fonte oficial e vira apenas uma pasta elegante.
          </p>
        </div>
      </section>

      <section className="page" id="metricas">
        <div className="section-head">
          <div className="section-number">06</div>
          <div>
            <div className="eyebrow">Leitura executiva</div>
            <h2>Metricas de evolucao da prontidao</h2>
            <p className="muted">
              A Central precisa traduzir capacitacao em indicadores gerenciais simples, permitindo
              saber onde a empresa esta madura e onde ainda esta exposta.
            </p>
          </div>
        </div>

        <div className="graphic">
          <table className="central-table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>O que mede</th>
                <th>Uso executivo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cobertura por perfil</strong></td>
                <td>Percentual de usuarios criticos com trilha atribuida e iniciada.</td>
                <td>Identificar areas que ainda nao entraram no protocolo.</td>
              </tr>
              <tr>
                <td><strong>Conclusao essencial</strong></td>
                <td>Participantes que finalizaram conteudos obrigatorios por papel.</td>
                <td>Medir prontidao minima antes de simulados e certificacoes.</td>
              </tr>
              <tr>
                <td><strong>Indice de retencao</strong></td>
                <td>Resultado de avaliacoes, exercicios e decisoes guiadas.</td>
                <td>Separar presenca formal de capacidade real de resposta.</td>
              </tr>
              <tr>
                <td><strong>Lacunas por risco</strong></td>
                <td>Riscos prioritarios sem material completo, dono ou revisao recente.</td>
                <td>Direcionar esforco para o que ameaça mais a empresa.</td>
              </tr>
              <tr>
                <td><strong>Plano corretivo</strong></td>
                <td>Pendencias abertas apos simulados, incidentes ou revisoes.</td>
                <td>Garantir que aprendizado se converta em ajuste operacional.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card dark" style={{ marginTop: '15px' }}>
          <h3>Resultado esperado</h3>
          <p style={{ color: '#fff', marginTop: '8px' }}>
            Ao fim da implantacao, a Central Escudo de Prontidao deve permitir que a lideranca
            responda tres perguntas sem improviso: quem esta preparado, qual material esta aprovado
            e que lacunas ainda colocam a organizacao em risco.
          </p>
        </div>
      </section>
    </DocumentShell>
  );
}
