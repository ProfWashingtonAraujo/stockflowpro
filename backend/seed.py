from datetime import datetime, timezone

from sqlalchemy.orm import Session

from .models import Movement, Product, User
from .security import hash_password


def seed_database(session: Session) -> None:
    if session.query(User).first():
        return

    now = datetime.now(timezone.utc)

    users = [
        User(
            id="u1",
            name="Washington Araújo",
            email="washington@stockflow.pro",
            job="Diretor de Operações",
            role="Administrador",
            status="Ativo",
            last_access=now,
            created_at=datetime(2026, 1, 1, 10, 0, tzinfo=timezone.utc),
            permissions=["all"],
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            password_hash=hash_password("password123"),
        ),
        User(
            id="u2",
            name="Ana Silva",
            email="ana.silva@stockflow.pro",
            job="Analista de Estoque",
            role="Estoquista",
            status="Ativo",
            last_access=now,
            created_at=datetime(2026, 2, 15, 14, 30, tzinfo=timezone.utc),
            permissions=["view_dashboard", "manage_products", "stock_in", "stock_out"],
            avatar=None,
            password_hash=hash_password("password123"),
        ),
    ]

    products = [
        Product(id="1", code="INF-001", name="Cabo de Rede CAT6", category="Informática", unit="Metro", quantity=150, min_stock=50, max_stock=500, cost=2.5, sale_price=5.0, supplier="Tech Distribuidora", location="Prateleira A1", status="Ativo"),
        Product(id="2", code="INF-002", name="Mouse Sem Fio", category="Informática", unit="Unidade", quantity=15, min_stock=20, max_stock=100, cost=45.0, sale_price=89.9, supplier="Tech Distribuidora", location="Prateleira A2", status="Ativo"),
        Product(id="3", code="ESC-001", name="Papel A4", category="Escritório", unit="Pacote", quantity=45, min_stock=10, max_stock=200, cost=22.0, sale_price=35.0, supplier="Office Center", location="Armário B1", status="Ativo"),
        Product(id="4", code="ESC-002", name="Toner Impressora HP", category="Escritório", unit="Unidade", quantity=4, min_stock=5, max_stock=20, cost=180.0, sale_price=250.0, supplier="Office Center", location="Armário B2", status="Ativo"),
        Product(id="5", code="LIM-001", name="Álcool 70%", category="Limpeza", unit="Litro", quantity=30, min_stock=10, max_stock=50, cost=8.5, sale_price=15.0, supplier="LimpaMais", location="Depósito C1", status="Ativo"),
        Product(id="6", code="MAN-001", name="Lâmpada LED 12W", category="Manutenção", unit="Unidade", quantity=0, min_stock=10, max_stock=100, cost=12.0, sale_price=22.0, supplier="Eletro Norte", location="Prateleira D1", status="Ativo"),
    ]

    movements = [
        Movement(id="m1", date=datetime(2026, 7, 22, 0, 0, tzinfo=timezone.utc), type="Entrada", product_id="1", product_name="Cabo de Rede CAT6", code="INF-001", category="Informática", quantity=100, value=250.0, origin_destiny="Tech Distribuidora", responsible="Washington Araújo", status="Concluido"),
        Movement(id="m2", date=datetime(2026, 7, 22, 0, 0, tzinfo=timezone.utc), type="Saida", product_id="2", product_name="Mouse Sem Fio", code="INF-002", category="Informática", quantity=5, value=225.0, origin_destiny="Setor de TI", responsible="Washington Araújo", status="Concluido"),
    ]

    session.add_all(users + products + movements)
    session.commit()
