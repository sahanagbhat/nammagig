from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
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
sample_creators = [
    {
        "name": "Riya Food Vlogs",
        "skills": ["food", "storytelling", "cooking", "videos", "instagram", "reels"],
        "equipment": "DSLR tripod",
        "duration": 2,
        "mobile": "9876543210",
        "email": "riya@example.com",
        "instagramUrl": "https://instagram.com/riya",
        "youtubeUrl": "https://youtube.com/riya"
    },
    {
        "name": "Arjun Drone Films",
        "skills": ["drone", "cinematic", "farm", "travel", "videos"],
        "equipment": "Drone GoPro",
        "duration": 3,
        "mobile": "9876543211",
        "email": "arjun@example.com",
        "instagramUrl": "https://instagram.com/arjun",
        "youtubeUrl": "https://youtube.com/arjun"
    }
]

# Sample farm database
sample_farms = [
    {
        "name": "Organic Mango Farm",
        "farmType": "Organic",
        "farmLocation": "Ramanagara",
        "needs": "instagram reels showing mango harvesting and cooking experience",
        "duration": 2,
        "activities": ["Content Shoot", "Farm Tour"],
        "languages": ["Kannada", "English"],
        "mobile": "9988776655",
        "email": "mango@farm.com"
    },
    {
        "name": "Coffee Plantation Stay",
        "farmType": "Coffee",
        "farmLocation": "Coorg",
        "needs": "cinematic drone video of plantation and tourist stay",
        "duration": 3,
        "activities": ["Stay", "Workshops"],
        "languages": ["Kannada", "English"],
        "mobile": "9988776644",
        "email": "coffee@farm.com"
    }
]

@app.on_event("startup")
def startup_db_client():
    # Seed data if empty
    if db.creators.count_documents({}) == 0:
        db.creators.insert_many(sample_creators)
        print("Seeded creators database")
    
    if db.farmers.count_documents({}) == 0:
        db.farmers.insert_many(sample_farms)
        print("Seeded farmers database")

@app.get("/farms")
def get_farms():
    return {"farms": sample_farms}


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
    # For now, we still use the request body for the farm details
    # But we match against REAL creators from DB
    
    # Fetch all creators from DB
    real_creators = list(db.creators.find({}, {"_id": 0})) # exclude _id for now to avoid serialization issues
    print(f"DEBUG: Found {len(real_creators)} creators in DB")
    
    results = []
    
    # Convert FarmRequest to dict for matcher
    farm_data = {
        "needs": farm.needs,
        "duration": farm.duration,
        "activities": [], # FarmRequest doesn't have activities yet, maybe add later
        "farmType": "",
        "farmLocation": ""
    }
    print(f"DEBUG: Matching for farm needs: {farm.needs}")

    for creator in real_creators:
        score, similarity = compute_match_score(creator, farm_data, "creator", "farmer")
        print(f"DEBUG: Match score for {creator.get('name')}: {score}")
        reason = generate_reason(creator, farm_data, "creator", "farmer", similarity)

        results.append({
            "creator_name": creator.get("name"),
            "match_score": score,
            "reason": reason,
            "skills": creator.get("skills"),
            "mobile": creator.get("mobile") # Return mobile for contact
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results}

@app.post("/match/creator")
def match_creator(creator: CreatorRequest):
    # Match REAL farmers from DB
    real_farmers = list(db.farmers.find({}, {"_id": 0}))
    
    results = []
    
    creator_data = {
        "skills": creator.skills, # string in request, convert to list if needed by matcher? 
        # Actually matcher expects dict. CreatorRequest skills is str. 
        # But our new matcher uses get_text_from_profile which handles list.
        # Let's support both or convert.
        # "skills": creator.skills.split(" ") if isinstance(creator.skills, str) else creator.skills
        # Wait, CreatorRequest defines skills as str. 
        # Let's just pass it as is, and update matcher to handle str or list? 
        # Or easier: convert to list here.
        "skills": creator.skills.split(" "),
        "duration": creator.duration
    }

    for farm in real_farmers:
        score, similarity = compute_match_score(creator_data, farm, "creator", "farmer")
        reason = generate_reason(creator_data, farm, "creator", "farmer", similarity)

        results.append({
            "farm_title": farm.get("farmType", "Farm") + " in " + farm.get("farmLocation", ""),
            "match_score": score,
            "reason": reason,
            "activities": farm.get("activities"),
            "mobile": farm.get("mobile")
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results}

class TouristRequest(BaseModel):
    activities: List[str]
    expectations: str
    locationPreference: Optional[str] = ""
    farmTypePreference: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    durationDays: Optional[int] = None

@app.post("/api/match/tourist")
def match_tourist(tourist: TouristRequest):
    # Match against Farmers and Creators
    real_farmers = list(db.farmers.find({}, {"_id": 0}))
    real_creators = list(db.creators.find({}, {"_id": 0}))
    
    tourist_data = tourist.dict()
    
    recommended_farms = []
    recommended_creators = []
    
    # Match Farms
    for farm in real_farmers:
        score, similarity = compute_match_score(tourist_data, farm, "tourist", "farmer")
        reason = generate_reason(tourist_data, farm, "tourist", "farmer", similarity)
        
        if score >= 0: # Show all matches for now
            recommended_farms.append({
                "name": farm.get("name"),
                "location": farm.get("farmLocation"),
                "type": farm.get("farmType"),
                "match_score": score,
                "reason": reason,
                "activities": farm.get("activities"),
                "mobile": farm.get("mobile")
            })
            
    # Match Creators
    for creator in real_creators:
        score, similarity = compute_match_score(tourist_data, creator, "tourist", "creator")
        reason = generate_reason(tourist_data, creator, "tourist", "creator", similarity)
        
        if score >= 0: # Show all matches for now
            recommended_creators.append({
                "name": creator.get("name"),
                "skills": creator.get("skills"),
                "match_score": score,
                "reason": reason,
                "mobile": creator.get("mobile")
            })

    recommended_farms.sort(key=lambda x: x["match_score"], reverse=True)
    recommended_creators.sort(key=lambda x: x["match_score"], reverse=True)
    
    return {
        "recommended_farms": recommended_farms,
        "recommended_creators": recommended_creators
    }

@app.post("/api/register/farmer")
async def register_farmer(
    name: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
    farmLocation: str = Form(...),
    farmType: str = Form(...),
    activities: str = Form(...), # JSON string
    languages: str = Form(...), # JSON string
    farmPhoto: Optional[UploadFile] = File(None),
    aadhaarPhoto: Optional[UploadFile] = File(None)
):
    try:
        farmer_data = {
            "name": name,
            "mobile": mobile,
            "email": email,
            "farmLocation": farmLocation,
            "farmType": farmType,
            "activities": json.loads(activities),
            "languages": json.loads(languages),
            "farmPhoto": farmPhoto.filename if farmPhoto else None,
            "aadhaarPhoto": aadhaarPhoto.filename if aadhaarPhoto else None
        }
        # In a real app, we would save the files to disk/S3 here
        
        db.farmers.insert_one(farmer_data)
        return {"message": "Farmer registered successfully", "id": str(farmer_data.get("_id"))}
    except Exception as e:
        print(f"Error registering farmer: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/register/creator")
async def register_creator(
    name: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
    skills: str = Form(...), # JSON string
    languages: str = Form(...), # JSON string
    instagramUrl: Optional[str] = Form(None),
    youtubeUrl: Optional[str] = Form(None),
    aadhaarPhoto: Optional[UploadFile] = File(None)
):
    try:
        print(f"Received registration request for: {name}, {email}")
        creator_data = {
            "name": name,
            "mobile": mobile,
            "email": email,
            "skills": json.loads(skills),
            "languages": json.loads(languages),
            "instagramUrl": instagramUrl,
            "youtubeUrl": youtubeUrl,
            "aadhaarPhoto": aadhaarPhoto.filename if aadhaarPhoto else None
        }
        print(f"Processed data: {creator_data}")
        
        # Test DB connection
        print("Attempting DB insertion...")
        result = db.creators.insert_one(creator_data)
        print(f"DB Insertion successful, ID: {result.inserted_id}")
        
        return {"message": "Creator registered successfully", "id": str(creator_data.get("_id"))}
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error registering creator: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/register/tourist")
async def register_tourist(profile: dict): # Tourist sends JSON, not FormData
    try:
        db.tourists.insert_one(profile)
        return {"message": "Tourist registered successfully", "id": str(profile.get("_id"))}
    except Exception as e:
        print(f"Error registering tourist: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Keep the old endpoint for backward compatibility if needed, or remove it
@app.post("/register/farmer")
def register_farmer_old(profile: FarmerProfile):
    db.farmers.insert_one(profile.dict())
    return {"message": "Farmer registered"}