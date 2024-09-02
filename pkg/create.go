package pkg

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/appwrite/sdk-for-go/databases"
)

func CreateDocs(appwrite_database *databases.Databases, database_id, collection_id, json_file_path string) {
	startTime := time.Now()
	fmt.Println("Running create document API!")

	// Read the JSON file
	file, err := os.Open(json_file_path)
	if err != nil {
		fmt.Println("Error opening JSON file:", err)
		return
	}
	defer file.Close()

	// Parse the JSON file
	byteValue, _ := ioutil.ReadAll(file)

	var data []map[string]interface{}
	err = json.Unmarshal(byteValue, &data)
	if err != nil {
		fmt.Println("Error parsing JSON file:", err)
		return
	}

	for i, item := range data {
		// Extract the $id from the item
		docID, ok := item["$id"].(string)
		if !ok || docID == "" {
			fmt.Printf("Error: $id is missing or not a string in document %d\n", i+1)
			continue
		}

		// Remove $id from the item map if it's not needed as a field in the document
		delete(item, "$id")
		delete(item, "$collectionId")
		delete(item, "$databaseId")
		delete(item, "$databaseId")
		delete(item, "last_update_date")
		delete(item, "updateat")
		delete(item, "last_updated_date")
		delete(item, "nameSource")

		// Create the document with the provided $id
		response, err := appwrite_database.CreateDocument(database_id, collection_id, docID, item)
		if err != nil {
			fmt.Printf("Error creating document %d: %s\n", i+1, err)
			continue
		}
		fmt.Printf("Document %d created successfully: ID = %s\n", i+1, response.Id)
	}

	elapsedTime := time.Since(startTime)
	fmt.Printf("completed in %s.\n", elapsedTime)
}
