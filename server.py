from flask import Flask, render_template, url_for, redirect, request
from datetime import datetime
import os
from databasehandler import *

app = Flask(__name__)

@app.route("/",methods=['GET'])
def index():
    return render_template('index.html')

@app.route("/sensor",methods=['GET','POST'])
def serve_sensor():
    if request.method == 'GET':
        return render_template("sensor.html")
    else:
        group = request.form["group"]
        bandID = request.form["id"]
        room = request.form["room"]
        timeString = request.form["time"]
        time = datetime.strptime(timeString, "%Y-%m-%d %H:%M:%S")
        insert_record(room,bandID,group,time)
        return render_template("sensor.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)