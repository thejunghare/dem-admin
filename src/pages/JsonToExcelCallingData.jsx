import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { FileInput, Label, Button } from "flowbite-react";

const JsonToExcelCallingData = () => {
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
        let serialNumber = 1;

        jsonData.forEach((item) => {
            const familyHead = JSON.parse(item.familyhead);

            // Add family head information
            data.push({
                'Serial Number': serialNumber++,
                Division: item.division,
                Ward: item.ward,
                Area: item.area,
                Building: item.building,
                'Room Number': item.roomNumber,
                Native: item.native,
                'Created At': item.createdAt,
                'Employee Id': item.employeeId,
                'Member Count': item.memberCount,
                'Name': familyHead.familyHeadName,
                'Birthdate': familyHead.familyHeadBirthdate,
                'Mobile Number': familyHead.familyHeadMobileNumber,
                'Education': familyHead.familyHeadEducation,
                'Caste': familyHead.caste,
                'Age': familyHead.familyHeadAge,
                Voter: familyHead.voter,
                'Voter Poll': familyHead.voterPoll,
                'Voter Poll Area': familyHead.voterPollArea,
                'Survey Remark': item.surveyRemark,
            });

            // Add family members information
            const members = JSON.parse(item.members);
            members.forEach((member) => {
                data.push({
                    'Serial Number': undefined,
                    Division: undefined,
                    Ward: undefined,
                    Area: undefined,
                    Building: undefined,
                    'Room Number': undefined,
                    Native: undefined,
                    'Created At': undefined,
                    'Employee Id': undefined,
                    'Member Count': undefined,
                    Name: member.memberName,
                    Birthdate: member.memberBirthdate,
                    'Mobile Number': member.memberMobileNumber,
                    Education: member.memberEducation,
                    Caste: undefined,
                    Age: member.memberAge,
                    Voter: member.voter,
                    'Voter Poll': member.voterPoll,
                    'Voter Poll Area': member.voterPollArea,
                });
            });
        });

        // Manually reorder the columns to ensure surveyRemark is last
        const finalData = data.map((item) => {
            const { surveyRemark, ...rest } = item;
            return { ...rest, surveyRemark };
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

        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "data.xlsx");
    };


    return (
        <div id="fileUpload" className="max-w-md container">
            <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput id="file" onChange={handleFileUpload} helperText="A profile picture is useful to confirm your are logged into your account" />
            <Button onClick={handleExport}>Export to Excel</Button>
        </div>
    );
};

export default JsonToExcelCallingData;
