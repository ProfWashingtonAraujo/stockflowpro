from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

import jwt
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from .database import Base, SessionLocal, engine
from .models import Movement, Product, User
from .schemas import (
    LoginPayload,
    LoginResponse,
    PasswordChangePayload,
    ProductPayload,
    ProfileUpdatePayload,
    StockInPayload,
    StockOutPayload,
    UserCreatePayload,
    UserResponse,
    UserUpdatePayload,
)
from .security import create_access_token, decode_access_token, hash_password, verify_password
from .seed import seed_database


app = FastAPI(
    title="StockFlowPro Web",
    version="0.3.0",
    description="API em Python para apoiar a versao web do StockFlowPro.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
ASSETS_DIR = DIST_DIR / "assets"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def serialize_user(user: User) -> dict:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "job": user.job,
        "role": user.role,
        "status": user.status,
        "lastAccess": user.last_access.isoformat(),
        "createdAt": user.created_at.isoformat(),
        "permissions": user.permissions or [],
        "avatar": user.avatar,
    }


def serialize_product(product: Product) -> dict:
    return {
        "id": product.id,
        "code": product.code,
        "name": product.name,
        "category": product.category,
        "unit": product.unit,
        "quantity": product.quantity,
        "minStock": product.min_stock,
        "maxStock": product.max_stock,
        "cost": product.cost,
        "salePrice": product.sale_price,
        "supplier": product.supplier,
        "location": product.location,
        "status": product.status,
        "observations": product.observations,
    }


def serialize_movement(movement: Movement) -> dict:
    return {
        "id": movement.id,
        "date": movement.date.isoformat(),
        "type": movement.type,
        "productId": movement.product_id,
        "productName": movement.product_name,
        "code": movement.code,
        "category": movement.category,
        "quantity": movement.quantity,
        "value": movement.value,
        "originDestiny": movement.origin_destiny,
        "responsible": movement.responsible,
        "status": movement.status,
        "observations": movement.observations,
    }


def compute_dashboard(products: list[Product]) -> dict[str, int | float]:
    total_products = len(products)
    low_stock = sum(1 for product in products if product.quantity <= product.min_stock)
    total_items = sum(product.quantity for product in products)
    stock_value = sum(product.quantity * product.cost for product in products)
    active_products = sum(1 for product in products if product.status == "Ativo")
    return {
        "totalProducts": total_products,
        "lowStockProducts": low_stock,
        "totalItems": total_items,
        "stockValue": round(stock_value, 2),
        "activeProducts": active_products,
    }


def compute_category_distribution(products: list[Product]) -> list[dict[str, int | str]]:
    categories: dict[str, int] = {}
    for product in products:
        categories[product.category] = categories.get(product.category, 0) + product.quantity
    return [{"name": name, "value": value} for name, value in categories.items()]


def compute_monthly_purchases(movements: list[Movement]) -> list[dict[str, int | str | float]]:
    month_names = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    month_totals: dict[int, float] = {}
    for movement in movements:
        if movement.type != "Entrada":
            continue
        month_totals[movement.date.month] = month_totals.get(movement.date.month, 0) + movement.value

    current_month = datetime.now(timezone.utc).month
    months = [((current_month - offset - 1) % 12) + 1 for offset in range(5, -1, -1)]
    return [{"month": month_names[month - 1], "value": round(month_totals.get(month, 0), 2)} for month in months]


def build_bootstrap(db: Session) -> dict:
    products = db.query(Product).order_by(Product.name.asc()).all()
    movements = db.query(Movement).order_by(Movement.date.desc()).all()
    users = db.query(User).order_by(User.name.asc()).all()
    return {
        "products": [serialize_product(product) for product in products],
        "movements": [serialize_movement(movement) for movement in movements],
        "users": [serialize_user(user) for user in users],
        "dashboard": compute_dashboard(products),
        "monthlyPurchases": compute_monthly_purchases(movements),
        "categoryDistribution": compute_category_distribution(products),
    }


def require_user(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Sessao nao autenticada.")

    token = authorization.removeprefix("Bearer ").strip()
    try:
        payload = decode_access_token(token)
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=401, detail="Token invalido.") from exc

    user = db.get(User, payload.get("sub"))
    if not user or user.status != "Ativo":
        raise HTTPException(status_code=401, detail="Usuario nao autorizado.")
    return user


def get_product_or_404(db: Session, product_id: str) -> Product:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Produto nao encontrado.")
    return product


def get_user_or_404(db: Session, user_id: str) -> User:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario nao encontrado.")
    return user


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as session:
        seed_database(session)


@app.get("/api/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/auth/login", response_model=LoginResponse)
def login(payload: LoginPayload, db: Session = Depends(get_db)) -> dict:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha invalidos.")

    user.last_access = datetime.now(timezone.utc)
    db.commit()
    return {"accessToken": create_access_token(user.id), "user": serialize_user(user)}


@app.get("/api/auth/me", response_model=UserResponse)
def me(current_user: User = Depends(require_user)) -> dict:
    return serialize_user(current_user)


@app.post("/api/auth/change-password")
def change_password(payload: PasswordChangePayload, current_user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    if not verify_password(payload.currentPassword, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Senha atual incorreta.")
    current_user.password_hash = hash_password(payload.newPassword)
    db.commit()
    return {"message": "Senha atualizada com sucesso."}


@app.get("/api/bootstrap")
def bootstrap(_: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    return build_bootstrap(db)


@app.get("/api/products")
def list_products(_: User = Depends(require_user), db: Session = Depends(get_db)) -> list[dict]:
    return [serialize_product(product) for product in db.query(Product).order_by(Product.name.asc()).all()]


@app.get("/api/movements")
def list_movements(_: User = Depends(require_user), db: Session = Depends(get_db)) -> list[dict]:
    return [serialize_movement(movement) for movement in db.query(Movement).order_by(Movement.date.desc()).all()]


@app.get("/api/users")
def list_users(_: User = Depends(require_user), db: Session = Depends(get_db)) -> list[dict]:
    return [serialize_user(user) for user in db.query(User).order_by(User.name.asc()).all()]


@app.get("/api/dashboard")
def dashboard_summary(_: User = Depends(require_user), db: Session = Depends(get_db)) -> dict[str, int | float]:
    return compute_dashboard(db.query(Product).all())


@app.post("/api/products")
def create_product(payload: ProductPayload, _: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    product = Product(
        id=payload.id or str(uuid4()),
        code=payload.code,
        name=payload.name,
        category=payload.category,
        unit=payload.unit,
        quantity=payload.quantity,
        min_stock=payload.minStock,
        max_stock=payload.maxStock,
        cost=payload.cost,
        sale_price=payload.salePrice,
        supplier=payload.supplier,
        location=payload.location,
        status=payload.status,
        observations=payload.observations,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return serialize_product(product)


@app.put("/api/products/{product_id}")
def update_product(product_id: str, payload: ProductPayload, _: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    product = get_product_or_404(db, product_id)
    product.code = payload.code
    product.name = payload.name
    product.category = payload.category
    product.unit = payload.unit
    product.quantity = payload.quantity
    product.min_stock = payload.minStock
    product.max_stock = payload.maxStock
    product.cost = payload.cost
    product.sale_price = payload.salePrice
    product.supplier = payload.supplier
    product.location = payload.location
    product.status = payload.status
    product.observations = payload.observations
    db.commit()
    db.refresh(product)
    return serialize_product(product)


@app.post("/api/users")
def create_user(payload: UserCreatePayload, _: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Ja existe usuario com esse e-mail.")

    user = User(
        id=payload.id or str(uuid4()),
        name=payload.name,
        email=str(payload.email),
        job=payload.job,
        role=payload.role,
        status=payload.status,
        created_at=datetime.now(timezone.utc),
        last_access=datetime.now(timezone.utc),
        permissions=payload.permissions,
        avatar=payload.avatar,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return serialize_user(user)


@app.put("/api/users/{user_id}")
def update_user(user_id: str, payload: UserUpdatePayload, _: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    user = get_user_or_404(db, user_id)
    conflict = db.query(User).filter(User.email == payload.email, User.id != user_id).first()
    if conflict:
        raise HTTPException(status_code=400, detail="Ja existe usuario com esse e-mail.")

    user.name = payload.name
    user.email = str(payload.email)
    user.job = payload.job
    user.role = payload.role
    user.status = payload.status
    user.permissions = payload.permissions
    user.avatar = payload.avatar
    if payload.password:
        user.password_hash = hash_password(payload.password)
    db.commit()
    db.refresh(user)
    return serialize_user(user)


@app.put("/api/profile")
def update_profile(payload: ProfileUpdatePayload, current_user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    conflict = db.query(User).filter(User.email == payload.email, User.id != current_user.id).first()
    if conflict:
        raise HTTPException(status_code=400, detail="Ja existe usuario com esse e-mail.")

    current_user.name = payload.name
    current_user.email = str(payload.email)
    current_user.job = payload.job
    current_user.avatar = payload.avatar
    db.commit()
    db.refresh(current_user)
    return serialize_user(current_user)


@app.post("/api/movements/stock-in")
def stock_in(payload: StockInPayload, current_user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    product = get_product_or_404(db, payload.productId)
    product.quantity += payload.quantity
    product.cost = payload.cost
    product.supplier = payload.supplier

    movement = Movement(
        id=str(uuid4()),
        date=datetime.now(timezone.utc),
        type="Entrada",
        product_id=product.id,
        product_name=product.name,
        code=product.code,
        category=product.category,
        quantity=payload.quantity,
        value=round(payload.quantity * payload.cost, 2),
        origin_destiny=payload.supplier,
        responsible=current_user.name,
        status="Concluido",
    )
    db.add(movement)
    db.commit()
    db.refresh(product)
    db.refresh(movement)
    return {"product": serialize_product(product), "movement": serialize_movement(movement)}


@app.post("/api/movements/stock-out")
def stock_out(payload: StockOutPayload, current_user: User = Depends(require_user), db: Session = Depends(get_db)) -> dict:
    product = get_product_or_404(db, payload.productId)
    if payload.quantity > product.quantity:
        raise HTTPException(status_code=400, detail="Quantidade indisponivel em estoque.")

    product.quantity -= payload.quantity
    movement = Movement(
        id=str(uuid4()),
        date=datetime.now(timezone.utc),
        type="Saida",
        product_id=product.id,
        product_name=product.name,
        code=product.code,
        category=product.category,
        quantity=payload.quantity,
        value=round(payload.quantity * product.cost, 2),
        origin_destiny=payload.sector,
        responsible=current_user.name,
        status="Concluido",
    )
    db.add(movement)
    db.commit()
    db.refresh(product)
    db.refresh(movement)
    return {"product": serialize_product(product), "movement": serialize_movement(movement)}


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
