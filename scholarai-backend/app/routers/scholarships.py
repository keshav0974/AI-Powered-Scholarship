from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import (
    User,
    Scholarship,
    StudentProfile
)


router = APIRouter(
    prefix="/api/scholarships",
    tags=["Scholarships"]
)


@router.get("/")
def get_scholarships(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    scholarships = db.query(
        Scholarship
    ).all()

    return scholarships


@router.get("/matches")
def get_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == current_user.id
    ).first()

    if not profile:

        return []


    scholarships = db.query(
        Scholarship
    ).all()

    matches = []

    for scholarship in scholarships:

        score = 0
        criteria = 0

        if scholarship.minimum_percentage is not None:

            criteria += 1

            if (
                profile.percentage is not None
                and profile.percentage >= scholarship.minimum_percentage
            ):
                score += 1

        if scholarship.maximum_income is not None:

            criteria += 1

            if (
                profile.annual_income is not None
                and profile.annual_income <= scholarship.maximum_income
            ):
                score += 1

        if scholarship.category:

            criteria += 1

            if profile.category == scholarship.category:
                score += 1

        if scholarship.state:

            criteria += 1

            if profile.state == scholarship.state:
                score += 1

        if scholarship.course:

            criteria += 1

            if profile.course == scholarship.course:
                score += 1

        match_score = (
            round((score / criteria) * 100)
            if criteria > 0
            else 0
        )

        matches.append({
            "scholarship": scholarship,
            "match_score": match_score
        })

    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matches


@router.get("/{scholarship_id}")
def get_scholarship(
    scholarship_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

    return scholarship