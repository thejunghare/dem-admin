from flask import Flask, request, jsonify
import pandas as pd
from appwrite.client import Client
from appwrite.services.databases import Databases
import os
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize Appwrite client
client = Client()
client.set_endpoint(os.getenv('APPWRITE_ENDPOINT'))
client.set_project(os.getenv('APPWRITE_PROJECT'))
client.set_key(os.getenv('APPWRITE_API_KEY'))

# Initialize Databases service
databases = Databases(client)

DATABASE_ID = os.getenv('DATABASE_ID')
COLLECTION_ID = os.getenv('COLLECTION_ID')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400
    
    try:
        # Determine file type and read the file into a DataFrame
        if file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file)
        elif file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            return jsonify({'status': 'error', 'message': 'Unsupported file format'}), 400
        
        # Prepare documents for upload
        documents = [
            {
                "ac_number": row.get('AC_NO'),
                "part_number": row.get('PART_NO'),
                "serial_number": row.get('SLNOINPART'),
                "house_number": row.get('HOUSE_NUMBER'),
                "first_name": row.get('APPLICANT_FIRST_NAME'),
                "last_name": row.get('APPLICANT_LAST_NAME'),
                "age": row.get('AGE'),
                "gender": row.get('GENDER'),
                "epic_number": row.get('EPIC_NUMBER'),
                "address": row.get('v_address_en'),
                "booth_address": row.get('EnglishBoothAddress'),
            }
            for _, row in df.iterrows()
        ]
        
        # Upload documents to Appwrite using the SDK
        for index, doc in enumerate(documents):
            logging.info(f"Uploading document {index + 1}/{len(documents)}...")
            response = databases.create_document(
                database_id=DATABASE_ID,
                collection_id=COLLECTION_ID,
                document_id="unique()",
                data=doc
            )
        
        return jsonify({'status': 'success', 'message': 'Uploaded successfully!'}), 200
    
    except Exception as e:
        logging.error(f"Error uploading documents: {e}")
        return jsonify({'status': 'error', 'message': f'Failed to upload! Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)