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
{
    "roomID": room1",
    "people":[
        {"id": "band1", "group": "Child", "time_slots": [{"time in":_, "time out":__}, ({"time in":_, "time out":__}]}
    ],
}
"""

def insert_record(roomID,bandID,group,timestamp):
    #see if roomID exists in collection 
            #if so update the collection with the bandID/group/timestamp
                #if bandID exists update timestamp, 
                    #if no records exist for time_slots create new entry in list
                    #otherwise add appropriate entry for time_out
                #create new object in kvp in roomID : []    
        #else make new record

    room_collection = db["rooms"]

    curated = room_collection.find_one({"roomID":roomID},{})
    if(curated == None):
        room_collection.insert_one({"roomID":roomID,"people":[{"id":bandID,"group":group,"time_slots":[{"time_in":timestamp,"time_out":None}]}]})
    else:
        peopleList = curated["people"]
        addToggle = True
        for person in peopleList:
            if(person["id"] == bandID):
                addToggle = False
                slots = person["time_slots"]
                lastEntry = slots[len(slots)]
                if lastEntry["time_out"] == None:
                    lastEntry["time_out"] = timestamp
                else:
                    lastEntry.append({"time_in":timestamp,"time_out":None})
        if addToggle:
            peopleList.append({"id":bandID,"group":group,"time_slots":[{"time_in":timestamp,"time_out":None}]})
        room_collection.update_one({"roomID":roomID},{"people":peopleList})
    return 