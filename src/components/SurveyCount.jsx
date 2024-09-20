"use client";
import React, { useState, useEffect } from "react";
import { Databases, Client, Query } from "appwrite";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appwrite = new Client();
appwrite
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6648c699000032e4623c");

const database = new Databases(appwrite);

const SurveyCount = () => {
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
  const [selectedDate, setSelectedDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [surveyDenied, setSurveyDenied] = useState(false);
  const [fairSurvey, setFairSurvey] = useState(false);
  const [total_count, set_total_count] = useState(0);
  const [fair_count, set_fair_count] = useState(0);
  const [locked_count, set_locked_count] = useState(0);
  const [denied_count, set_denied_count] = useState(0);

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

  //   const refresh_count = () => toast("Count Refreshed!");

  const full_count = async () => {
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
      set_total_count(0);

      const databaseId = "66502c6e0015d7be8526";
      const collectionId = "8";
      let documents = [];
      let response;
      let lastDocumentId = null;

      const queries = Object.keys(filters).reduce((acc, key) => {
        if (Array.isArray(filters[key])) {
          return [...acc, ...filters[key]];
        }
        return [...acc, Query.equal(key, filters[key])];
      }, []);

      do {
        response = await database.listDocuments(
          databaseId,
          collectionId,
          lastDocumentId
            ? [...queries, Query.cursorAfter(lastDocumentId)]
            : queries
        );

        documents = documents.concat(response.documents);
        set_total_count((prevCount) => prevCount + response.documents.length);

        lastDocumentId =
          response.documents.length > 0
            ? response.documents[response.documents.length - 1].$id
            : null;
      } while (response.documents.length > 0);

      console.log(`Downloaded ${documents.length} documents.`);
      //   refresh_count();
    } catch (error) {
      console.error(`Failed to dump collection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const total_fair_count = async () => {
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

    filters.isRoomLocked = false;
    filters.surveyDenied = false;

    try {
      setLoading(true);
      set_fair_count(0);

      const databaseId = "66502c6e0015d7be8526";
      const collectionId = "8";
      let documents = [];
      let response;
      let lastDocumentId = null;

      const queries = Object.keys(filters).reduce((acc, key) => {
        if (Array.isArray(filters[key])) {
          return [...acc, ...filters[key]];
        }
        return [...acc, Query.equal(key, filters[key])];
      }, []);

      do {
        response = await database.listDocuments(
          databaseId,
          collectionId,
          lastDocumentId
            ? [...queries, Query.cursorAfter(lastDocumentId)]
            : queries
        );

        documents = documents.concat(response.documents);
        set_fair_count((prevCount) => prevCount + response.documents.length);

        lastDocumentId =
          response.documents.length > 0
            ? response.documents[response.documents.length - 1].$id
            : null;
      } while (response.documents.length > 0);

      console.log(`Downloaded ${documents.length} documents.`);
      //   refresh_count();
    } catch (error) {
      console.error(`Failed to dump collection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const total_locked_count = async () => {
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

    filters.isRoomLocked = true;
    // filters.surveyDenied = false;

    try {
      setLoading(true);
      set_locked_count(0);

      const databaseId = "66502c6e0015d7be8526";
      const collectionId = "8";
      let documents = [];
      let response;
      let lastDocumentId = null;

      const queries = Object.keys(filters).reduce((acc, key) => {
        if (Array.isArray(filters[key])) {
          return [...acc, ...filters[key]];
        }
        return [...acc, Query.equal(key, filters[key])];
      }, []);

      do {
        response = await database.listDocuments(
          databaseId,
          collectionId,
          lastDocumentId
            ? [...queries, Query.cursorAfter(lastDocumentId)]
            : queries
        );

        documents = documents.concat(response.documents);
        set_locked_count((prevCount) => prevCount + response.documents.length);

        lastDocumentId =
          response.documents.length > 0
            ? response.documents[response.documents.length - 1].$id
            : null;
      } while (response.documents.length > 0);

      console.log(`Downloaded ${documents.length} documents.`);
      //   refresh_count();
    } catch (error) {
      console.error(`Failed to dump collection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const total_denied_count = async () => {
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

    filters.surveyDenied = true;

    try {
      setLoading(true);
      set_denied_count(0);

      const databaseId = "66502c6e0015d7be8526";
      const collectionId = "8";
      let documents = [];
      let response;
      let lastDocumentId = null;

      const queries = Object.keys(filters).reduce((acc, key) => {
        if (Array.isArray(filters[key])) {
          return [...acc, ...filters[key]];
        }
        return [...acc, Query.equal(key, filters[key])];
      }, []);

      do {
        response = await database.listDocuments(
          databaseId,
          collectionId,
          lastDocumentId
            ? [...queries, Query.cursorAfter(lastDocumentId)]
            : queries
        );

        documents = documents.concat(response.documents);
        set_denied_count((prevCount) => prevCount + response.documents.length);

        lastDocumentId =
          response.documents.length > 0
            ? response.documents[response.documents.length - 1].$id
            : null;
      } while (response.documents.length > 0);

      console.log(`Downloaded ${documents.length} documents.`);
      //   refresh_count();
    } catch (error) {
      console.error(`Failed to dump collection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  async function get_fresh_count() {
    await Promise.all([
      total_fair_count(),
      total_locked_count(),
      total_denied_count(),
      full_count(),
    ]);
  }

  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="">
        <div className="">
          {/* select division && select ward*/}
          <div className={"my-3 flex flex-row items-center justify-evenly"}>
            <div className="w-2/5">
              <Select
                aria-label="Default select example"
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
              <Select
                aria-label="Default select example"
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
          <div className={"my-3  flex flex-row items-center justify-evenly"}>
            {/* select area */}
            <div className="w-2/5">
              <Select
                aria-label="Default select example"
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
              <Select
                aria-label="Default select example"
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
          <div className={"my-3  flex flex-row items-center justify-evenly"}>
            <div className="w-2/5">
              <TextInput
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter employee ID"
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

          {/* download button */}
          <div className="flex items-center justify-center">
            <div>
              <Button
                className={"m-3"}
                onClick={get_fresh_count}
                disabled={!selectedDivision}
                isProcessing={loading}
              >
                Get count
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-3 flex flex-row items-center justify-evenly p-5 rounded-md bg-slate-300 border shadow">
        <p>Full count:</p>
        <h1 className="font-bold text-2xl text-red-800">{total_count}</h1>

        <p>Fair count:</p>
        <h1 className="font-bold text-2xl text-red-800">{fair_count}</h1>

        <p> locked room :</p>
        <h1 className="font-bold text-2xl text-red-800">{locked_count}</h1>

        <p>denied count:</p>
        <h1 className="font-bold text-2xl text-red-800">{denied_count}</h1>
      </div>
    </div>
  );
};

export default SurveyCount;
