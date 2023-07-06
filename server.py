from flask import Flask,render_template,url_for

app = Flask(__name__)

@app.route("/",methods=['GET'])
def index():
    return render_template('index.html')

@app.route("/sensor",methods=['GET'])
def serve_sensor():
    return render_template("sensor.html")

if __name__ == '__main__':
    app.run(port=80)