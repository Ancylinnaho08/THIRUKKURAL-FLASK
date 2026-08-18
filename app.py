from flask import Flask, render_template
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

APP_ID = os.getenv("THIRUKKURAL_APP_ID")

API_URL = "https://getthirukkural.appspot.com/api/3.0/kural/{}"


# =========================
# GET KURAL FROM API
# =========================

def get_kural(number):

    url = API_URL.format(number)

    params = {
        "appid": APP_ID,
        "format": "json"
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        return None

    return response.json()


# =========================
# HOME
# =========================

@app.route("/")
def home():

    kural = get_kural(1)

    if not kural:
        return "Unable to fetch Kural", 500

    return render_template(
        "index.html",
        kural=kural
    )


# =========================
# KURAL DETAIL
# =========================

@app.route("/kural/<int:number>")
def kural_page(number):

    if number < 1 or number > 1330:
        return "Invalid Kural number", 404

    kural = get_kural(number)

    if not kural:
        return "Unable to fetch Kural", 500

    return render_template(
        "kural.html",
        kural=kural
    )


# =========================
# SEARCH
# =========================

@app.route("/search")
def search():

    return render_template(
        "search.html"
    )


# =========================
# CHAPTERS
# =========================

@app.route("/chapters")
def chapters():

    return render_template(
        "chapters.html"
    )


# =========================
# FAVOURITES
# =========================

@app.route("/favourites")
def favourites():

    return render_template(
        "favourites.html"
    )


# =========================
# ABOUT
# =========================

@app.route("/about")
def about():

    return render_template(
        "about.html"
    )


# =========================
# RUN APP
# =========================

if __name__ == "__main__":
    app.run(debug=True)