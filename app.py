from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import random
import json
import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
# ...other imports...

app = Flask(__name__)
CORS(app)

# ...your existing API routes...

# Serve index.html at root
@app.route('/')
def serve_index():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    return send_from_directory(project_root, 'index.html')

# Serve any other static file (css, js, images, etc.)
@app.route('/<path:path>')
def serve_static(path):
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    return send_from_directory(project_root, path)
    
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load local content for fallback
CONTENT_PATH = os.path.join(os.path.dirname(__file__), 'content.json')
def load_content():
    with open(CONTENT_PATH, encoding='utf-8') as f:
        return json.load(f)

def get_random_hadith():
    # Try scraping from sunnah.com (not easy, so fallback to local)
    content = load_content()
    return random.choice(content['hadith'])

def get_random_dua():
    # Try scraping from duas.org (not easy, so fallback to local)
    content = load_content()
    return random.choice(content['dua'])

@app.route('/api/hadith')
def api_hadith():
    hadith = get_random_hadith()
    return jsonify(hadith)

@app.route('/api/dua')
def api_dua():
    dua = get_random_dua()
    return jsonify(dua)

@app.route('/')
def serve_index():
    return send_from_directory('..', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('..', path)

if __name__ == '__main__':
    app.run(debug=True)
