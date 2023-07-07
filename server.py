from flask import Flask, render_template, url_for, redirect, request, send_from_directory, jsonify
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
        data = request.get_json(force=True)
        group = data["group"]
        bandID = data["id"]
        room = data["room"]
        timeString = data["time"]
        insert_record(room,bandID,group,timeString)
        return render_template("sensor.html")

@app.route('/static/css/<path:filename>',methods=["GET"])
def serve_style(filename):
    return send_from_directory('static/css', filename)

@app.route('/static/js/<path:filename>',methods=['GET'])
def serve_js(filename):
    return send_from_directory('static/js',filename)

@app.route("/data",methods=['GET'])
def serve_records():
    record = get_records()
    if record == None:
        return jsonify({})
    else:
        return jsonify(get_records())

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)