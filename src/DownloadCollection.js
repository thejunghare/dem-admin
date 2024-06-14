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

const DownloadCollection = () => {
  return (
    <div className="download-container">
      <button onClick={() => dumpCollection("6650391e00030acc335b")}>
        Download All Survey
      </button>
    </div>
  );
};

export default DownloadCollection;
