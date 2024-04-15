import openai
from openai import OpenAI
from dotenv import load_dotenv, dotenv_values
from datetime import datetime

load_dotenv()
client = OpenAI()

cost = lambda tokens, model: round(model["cost"] / 1000000 * tokens, 5)


def print_cost(model, tokens):
    # Prints info about tokens and cost of an openai api call
    print(
        "Model:  "
        + str(model["model"])
        + " at $"
        + str(model["cost"])
        + " per 1m tokens"
    )
    if type(tokens) == list:
        print(
            str(tokens[0])
            + " + "
            + str(tokens[1])
            + " = "
            + str(tokens[0] + tokens[1])
            + " tokens => "
            + str(cost(tokens[0] * 100, model))
            + "c + "
            + str(cost(tokens[1] * 100, model))
            + "c = "
            + str(cost(tokens[0] * 100 + tokens[1] * 100, model))
            + "c"
        )
    else:
        print(str(tokens) + " tokens => " + str(cost(tokens, model)) + "c")


def get_gpt_predictions(bird_desc: str):
    """Returns GPT-4-Turbo response to description as JSON

    Parameters:
    bird_desc (str): User description of the bird

    Returns:
    JSON:
        "summary": of the description
        "birds": likely birds with confidence levels
        "information": requested information
    """
    # MODEL = {"model": "gpt-3.5-turbo", "cost": 0.5}  # $0.5 per 1m tokens
    MODEL = {"model": "gpt-4-turbo", "cost": 10}  # $10 per 1m tokens

    MAX_OUTPUT_TOKENS = 400
    TEMPERATURE = 0.1
    # SYSTEM_MESSAGE = """You are a specialised assistant tasked with helping the user identify a bird. Respond only in JSON format with ONLY the following structured fields:
    # - "summary": Brief recap of the bird's description from the user. On a new line briefly mention how likely you are to make an accurate prediction given the description.
    # - "birds": List 10 likely birds with confidence levels ("very high" to "very low"). You can also list bird families by simply using the English name for the family. Use the properties "name" (using the English name) and "confidence".
    # - "information": List of specific details needed to refine or clarify the bird identification (e.g. "Region spotted", "Distinctive patterns" etc). Only ask for information not already given, and don't ask for photos.
    # """

    SYSTEM_MESSAGE = """You are a specialised assistant tasked with helping the user identify a bird. Respond only in JSON format with ONLY the following structured fields:
    - "summary": Brief recap of the bird's description from the user. On a new line briefly mention how likely you are to make an accurate prediction given the description.
    - "birds": List 10 likely birds with confidence levels ("Very Low", "Low", "Medium", "High", "Very High"). Be conservative with confidence assessments, reserving higher levels for well-described cases. You can also list bird families by simply using the English name for the family. Use the properties "name" (using the English name) and "confidence".
    - "information": List of specific details needed to refine or clarify the bird identification (e.g. "Region spotted", "Distinctive patterns" etc). Only ask for information not already given, and don't ask for photos.
    """

    messages = [
        {"role": "system", "content": SYSTEM_MESSAGE},
        {"role": "user", "content": bird_desc},
    ]

    try:
        openai_response = client.chat.completions.create(
            model=MODEL["model"],
            messages=messages,
            max_tokens=MAX_OUTPUT_TOKENS,
            response_format={"type": "json_object"},
            temperature=TEMPERATURE,
        )
        print()
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
        print_cost(
            MODEL,
            [
                openai_response.usage.prompt_tokens,
                openai_response.usage.completion_tokens,
            ],
        )
        print()
        return openai_response.choices[0].message.content
    except openai.APIError as e:
        # Handle API error here, e.g. retry or log
        print(f"OpenAI API returned an API Error: {e}")
        pass
    except openai.APIConnectionError as e:
        # Handle connection error here
        print(f"Failed to connect to OpenAI API: {e}")
        pass
    except openai.RateLimitError as e:
        # Handle rate limit error (we recommend using exponential backoff)
        print(f"OpenAI API request exceeded rate limit: {e}")
        pass
    except:
        print("Some other error")
    # TODO handle errors better / create toast on error
    return '{"summary": "Cannot connect to OpenAI"}'
