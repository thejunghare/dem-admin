import React, { useState } from "react";
import { databases, Query } from "./appwriteConfig";
import "./index.css";

function DocumnetCount() {
  const databaseId = "66502c6e0015d7be8526";
  const collectionId = "6650391e00030acc335b";
  const [totalCount, setTotalCount] = useState(0);
  const [empCount, setEmpCount] = useState(0);
  const [empId, setEmpId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [fairDocumentCount, setFairDocumentCount] = useState(0);
  const [roomLockedCount, setRoomLockedCount] = useState(0);
  const [surveyDeniedCount, setSurveyDeniedCount] = useState(0);
  const [fairTotalCount, setFairTotalCount] = useState(0);
  const [roomLockedTotalCount, setRoomLockedTotalCount] = useState(0);
  const [surveyDeniedTotalCount, setSurveyDeniedTotalCount] = useState(0);
  const [createdAtTotal, setCreatedAtTotal] = useState("");

  const handleEmpIdChange = (event) => {
    setEmpId(event.target.value);
  };

  const handleCreatedAtChange = (event) => {
    setCreatedAt(event.target.value);
  };

  const handleCreatedAtTotalChange = (event) => {
    setCreatedAtTotal(event.target.value);
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

  const fetchTotalCount = async () => {
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

      setTotalCount(totalResponse.total);
      const fairTotalCount =
        totalResponse.total -
        roomLockedTotalResponse.total -
        surveyDeniedTotalResponse.total;
      setFairTotalCount(fairTotalCount);
      setRoomLockedTotalCount(roomLockedTotalResponse.total);
      setSurveyDeniedTotalCount(surveyDeniedTotalResponse.total);
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  return (
    <div className="document-count-container">
      {/* <h1>Admin Dashboard</h1> */}
      <div>
        <h2>Total Count</h2>
        <input
          type="date"
          value={createdAtTotal}
          onChange={handleCreatedAtTotalChange}
        />
        <button onClick={fetchTotalCount}>Get Total Count</button>
        <p>Total Documents: {totalCount}</p>
        <p>Fair Total Count: {fairTotalCount}</p>
        <p>Room Locked Total Count: {roomLockedTotalCount}</p>
        <p>Survey Denied Total Count: {surveyDeniedTotalCount}</p>
      </div>
      <div>
        <h2>Count by Employee ID</h2>
        <input
          type="text"
          value={empId}
          onChange={handleEmpIdChange}
          placeholder="Enter Employee ID"
        />
        <input type="date" value={createdAt} onChange={handleCreatedAtChange} />
        <button onClick={fetchEmpCount}>Get Count</button>
        <p>
          Count for {empId} on {createdAt}: {empCount}
        </p>
        <p>Fair Document Count: {fairDocumentCount}</p>
        <p>Room Locked Document Count: {roomLockedCount}</p>
        <p>Survey Denied Document Count: {surveyDeniedCount}</p>
      </div>
    </div>
  );
}

export default DocumnetCount;
