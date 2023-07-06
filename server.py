from flask import Flask,render_template,url_for
import os

app = Flask(__name__)

@app.route("/",methods=['GET'])
def index():
    return render_template('index.html')

@app.route("/sensor",methods=['GET'])
def serve_sensor():
    return render_template("sensor.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)