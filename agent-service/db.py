import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client["test"]  # uses the db name from your URI

jobs_collection = db["jobs"]
job_matches_collection = db["jobmatches"]  # matches Mongoose's pluralized collection name
users_collection = db["users"]