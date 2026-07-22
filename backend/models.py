from datetime import datetime

from sqlalchemy import JSON, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    job: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(64))
    status: Mapped[str] = mapped_column(String(32), default="Ativo")
    last_access: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    permissions: Mapped[list[str]] = mapped_column(JSON, default=list)
    avatar: Mapped[str | None] = mapped_column(Text, nullable=True)
    password_hash: Mapped[str] = mapped_column(String(512))


class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    code: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    category: Mapped[str] = mapped_column(String(128))
    unit: Mapped[str] = mapped_column(String(64))
    quantity: Mapped[int] = mapped_column(Integer, default=0)
    min_stock: Mapped[int] = mapped_column(Integer, default=0)
    max_stock: Mapped[int] = mapped_column(Integer, default=0)
    cost: Mapped[float] = mapped_column(Float, default=0)
    sale_price: Mapped[float] = mapped_column(Float, default=0)
    supplier: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(32), default="Ativo")
    observations: Mapped[str | None] = mapped_column(Text, nullable=True)

    movements: Mapped[list["Movement"]] = relationship(back_populates="product")


class Movement(Base):
    __tablename__ = "movements"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    type: Mapped[str] = mapped_column(String(32))
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), index=True)
    product_name: Mapped[str] = mapped_column(String(255))
    code: Mapped[str] = mapped_column(String(64))
    category: Mapped[str] = mapped_column(String(128))
    quantity: Mapped[int] = mapped_column(Integer)
    value: Mapped[float] = mapped_column(Float)
    origin_destiny: Mapped[str] = mapped_column(String(255))
    responsible: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(32), default="Concluido")
    observations: Mapped[str | None] = mapped_column(Text, nullable=True)

    product: Mapped[Product] = relationship(back_populates="movements")
