import React, {useState} from "react";
import {saveAs} from "file-saver";
import * as XLSX from "xlsx";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const JsonToExcel = () => {
    const [jsonData, setJsonData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const parsedJson = JSON.parse(e.target.result);
                setJsonData(parsedJson);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("Invalid JSON file");
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        if (!jsonData || jsonData.length === 0) {
            console.error("No data to export");
            return;
        }

        const data = [];
        let serialNumber = 1; // Initialize serial number

        jsonData.forEach((item) => {
            const familyHead = JSON.parse(item.familyhead);

            // Add family head information
            data.push({
                serialNumber: serialNumber++, // Add serial number
                division: item.division,
                ward: item.ward,
                area: item.area,
                building: item.building,
                native: item.native,
                createdAt: item.createdAt,
                employeeId: item.employeeId,
                memberCount: item.memberCount,
                familyHeadName: familyHead.familyHeadName,
                familyHeadBirthdate: familyHead.familyHeadBirthdate,
                familyHeadMobileNumber: familyHead.familyHeadMobileNumber,
                familyHeadEducation: familyHead.familyHeadEducation,
                caste: familyHead.caste,
                voter: familyHead.voter,
                voterPoll: familyHead.voterPoll,
                voterPollArea: familyHead.voterPollArea,
                surveyRemark: item.surveyRemark, // Keep surveyRemark here for now
            });

            // Add family members information
            const members = JSON.parse(item.members);
            members.forEach((member) => {
                data.push({
                    serialNumber: "", // No serial number for member rows
                    division: "",
                    ward: "",
                    area: "",
                    building: "",
                    native: "",
                    createdAt: "",
                    employeeId: "",
                    memberCount: "",
                    familyHeadName: "",
                    familyHeadBirthdate: "",
                    familyHeadMobileNumber: "",
                    familyHeadEducation: "",
                    caste: "",
                    voter: "",
                    voterPoll: "",
                    voterPollArea: "",
                    memberName: member.memberName,
                    memberBirthdate: member.memberBirthdate,
                    memberMobileNumber: member.memberMobileNumber,
                    memberEducation: member.memberEducation,
                    memberAge: member.memberAge,
                    memberVoter: member.voter,
                    memberVoterPoll: member.voterPoll,
                    memberVoterPollArea: member.voterPollArea,
                    surveyRemark: "", // No survey remark for member rows
                });
            });
        });

        // Convert JSON data to worksheet
        //const worksheet = XLSX.utils.json_to_sheet(data);

        // Manually reorder the columns to ensure surveyRemark is last
        const finalData = data.map((item) => {
            const {surveyRemark, ...rest} = item;
            return {...rest, surveyRemark};
        });

        // Create a new worksheet with the reordered data
        const finalWorksheet = XLSX.utils.json_to_sheet(finalData);

        // Append the final worksheet to the workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, finalWorksheet, "Sheet1");

        // Write the workbook to a buffer and create a download link
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {type: "application/octet-stream"});
        saveAs(blob, "data.xlsx");
    };


    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Upload JSON file</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".json"
                        id="fileUpload"
                        onChange={handleFileUpload}
                    />
                </Form.Group>
                <Button variant={'primary'} size={'sm'} onClick={handleExport}>Export to Excel</Button>
            </Form>
        </Container>
    );
};

export default JsonToExcel;
