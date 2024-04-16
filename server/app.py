from flask import Flask, request, jsonify
import urllib.parse
import urllib.request
from openai_utils import get_gpt_predictions
import pandas as pd
from dotenv import load_dotenv
import os
import json

FLIKR_API_KEY = os.getenv("FLIKR_API_KEY")


app = Flask(__name__)

PATH_TO_EBIRD_DATA = ""
EBIRD_DATA_FILENAME = "eBird-Clements-v2023-integrated-checklist-October-2023.csv"
ebird_data = pd.read_csv(PATH_TO_EBIRD_DATA + EBIRD_DATA_FILENAME, low_memory=False)
mask = ebird_data["English name"].str.contains("KingFisher", case=False, na=False)
filtered_ebird_data = ebird_data[mask]


@app.route("/tax", methods=["POST"])
def get_bird_taxonomy():
    """Returns bird taxonomy as JSON

    Parameters:
    bird (str): The English name of a bird

    Returns:
    JSON: The taxonomic information of the bird, including ['English name', 'scientific name', 'species_code', 'category', 'order', 'family', 'range', 'extinct', 'extinct year']
    """
    data = request.get_json()
    name = data["name"]

    properties = [
        "English name",
        "scientific name",
        "species_code",
        "category",
        "order",
        "family",
        "range",
        "extinct",
        "extinct year",
    ]
    mask = ebird_data["English name"].str.contains(name, case=False, na=False)
    try:
        bird = ebird_data[mask].iloc[0][properties].to_json()
        return bird
    except:
        return ""


@app.route("/pred", methods=["POST"])
def from_bird_desc():
    # Returns a GptPredictions type from a description input
    data = request.get_json()
    description = data["desc"]
    gpt_predictions = get_gpt_predictions(description)

    return gpt_predictions


@app.route("/test-pred", methods=["GET"])
def test_predictions():
    # Returns a GptPredictions type as test info
    output = """{
            "summary": "The bird described has a red head, white beak and cheeks, and colorful wings and belly with colors including yellow, green, red, and various shades of blue, along with black spots on the wings. It was spotted in Victoria, Australia. The user suggested it might be an Eastern Rosella. Given the detailed color description and specific location, the likelihood of making an accurate prediction is medium.",
            "birds": [
            {"name": "Eastern Rosella", "confidence": "Very High"},
            {"name": "Crimson Rosella", "confidence": "High"},
            {"name": "Rainbow Lorikeet", "confidence": "Medium"},
            {"name": "Superb Parrot", "confidence": "Medium"},
            {"name": "Gouldian Finch", "confidence": "Low"},
            {"name": "Scarlet Honeyeater", "confidence": "Low"},
            {"name": "Eclectus Parrot", "confidence": "Very Low"},
            {"name": "Varied Lorikeet", "confidence": "Very Low"},
            {"name": "Australian King Parrot", "confidence": "Very Low"},
            {"name": "Red-capped Parrot", "confidence": "Very Low"}
            ],
            "information": [
            "Size of the bird",
            "Behavior observed",
            "Habitat within Victoria (e.g., forest, urban area)",
            "Time of year spotted"
            ]
            }
            """
    return output


@app.route("/pics", methods=["POST"])
def get_photos():
    """Returns bird taxonomy as JSON
    # TODO rewrite this
        Parameters:
        bird (str): The English name of a bird

        Returns:
        JSON: The taxonomic information of the bird, including ['English name', 'scientific name', 'species_code', 'category', 'order', 'family', 'range', 'extinct', 'extinct year']
    """
    data = request.get_json()
    name = data["name"]
    sciname = data["sciname"]
    n = data["n"]

    print(name)
    params = urllib.parse.urlencode(
        {
            "method": "flickr.photos.search",
            "api_key": FLIKR_API_KEY,
            "tags": sciname + ", " + name,
            "format": "json",
            "nojsoncallback": 1,
            "per_page": n,
            "media": "photos",
            "sort": "interestingness-asc",
            "safe_serach": 1,
        }
    )
    url = f"https://www.flickr.com/services/rest/?{params}"

    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        photos = [
            {
                "src": f"https://live.staticflickr.com/{photo['server']}/{photo['id']}_{photo['secret']}.jpg",
                "title": photo["title"],
            }
            for photo in data.get("photos", {}).get("photo", [])
        ]

    return jsonify(photos)


if __name__ == "__main__":
    app.run(debug=True)
