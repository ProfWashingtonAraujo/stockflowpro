from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title="StockFlowPro Web",
    version="0.1.0",
    description="API em Python para apoiar a versao web do StockFlowPro.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


PRODUCTS = [
    {
        "id": "1",
        "code": "INF-001",
        "name": "Cabo de Rede CAT6",
        "category": "Informatica",
        "unit": "Metro",
        "quantity": 150,
        "minStock": 50,
        "maxStock": 500,
        "cost": 2.5,
        "salePrice": 5.0,
        "supplier": "Tech Distribuidora",
        "location": "Prateleira A1",
        "status": "Ativo",
    },
    {
        "id": "2",
        "code": "INF-002",
        "name": "Mouse Sem Fio",
        "category": "Informatica",
        "unit": "Unidade",
        "quantity": 15,
        "minStock": 20,
        "maxStock": 100,
        "cost": 45.0,
        "salePrice": 89.9,
        "supplier": "Tech Distribuidora",
        "location": "Prateleira A2",
        "status": "Ativo",
    },
    {
        "id": "3",
        "code": "ESC-001",
        "name": "Papel A4",
        "category": "Escritorio",
        "unit": "Pacote",
        "quantity": 45,
        "minStock": 10,
        "maxStock": 200,
        "cost": 22.0,
        "salePrice": 35.0,
        "supplier": "Office Center",
        "location": "Armario B1",
        "status": "Ativo",
    },
    {
        "id": "4",
        "code": "ESC-002",
        "name": "Toner Impressora HP",
        "category": "Escritorio",
        "unit": "Unidade",
        "quantity": 4,
        "minStock": 5,
        "maxStock": 20,
        "cost": 180.0,
        "salePrice": 250.0,
        "supplier": "Office Center",
        "location": "Armario B2",
        "status": "Ativo",
    },
    {
        "id": "5",
        "code": "LIM-001",
        "name": "Alcool 70%",
        "category": "Limpeza",
        "unit": "Litro",
        "quantity": 30,
        "minStock": 10,
        "maxStock": 50,
        "cost": 8.5,
        "salePrice": 15.0,
        "supplier": "LimpaMais",
        "location": "Deposito C1",
        "status": "Ativo",
    },
    {
        "id": "6",
        "code": "MAN-001",
        "name": "Lampada LED 12W",
        "category": "Manutencao",
        "unit": "Unidade",
        "quantity": 0,
        "minStock": 10,
        "maxStock": 100,
        "cost": 12.0,
        "salePrice": 22.0,
        "supplier": "Eletro Norte",
        "location": "Prateleira D1",
        "status": "Ativo",
    },
]


MOVEMENTS = [
    {
        "id": "m1",
        "type": "Entrada",
        "productId": "1",
        "productName": "Cabo de Rede CAT6",
        "code": "INF-001",
        "category": "Informatica",
        "quantity": 100,
        "value": 250.0,
        "originDestiny": "Tech Distribuidora",
        "responsible": "Washington Araujo",
        "status": "Concluido",
    },
    {
        "id": "m2",
        "type": "Saida",
        "productId": "2",
        "productName": "Mouse Sem Fio",
        "code": "INF-002",
        "category": "Informatica",
        "quantity": 5,
        "value": 225.0,
        "originDestiny": "Setor de TI",
        "responsible": "Washington Araujo",
        "status": "Concluido",
    },
]


@app.get("/api/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/products")
def list_products() -> list[dict]:
    return PRODUCTS


@app.get("/api/movements")
def list_movements() -> list[dict]:
    return MOVEMENTS


@app.get("/api/dashboard")
def dashboard_summary() -> dict[str, int | float]:
    total_products = len(PRODUCTS)
    low_stock = sum(1 for product in PRODUCTS if product["quantity"] <= product["minStock"])
    total_items = sum(product["quantity"] for product in PRODUCTS)
    stock_value = sum(product["quantity"] * product["cost"] for product in PRODUCTS)
    return {
        "totalProducts": total_products,
        "lowStockProducts": low_stock,
        "totalItems": total_items,
        "stockValue": round(stock_value, 2),
    }


project_root = Path(__file__).resolve().parent.parent
dist_dir = project_root / "dist"
assets_dir = dist_dir / "assets"

if assets_dir.exists():
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")


@app.get("/", include_in_schema=False)
def serve_index():
    index_file = dist_dir / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {
        "message": "Frontend build nao encontrado. Rode 'npm run build' para gerar o dist/."
    }


@app.get("/{full_path:path}", include_in_schema=False)
def serve_spa(full_path: str):
    candidate = dist_dir / full_path
    if candidate.exists() and candidate.is_file():
        return FileResponse(candidate)

    index_file = dist_dir / "index.html"
    if index_file.exists():
        return FileResponse(index_file)

    return {
        "message": "Rota nao encontrada e frontend build nao esta disponivel.",
        "path": full_path,
    }
