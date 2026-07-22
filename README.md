# StockFlowPro

Base web do projeto com frontend React/Vite e backend Python com FastAPI.

Agora o backend suporta autenticacao real com JWT e persistencia em banco via SQLAlchemy.

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

Credenciais iniciais de demonstracao:

- `washington@stockflow.pro`
- `password123`

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

Os dados iniciais sao semeados automaticamente no banco na primeira inicializacao.

Para execucao local sem configurar Postgres, o sistema usa SQLite automaticamente em `backend/data/stockflow.db`.

Para producao no Render, defina:

- `DATABASE_URL`: URL do PostgreSQL do Render
- `SECRET_KEY`: chave secreta forte para JWT

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

## PostgreSQL no Render

1. No Render, crie um banco `PostgreSQL`
2. Copie a `External Database URL`
3. No Web Service do app, adicione a variavel `DATABASE_URL`
4. Adicione tambem `SECRET_KEY` com um valor longo e privado
5. Rode um novo deploy

Na primeira subida com banco vazio, a API cria as tabelas e carrega os dados iniciais automaticamente.

## Publicacao no Git remoto

Quando voce me passar a URL do repositorio remoto, eu conecto com:

```bash
git remote add origin <url>
git branch -M main
git push -u origin main
```
