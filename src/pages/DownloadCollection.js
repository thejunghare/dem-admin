import React, { useState, useEffect } from "react";
import { Databases, Client, Query } from "appwrite";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} documents.`);

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

            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} surveyDenied documents.`);

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

            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} isRoomLocked documents.`);

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

            lastDocumentId =
                response.documents.length > 0
                    ? response.documents[response.documents.length - 1].$id
                    : null;
        } while (response.documents.length > 0);

        console.log(`Downloaded ${documents.length} fair survey documents.`);

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

    const handleDownloadBasedOnSelection = async () => {
        const filters = {};
        if (selectedDivision) filters.division = selectedDivision;
        if (selectedWard) filters.ward = selectedWard;
        if (selectedArea) filters.area = selectedArea;
        if (selectedBuilding) filters.building = selectedBuilding;
        if (employeeId) filters.employeeId = employeeId;

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
            let documents = [];
            let response;
            let lastDocumentId = null;

            do {
                const queries = [];

                Object.keys(filters).forEach((key) => {
                    if (Array.isArray(filters[key])) {
                        queries.push(...filters[key]);
                    } else {
                        queries.push(Query.equal(key, filters[key]));
                    }
                });

                if (lastDocumentId) {
                    queries.push(Query.cursorAfter(lastDocumentId));
                }

                response = await database.listDocuments(
                    databaseId,
                    "survey",
                    queries
                );

                documents = documents.concat(response.documents);

                lastDocumentId =
                    response.documents.length > 0
                        ? response.documents[response.documents.length - 1].$id
                        : null;

                setDownloadCount(documents.length);
            } while (response.documents.length > 0);

            console.log(`Downloaded ${documents.length} documents.`);

            const json = JSON.stringify(documents);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "filtered_collection.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to download data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCollectionDump = async (collectionId) => {
        await dumpCollection(collectionId);
    };

    const handleSurveyDeniedDump = async (collectionId) => {
        await dumpSurveyDeniedCollection(collectionId);
    };

    const handleRoomLockedDump = async (collectionId) => {
        await dumpRoomLockedCollection(collectionId);
    };

    const handleFairSurveyDump = async (collectionId) => {
        await dumpFairSurveyCollection(collectionId);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="divisionSelect">
                            <Form.Label>Select Division</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                            >
                                <option value="">Select Division</option>
                                {divisions.map((division) => (
                                    <option key={division.id} value={division.name}>
                                        {division.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="wardSelect">
                            <Form.Label>Select Ward</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDivision}
                            >
                                <option value="">Select Ward</option>
                                {wards.map((ward) => (
                                    <option key={ward.id} value={ward.name}>
                                        {ward.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="areaSelect">
                            <Form.Label>Select Area</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedArea}
                                onChange={handleAreaChange}
                                disabled={!selectedWard}
                            >
                                <option value="">Select Area</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.name}>
                                        {area.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="buildingSelect">
                            <Form.Label>Select Building</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedBuilding}
                                onChange={(e) => setSelectedBuilding(e.target.value)}
                                disabled={!selectedArea}
                            >
                                <option value="">Select Building</option>
                                {buildings.map((building) => (
                                    <option key={building.id} value={building.name}>
                                        {building.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="dateSelect">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="employeeId">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee ID"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="isRoomLockedCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Room Locked"
                                checked={isRoomLocked}
                                onChange={(e) => setIsRoomLocked(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group controlId="surveyDeniedCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Survey Denied"
                                checked={surveyDenied}
                                onChange={(e) => setSurveyDenied(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group controlId="fairSurveyCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Fair Survey"
                                checked={fairSurvey}
                                onChange={(e) => setFairSurvey(e.target.checked)}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={handleDownloadBasedOnSelection}
                            disabled={loading}
                        >
                            Download Based on Selection
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => handleCollectionDump("survey")}
                            disabled={loading}
                        >
                            Dump Full Collection
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => handleSurveyDeniedDump("survey")}
                            disabled={loading}
                        >
                            Dump Survey Denied Collection
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => handleRoomLockedDump("survey")}
                            disabled={loading}
                        >
                            Dump Room Locked Collection
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => handleFairSurveyDump("survey")}
                            disabled={loading}
                        >
                            Dump Fair Survey Collection
                        </Button>

                        {loading && (
                            <p>Downloading... {downloadCount} documents downloaded so far.</p>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default DownloadCollection;
