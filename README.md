# TRAÇO — IA para Engenharia Civil

> Do traço à obra, sem adivinhação.

SaaS brasileiro para geração automática de quantitativos e orçamento estimativo a partir de plantas baixas, usando visão computacional e IA. Inspirado na Togal.AI (EUA), adaptado ao mercado brasileiro (SINAPI/CUB).

## Arquitetura

Monorepo com separação clara entre frontend, backend e engine de IA:

```
traco/
├── apps/
│   ├── web/          # Next.js 14 (App Router) + Tailwind + TypeScript
│   └── backend/      # Java 21 + Spring Boot 3 — API REST, JWT auth, H2/Postgres
├── packages/
│   └── ai/           # Scripts isolados de visão computacional (futuro)
└── docs/             # Documentação técnica e de produto
```

### Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS, TypeScript
- **Backend:** Java 21, Spring Boot 3, Spring Security + JWT, H2 (dev) / PostgreSQL (prod)
- **IA (futuro):** OpenCV, PyTorch/TensorFlow, NumPy
- **Design System:** Cores e tipografia do Manual de Identidade v2.0

## Identidade Visual

Todas as cores, fontes e regras de uso estão definidas no manual de identidade. O Tailwind já está configurado com as variáveis da marca:

- `traco-laranja` (#FF5A1F) — cor primária de ação
- `grafite` (#1C1815) — fundo dark mode
- `font-mono` (IBM Plex Mono) — obrigatório para todos os números

**Regra de ouro:** Nunca prometer exatidão. Sempre exibir "estimativa" ou margem (±8%) perto de qualquer valor gerado por IA.

## Como rodar

### Pré-requisitos

- Node.js 18+
- Java 21 (JDK) + Maven 3.9+
- npm ou yarn

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Acessar em `http://localhost:3000`

### Backend (Java 21 + Spring Boot 3)

```bash
cd apps/backend
mvn -B -DskipTests package
java -jar target/traco-api-0.1.0.jar
```

API disponível em `http://localhost:8000`
H2 Console em `http://localhost:8000/h2-console` (JDBC url: `jdbc:h2:file:./data/traco`, user `traco` / `traco`)
Login demo: `demo@traco.com.br` / `demo123`

### Endpoints principais

- `POST /api/auth/register` · `POST /api/auth/login` · `GET /api/auth/me`
- `GET|POST|PUT|DELETE /api/projetos`
- `POST /api/plantas/upload` · `GET /api/plantas` · `DELETE /api/plantas/{id}`
- `GET /api/analises`
- Legados (compatíveis com o frontend antigo): `GET /`, `POST /upload/`, `GET /analysis/{id}`

## Próximos passos

- [x] Telas completas do frontend (upload, dashboard, projetos, plantas, análises, orçamentos, configurações)
- [x] Backend Java com autenticação JWT e persistência H2/Postgres
- [x] Integração frontend ↔ backend com fallback demo
- [ ] Worker de visão computacional real (OpenCV/PyTorch) no lugar do AnalysisEngine simulado
- [ ] Exportação de relatórios PDF/Excel
- [ ] Deploy do backend em produção (Render/Railway com profile `prod`)

## Licença

Proprietário — TRAÇO © 2026