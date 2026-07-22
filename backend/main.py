import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DATA_DIR = BASE_DIR / "data"
STORE_FILE = DATA_DIR / "store.json"
DIST_DIR = PROJECT_ROOT / "dist"
ASSETS_DIR = DIST_DIR / "assets"


DEFAULT_STORE = {
    "products": [
        {
            "id": "1",
            "code": "INF-001",
            "name": "Cabo de Rede CAT6",
            "category": "Informática",
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
            "category": "Informática",
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
            "category": "Escritório",
            "unit": "Pacote",
            "quantity": 45,
            "minStock": 10,
            "maxStock": 200,
            "cost": 22.0,
            "salePrice": 35.0,
            "supplier": "Office Center",
            "location": "Armário B1",
            "status": "Ativo",
        },
        {
            "id": "4",
            "code": "ESC-002",
            "name": "Toner Impressora HP",
            "category": "Escritório",
            "unit": "Unidade",
            "quantity": 4,
            "minStock": 5,
            "maxStock": 20,
            "cost": 180.0,
            "salePrice": 250.0,
            "supplier": "Office Center",
            "location": "Armário B2",
            "status": "Ativo",
        },
        {
            "id": "5",
            "code": "LIM-001",
            "name": "Álcool 70%",
            "category": "Limpeza",
            "unit": "Litro",
            "quantity": 30,
            "minStock": 10,
            "maxStock": 50,
            "cost": 8.5,
            "salePrice": 15.0,
            "supplier": "LimpaMais",
            "location": "Depósito C1",
            "status": "Ativo",
        },
        {
            "id": "6",
            "code": "MAN-001",
            "name": "Lâmpada LED 12W",
            "category": "Manutenção",
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
    ],
    "movements": [
        {
            "id": "m1",
            "date": datetime.now(timezone.utc).isoformat(),
            "type": "Entrada",
            "productId": "1",
            "productName": "Cabo de Rede CAT6",
            "code": "INF-001",
            "category": "Informática",
            "quantity": 100,
            "value": 250.0,
            "originDestiny": "Tech Distribuidora",
            "responsible": "Washington Araújo",
            "status": "Concluido",
        },
        {
            "id": "m2",
            "date": datetime.now(timezone.utc).isoformat(),
            "type": "Saida",
            "productId": "2",
            "productName": "Mouse Sem Fio",
            "code": "INF-002",
            "category": "Informática",
            "quantity": 5,
            "value": 225.0,
            "originDestiny": "Setor de TI",
            "responsible": "Washington Araújo",
            "status": "Concluido",
        },
    ],
}


class ProductPayload(BaseModel):
    id: str | None = None
    code: str
    name: str
    category: str
    unit: str
    quantity: int = Field(ge=0)
    minStock: int = Field(ge=0)
    maxStock: int = Field(ge=0)
    cost: float = Field(ge=0)
    salePrice: float = Field(ge=0)
    supplier: str
    location: str
    status: Literal["Ativo", "Inativo"]
    observations: str | None = None


class StockInPayload(BaseModel):
    productId: str
    quantity: int = Field(gt=0)
    cost: float = Field(ge=0)
    supplier: str


class StockOutPayload(BaseModel):
    productId: str
    quantity: int = Field(gt=0)
    sector: str


app = FastAPI(
    title="StockFlowPro Web",
    version="0.2.0",
    description="API em Python para apoiar a versao web do StockFlowPro.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ensure_store() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not STORE_FILE.exists():
        STORE_FILE.write_text(json.dumps(DEFAULT_STORE, ensure_ascii=False, indent=2), encoding="utf-8")


def load_store() -> dict:
    ensure_store()
    return json.loads(STORE_FILE.read_text(encoding="utf-8"))


def save_store(store: dict) -> None:
    STORE_FILE.write_text(json.dumps(store, ensure_ascii=False, indent=2), encoding="utf-8")


def compute_dashboard(products: list[dict]) -> dict[str, int | float]:
    total_products = len(products)
    low_stock = sum(1 for product in products if product["quantity"] <= product["minStock"])
    total_items = sum(product["quantity"] for product in products)
    stock_value = sum(product["quantity"] * product["cost"] for product in products)
    active_products = sum(1 for product in products if product["status"] == "Ativo")
    return {
        "totalProducts": total_products,
        "lowStockProducts": low_stock,
        "totalItems": total_items,
        "stockValue": round(stock_value, 2),
        "activeProducts": active_products,
    }


def compute_category_distribution(products: list[dict]) -> list[dict[str, int | str]]:
    categories: dict[str, int] = {}
    for product in products:
        categories[product["category"]] = categories.get(product["category"], 0) + product["quantity"]
    return [{"name": name, "value": value} for name, value in categories.items()]


def compute_monthly_purchases(movements: list[dict]) -> list[dict[str, int | str | float]]:
    month_names = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    month_totals: dict[int, float] = {}

    for movement in movements:
        if movement["type"] != "Entrada":
            continue
        movement_date = datetime.fromisoformat(movement["date"].replace("Z", "+00:00"))
        month_totals[movement_date.month] = month_totals.get(movement_date.month, 0) + movement["value"]

    current_month = datetime.now(timezone.utc).month
    months = [((current_month - offset - 1) % 12) + 1 for offset in range(5, -1, -1)]
    return [
        {"month": month_names[month - 1], "value": round(month_totals.get(month, 0), 2)}
        for month in months
    ]


def build_bootstrap(store: dict) -> dict:
    products = store["products"]
    movements = store["movements"]
    return {
        "products": products,
        "movements": movements,
        "dashboard": compute_dashboard(products),
        "monthlyPurchases": compute_monthly_purchases(movements),
        "categoryDistribution": compute_category_distribution(products),
    }


def get_product_or_404(store: dict, product_id: str) -> dict:
    for product in store["products"]:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Produto nao encontrado.")


@app.get("/api/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/bootstrap")
def bootstrap() -> dict:
    return build_bootstrap(load_store())


@app.get("/api/products")
def list_products() -> list[dict]:
    return load_store()["products"]


@app.get("/api/movements")
def list_movements() -> list[dict]:
    return load_store()["movements"]


@app.get("/api/dashboard")
def dashboard_summary() -> dict[str, int | float]:
    return compute_dashboard(load_store()["products"])


@app.post("/api/products")
def create_product(payload: ProductPayload) -> dict:
    store = load_store()
    product = payload.model_dump()
    product["id"] = product["id"] or str(uuid4())
    store["products"].insert(0, product)
    save_store(store)
    return product


@app.put("/api/products/{product_id}")
def update_product(product_id: str, payload: ProductPayload) -> dict:
    store = load_store()
    product = get_product_or_404(store, product_id)
    updated = payload.model_dump()
    updated["id"] = product_id
    product.update(updated)
    save_store(store)
    return product


@app.post("/api/movements/stock-in")
def stock_in(payload: StockInPayload) -> dict:
    store = load_store()
    product = get_product_or_404(store, payload.productId)
    product["quantity"] += payload.quantity
    product["cost"] = payload.cost
    product["supplier"] = payload.supplier

    movement = {
        "id": str(uuid4()),
        "date": datetime.now(timezone.utc).isoformat(),
        "type": "Entrada",
        "productId": product["id"],
        "productName": product["name"],
        "code": product["code"],
        "category": product["category"],
        "quantity": payload.quantity,
        "value": round(payload.quantity * payload.cost, 2),
        "originDestiny": payload.supplier,
        "responsible": "Washington Araújo",
        "status": "Concluido",
    }
    store["movements"].insert(0, movement)
    save_store(store)
    return {"product": product, "movement": movement, "dashboard": compute_dashboard(store["products"])}


@app.post("/api/movements/stock-out")
def stock_out(payload: StockOutPayload) -> dict:
    store = load_store()
    product = get_product_or_404(store, payload.productId)

    if payload.quantity > product["quantity"]:
        raise HTTPException(status_code=400, detail="Quantidade indisponivel em estoque.")

    product["quantity"] -= payload.quantity
    movement = {
        "id": str(uuid4()),
        "date": datetime.now(timezone.utc).isoformat(),
        "type": "Saida",
        "productId": product["id"],
        "productName": product["name"],
        "code": product["code"],
        "category": product["category"],
        "quantity": payload.quantity,
        "value": round(payload.quantity * product["cost"], 2),
        "originDestiny": payload.sector,
        "responsible": "Washington Araújo",
        "status": "Concluido",
    }
    store["movements"].insert(0, movement)
    save_store(store)
    return {"product": product, "movement": movement, "dashboard": compute_dashboard(store["products"])}


if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")


@app.get("/", include_in_schema=False)
def serve_index():
    index_file = DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": "Frontend build nao encontrado. Rode 'npm run build' para gerar o dist/."}


@app.get("/{full_path:path}", include_in_schema=False)
def serve_spa(full_path: str):
    candidate = DIST_DIR / full_path
    if candidate.exists() and candidate.is_file():
        return FileResponse(candidate)

    index_file = DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)

    return {"message": "Rota nao encontrada e frontend build nao esta disponivel.", "path": full_path}
