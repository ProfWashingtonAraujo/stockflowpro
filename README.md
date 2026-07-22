# StockFlowPro

Base web do projeto com frontend React/Vite e backend Python com FastAPI.

## Requisitos

- Node.js
- Python 3.10+

## Frontend

Instalar dependencias:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build estatico:

```bash
npm run build
```

## Backend Python

Instalar dependencias:

```bash
python -m pip install -r requirements.txt
```

Rodar a API:

```bash
python -m uvicorn backend.main:app --reload
```

## Endpoints iniciais

- `GET /api/health`
- `GET /api/products`
- `GET /api/movements`
- `GET /api/dashboard`

Quando `dist/` existir, o FastAPI tambem serve o frontend pelo caminho `/`.
