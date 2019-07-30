from flask import Flask, request, jsonify
from flask_cors import CORS
from data_init import data_dict, hash_city

app = Flask(__name__)
CORS(app)

"""
API route to be hit by client w/ gtid as the request param
gtid is extracted and data is attempted to be pulled from the 'data_dict' via the hashed gtid

Returns - 
If an error occurred, the returned object will have a 'Error Message' property 
If no error occurred, the returned object will be of the for { 'name': __insert_name_here__, 'role': 'student' || 'ta' }
"""
@app.route('/', methods = ["POST"])
def index():

    # attempt to extract the 'gtid' request param and hash it
    try:
        gtid = request.args['gtid']
        hashed_gtid = hash_city(gtid)
    except KeyError:
        return jsonify({"ErrorMessage":
                       "No request param 'gtid' found",
                   "status": 400
                   })

    # attempt access the data_dict w/ the given gtid
    try:
        payload = data_dict[hashed_gtid]
    except KeyError:
        payload = {"ErrorMessage":
                       "GTID not found in class roster",
                   "status": 400
                   }

    return jsonify(payload)


if __name__ == '__main__':
    app.run(debug=True)