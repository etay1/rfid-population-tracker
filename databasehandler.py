import json
from pymongo import MongoClient

local = False
mongo_client = None
if local:
    mongo_client = MongoClient("localhost")
else: 
    mongo_client = MongoClient("mongo")
db = mongo_client["rfiddata"]


"""
Schema: {
    "room1": [
        {"id": "band1", "group": "Child", "time_slots": [{"time in":_, "time out":__}, ({"time in":_, "time out":__}]}
    ],
}
"""

def insert_record(roomID,bandID,group,timestamp):
    room_collection = db["rooms"]

    #see if roomID exists in collection 
        #if so update the collection with the bandID/group/timestamp
            #if bandID exists update timestamp, 
                #if no records exist for time_slots create new entry in list
                #otherwise add appropriate entry for time_out
            #create new object in kvp in roomID : []    
    #else make new record

    return