
from flask import Flask, request, jsonify
import pandas as pd
import requests

app = Flask(__name__)

APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"
APPWRITE_PROJECT = "6648c699000032e4623c"
DATABASE_ID = '66502c6e0015d7be8526'
COLLECTION_ID = '66954dd3002fefd5a66f'
APPWRITE_API_KEY = '6999a3b40772137237646f8485adbe712ddabbfc8868bc6e2450617391e03f6911fb8732a18b41412a93eb1ee820ad989bea2566729c8001a04ad1dfc63fb64cc31df7bf0361167d28b99c89982733c5d1a600b65470bf744669631ae2c0716e393b26314fe9c5fb6e39bc72da709d23a82eb75f986490d02738f1211476fd91'  # Replace with your API key

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400
    
    try:
        # Determine file type and read the file into a DataFrame
        if file.filename.endswith('.xlsx') or file.filename.endswith('.xls'):
            df = pd.read_excel(file)
        elif file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            return jsonify({'status': 'error', 'message': 'Unsupported file format'}), 400
        
        # Prepare documents for upload
        documents = [
            {
                "ac_number": row.get('AC_NO', None),
                "part_number": row.get('PART_NO', None),
                "serial_number": row.get('SLNOINPART', None),
                "house_number": row.get('HOUSE_NUMBER', None),
                "first_name": row.get('APPLICANT_FIRST_NAME', None),
                "last_name": row.get('APPLICANT_LAST_NAME', None),
                "age": row.get('AGE', None),
                "gender": row.get('GENDER', None),
                "epic_number": row.get('EPIC_NUMBER', None),
                "address": row.get('v_address_en', None),
                "booth_address": row.get('EnglishBoothAddress', None),
            }
            for _, row in df.iterrows()
        ]
        
        # Upload documents to Appwrite
        headers = {
            'X-Appwrite-Project': APPWRITE_PROJECT,
            'X-Appwrite-Key': APPWRITE_API_KEY,
            'Content-Type': 'application/json'
        }
        url = f"{APPWRITE_ENDPOINT}/databases/{DATABASE_ID}/collections/{COLLECTION_ID}/documents"
        
        for index, doc in enumerate(documents):
            print(f"Uploading document {index + 1}/{len(documents)}...")
            response = requests.post(url, json=doc, headers=headers)
            response.raise_for_status()
        
        return jsonify({'status': 'success', 'message': 'Uploaded successfully!'}), 200
    
    except Exception as e:
        print(f"Error uploading documents: {e}")
        return jsonify({'status': 'error', 'message': 'Failed to upload!'}), 500

if __name__ == '__main__':
    app.run(debug=True)

