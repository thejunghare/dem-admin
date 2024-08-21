from appwrite.client import Client
from appwrite.services.teams import Teams
import os
import json
import time
from dotenv import load_dotenv
from contextlib import contextmanager

load_dotenv()

client = Client()
client.set_endpoint(os.getenv('APPWRITE_ENDPOINT'))
client.set_project(os.getenv('APPWRITE_PROJECT'))
client.set_key(os.getenv('APPWRITE_API_KEY'))

email = input('enter email: ')

@contextmanager
def timer():
    start_time = time.time()
    yield
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Execution Time: {elapsed_time:.2f} seconds")

def list_teams():
    teams = Teams(client)
    try:
        result = teams.create_membership(
            team_id = '666fd6d6000512179657',
            roles = ['employee'],
            email = email,
        )
        print(json.dumps(result, indent=4))
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    with timer():
        list_teams()
