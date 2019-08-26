from os import path
import hashlib
#hashing info from:
# https://pythonprogramming.net/password-hashing-flask-tutorial/

data_dict = dict()

def data_scrape():
    #gets absolute path of current directory: /Users/Jakob/Desktop/pi_queue/FyeFO/piQ
    basepath = path.dirname(__file__)
    #steps back two levels and into /data directory where file is located
    filepath = path.abspath(path.join(basepath, "../../data", "hashed_data.csv"))
    roster = open(filepath, "r")

    # roster = open("clean_data.csv")
    roster.readline()
    student_lines = roster.readlines()

    for line in student_lines:
        line = line.strip()

        #this line may need to change depending on CSV format
        name, gtid, role = line.split(",")
        gtid = gtid.strip()
        # last = last.strip('"').strip()
        # first = first.strip('"').strip()

        # gtid is now hashed
        # gtid = hash_city(gtid) //uncomment this line if csv data's gtid's are not hashed yet
        data_dict[gtid] = {"name": name, "role": role}

"""
Produces a hash of the gtids
params - gtid (9 digit str gtid)
return - hex string of the hash
"""
def hash_city(gtid):
    # hash constructor takes in a series of bytes as a param, so use str.encode()
    hash_obj = hashlib.sha512(gtid.encode())
    # hash is a hex string of the hash
    hash = hash_obj.hexdigest()
    return hash


data_scrape()