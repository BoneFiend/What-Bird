from flask import Flask, request
from openai_utils import get_gpt_predictions


app = Flask(__name__)


@app.route("/desc", methods=["POST"])
def from_bird_desc():
    # Returns a GptPredictions type from a description input
    data = request.get_json()
    description = data["desc"]
    gpt_predictions = get_gpt_predictions(description)

    return gpt_predictions


@app.route("/test", methods=["GET"])
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


if __name__ == "__main__":
    app.run(debug=True)
