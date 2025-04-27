from flask import Flask, render_template_string
import requests

app = Flask(__name__)

# HTML template with modern styling
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Dog Image Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background-color: #f0f2f5;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1a73e8;
            margin-bottom: 30px;
        }
        .dog-image {
            max-width: 500px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
        }
        .button {
            background-color: #1a73e8;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #1557b0;
        }
        .footer {
            margin-top: 30px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐕 Random Dog Image Generator</h1>
        <form method="get">
            <button class="button" type="submit">Get Another Dog! 🐾</button>
        </form>
        {% if dog_url %}
        <div>
            <img src="{{ dog_url }}" alt="Random Dog" class="dog-image">
        </div>
        {% endif %}
        <div class="footer">
            <p>Powered by the Dog API</p>
            <p>Created as a learning project</p>
        </div>
    </div>
</body>
</html>
"""

def get_random_dog():
    """Get a random dog image from the Dog API"""
    try:
        response = requests.get("https://dog.ceo/api/breeds/image/random")
        if response.status_code == 200:
            return response.json()["message"]
    except Exception as e:
        print(f"Error: {e}")
    return None

@app.route('/')
def home():
    dog_url = get_random_dog()
    return render_template_string(HTML_TEMPLATE, dog_url=dog_url)

if __name__ == '__main__':
    print("🌐 Starting the web server...")
    print("📱 Open your web browser and go to: http://localhost:5000")
    app.run(debug=True)