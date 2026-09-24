from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import User, StudentProfile
from ..schemas import ProfileRequest


router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }


@router.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == current_user.id
    ).first()

    if not profile:

        return {
            "profile": None,
            "profile_completion": 0
        }

    return profile


@router.put("/profile")
def update_profile(
    data: ProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == current_user.id
    ).first()

    if not profile:

        profile = StudentProfile(
            user_id=current_user.id
        )

        db.add(profile)

    for field, value in data.model_dump().items():

        if value is not None:

            setattr(
                profile,
                field,
                value
            )

    fields = [
        profile.phone,
        profile.state,
        profile.city,
        profile.college,
        profile.course,
        profile.year,
        profile.percentage,
        profile.annual_income,
        profile.category
    ]

    filled = sum(
        value is not None and value != ""
        for value in fields
    )

    profile.profile_completion = int(
        (filled / len(fields)) * 100
    )

    db.commit()

    db.refresh(profile)

    return profile