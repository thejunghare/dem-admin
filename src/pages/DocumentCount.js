import React, {useState} from "react";
import {databases, Query} from "../appwriteConfig";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DocumentCount() {
    const databaseId = "66502c6e0015d7be8526";
    const collectionId = "6650391e00030acc335b";
    const [empCount, setEmpCount] = useState(0);
    const [empId, setEmpId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [fairDocumentCount, setFairDocumentCount] = useState(0);
    const [roomLockedCount, setRoomLockedCount] = useState(0);
    const [surveyDeniedCount, setSurveyDeniedCount] = useState(0);
    const [singleDateTotalCount, setSingleDateTotalCount] = useState(0);
    const [singleDateFairTotalCount, setSingleDateFairTotalCount] = useState(0);
    const [singleDateRoomLockedTotalCount, setSingleDateRoomLockedTotalCount] =
        useState(0);
    const [singleDateSurveyDeniedTotalCount, setSingleDateSurveyDeniedTotalCount] =
        useState(0);
    const [createdAtTotal, setCreatedAtTotal] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [rangeTotalCount, setRangeTotalCount] = useState(0);
    const [rangeFairTotalCount, setRangeFairTotalCount] = useState(0);
    const [rangeRoomLockedTotalCount, setRangeRoomLockedTotalCount] = useState(0);
    const [rangeSurveyDeniedTotalCount, setRangeSurveyDeniedTotalCount] = useState(0);
    const [empRangeFromDate, setEmpRangeFromDate] = useState("");
    const [empRangeToDate, setEmpRangeToDate] = useState("");
    const [empRangeCount, setEmpRangeCount] = useState(0);
    const [empRangeFairDocumentCount, setEmpRangeFairDocumentCount] = useState(0);
    const [empRangeRoomLockedCount, setEmpRangeRoomLockedCount] = useState(0);
    const [empRangeSurveyDeniedCount, setEmpRangeSurveyDeniedCount] = useState(0);


    const handleEmpRangeFromDateChange = (event) => {
        setEmpRangeFromDate(event.target.value);
    };

    const handleEmpRangeToDateChange = (event) => {
        setEmpRangeToDate(event.target.value);
    };


    const handleEmpIdChange = (event) => {
        setEmpId(event.target.value);
    };

    const handleCreatedAtChange = (event) => {
        setCreatedAt(event.target.value);
    };

    const handleCreatedAtTotalChange = (event) => {
        setCreatedAtTotal(event.target.value);
    };

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const fetchEmpRangeCount = async () => {
        try {
            const empRangeQueries = [Query.equal("employeeId", empId)];
            const roomLockedRangeQueries = [
                ...empRangeQueries,
                Query.equal("isRoomLocked", true),
            ];
            const surveyDeniedRangeQueries = [
                ...empRangeQueries,
                Query.equal("surveyDenied", true),
            ];

            if (empRangeFromDate && empRangeToDate) {
                try {
                    const dateStart = new Date(empRangeFromDate).setHours(0, 0, 0, 0);
                    const dateEnd = new Date(empRangeToDate).setHours(23, 59, 59, 999);

                    const dateFilter = [
                        Query.greaterThanEqual("createdAt", new Date(dateStart).toISOString()),
                        Query.lessThanEqual("createdAt", new Date(dateEnd).toISOString()),
                    ];

                    empRangeQueries.push(...dateFilter);
                    roomLockedRangeQueries.push(...dateFilter);
                    surveyDeniedRangeQueries.push(...dateFilter);
                } catch (error) {
                    console.error("Invalid date format:", error);
                    return;
                }
            }

            const [empRangeResponse, roomLockedRangeResponse, surveyDeniedRangeResponse] =
                await Promise.all([
                    databases.listDocuments(databaseId, collectionId, empRangeQueries),
                    databases.listDocuments(databaseId, collectionId, roomLockedRangeQueries),
                    databases.listDocuments(databaseId, collectionId, surveyDeniedRangeQueries),
                ]);

            setEmpRangeCount(empRangeResponse.total);
            setEmpRangeRoomLockedCount(roomLockedRangeResponse.total);
            setEmpRangeSurveyDeniedCount(surveyDeniedRangeResponse.total);

            const empRangeFairDocumentCount =
                empRangeResponse.total -
                roomLockedRangeResponse.total -
                surveyDeniedRangeResponse.total;
            setEmpRangeFairDocumentCount(empRangeFairDocumentCount);
        } catch (error) {
            console.error("Error fetching employee range count:", error);
        }
    };


    const fetchEmpCount = async () => {
        try {
            const empQueries = [Query.equal("employeeId", empId)];
            const roomLockedQueries = [
                ...empQueries,
                Query.equal("isRoomLocked", true),
            ];
            const surveyDeniedQueries = [
                ...empQueries,
                Query.equal("surveyDenied", true),
            ];

            if (createdAt) {
                try {
                    const date = new Date(createdAt);
                    const dateStart = new Date(date.setHours(0, 0, 0, 0));
                    const dateEnd = new Date(date.setHours(23, 59, 59, 999));

                    const dateFilter = [
                        Query.greaterThanEqual("createdAt", dateStart.toISOString()),
                        Query.lessThanEqual("createdAt", dateEnd.toISOString()),
                    ];

                    empQueries.push(...dateFilter);
                    roomLockedQueries.push(...dateFilter);
                    surveyDeniedQueries.push(...dateFilter);
                } catch (error) {
                    console.error("Invalid date format:", error);
                    return;
                }
            }

            const [empResponse, roomLockedResponse, surveyDeniedResponse] =
                await Promise.all([
                    databases.listDocuments(databaseId, collectionId, empQueries),
                    databases.listDocuments(databaseId, collectionId, roomLockedQueries),
                    databases.listDocuments(
                        databaseId,
                        collectionId,
                        surveyDeniedQueries
                    ),
                ]);

            setEmpCount(empResponse.total);
            setRoomLockedCount(roomLockedResponse.total);
            setSurveyDeniedCount(surveyDeniedResponse.total);

            const fairDocumentCount =
                empResponse.total -
                roomLockedResponse.total -
                surveyDeniedResponse.total;
            setFairDocumentCount(fairDocumentCount);
        } catch (error) {
            console.error("Error fetching employee count:", error);
        }
    };

    const fetchSingleDateTotalCount = async () => {
        try {
            const totalQueries = [];
            const roomLockedTotalQueries = [Query.equal("isRoomLocked", true)];
            const surveyDeniedTotalQueries = [Query.equal("surveyDenied", true)];

            if (createdAtTotal) {
                try {
                    const date = new Date(createdAtTotal);
                    const dateStart = new Date(date.setHours(0, 0, 0, 0));
                    const dateEnd = new Date(date.setHours(23, 59, 59, 999));

                    const dateFilter = [
                        Query.greaterThanEqual("createdAt", dateStart.toISOString()),
                        Query.lessThanEqual("createdAt", dateEnd.toISOString()),
                    ];

                    totalQueries.push(...dateFilter);
                    roomLockedTotalQueries.push(...dateFilter);
                    surveyDeniedTotalQueries.push(...dateFilter);
                } catch (error) {
                    console.error("Invalid date format:", error);
                    return;
                }
            }

            const [
                totalResponse,
                roomLockedTotalResponse,
                surveyDeniedTotalResponse,
            ] = await Promise.all([
                databases.listDocuments(databaseId, collectionId, totalQueries),
                databases.listDocuments(
                    databaseId,
                    collectionId,
                    roomLockedTotalQueries
                ),
                databases.listDocuments(
                    databaseId,
                    collectionId,
                    surveyDeniedTotalQueries
                ),
            ]);

            setSingleDateTotalCount(totalResponse.total);
            const fairTotalCount =
                totalResponse.total -
                roomLockedTotalResponse.total -
                surveyDeniedTotalResponse.total;
            setSingleDateFairTotalCount(fairTotalCount);
            setSingleDateRoomLockedTotalCount(roomLockedTotalResponse.total);
            setSingleDateSurveyDeniedTotalCount(surveyDeniedTotalResponse.total);
        } catch (error) {
            console.error("Error fetching total count:", error);
        }
    };

    const fetchRangeTotalCount = async () => {
        try {
            const totalQueries = [];
            const roomLockedTotalQueries = [Query.equal("isRoomLocked", true)];
            const surveyDeniedTotalQueries = [Query.equal("surveyDenied", true)];

            if (fromDate && toDate) {
                try {
                    const dateStart = new Date(fromDate).setHours(0, 0, 0, 0);
                    const dateEnd = new Date(toDate).setHours(23, 59, 59, 999);

                    const dateFilter = [
                        Query.greaterThanEqual("createdAt", new Date(dateStart).toISOString()),
                        Query.lessThanEqual("createdAt", new Date(dateEnd).toISOString()),
                    ];

                    totalQueries.push(...dateFilter);
                    roomLockedTotalQueries.push(...dateFilter);
                    surveyDeniedTotalQueries.push(...dateFilter);
                } catch (error) {
                    console.error("Invalid date format:", error);
                    return;
                }
            }

            const [
                totalResponse,
                roomLockedTotalResponse,
                surveyDeniedTotalResponse,
            ] = await Promise.all([
                databases.listDocuments(databaseId, collectionId, totalQueries),
                databases.listDocuments(
                    databaseId,
                    collectionId,
                    roomLockedTotalQueries
                ),
                databases.listDocuments(
                    databaseId,
                    collectionId,
                    surveyDeniedTotalQueries
                ),
            ]);

            setRangeTotalCount(totalResponse.total);
            const fairTotalCount =
                totalResponse.total -
                roomLockedTotalResponse.total -
                surveyDeniedTotalResponse.total;
            setRangeFairTotalCount(fairTotalCount);
            setRangeRoomLockedTotalCount(roomLockedTotalResponse.total);
            setRangeSurveyDeniedTotalCount(surveyDeniedTotalResponse.total);
        } catch (error) {
            console.error("Error fetching total count by range:", error);
        }
    };

    const resetSingleDateTotalCount = () => {
        setCreatedAtTotal("");
        setSingleDateTotalCount(0);
        setSingleDateFairTotalCount(0);
        setSingleDateRoomLockedTotalCount(0);
        setSingleDateSurveyDeniedTotalCount(0);
    };

    const resetRangeTotalCount = () => {
        setFromDate("");
        setToDate("");
        setRangeTotalCount(0);
        setRangeFairTotalCount(0);
        setRangeRoomLockedTotalCount(0);
        setRangeSurveyDeniedTotalCount(0);
    };

    const resetEmpCount = () => {
        setEmpId("");
        setCreatedAt("");
        setEmpCount(0);
        setFairDocumentCount(0);
        setRoomLockedCount(0);
        setSurveyDeniedCount(0);
    };

    const resetEmpRangeCount = () => {
        setEmpRangeFromDate("");
        setEmpRangeToDate("");
        setEmpRangeCount(0);
        setEmpRangeFairDocumentCount(0);
        setEmpRangeRoomLockedCount(0);
        setEmpRangeSurveyDeniedCount(0);
    };


    return (
        <Container>
            <Row className={''}>
                <Col sm>
                    <h2>Total Count by Single Date</h2>
                    <Form.Control
                        type="date"
                        value={createdAtTotal}
                        onChange={handleCreatedAtTotalChange}
                        size={'sm'}
                    />
                    <Button size={'sm'} variant={'primary'} onClick={fetchSingleDateTotalCount}
                            className={'get_count_button'}>Get
                        count</Button>
                    <Button size={'sm'} variant={'secondary'} onClick={resetSingleDateTotalCount}
                            className={'reset_count_button'}>Clear</Button>
                    <p>Total survey count: {singleDateTotalCount}</p>
                    <p>Total Fair survey Count: {singleDateFairTotalCount}</p>
                    <p>Total room locked count: {singleDateRoomLockedTotalCount}</p>
                    <p>Total denied survey: {singleDateSurveyDeniedTotalCount}</p>
                </Col>
                <Col sm>
                    <h2>Total Count by Date Range</h2>
                    <Form.Control
                        type="date"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        placeholder="From Date"
                        size={'sm'} 
                    />
                    <Form.Control
                        type="date"
                        value={toDate}
                        onChange={handleToDateChange}
                        placeholder="To Date"
                        size={'sm'}
                    />
                    <Button size={'sm'} variant={'primary'} onClick={fetchRangeTotalCount}
                            className={'get_count_button'}>Get
                        count</Button>
                    <Button size={'sm'} variant={'secondary'} onClick={resetRangeTotalCount}
                            className={'reset_count_button'}>Clear</Button>
                    <p>Total survey count: {rangeTotalCount}</p>
                    <p>Fair survey count: {rangeFairTotalCount}</p>
                    <p>Total room locked count: {rangeRoomLockedTotalCount}</p>
                    <p>Total Denied survey count: {rangeSurveyDeniedTotalCount}</p>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    <h2>Count by Employee ID (Single Date)</h2>
                    <Form.Control
                        type="text"
                        value={empId}
                        onChange={handleEmpIdChange}
                        placeholder="Enter Employee ID"
                        size={'sm'}
                    />
                    <Form.Control type="date" size={'sm'} value={createdAt} onChange={handleCreatedAtChange}/>
                    <Button variant={'primary'} size={'sm'} onClick={fetchEmpCount} className={'get_count_button'}>Get
                        count</Button>
                    <Button size={'sm'} variant={'secondary'} onClick={resetEmpCount}
                            className={'reset_count_button'}>Clear</Button>
                    <p>
                        Total survey count for {empId} on {createdAt}: {empCount}
                    </p>
                    <p>Total fair survey count: {fairDocumentCount}</p>
                    <p>Total room locked count: {roomLockedCount}</p>
                    <p>Total survey denied count: {surveyDeniedCount}</p>
                </Col>
                <Col sm>
                    <h2>Count by Employee ID (Date Range)</h2>
                    <Form.Control
                        type="text"
                        value={empId}
                        onChange={handleEmpIdChange}
                        placeholder="Enter Employee ID"
                        size={'sm'}
                    />
                    <Form.Control
                        type="date"
                        value={empRangeFromDate}
                        onChange={handleEmpRangeFromDateChange}
                        placeholder="From Date"
                        size={'sm'}
                    />
                    <Form.Control
                        type="date"
                        value={empRangeToDate}
                        onChange={handleEmpRangeToDateChange}
                        placeholder="To Date"
                        size={'sm'}
                    />
                    <Button variant={'primary'} size={'sm'} onClick={fetchEmpRangeCount} className={'get_count_button'}>Get
                        count</Button>
                    <Button variant={'secondary'} size={'sm'} onClick={resetEmpRangeCount}
                            className={'reset_count_button'}>Clear</Button>
                    <p>
                        Count for {empId} from {empRangeFromDate} to {empRangeToDate}: {empRangeCount}
                    </p>
                    <p>Fair survey count: {empRangeFairDocumentCount}</p>
                    <p>Total room locked Count: {empRangeRoomLockedCount}</p>
                    <p>Total survey denied count: {empRangeSurveyDeniedCount}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default DocumentCount;
