# Protocolo Escudo - Central de Arquivos

Aplicacao React + TypeScript + Vite para centralizar documentos executivos e ferramentas do Protocolo Escudo. O app funciona como um hub de consulta, leitura e exportacao em PDF dos materiais de prontidao em crise.

## Rotas principais

- `/` - Hub com progresso dos documentos e acesso aos materiais disponiveis.
- `/detalhamento` - Documento executivo completo do Protocolo Escudo.
- `/matriz-riscos` - Matriz de riscos com mapa de calor, classificacao e planos de contencao.
- `/the-worst-day` - Documento da simulacao de alta pressao.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estrutura

- `src/App.tsx` - roteamento, topbar e alternancia de tema.
- `src/components/DocumentShell.tsx` - estrutura compartilhada dos documentos, com indice, progresso de leitura e exportacao.
- `src/pages/Hub.tsx` - tela inicial da central.
- `src/pages/Detalhamento.tsx` - documento executivo principal.
- `src/pages/MatrizRiscos.tsx` - matriz de riscos.
- `src/pages/TheWorstDay.tsx` - simulacao The Worst Day.
- `src/data/protocol.ts` - dados institucionais usados no hub.
- `public/images/Logo.webp` - marca exibida no app e nos documentos.

## Validacao antes de publicar

Rode sempre:

```bash
npm run lint
npm run build
```

O arquivo `Documento Oficial de Detalhamento.html` permanece como artefato standalone de referencia. A aplicacao principal e gerada a partir do fluxo Vite em `src`.
