from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def compute_match_score(creator, farm):
    creator_text = creator["skills"]
    farm_text = farm["needs"]

    creator_embedding = model.encode([creator_text])
    farm_embedding = model.encode([farm_text])

    similarity = float(cosine_similarity(creator_embedding, farm_embedding)[0][0])

    duration_score = 1 if creator["duration"] == farm["duration"] else 0.5

    final_score = float((0.7 * similarity) + (0.3 * duration_score))
    return round(final_score * 100, 2), similarity


def find_common_keywords(text1, text2):
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())
    common = words1.intersection(words2)
    return list(common)[:3]  # top 3 overlapping words


def generate_reason(creator, farm, similarity):
    keywords = find_common_keywords(creator["skills"], farm["needs"])
    keyword_text = ", ".join(keywords) if keywords else "related content themes"

    return (
        f"High semantic similarity ({round(similarity*100,1)}%) and overlap in {keyword_text}. "
        f"Duration also {'matches' if creator['duration']==farm['duration'] else 'is close'}."
    )
print("Matcher loaded successfully")
