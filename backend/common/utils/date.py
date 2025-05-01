from datetime import datetime

# Convert offset-aware datetime to offset-naive
def make_naive(dt: datetime) -> datetime:
    if dt.tzinfo is not None:
        return dt.astimezone(tz=None).replace(tzinfo=None)
    return dt