from typing import List

from pydantic import BaseModel


class Ride(BaseModel):
    id: int
    driver_name: str
    from_location: str
    to_location: str
    departure_time: str
    seats_left: int
    price: float


class Booking(BaseModel):
    id: int
    ride_id: int
    user_email: str
    status: str = "confirmed"


sample_rides: List[Ride] = [
    Ride(
        id=1,
        driver_name="Alex Johnson",
        from_location="Morris",
        to_location="Minneapolis",
        departure_time="2026-07-14T09:00",
        seats_left=3,
        price=24.0,
    ),
    Ride(
        id=2,
        driver_name="Maria Garcia",
        from_location="Morris",
        to_location="St. Cloud",
        departure_time="2026-07-14T10:30",
        seats_left=2,
        price=18.0,
    ),
    Ride(
        id=3,
        driver_name="Sam Lee",
        from_location="Alexandria",
        to_location="Morris",
        departure_time="2026-07-14T11:00",
        seats_left=4,
        price=16.0,
    ),
]

sample_bookings: List[Booking] = []
