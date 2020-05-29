#!/usr/bin/env python

import os
import json
from configparser import ConfigParser
import time
from asnake.aspace import ASpace

config = ConfigParser()
config.read("local_settings.cfg")

###Save all info (individual resources) to GitHub with file name as identifier.json
###will need to edit paths here
def save_data(object_type, object):
    path = os.path.join('source_data', object.jsonmodel_type) if (object_type == 'agents') else os.path.join('source_data', object_type)
    if not os.path.isdir(path):
        os.makedirs(path)
    with open(os.path.join(path, "{}.json".format(object.uri.split('/')[-1])), 'w+') as outfile:
        json.dump(object.json(), outfile, indent=2)
    print(os.path.join(path, "{}.json".format(object.uri.split('/')[-1])))

###get all resources that do not have AC/FA identifier
for object_type in ['resources']:
    for object in getattr(aspace, object_type):
        if not (object.jsonmodel_type == 'resource' and object.id_0.startswith('FA', 'AC')):
            save_data(object_type, object)
            
###Also must get all subjects and agents linked to those resources
###edit this for loop into 2 additional loops (subject, agents), edit save_data path
for object_type in ['agents', 'subjects']:
    for object in getattr(aspace, object_type):
        save_data(object_type, object)

