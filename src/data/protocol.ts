export const protocolData = {
  title: "Protocolo Escudo",
  subtitle: "Implantação intensiva e blindagem assistida",
  description: "Estrutura central de acesso a documentos, ferramentas e recursos do programa. Tudo que a empresa precisa para prevenir, responder e evoluir diante de crises.",
  stats: [
    { value: "30", label: "dias para estrutura essencial" },
    { value: "60", label: "dias de implantação completa" },
    { value: "120", label: "dias de blindagem assistida" },
    { value: "01", label: "sistema final de prontidão" },
  ],
  sections: [
    {
      id: "visao",
      title: "Visão em 30 segundos",
      shortTitle: "Visão",
      description: "O que a empresa compra, para quem é e o que o programa entrega.",
      status: "available",
      number: "01",
      eyebrow: "Visão em 30 segundos",
      heading: "O que a empresa compra",
      content: "Uma implantação de sistema de prontidão em crise. Não é curso, não é palestra e não é reunião recorrente sem consequência.",
      items: [
        { title: "O que é", desc: "Um programa híbrido que prepara a liderança para decidir, comunicar e proteger a reputação sob pressão." },
        { title: "Para quem é", desc: "Empresas com alta exposição, decisões sensíveis, risco reputacional, operação crítica ou liderança pública." },
        { title: "O que entrega", desc: "Gabinete, fluxos, mensagens, porta voz, base de capacitação, simulação, testes e protocolo final." }
      ]
    },
    {
      id: "risco",
      title: "O risco de improvisar",
      shortTitle: "Risco",
      description: "Por que a ausência de protocolo é o maior risco reputacional da empresa.",
      status: "available",
      number: "02",
      eyebrow: "O risco de improvisar",
      heading: "Crise não espera alinhamento interno",
      content: "A pior hora para decidir quem fala, quem aprova, quem responde e quem assume comando é quando todos já esperam uma resposta.",
      risks: [
        { title: "A liderança demora a responder", desc: "O silêncio abre espaço para ruído e especulação." },
        { title: "Áreas falam versões diferentes", desc: "Jurídico, comunicação, operação e RH entram em conflito." },
        { title: "Colaboradores recebem ruído", desc: "A comunicação interna fica reativa e desorganizada." },
        { title: "Stakeholders pressionam sem resposta", desc: "Clientes, conselhos, parceiros e reguladores aumentam a tensão." },
        { title: "Redes e imprensa definem a narrativa", desc: "A organização deixa de conduzir a percepção pública." },
        { title: "A confiança cai antes da apuração", desc: "A resposta é julgada antes do relatório final existir." }
      ]
    },
    {
      id: "funcionamento",
      title: "Como funciona – 30 / 60 / 120",
      shortTitle: "Funcionamento",
      description: "Cronograma completo de implantação: diagnóstico, estrutura, validação, simulação e blindagem.",
      status: "available",
      number: "03",
      eyebrow: "Como funciona",
      heading: "30 dias, 60 dias e 120 dias",
      content: "A entrega foi desenhada para gerar impacto rápido e sustentar a evolução ao longo do tempo.",
      timeline: [
        { period: "Dias 1 a 10", title: "Diagnóstico executivo", desc: "Abertura executiva, entrevistas, riscos, stakeholders, processos sensíveis e prioridades.", result: "plano dos primeiros 60 dias" },
        { period: "Dias 1 a 10", title: "Central Escudo de Prontidão", desc: "Trilhas gravadas por função, checklists, estudos de caso, materiais e avaliações.", result: "capacitação flexível" },
        { period: "Dias 11 a 30", title: "Estrutura Essencial de Resposta", desc: "Gabinete, papéis, fluxos, canais, checklist, mensagens iniciais e Q&A crítico.", result: "resposta mínima pronta" },
        { period: "Dias 31 a 45", title: "Certificação e Salas de Decisão", desc: "Avaliações individuais, por função e em grupo, com sessões ao vivo para casos reais.", result: "lacunas identificadas" },
        { period: "Dias 45 a 60", title: "The Worst Day", desc: "Simulação realista com pressão progressiva, acionamento do gabinete e decisão em tempo real.", result: "plano de correção" },
        { period: "Dias 61 a 180", title: "Blindagem assistida", desc: "Suporte estratégico, reforços práticos, testes surpresa controlados, revisão e atualização do protocolo.", result: "protocolo vivo" }
      ]
    }
  ],
  tools: [
    {
      id: "central",
      title: "Central Escudo de Prontidão",
      description: "Trilhas gravadas por função: Alta Liderança, Gabinete de Crise, Porta Voz, Gestores e Colaboradores Sensíveis.",
      status: "available_in_doc",
      icon: "Video"
    },
    {
      id: "decisao",
      title: "Salas de Decisão e Certificação",
      description: "Sessões ao vivo com avaliação individual, por função e em grupo sobre riscos reais da empresa.",
      status: "available_in_doc",
      icon: "Target"
    },
    {
      id: "simulacao",
      title: "The Worst Day – Simulação",
      description: "Simulação realista com pressão progressiva, acionamento do gabinete e tomada de decisão em tempo real.",
      status: "available_in_doc",
      icon: "Zap"
    },
    {
      id: "blindagem",
      title: "Blindagem Assistida – 120 dias",
      description: "Suporte estratégico, reforços práticos, testes surpresa controlados e revisão e atualização do protocolo.",
      status: "available_in_doc",
      icon: "Shield"
    },
    {
      id: "diagnostico",
      title: "Diagnóstico Executivo",
      description: "Ferramenta guiada de entrevistas, mapeamento de riscos e prioridades para os primeiros 10 dias.",
      status: "coming_soon",
      icon: "PieChart"
    },
    {
      id: "gabinete",
      title: "Gabinete de Crise",
      description: "Estrutura de papéis, fluxo de acionamento, checklist de primeira resposta e Q&A crítico.",
      status: "coming_soon",
      icon: "Users"
    },
    {
      id: "mensagens",
      title: "Mensagens Críticas e Q&A",
      description: "Banco de mensagens, comunicados base, tom de voz e respostas para cenários sensíveis e públicos prioritários.",
      status: "coming_soon",
      icon: "MessageSquare"
    },
    {
      id: "matriz",
      title: "Matriz de Riscos",
      description: "Mapeamento por probabilidade e impacto, com plano de resposta por quadrante.",
      status: "available_in_doc",
      icon: "Grid"
    },
    {
      id: "fluxo",
      title: "Fluxo de Acionamento",
      description: "Mapa visual do fluxo de resposta: quem aciona, quem decide, quem comunica, canais e critérios.",
      status: "coming_soon",
      icon: "GitMerge"
    },
    {
      id: "relatorios",
      title: "Relatórios de Prontidão",
      description: "Histórico de simulações, correções, evidências de evolução e plano de revisão do protocolo.",
      status: "coming_soon",
      icon: "FileText"
    }
  ]
};
