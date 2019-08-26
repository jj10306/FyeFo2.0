import hashlib

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

data_dict = dict()

def format_data():
    roster_raw = open("roster.csv", "r")
    roster_raw.readline()
    student_lines = roster_raw.readlines()
    roster_raw.close()

    roster = open("hashed_data.csv", "w")
    roster.write("Name, GTID, Role\n")
    for line in student_lines:
        line = line.strip().split(",")
        name, gtid, role = line[0], line[1], line[2]
        name_parts = name.split("}")
        first = name_parts[1].split()[0].strip()
        last = name_parts[0].strip()
        name =  "{} {}".format(first, last)
        hashed_gtid = hash_city(gtid)
        roster.write("{}, {}, {}\n".format(name, hashed_gtid, role))
    roster.close()
format_data()
