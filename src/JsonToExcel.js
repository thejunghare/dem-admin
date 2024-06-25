import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './index.css';

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

        jsonData.forEach(item => {
            const familyHead = JSON.parse(item.familyhead);

            // Add family head information
            data.push({
                division: item.division,
                ward: item.ward,
                type: item.type,
                area: item.area,
                building: item.building,
                roomNumber: item.roomNumber,
                surveyDenied: item.surveyDenied,
                isRoomLocked: item.isRoomLocked,
                isRented: item.isRented,
                isowner: item.isOwner,
                roomOwnerMobileNumber: item.roomOwnerMobileNumber,
                native: item.native,
                createdAt:item.createdAt,
                memberCount: item.memberCount,
                familyHeadName: familyHead.familyHeadName,
                familyHeadBirthdate: familyHead.familyHeadBirthdate,
                familyHeadMobileNumber: familyHead.familyHeadMobileNumber,
                familyHeadEducation: familyHead.familyHeadEducation,
                caste: familyHead.caste,
                voter: familyHead.voter,
                voterPoll: familyHead.voterPoll,
                voterPollArea: familyHead.voterPollArea,
                familyHeadAge: familyHead.familyHeadAge,
                memberName: '',  // Empty for the family head row
                memberBirthdate: '',
                memberMobileNumber: '',
                memberEducation: '',
                memberAge: '',
                memberVoter: '',
                memberVoterPoll: '',
                memberVoterPollArea: ''
            });

            // Add family members information
            const members = JSON.parse(item.members);
            members.forEach(member => {
                data.push({
                    createdAt:'',
                    division: '',  // Empty for member rows
                    ward: '',
                    type: '',
                    area: '',
                    building: '',
                    roomNumber: '',
                    surveyDenied: '',
                    isRoomLocked: '',
                    isRented: '',
                    isowner: '',
                    roomOwnerMobileNumber: '',
                    native: '',
                    memberCount: '',
                    familyHeadName: '',
                    familyHeadBirthdate: '',
                    familyHeadMobileNumber: '',
                    familyHeadEducation: '',
                    caste: '',
                    voter: '',
                    voterPoll: '',
                    voterPollArea: '',
                    familyHeadAge: '',
                    memberName: member.memberName,
                    memberBirthdate: member.memberBirthdate,
                    memberMobileNumber: member.memberMobileNumber,
                    memberEducation: member.memberEducation,
                    memberAge: member.memberAge,
                    memberVoter: member.voter,
                    memberVoterPoll: member.voterPoll,
                    memberVoterPollArea: member.voterPollArea
                });
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'data.xlsx');
    };

    return (
        <div className="container">
        <div className="title">JSON to Excel Converter</div>
        <div className="input-container">
            <input type="file" accept=".json" id="fileUpload" onChange={handleFileUpload} />
            <label htmlFor="fileUpload">Choose JSON File</label>
        </div>
        <button onClick={handleExport}>Export to Excel</button>
    </div>

    );
};

export default JsonToExcel;
