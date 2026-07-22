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

O Vite ja faz proxy de `/api` para `http://localhost:8000`.

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

Se quiser apontar o frontend para outra API, crie um arquivo `.env` baseado em `.env.example`.

## Endpoints iniciais

- `GET /api/health`
- `GET /api/bootstrap`
- `GET /api/products`
- `GET /api/movements`
- `GET /api/dashboard`
- `POST /api/products`
- `PUT /api/products/{product_id}`
- `POST /api/movements/stock-in`
- `POST /api/movements/stock-out`

Os dados iniciais ficam em `backend/data/store.json`.

## Deploy com Docker

Build da imagem:

```bash
docker build -t stockflowpro .
```

Rodar localmente:

```bash
docker run -p 8000:8000 stockflowpro
```

Esse container ja publica o backend Python e serve o frontend compilado no mesmo endereco.

## Publicacao no Git remoto

Quando voce me passar a URL do repositorio remoto, eu conecto com:

```bash
git remote add origin <url>
git branch -M main
git push -u origin main
```
