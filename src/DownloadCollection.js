import React from "react";
import { Databases, Client, Query } from "appwrite";
import './index.css';

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
  return (
    <div className="download-container">
      <button onClick={() => dumpCollection("6650391e00030acc335b")}>
        Download all survey non-filter
      </button>
      <button onClick={() => dumpSurveyDeniedCollection("6650391e00030acc335b")}>
        Download all denied survey
      </button>
      <button onClick={() => dumpRoomLockedCollection("6650391e00030acc335b")}>
        Download all locked room survey
      </button>
      <button onClick={() => dumpFairSurveyCollection("6650391e00030acc335b")}>
        Download all fair survey
      </button>
    </div>
  );
};

export default DownloadCollection;
