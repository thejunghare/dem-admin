import React from 'react';
import * as XLSX from 'xlsx';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {Client, Databases, ID} from 'appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6648c699000032e4623c");

const databases = new Databases(client);

const UploadVoter = () => {
    const [alertMessage, setAlertMessage] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const databaseId = '66502c6e0015d7be8526';
            const collectionId = '66954dd3002fefd5a66f';

            try {
                let idCounter = 1;
                for (let item of jsonData) {
                    await databases.createDocument(
                        databaseId,
                        collectionId,
                        ID.unique(),
                        {
                            ac_number: item.AC_NO || null,
                            part_number: item.PART_NO || null,
                            serial_number: item.SLNOINPART || null,
                            house_number: item.HOUSE_NUMBER || null,
                            first_name: item.APPLICANT_FIRST_NAME || null,
                            last_name: item.APPLICANT_LAST_NAME || null,
                            age: item.AGE || null,
                            gender: item.GENDER || null,
                            epic_number: item.EPIC_NUMBER || null,
                            address: item.v_address_en || null,
                            booth_address: item.EnglishBoothAddress || null,
                        }
                    );
                    idCounter++; 
                }
                console.log('Documents uploaded successfully');
                setAlertMessage({type: 'success', text: 'Uploaded successfully!'});
            } catch (error) {
                console.error('Error uploading documents:', error);
                setAlertMessage({type: 'danger', text: 'Failed to upload!'});
            }
        };

        reader.readAsBinaryString(file);
    };

  const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Container>
            {alertMessage && (
                <Alert key={alertMessage.type} variant={alertMessage.type}>
                    {alertMessage.text}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Upload excel file</Form.Label>
                    <Form.Control size={'sm'} type="file" placeholder="your excel file" onChange={handleFileChange}/>
                </Form.Group>

                <Button size={'sm'} variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
    );
};


export default UploadVoter;
