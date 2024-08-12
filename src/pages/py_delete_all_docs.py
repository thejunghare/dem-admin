from appwrite.client import Client
from appwrite.services.databases import Databases

client = Client()
client.set_endpoint('https://cloud.appwrite.io/v1')
client.set_project('6648c699000032e4623c')
client.set_key('6999a3b40772137237646f8485adbe712ddabbfc8868bc6e2450617391e03f6911fb8732a18b41412a93eb1ee820ad989bea2566729c8001a04ad1dfc63fb64cc31df7bf0361167d28b99c89982733c5d1a600b65470bf744669631ae2c0716e393b26314fe9c5fb6e39bc72da709d23a82eb75f986490d02738f1211476fd91')



def delete_all_documents():
    database_id = '66502c6e0015d7be8526'  # Replace with your database ID
    collection_id = '66954dd3002fefd5a66f'  # Replace with your collection ID

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
    delete_all_documents()


