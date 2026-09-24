from pydantic import BaseModel, EmailStr
from typing import Optional


class RegisterRequest(BaseModel):

    name: str

    email: EmailStr

    password: str

    role: str = "student"


class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str

    is_active: bool

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):

    access_token: str

    token_type: str


class ProfileRequest(BaseModel):

    phone: Optional[str] = None

    state: Optional[str] = None

    city: Optional[str] = None

    college: Optional[str] = None

    course: Optional[str] = None

    year: Optional[str] = None

    percentage: Optional[float] = None

    annual_income: Optional[float] = None

    category: Optional[str] = None


class ScholarshipResponse(BaseModel):

    id: int

    name: str

    provider: str

    description: Optional[str]

    amount: Optional[float]

    deadline: Optional[str]

    minimum_percentage: Optional[float]

    maximum_income: Optional[float]

    category: Optional[str]

    state: Optional[str]

    course: Optional[str]

    class Config:
        from_attributes = True