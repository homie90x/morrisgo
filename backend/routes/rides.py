from typing import List, Optional

from fastapi import APIRouter, Query

from backend.database import Ride, sample_rides

router = APIRouter(prefix="/rides", tags=["rides"])


@router.get("", response_model=List[Ride])
def search_rides(
    from_location: Optional[str] = Query(default=None),
    to_location: Optional[str] = Query(default=None),
    date: Optional[str] = Query(default=None),
) -> List[Ride]:
    results = sample_rides

    if from_location:
        results = [ride for ride in results if ride.from_location.lower() == from_location.lower()]

    if to_location:
        results = [ride for ride in results if ride.to_location.lower() == to_location.lower()]

    if date:
        results = [ride for ride in results if date in ride.departure_time]

    return results
