from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    job: str
    role: str
    status: str
    lastAccess: str
    createdAt: str
    permissions: list[str]
    avatar: str | None = None


class UserCreatePayload(BaseModel):
    id: str | None = None
    name: str
    email: EmailStr
    job: str
    role: str
    status: Literal["Ativo", "Inativo"]
    permissions: list[str] = []
    avatar: str | None = None
    password: str = Field(min_length=6)


class UserUpdatePayload(BaseModel):
    name: str
    email: EmailStr
    job: str
    role: str
    status: Literal["Ativo", "Inativo"]
    permissions: list[str] = []
    avatar: str | None = None
    password: str | None = Field(default=None, min_length=6)


class LoginPayload(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    accessToken: str
    user: UserResponse


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


class ProfileUpdatePayload(BaseModel):
    name: str
    email: EmailStr
    job: str
    avatar: str | None = None


class PasswordChangePayload(BaseModel):
    currentPassword: str
    newPassword: str = Field(min_length=6)
