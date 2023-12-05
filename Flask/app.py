from flask import Flask
from flask import request
import subprocess
import os

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/avg')
def Avg():

           Filename = request.args.get('Filename')
           Algo = request.args.get('Algo')
           Variation = request.args.get('Variation')
           Round = request.args.get('Round')
           Noise = request.args.get('Noise')
           

           arg = "python avg.py " + {File_path} // write path where weights stored
           
           p = subprocess.Popen(arg , stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
           (output, err) = p.communicate()
           
           return "end"

@app.route('/param')
def Param():
           
           Path = request.args.get('Path')

           arg = "python param.py " + Path
           
           p = subprocess.Popen(arg , stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
           (output, err) = p.communicate()
           output = output.decode('utf-8')  
  
           return output


if __name__ == "__main__":
  app.run(port="8081", debug=True)

