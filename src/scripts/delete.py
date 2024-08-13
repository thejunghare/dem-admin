from appwrite.client import Client
from appwrite.services.databases import Databases
import os
from dotenv import load_dotenv
load_dotenv()

client = Client()
client.set_endpoint(os.getenv('APPWRITE_ENDPOINT'))
client.set_project(os.getenv('APPWRITE_PROJECT'))
client.set_key(os.getenv('APPWRITE_API_KEY'))

DATABASE_ID = os.getenv('DATABASE_ID')
COLLECTION_ID = os.getenv('COLLECTION_ID')

def delete():
    database_id = DATABASE_ID
    collection_id = COLLECTION_ID

    databases = Databases(client)
    
    while True:
        # Fetch documents from the collection
        response = databases.list_documents(database_id, collection_id)
        documents = response['documents']
        
        if not documents:
            break  # Exit the loop if there are no more documents
        
        for document in documents:
            document_id = document['$id']
            try:
                # Delete each document by ID
                databases.delete_document(database_id, collection_id, document_id)
                print(f'Deleted document with ID: {document_id}')
            except Exception as e:
                print(f'Error deleting document with ID: {document_id} - {str(e)}')

if __name__ == '__main__':
    delete()