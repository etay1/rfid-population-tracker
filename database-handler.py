import json
from pymongo import MongoClient

local = False
mongo_client = None
if local:
    mongo_client = MongoClient("localhost")
else: 
    mongo_client = MongoClient("mongo")
db = mongo_client["rfiddata"]