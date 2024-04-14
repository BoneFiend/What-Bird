from flask import Flask

app = Flask(__name__)


@app.route("/get-bird-info")
def hello_world():
    return {
        "name": "Regent Honeyeater",
        "description": "black'n'yellow",
    }


if __name__ == "__main__":
    app.run(debug=True)
