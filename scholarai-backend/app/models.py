from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )

    hashed_password = Column(String(255), nullable=False)

    role = Column(
        String(30),
        default="student",
        nullable=False
    )

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    phone = Column(String(20))

    state = Column(String(100))

    city = Column(String(100))

    college = Column(String(200))

    course = Column(String(150))

    year = Column(String(50))

    percentage = Column(Float)

    annual_income = Column(Float)

    category = Column(String(100))

    profile_completion = Column(
        Integer,
        default=0
    )


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(200),
        nullable=False
    )

    provider = Column(
        String(200),
        nullable=False
    )

    description = Column(Text)

    amount = Column(Float)

    deadline = Column(String(50))

    minimum_percentage = Column(Float)

    maximum_income = Column(Float)

    category = Column(String(100))

    state = Column(String(100))

    course = Column(String(150))

    required_documents = Column(Text)


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    scholarship_id = Column(
        Integer,
        ForeignKey("scholarships.id"),
        nullable=False
    )

    status = Column(
        String(50),
        default="submitted"
    )

    applied_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    document_type = Column(
        String(100),
        nullable=False
    )

    filename = Column(
        String(255),
        nullable=False
    )

    file_path = Column(
        String(500),
        nullable=False
    )

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    message = Column(Text)

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )