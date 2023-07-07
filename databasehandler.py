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

def insert_record(roomID, bandID, group, timestamp):
    room_collection = db["rooms"]

    # Check if roomID exists in collection
    if roomID in room_collection:
        room_records = room_collection[roomID]
        # Check if bandID exists in room_records
        for record in room_records:
            if record["id"] == bandID:
                # Update timestamp for existing bandID
                record["time_slots"].append({"time out": timestamp})
                return

        # Create new entry for bandID if not found
        room_records.append({"id": bandID, "group": group, "time_slots": [{"time in": timestamp, "time out": None}]})
    else:
        # Create new record for roomID
        room_collection[roomID] = [{"id": bandID, "group": group, "time_slots": [{"time in": timestamp, "time out": None}]}]

    return
