from appwrite.client import Client
from appwrite.services.account import Account
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

user_id = input('enter user user_id: ')
email = input('enter user email: ')
password = input('enter user password: ')
name = input('enter user name: ')
phone = input('enter user phone: ')

@contextmanager
def timer():
    start_time = time.time()
    yield
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Execution Time: {elapsed_time:.2f} seconds")

def createUser():
    account = Account(client)
    try:
        result = account.create(
            user_id = user_id,
            email = email,
            password = password,
            name = name,
        )
        print(json.dumps(result, indent=4))
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    with timer():
        createUser()
