#!/usr/bin/env python
import os
import json
from asnake.aspace import ASpace
import configparser

config = ConfigParser()
config.read("local_settings.cfg")
aspace = ASpace(
              baseurl=config.get("ArchivesSpace", "baseURL"),
              username=config.get("ArchivesSpace", "user"),
              password=config.get("ArchivesSpace", "password"),
    )
repo = aspace.repositories(2)


from asnake.client import ASnakeClient


from asnake.client import ASnakeClient
client = ASnakeClient()
repo = aspace.repositories(2)

#Expects a CSV file with column resource_id, subject_id, agent_person_id, agent_corporate_entity_id or agent_family_id to be deleted from AS

def delete_resources(data):
    with open(data, newline='') as data:
        reader = csv.DictReader(data)
        for row in reader:
            try:
                resource_id = str(row['resource_id'])
                print(resource_id)
                collection = repo.resources(resource_id)
                print(collection)
                resource_json = collection.json()
                uri = resource_json.get("uri")
                print(uri)
                delete = aspace.client.delete(uri)
                print("deleted resource"+ resource_id)
            except:
                pass

def delete_subjects(data):
    with open(data, newline='') as data:
        reader = csv.DictReader(data)
        for row in reader:
            try:
                subject_id = str(row['subject_id'])
                print(subject_id)
                subject = aspace.subjects(subject_id)
                subject_json = subject.json()
                uri = subject_json.get("uri")
                print(uri)
                delete = aspace.client.delete(uri)
                print("deleted subject"+ subject_id)
            except:
                pass


def delete_agents_person(data):
    with open(data, newline='') as data:
        reader = csv.DictReader(data)
        for row in reader:
            try:
                agent_person_id = str(row['agent_person_id'])
                agent_person = aspace.agents.people(agent_person_id)
                agent_person_json = agent_person.json()
                uri = agent_person_json.get("uri")
                print(uri)
                delete = aspace.client.delete(uri)
                print("deleted "+ agent_person_id)
            except:
                pass

def delete_agents_corporate_entities(data):
    with open(data, newline='') as data:
        reader = csv.DictReader(data)
        for row in reader:
            try:
                agent_corporate_entity_id = str(row['agent_corporate_entity_id'])
                agent_corporate_entity = aspace.agents.corporate_entities(agent_corporate_entity_id)
                agent_corporate_entity_json = agent_corporate_entity.json()
                uri = agent_corporate_entity_json.get("uri")
                delete = aspace.client.delete(uri)
                print("deleted agent_corporate_entity "+ agent_corporate_entity_id)
            except:
                pass

def delete_agents_families(data):
    with open(data, newline='') as data:
        reader = csv.DictReader(data)
        for row in reader:
            try:
                agent_family_id = str(row['agent_family_id'])
                agent_family = aspace.agents.families(agent_family_id)
                agent_family_json = agent_family.json()
                uri = agent_family_json.get("uri")
                delete = aspace.client.delete(uri)
                print("deleted agent_family "+ agent_family_id)
            except:
                pass

data = "library_resources.csv"

delete_resources(data)
#delete_subjects(data)
#delete_agents_corporate_entities(data)
#delete_agents_families(data)
