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
    
    
    
    
    return