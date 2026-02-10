from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from matcher import compute_match_score, generate_reason
from pymongo import MongoClient
from urllib.parse import quote_plus

username = "vishalmalik1458_db_user"
password = quote_plus("7037719104@VM")  # put original password here

MONGO_URL = f"mongodb+srv://{username}:{password}@cluster0.votg09e.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URL)
db = client.rural_platform



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Sample creator database (later comes from real DB)
creators = [
    {
        "id": 1,
        "name": "Riya Food Vlogs",
        "skills": "food storytelling cooking videos instagram reels",
        "equipment": "DSLR tripod",
        "duration": 2
    },
    {
        "id": 2,
        "name": "Arjun Drone Films",
        "skills": "drone cinematic farm travel videos",
        "equipment": "Drone GoPro",
        "duration": 3
    }
]

# Sample farm database
farms = [
    {
        "id": 101,
        "title": "Organic Mango Farm",
        "needs": "instagram reels showing mango harvesting and cooking experience",
        "duration": 2
    },
    {
        "id": 102,
        "title": "Coffee Plantation Stay",
        "needs": "cinematic drone video of plantation and tourist stay",
        "duration": 3
    }
]

@app.get("/farms")
def get_farms():
    return {"farms": farms}


class FarmRequest(BaseModel):
    needs: str
    duration: int

class CreatorRequest(BaseModel):
    skills: str
    duration: int

class FarmerProfile(BaseModel):
    name: str
    mobile: str
    email: str | None = None
    aadhar: str
    location: str
    farm_type: str
    activities: str
    languages: str

@app.post("/match/farm")
def match_farm(farm: FarmRequest):
    results = []

    farm_data = {
        "needs": farm.needs,
        "duration": farm.duration
    }

    for creator in creators:
        score, similarity = compute_match_score(creator, farm_data)
        reason = generate_reason(creator, farm_data, similarity)

        results.append({
            "creator_name": creator["name"],
            "match_score": score,
            "reason": reason
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results}

@app.post("/match/creator")
def match_creator(creator: CreatorRequest):
    results = []

    creator_data = {
        "skills": creator.skills,
        "duration": creator.duration
    }

    for farm in farms:
        score, similarity = compute_match_score(
            {"skills": creator.skills, "duration": creator.duration},
            farm
        )

        reason = generate_reason(
            {"skills": creator.skills, "duration": creator.duration},
            farm,
            similarity
        )

        results.append({
            "farm_title": farm["title"],
            "match_score": score,
            "reason": reason
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results}

@app.post("/register/farmer")
def register_farmer(profile: FarmerProfile):
    db.farmers.insert_one(profile.dict())
    return {"message": "Farmer registered"}