"use client";
import React, { useState, useEffect } from "react";
import { Databases, Client, Query } from "appwrite";
import {
    Button,
    Checkbox,
    Label,
    Select,
    Datepicker,
    TextInput,
} from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appwrite = new Client();
appwrite
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6648c699000032e4623c");

const database = new Databases(appwrite);

async function dumpCollection(collectionId) {
    try {
        const databaseId = "66502c6e0015d7be8526";
        let documents = [];
        let response;
        let lastDocumentId = null;

        do {
            const queries = lastDocumentId ? [Query.cursorAfter(lastDocumentId)] : [];
            response = await database.listDocuments(
                databaseId,
                collectionId,
                queries
            );

            documents = documents.concat(response.documents);

            // Check if there are more documents to fetch
            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} documents.`); // Print the count of documents downloaded

        const json = JSON.stringify(documents);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "collection.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Failed to dump collection: ${error.message}`);
    }
}

async function dumpSurveyDeniedCollection(collectionId) {
    try {
        const databaseId = "66502c6e0015d7be8526";
        let documents = [];
        let response;
        let lastDocumentId = null;

        do {
            const queries = [
                Query.equal("surveyDenied", true),
                ...(lastDocumentId ? [Query.cursorAfter(lastDocumentId)] : []),
            ];

            response = await database.listDocuments(
                databaseId,
                collectionId,
                queries
            );

            documents = documents.concat(response.documents);

            // Check if there are more documents to fetch
            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} surveyDenied documents.`); // Print the count of documents downloaded

        const json = JSON.stringify(documents);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "survey_denied_collection.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Failed to dump surveyDenied collection: ${error.message}`);
    }
}

async function dumpRoomLockedCollection(collectionId) {
    try {
        const databaseId = "66502c6e0015d7be8526";
        let documents = [];
        let response;
        let lastDocumentId = null;

        do {
            const queries = [
                Query.equal("isRoomLocked", true),
                ...(lastDocumentId ? [Query.cursorAfter(lastDocumentId)] : []),
            ];

            response = await database.listDocuments(
                databaseId,
                collectionId,
                queries
            );

            documents = documents.concat(response.documents);

            // Check if there are more documents to fetch
            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} isRoomLocked documents.`); // Print the count of documents downloaded

        const json = JSON.stringify(documents);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "room_locked_collection.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Failed to dump roomLocked collection: ${error.message}`);
    }
}

async function dumpFairSurveyCollection(collectionId) {
    try {
        const databaseId = "66502c6e0015d7be8526";
        let documents = [];
        let response;
        let lastDocumentId = null;

        do {
            const queries = [
                Query.equal("isRoomLocked", false),
                Query.equal("surveyDenied", false),
                ...(lastDocumentId ? [Query.cursorAfter(lastDocumentId)] : []),
            ];

            response = await database.listDocuments(
                databaseId,
                collectionId,
                queries
            );

            documents = documents.concat(response.documents);

            // Check if there are more documents to fetch
            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} fair survey documents.`); // Print the count of documents downloaded

        const json = JSON.stringify(documents);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "fair_survey_collection.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Failed to dump fair survey collection: ${error.message}`);
    }
}

const DownloadCollection = () => {
    const [data, setData] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [wards, setWards] = useState([]);
    const [areas, setAreas] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloadCount, setDownloadCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [isRoomLocked, setIsRoomLocked] = useState(false);
    const [surveyDenied, setSurveyDenied] = useState(false);
    const [fairSurvey, setFairSurvey] = useState(false);

    const fetchData = async () => {
        const response = await fetch(
            "https://thejunghare.github.io/survey-app/src/json/data.json"
        );
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            setData(data);
            setDivisions(
                data.map((division) => ({ id: division.id, name: division.name }))
            );
        };

        loadData();
    }, []);

    const handleDivisionChange = (e) => {
        const divisionName = e.target.value;
        setSelectedDivision(divisionName);
        setSelectedWard("");
        setSelectedArea("");
        const division = data.find((d) => d.name === divisionName);
        setWards(division ? division.wards : []);
    };

    const handleWardChange = (e) => {
        const wardName = e.target.value;
        setSelectedWard(wardName);
        setSelectedArea("");
        const ward = wards.find((w) => w.name === wardName);
        setAreas(ward ? ward.areas : []);
    };

    const handleAreaChange = (e) => {
        const areaName = e.target.value;
        setSelectedArea(areaName);
        setSelectedBuilding("");
        const area = areas.find((a) => a.name === areaName);
        setBuildings(area ? area.buildings : []);
    };

    const showcount = (count) => toast(`Downloaded ${count}!`);

    const handleDownloadBasedOnSelection = async () => {
        const filters = {};
        if (selectedDivision) filters.division = selectedDivision;
        if (selectedWard) filters.ward = selectedWard;
        if (selectedArea) filters.area = selectedArea;
        if (selectedBuilding) filters.building = selectedBuilding; // Add building filter
        if (employeeId) filters.employeeId = employeeId;  // Add employeeId filter

        if (selectedDate) {
            const date = new Date(selectedDate);
            const dateStart = new Date(date.setHours(0, 0, 0, 0));
            const dateEnd = new Date(date.setHours(23, 59, 59, 999));

            filters.createdAt = [
                Query.greaterThanEqual("createdAt", dateStart.toISOString()),
                Query.lessThanEqual("createdAt", dateEnd.toISOString()),
            ];
        }

        if (isRoomLocked) {
            filters.isRoomLocked = true;
        }

        if (surveyDenied) {
            filters.surveyDenied = true;
        }

        if (fairSurvey) {
            filters.isRoomLocked = false;
            filters.surveyDenied = false;
        }

        try {
            setLoading(true);
            setDownloadCount(0);

            const databaseId = "66502c6e0015d7be8526";
            const collectionId = "6650391e00030acc335b";
            let documents = [];
            let response;
            let lastDocumentId = null;

            let queries = [];
            Object.keys(filters).forEach((key) => {
                if (Array.isArray(filters[key])) {
                    queries = [...queries, ...filters[key]];
                } else {
                    queries.push(Query.equal(key, filters[key]));
                }
            });

            do {
                response = await database.listDocuments(
                    databaseId,
                    collectionId,
                    lastDocumentId
                        ? [...queries, Query.cursorAfter(lastDocumentId)]
                        : queries
                );

                documents = documents.concat(response.documents);
                setDownloadCount((prevCount) => prevCount + response.documents.length);


                lastDocumentId =
                    response.documents.length > 0
                        ? response.documents[response.documents.length - 1].$id
                        : null;
            } while (response.documents.length > 0);

            console.log(`Downloaded ${documents.length} documents.`);
            showcount(documents.length);
            const json = JSON.stringify(documents);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "collection.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Failed to dump collection: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div>
                <div className="mt-2">
                    {/* select division && select ward*/}
                    <div className={'my-3 flex flex-row items-center justify-evenly'}>
                        <div className="w-2/5">
                            <Select aria-label="Default select example"
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                                required
                            >
                                <option value="">Select Division</option>
                                {divisions.map((division) => (
                                    <option key={division.id} value={division.name}>
                                        {division.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        {/* select ward */}
                        <div className="w-2/5">
                            <Select aria-label="Default select example"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDivision}
                                size="sm"
                            >
                                <option value="">Select Ward</option>
                                {wards.map((ward) => (
                                    <option key={ward.id} value={ward.name}>
                                        {ward.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* select area && select buildings */}
                    <div className={'my-3  flex flex-row items-center justify-evenly'}>
                        {/* select area */}
                        <div className="w-2/5">
                            <Select aria-label="Default select example"
                                value={selectedArea}
                                onChange={handleAreaChange}
                                disabled={!selectedWard}
                                size="sm"
                            >
                                <option value="">Select Area</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.name}>
                                        {area.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-2/5">
                            <Select aria-label="Default select example"
                                value={selectedBuilding}
                                onChange={(e) => setSelectedBuilding(e.target.value)}
                                disabled={!selectedArea}
                                size="sm"
                            >
                                <option value="">Select Building</option>
                                {buildings.map((building) => (
                                    <option key={building.id} value={building.name}>
                                        {building.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* input date and employee */}
                    <div className={'my-3  flex flex-row items-center justify-evenly'}>
                        <div className="w-2/5">
                            <TextInput
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                placeholder='Enter employee ID'
                            />
                        </div>

                        <div className="w-2/5">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-screen flex flex-row items-center justify-evenly">
                        <div>
                            <Checkbox
                                type="checkbox"

                                id="locked-room-checkbox"
                                checked={isRoomLocked}
                                onChange={(e) => setIsRoomLocked(e.target.checked)}
                            />
                            <Label htmlFor="accept" className="flex">
                                Locked
                            </Label>
                        </div>
                        <div>
                            <Checkbox
                                type="checkbox"

                                id="survey-denied-checkbox"
                                checked={surveyDenied}
                                onChange={(e) => setSurveyDenied(e.target.checked)}
                            />
                            <Label htmlFor="accept" className="flex">
                                Denied
                            </Label>
                        </div>
                        <div>
                            <Checkbox
                                type="checkbox"

                                id="fair-survey-checkbox"
                                checked={fairSurvey}
                                onChange={(e) => setFairSurvey(e.target.checked)}
                            />
                            <Label htmlFor="accept" className="flex">
                                Fair
                            </Label>
                        </div>
                    </div>

                    {/* download button */}
                    <div className="flex items-center justify-center">
                        <div>
                            <Button
                                isProcessing={loading}
                                className={'m-3'}
                                onClick={handleDownloadBasedOnSelection}
                                disabled={!selectedDivision}
                            >
                                Download
                            </Button>
                        </div>
                        {/* <div>
                            {loading && (
                                <div className="fs-6 fw-semibold">
                                    downloading...
                                    Downloaded {downloadCount} surveys
                                </div>
                            )}
                        </div> */}
                    </div>

                </div>
            </div>


            <Button.Group className="flex items-center justify-center">
                <Button
                    color="gray"
                    onClick={() => dumpCollection("6650391e00030acc335b")}
                >
                    All
                </Button>

                <Button
                    color="gray"
                    onClick={() => dumpSurveyDeniedCollection("6650391e00030acc335b")}
                >
                    Denied
                </Button>

                <Button
                    color="gray"
                    onClick={() => dumpRoomLockedCollection("6650391e00030acc335b")}
                >
                    Locked
                </Button>

                <Button
                    color="gray"
                    onClick={() => dumpFairSurveyCollection("6650391e00030acc335b")}
                >
                    Fair
                </Button>
            </Button.Group>
        </div>
    )
        ;
};

export default DownloadCollection;
