import React, { useState, useEffect } from "react";
import { Databases, Client, Query } from "appwrite";
import "./index.css";

const appwrite = new Client();
appwrite
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6648c699000032e4623c");

const database = new Databases(appwrite);

const DownloadCollection = () => {
  const [division, setDivision] = useState("");
  const [ward, setWard] = useState("");
  const [area, setArea] = useState("");
  const [building, setBuilding] = useState("");

  const [divisionOptions, setDivisionOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);

  useEffect(() => {
    fetch("https://thejunghare.github.io/survey-app/src/json/data.json") // Replace with your actual URL
      .then((response) => response.json())
      .then((data) => {
        // Assuming your JSON structure is an array of divisions
        if (Array.isArray(data)) {
          setDivisionOptions(
            data.map((division) => ({
              id: division.id,
              name: division.name,
              wards: division.wards || [],
            }))
          );
        } else {
          console.error("Invalid JSON format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  const handleDivisionChange = (event) => {
    const selectedDivisionId = event.target.value;
    setDivision(selectedDivisionId);

    // Find the selected division and populate ward options
    const selectedDivision = divisionOptions.find(
      (div) => div.id === parseInt(selectedDivisionId)
    );
    if (selectedDivision) {
      setWardOptions(
        selectedDivision.wards.map((ward) => ({
          id: ward.id,
          name: ward.name,
          areas: ward.areas || [],
        }))
      );
    } else {
      setWardOptions([]);
    }
  };

  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    setWard(selectedWardId);

    // Find the selected ward and populate area options
    const selectedWard = wardOptions.find(
      (ward) => ward.id === parseInt(selectedWardId)
    );
    if (selectedWard) {
      setAreaOptions(
        selectedWard.areas.map((area) => ({
          id: area.id,
          name: area.name,
          buildings: area.buildings || [],
        }))
      );
    } else {
      setAreaOptions([]);
    }
  };

  const handleAreaChange = (event) => {
    const selectedAreaId = event.target.value;
    setArea(selectedAreaId);

    // Find the selected area and populate building options
    const selectedArea = areaOptions.find(
      (area) => area.id === parseInt(selectedAreaId)
    );
    if (selectedArea) {
      setBuildingOptions(
        selectedArea.buildings.map((building) => ({
          id: building.id,
          name: building.name,
        }))
      );
    } else {
      setBuildingOptions([]);
    }
  };

  async function dumpCollection(collectionId) {
    try {
      const databaseId = "66502c6e0015d7be8526";
      let documents = [];
      let response;
      let lastDocumentId = null;

      do {
        const queries = lastDocumentId
          ? [Query.cursorAfter(lastDocumentId)]
          : [];
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

  async function dumpFilteredCollection(collectionId, filters) {
    try {
      const databaseId = "66502c6e0015d7be8526";
      let documents = [];
      let response;
      let lastDocumentId = null;

      const batchSize = 100; // Adjust as per your needs

      while (true) {
        const queryOptions = {
          filters: filters,
          limit: batchSize,
          cursor: lastDocumentId
            ? Query.cursorAfter(lastDocumentId)
            : undefined,
        };

        response = await database.listDocuments(
          databaseId,
          collectionId,
          queryOptions
        );

        documents = documents.concat(response.documents);

        // Check if there are more documents to fetch
        if (response.documents.length < batchSize) {
          break; // No more documents to fetch
        }

        // Update the lastDocumentId for pagination
        lastDocumentId = response.documents[response.documents.length - 1].$id;

        // Avoid exceeding Appwrite's query length limitation
        if (lastDocumentId.length > 4096) {
          console.error("Exceeded query length limitation.");
          break;
        }
      }

      console.log(`Downloaded ${documents.length} filtered documents.`);

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
      console.error(`Failed to dump filtered collection: ${error.message}`);
    }
  }

  const handleDownload = () => {
    const filters = [];
    if (division) filters.push(Query.equal("division", division));
    if (ward) filters.push(Query.equal("ward", ward));
    if (area) filters.push(Query.equal("area", area));
    if (building) filters.push(Query.equal("building", building));

    console.log("Applying filters:", filters);

    dumpFilteredCollection("6650391e00030acc335b", filters);
  };

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

  return (
    <div className="download-container">
      <div className="filter-container">
        <select value={division} onChange={handleDivisionChange}>
          <option value="">Select Division</option>
          {divisionOptions.map((div) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
        </select>
        <select value={ward} onChange={handleWardChange}>
          <option value="">Select Ward</option>
          {wardOptions.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
        <select value={area} onChange={handleAreaChange}>
          <option value="">Select Area</option>
          {areaOptions.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <select value={building} onChange={(e) => setBuilding(e.target.value)}>
          <option value="">Select Building</option>
          {buildingOptions.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDownload}>Download Filtered Survey</button>
      <button onClick={() => dumpCollection("6650391e00030acc335b")}>
        Download All Survey
      </button>

      <button
        onClick={() => dumpSurveyDeniedCollection("6650391e00030acc335b")}
      >
        Download Survey Denied Documents
      </button>

      <button onClick={() => dumpRoomLockedCollection("6650391e00030acc335b")}>
        Download Locked Room Documents
      </button>

      <button onClick={() => dumpFairSurveyCollection("6650391e00030acc335b")}>
        Download Fair Survey Documents
      </button>
    </div>
  );
};

export default DownloadCollection;
