from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import (
    User,
    Scholarship,
    Application
)


router = APIRouter(
    prefix="/api/applications",
    tags=["Applications"]
)


@router.post("/{scholarship_id}")
def apply_scholarship(
    scholarship_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scholarship = db.query(
        Scholarship
    ).filter(
        Scholarship.id == scholarship_id
    ).first()

    if not scholarship:

        raise HTTPException(
            status_code=404,
            detail="Scholarship not found"
        )

    existing = db.query(
        Application
    ).filter(
        Application.student_id == current_user.id,
        Application.scholarship_id == scholarship_id
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Already applied"
        )

    application = Application(
        student_id=current_user.id,
        scholarship_id=scholarship_id,
        status="submitted"
    )

    db.add(application)

    db.commit()

    db.refresh(application)

    return application


@router.get("/")
def get_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    applications = db.query(
        Application
    ).filter(
        Application.student_id == current_user.id
    ).all()

    return applications