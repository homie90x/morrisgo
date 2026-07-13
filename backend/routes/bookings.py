from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.database import Booking, sample_bookings, sample_rides

router = APIRouter(prefix="/bookings", tags=["bookings"])


class BookingCreate(BaseModel):
    ride_id: int
    user_email: str


@router.get("", response_model=List[Booking])
def list_bookings() -> List[Booking]:
    return sample_bookings


@router.post("", response_model=Booking)
def create_booking(payload: BookingCreate) -> Booking:
    ride = next((item for item in sample_rides if item.id == payload.ride_id), None)
    if ride is None:
        raise HTTPException(status_code=404, detail="Ride not found")

    booking = Booking(
        id=len(sample_bookings) + 1,
        ride_id=payload.ride_id,
        user_email=payload.user_email,
    )
    sample_bookings.append(booking)
    return booking
