from typing import Optional
from pydantic import BaseModel


class Problem(BaseModel):
    title: str
    slug: str
    difficulty: str


class Event(BaseModel):
    type: str
    platform: str
    timestamp: int
    problem: Problem

    # Submission
    result: Optional[str] = None

    # Performance
    runtime: Optional[str] = None
    memory: Optional[int] = None

    # Judge
    totalCorrect: Optional[int] = None
    totalTestcases: Optional[int] = None

    # Metadata
    submissionId: Optional[str] = None