# TRAÇO — IA para Engenharia Civil

> Do traço à obra, sem adivinhação.

SaaS brasileiro para geração automática de quantitativos e orçamento estimativo a partir de plantas baixas, usando visão computacional e IA. Inspirado na Togal.AI (EUA), adaptado ao mercado brasileiro (SINAPI/CUB).

## Arquitetura

Monorepo com separação clara entre frontend, backend e engine de IA:

```
traco/
├── apps/
│   ├── web/          # Next.js 14 (App Router) + Tailwind + TypeScript
│   └── api/          # FastAPI (Python) — API REST + upload de plantas
├── packages/
│   └── ai/           # Scripts isolados de visão computacional (futuro)
└── docs/             # Documentação técnica e de produto
```

### Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS, TypeScript
- **Backend:** FastAPI, Pydantic, Uvicorn
- **IA (futuro):** OpenCV, PyTorch/TensorFlow, NumPy
- **Design System:** Cores e tipografia do Manual de Identidade v2.0

## Identidade Visual

Todas as cores, fontes e regras de uso estão definidas no manual de identidade. O Tailwind já está configurado com as variáveis da marca:

- `traco-laranja` (#FF5A1F) — cor primária de ação
- `grafite` (#1C1815) — fundo dark mode
- `font-mono` (IBM Plex Mono) — obrigatório para todos os números

**Regra de ouro:** Nunca prometer exatidão. Sempre exibir "estimativa" ou margem (±8%) perto de valores gerados por IA.

## Como rodar

### Pré-requisitos

- Node.js 18+
- Python 3.10+
- npm ou yarn

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Acessar em `http://localhost:3000`

### Backend

```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API disponível em `http://localhost:8000`  
Docs Swagger em `http://localhost:8000/docs`

## Próximos passos

- [ ] Implementar tela de upload de planta (drag & drop)
- [ ] Integrar endpoint `/upload` com processamento real de PDF/DWG
- [ ] Adicionar worker de IA (Celery + Redis) para processamento assíncrono
- [ ] Criar tela de relatório detalhado exportável (PDF/Excel)
- [ ] Autenticação de usuários (NextAuth ou Clerk)
- [ ] Banco de dados (PostgreSQL + Prisma ou SQLAlchemy)

## Licença

Proprietário — TRAÇO © 2026