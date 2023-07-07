from flask import Flask, render_template, url_for, redirect, request
from datetime import datetime
import os
from databasehandler import *

app = Flask(__name__)

# Route for the home page
@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

# Route for the sensor page
@app.route("/sensor", methods=['GET', 'POST'])
def serve_sensor():
    if request.method == 'GET':
        return render_template("sensor.html")
    else:
        # Process the form data submitted via POST request
        group = request.form["group"]
        bandID = request.form["id"]
        room = request.form["room"]
        timeString = request.form["time"]
        time = datetime.strptime(timeString, "%Y-%m-%d %H:%M:%S")

if __name__ == '__main__':
    # Retrieve the port number from the environment variable, or use 5000 as the default
    port = int(os.environ.get('PORT', 5000))
    
    # Run the Flask application in debug mode, allowing detailed error messages
    # Set the host to '0.0.0.0' to make the app accessible from any IP address
    app.run(debug=True, host='0.0.0.0', port=port)
