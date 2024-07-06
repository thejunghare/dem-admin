import React, { useState, useEffect } from "react";
import { Databases, Client, Query } from "appwrite";
import "../index.css";

const appwrite = new Client();
appwrite
  .setEndpoint("https://cloud.appwrite.io/v1") // Set your Appwrite endpoint
  .setProject("6648c699000032e4623c"); // Set your project ID

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
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildings, setBuildings] = useState([]);


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
    const areaId = e.target.value;
    setSelectedArea(areaId);
    setBuildings([]);
    const area = areas.find((a) => a.id === parseInt(areaId));
    setBuildings(area ? area.buildings : []);
  };


  const formatDate = (date) => {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDownloadBasedOnSelection = async () => {
    const filters = {};
    if (selectedDivision) filters.division = selectedDivision;
    if (selectedWard) filters.ward = selectedWard;
    if (selectedArea) filters.area = selectedArea;
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
    } finally {
      setLoading(false);
    }
};




  return (
    <div>
      <div className="selection-based-download">
        {/* select division && select ward*/}
        <div>
          <select
            value={selectedDivision}
            onChange={handleDivisionChange}
            className="select"
          >
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>

          {/* select ward */}
          <select
            value={selectedWard}
            onChange={handleWardChange}
            disabled={!selectedDivision}
            className="select"
          >
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward.id} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        {/* select area && select buildings */}
        <div>
          {/* select area */}
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            disabled={!selectedWard}
            className="select"
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>

          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            disabled={!selectedArea}
            className="select"
          >
            <option value="">Select Building</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.name}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        {/* input date and employee */}
        <div>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="select"
            placeholder='Enter employee ID'
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="select"
          />
        </div>

        {/* download button */}
        <button
          onClick={handleDownloadBasedOnSelection}
          disabled={!selectedDivision || loading}
        >
          Download
        </button>

        {loading && (
          <div className="loading-text">
            downloading...
            Downloaded {downloadCount} surveys
          </div>
        )}
      </div>

      <div className="download-container">
        {/* button */}
        <button onClick={() => dumpCollection("6650391e00030acc335b")}>
          Download all survey non-filter
        </button>
        <button
          onClick={() => dumpSurveyDeniedCollection("6650391e00030acc335b")}
        >
          Download all denied survey
        </button>
        <button
          onClick={() => dumpRoomLockedCollection("6650391e00030acc335b")}
        >
          Download all locked room survey
        </button>
        <button
          onClick={() => dumpFairSurveyCollection("6650391e00030acc335b")}
        >
          Download all fair survey
        </button>
      </div>
    </div>
  );
};

export default DownloadCollection;
