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


if __name__ == "__main__":
    app.run(debug=True)
