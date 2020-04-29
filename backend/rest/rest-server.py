from flask import Flask, request, Response,jsonify
import jsonpickle
import numpy as np
#from PIL import Image
import io
import mysql.connector
# Initialize the Flask application
from flask import Flask, request, Response
import jsonpickle
import numpy as np
#from PIL import Image
import io
import mysql.connector
import json
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
@app.route('/players', methods=['GET'])
def add():
    r = request
    args = []
    for key in r.args.keys():
        args.append(key)
    if args[0] == "player_id":
        mydb = mysql.connector.connect(host="35.224.208.37",user="root",passwd="temp");
        mycursor = mydb.cursor()
        mycursor.execute("USE baseball")
        mycursor.execute("SELECT * from players where player_id="+r.args.get('player_id', None))

        output = []
        row_headers=[x[0] for x in mycursor.description] #this will extract row headers
        rv = mycursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        output = {'players':json_data}
        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response



    if len(r.args) == 1:
        team_id = r.args.get('team_id', None)
        args = [team_id]
        print(args)
        mydb = mysql.connector.connect(host="35.224.208.37",user="root",passwd="temp");
        mycursor = mydb.cursor()
        mycursor.execute("USE baseball")
        mycursor.execute("SELECT * FROM players limit 1")
        row_headers=[x[0] for x in mycursor.description]

        mycursor.fetchall()
        spcursor = mydb.cursor()
        spcursor.callproc('fetch_batting_stats',args)

        #rv = spcursor.fetchall()
        rv = []
        for result in spcursor.stored_results():
            rv = result.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        output = {'players':json_data}
        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
            # convert the data to a PIL image type so we can extract dimensions
@app.route('/teams', methods=['GET'])

def teams():
    r = request
    mydb = mysql.connector.connect(host="35.224.208.37",user="root",passwd="temp");
    mycursor = mydb.cursor()
    mycursor.execute("USE baseball")
    mycursor.execute("SELECT * from final_team_stats")
    #result = mycursor.fetchall()
    output = []
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    output = {'teams':json_data}
    response = jsonify(output)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/games', methods=['GET'])

def games():
    r = request
    mydb = mysql.connector.connect(host="35.224.208.37",user="root",passwd="temp");
    if len(r.args) == 1:
        team_id = r.args.get('team_id', None)
        mycursor = mydb.cursor()
        mycursor.execute("USE baseball")
        mycursor.execute("select s.team_id,s.team_name, s.PCT from final_team_stats s join (select home_team,away_team from future_games_info  where home_team ='"+ team_id+"' OR away_team ='"+team_id+"'order by date  limit 1) as f on f.home_team = s.team_id or f.away_team = s.team_id;")
        #result = mycursor.fetchall()
        output = {}
        row_headers=[x[0] for x in mycursor.description] #this will extract row headers
        rv = mycursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        output ={"team_1_id":"","team_1_name":"","team_1_probability":0,"team_2_id":"","team_2_name":"","team_2_probability":0}
        output["team_1_id"] = json_data[0]["team_id"]
        output["team_1_name"] = json_data[0]["team_name"]
        output["team_1_probability"] = json_data[0]["PCT"]/(json_data[0]["PCT"]+json_data[1]["PCT"])
        output["team_2_id"] = json_data[1]["team_id"]
        output["team_2_name"] = json_data[1]["team_name"]
        output["team_2_probability"] = json_data[1]["PCT"]/(json_data[0]["PCT"]+json_data[1]["PCT"])

        response = jsonify(output)

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response



app.run(host="0.0.0.0", port=5000)
