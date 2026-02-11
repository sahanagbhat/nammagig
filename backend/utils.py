import os
import shutil
import uuid
from fastapi import UploadFile

def save_upload_file(upload_file: UploadFile, destination: str) -> str:
    try:
        # Create unique filename to avoid overwrites
        file_extension = os.path.splitext(upload_file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(destination, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
            
        return f"/uploads/{unique_filename}"
    except Exception as e:
        print(f"Error saving file: {e}")
        return None
