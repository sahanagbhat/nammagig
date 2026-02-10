from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_text_from_profile(profile, profile_type):
    """Extracts text for embedding based on profile type."""
    text = ""
    if profile_type == "creator":
        # Skills are key for creators
        skills = " ".join(profile.get("skills", []))
        text += f"{skills} "
    elif profile_type == "farmer":
        # Farm type and activities are key for farmers
        activities = " ".join(profile.get("activities", []))
        text += f"{profile.get('farmType', '')} {activities} {profile.get('farmLocation', '')} {profile.get('needs', '')}"
    elif profile_type == "tourist":
        # Expectations and activities are key for tourists
        activities = " ".join(profile.get("activities", []))
        text += f"{profile.get('locationPreference', '')} {profile.get('farmTypePreference', '')} {activities} {profile.get('expectations', '')}"
    
    return text.strip()

def compute_match_score(source_profile, target_profile, source_type, target_type):
    """
    Computes match score between two profiles.
    source_type: 'farmer', 'creator', 'tourist'
    target_type: 'farmer', 'creator', 'tourist'
    """
    source_text = get_text_from_profile(source_profile, source_type)
    target_text = get_text_from_profile(target_profile, target_type)

    if not source_text or not target_text:
        print(f"DEBUG: Empty text for matching. Source: '{source_text}', Target: '{target_text}'")
        return 0.0, 0.0

    # print(f"DEBUG: Source text ({source_type}): {source_text}")
    # print(f"DEBUG: Target text ({target_type}): {target_text}")

    source_embedding = model.encode([source_text])
    target_embedding = model.encode([target_text])

    similarity = float(cosine_similarity(source_embedding, target_embedding)[0][0])
    
    # Simple duration matching if both have it (optional improvement)
    # For now, rely heavily on semantic similarity of needs/skills
    
    return round(similarity * 100, 2), similarity


def find_common_keywords(text1, text2):
    # Simple set intersection on lowercase words
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())
    # Filter out common stop words if needed, for now just simple
    common = words1.intersection(words2)
    return list(common)[:5]


def generate_reason(source_profile, target_profile, source_type, target_type, similarity):
    source_text = get_text_from_profile(source_profile, source_type)
    target_text = get_text_from_profile(target_profile, target_type)
    
    keywords = find_common_keywords(source_text, target_text)
    keyword_text = ", ".join(keywords) if keywords else "shared interests"

    return (
        f"High match ({round(similarity*100,1)}%) based on {keyword_text}."
    )

print("Matcher loaded successfully")
