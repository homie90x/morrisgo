from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/register", response_model=TokenResponse)
def register_user(payload: RegisterRequest) -> TokenResponse:
    if not payload.name or not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="All fields are required")

    return TokenResponse(access_token=f"demo-token-for-{payload.email}")


@router.post("/login", response_model=TokenResponse)
def login_user(payload: LoginRequest) -> TokenResponse:
    if payload.email == "demo@example.com" and payload.password == "password":
        return TokenResponse(access_token="demo-token-for-demo@example.com")

    raise HTTPException(status_code=401, detail="Invalid email or password")
