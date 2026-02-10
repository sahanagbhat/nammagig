# Backend Setup Guide (FastAPI + MongoDB)

## Quick Start Backend

This guide will help you set up the FastAPI backend to work with the frontend.

## Prerequisites

- Python 3.9+
- MongoDB (local or MongoDB Atlas)
- pip

## Installation

### Step 1: Install Dependencies

```bash
pip install fastapi uvicorn motor python-jose[cryptography] python-multipart \
  python-dotenv google-auth google-auth-oauthlib passlib[bcrypt] \
  google-auth-httplib2 pydantic pydantic-settings
```

### Step 2: Create Project Structure

```bash
mkdir backend
cd backend
touch app.py .env
mkdir models routes utils
```

### Step 3: Environment Variables (.env)

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your-super-secret-jwt-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=nomad_matcher
FRONTEND_URL=http://localhost:5173
```

### Step 4: Create Main Application (app.py)

```python
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Nomad Matcher API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
client = AsyncIOMotorClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("DATABASE_NAME")]

# Security
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Models
class GoogleAuthRequest(BaseModel):
    credential: str


class FarmerProfile(BaseModel):
    name: str
    mobile: str
    email: EmailStr
    farmLocation: str
    farmType: str
    activities: List[str]
    languages: List[str]


class CreatorProfile(BaseModel):
    name: str
    mobile: str
    email: EmailStr
    instagramUrl: Optional[str] = None
    youtubeUrl: Optional[str] = None
    skills: List[str]
    languages: List[str]


class TouristProfile(BaseModel):
    name: str
    mobile: str
    email: EmailStr
    country: str
    expectations: str
    durationDays: int
    preferredDate: Optional[str] = None
    activities: List[str]


# JWT Functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Routes
@app.post("/auth/google")
async def google_auth(auth_request: GoogleAuthRequest):
    """Handle Google OAuth authentication"""
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(
            auth_request.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        # Get user info
        email = idinfo.get("email")
        name = idinfo.get("name")
        
        # Check if user exists
        user = await db.users.find_one({"email": email})
        
        if not user:
            # Create new user
            user_data = {
                "email": email,
                "name": name,
                "profileComplete": False,
                "createdAt": datetime.utcnow(),
            }
            result = await db.users.insert_one(user_data)
            user_data["id"] = str(result.inserted_id)
        else:
            user["id"] = str(user["_id"])

        # Create JWT token
        access_token = create_access_token(
            data={"sub": email, "name": name}
        )

        return {
            "access_token": access_token,
            "user": {
                "id": user.get("id"),
                "email": email,
                "name": name,
                "profileComplete": user.get("profileComplete", False),
            }
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid token: {str(e)}")


@app.post("/api/register/farmer")
async def register_farmer(
    name: str,
    mobile: str,
    email: EmailStr,
    farmLocation: str,
    farmType: str,
    activities: str,  # JSON string
    languages: str,   # JSON string
    farmPhoto: Optional[UploadFile] = File(None),
    aadhaarPhoto: Optional[UploadFile] = File(None),
):
    """Register a farmer profile"""
    import json
    
    farmer_data = {
        "email": email,
        "name": name,
        "mobile": mobile,
        "role": "farmer",
        "farmLocation": farmLocation,
        "farmType": farmType,
        "activities": json.loads(activities),
        "languages": json.loads(languages),
        "profileComplete": True,
        "createdAt": datetime.utcnow(),
    }
    
    # Save files (implement your file storage logic)
    if farmPhoto:
        # Save farmPhoto
        pass
    
    if aadhaarPhoto:
        # Save aadhaarPhoto
        pass
    
    # Update user record
    await db.users.update_one(
        {"email": email},
        {"$set": farmer_data},
        upsert=True
    )
    
    return {"success": True, "message": "Farmer profile created successfully"}


@app.post("/api/register/creator")
async def register_creator(
    name: str,
    mobile: str,
    email: EmailStr,
    instagramUrl: Optional[str] = None,
    youtubeUrl: Optional[str] = None,
    skills: str = "",
    languages: str = "",
    aadhaarPhoto: Optional[UploadFile] = File(None),
):
    """Register a content creator profile"""
    import json
    
    creator_data = {
        "email": email,
        "name": name,
        "mobile": mobile,
        "role": "creator",
        "instagramUrl": instagramUrl,
        "youtubeUrl": youtubeUrl,
        "skills": json.loads(skills) if skills else [],
        "languages": json.loads(languages) if languages else [],
        "profileComplete": True,
        "createdAt": datetime.utcnow(),
    }
    
    if aadhaarPhoto:
        # Save aadhaarPhoto
        pass
    
    await db.users.update_one(
        {"email": email},
        {"$set": creator_data},
        upsert=True
    )
    
    return {"success": True, "message": "Creator profile created successfully"}


@app.post("/api/register/tourist")
async def register_tourist(profile: TouristProfile):
    """Register a tourist profile"""
    
    tourist_data = {
        "email": profile.email,
        "name": profile.name,
        "mobile": profile.mobile,
        "role": "tourist",
        "country": profile.country,
        "expectations": profile.expectations,
        "durationDays": profile.durationDays,
        "preferredDate": profile.preferredDate,
        "activities": profile.activities,
        "profileComplete": True,
        "createdAt": datetime.utcnow(),
    }
    
    await db.users.update_one(
        {"email": profile.email},
        {"$set": tourist_data},
        upsert=True
    )
    
    return {"success": True, "message": "Tourist profile created successfully"}


@app.get("/api/gigs")
async def get_gigs():
    """Get matched gigs (placeholder)"""
    # Implement your matching algorithm here
    return {
        "gigs": [],
        "message": "Gig matching coming soon!"
    }


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file"""
    # Implement file storage (local, S3, etc.)
    return {
        "filename": file.filename,
        "url": f"/uploads/{file.filename}"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Step 5: Run the Backend

```bash
python app.py
```

Or with uvicorn:
```bash
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt install mongodb

# macOS
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update MONGODB_URL in .env

## Testing the API

### Test Google Auth
```bash
curl -X POST http://localhost:8000/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential": "your_google_token"}'
```

### Test Registration
```bash
# Farmer
curl -X POST http://localhost:8000/api/register/farmer \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "mobile=9876543210" \
  -F "farmLocation=Coorg" \
  -F "farmType=Coffee" \
  -F 'activities=["Farm Tour", "Content Shoot"]' \
  -F 'languages=["Kannada", "English"]'
```

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Production Deployment

### Render.com
1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: nomad-matcher-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app:app --host 0.0.0.0 --port $PORT
```

### Railway
```bash
railway login
railway init
railway up
```

### Docker (Optional)
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Next Steps

1. Implement file upload to cloud storage (AWS S3, Cloudinary)
2. Add JWT authentication middleware
3. Implement AI matching algorithm for gigs
4. Add rate limiting
5. Set up monitoring and logging
6. Add unit tests

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Motor (Async MongoDB)](https://motor.readthedocs.io/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
