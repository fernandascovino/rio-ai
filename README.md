# Rio 2.0 – Portal da Família de Modelos de IA

Website institucional que apresenta a família de modelos “Rio 2.0”, reúne documentação resumida, destaca iniciativas open source e oferece um playground de chat para o modelo flagship da Prefeitura do Rio de Janeiro.

## 📌 Visão Geral
- **Stack:** React 19 + TypeScript, Vite, Tailwind (via CDN), Lucide Icons.
- **Arquitetura:** SPA com rotas simuladas a partir de “views” internas (`home`, `chat`, `opensource`).  
- **Dados:** Catálogo centralizado em `constants.ts`, tipado via `types.ts`.  
- **Interatividade:** Chat e playground consomem o endpoint `https://rio-api-test.onrender.com/v1/chat/completions` através de proxy público (`corsproxy.io`). Apenas o modelo *Rio 2.0 32B Omni* possui demo ativa.

## ✨ Principais Funcionalidades
- **Landing page temática** com Hero, grid de modelos filtrável e narrativa sobre a plataforma multiagente.
- **Detalhes por modelo** com casos de uso, snippets de código e ficha técnica.
- **Playground de chat** reutilizável que suporta scroll automático, estados de carregamento e feedback de erros.
- **Seção “Open Source”** destacando modelos liberados sob CC BY 4.0.
- **Integrações visuais** (animações on-scroll, visualização de agentes, terminal animado) para contar a história do ecossistema.

## 🗂 Estrutura do Projeto
```
├── components/              # Componentes reutilizáveis (seções, cartões, animações, detalhe do modelo)
│   └── detail/              # Subcomponentes específicos da página de detalhe
├── constants.ts             # Catálogo de modelos e metadados
├── App.tsx                  # Orquestra as “views” e seleção de modelos
├── index.tsx / index.html   # Bootstrap Vite + Tailwind CDN
├── types.ts                 # Tipagem compartilhada
├── vite.config.ts           # Configuração do bundler
├── .env.local               # Variáveis de ambiente locais (não versionado)
└── README.md                # Este documento
```

## ⚙️ Pré-requisitos
- Node.js 18+ (recomendado 20 LTS).  
- npm 9+ ou pnpm/yarn equivalente.  
- Recomendado: editor com suporte a TypeScript/ESLint e plugin Prettier.

## 🚀 Configuração Rápida
1. **Instale as dependências**
   ```bash
   npm install
   ```
2. **Variáveis de ambiente**
   - Copie `.env.example` para `.env.local`.
   - Preencha `RIO_API_KEY` com sua chave real (mantenha o arquivo fora do versionamento).
   - Ajuste `RIO_PROXY_PORT` ou `VITE_RIO_CHAT_PROXY_URL` se precisar mudar portas/rotas.
3. **Inicie o proxy seguro**
   ```bash
   npm run proxy
   ```
   O servidor padrão escuta em `http://localhost:3001/api/chat` e injeta o token automaticamente.
4. **Ambiente de desenvolvimento** (novo terminal)
   ```bash
   npm run dev
   ```
   O Vite iniciará em `http://localhost:5173` (use `-- --host` para rede local).
5. **Build de produção**
   ```bash
   npm run build
   npm run preview   # Servir build estático para inspeção
   ```

## 📜 Scripts Disponíveis
| Comando           | Ação                                                        |
|-------------------|-------------------------------------------------------------|
| `npm run dev`     | Ambiente de desenvolvimento (hot module replacement)        |
| `npm run build`   | Gera bundle otimizado em `dist/`                            |
| `npm run preview` | Servidor estático para revisar o build                      |

## 🔐 Integrações & Segurança
- **Proxy oficial incluso**: o script `npm run proxy` (arquivo `server/proxy.mjs`) carrega `RIO_API_KEY` do `.env.local`, injeta o header e evita expor a credencial no bundle.  
- **Ajuste de ambiente**: personalize `RIO_PROXY_PORT`, `RIO_ALLOWED_ORIGINS` ou `RIO_API_URL` conforme o cenário (produção/QA).  
- **Uso responsável**: o chat envia as últimas 6 mensagens e um prompt de sistema. Ajuste limites, sanitize entradas e monitore o backend para evitar abuso.

## 🧱 Padrões de Código
- **Tipagem:** mantenha `types.ts` como fonte única de contratos.  
- **Estilo:** utilize Tailwind para estilos rápidos; prefira classes utilitárias consistentes.  
- **Componentização:** reparta responsabilidades (seções vs. widgets) para preservar legibilidade.  
- **Acessibilidade:** componentes já incluem labels e estados focados; preserve ao criar novos elementos interativos.

## 🗒️ Instruções para o Codex
- **Na conversa:** envie as orientações diretamente no chat (de preferência na primeira mensagem). Elas valem para a sessão atual e precisam deixar claro quando passam a vigorar.
- **No repositório:** mantenha um arquivo dedicado (por exemplo, `CODEX_INSTRUCTIONS.md`) ou uma seção neste README. Ao iniciar nova sessão, lembre o Codex de consultá-las para que sejam aplicadas.

## 📄 Licença & Créditos
Conteúdo visual e textual pertence à Prefeitura do Rio / IPLANRIO. Consulte o time jurídico antes de reutilizar assets ou layouts fora do escopo institucional.

---
**Contato interno:** Escritório de Dados – IPLANRIO (`dados@iplan.rio`)  
**Manutenção:** mantenha este README atualizado sempre que a arquitetura ou fluxos mudarem. Ele é a principal referência para você e para os próximos desenvolvedores.
