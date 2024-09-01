package pkg

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/appwrite/sdk-for-go/databases"
	"github.com/appwrite/sdk-for-go/id"
)

func Create(appwrite_database *databases.Databases, database_id, collection_id, json_file_path string) {
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
		response, err := appwrite_database.CreateDocument(database_id, collection_id, id.Unique(), item)
		if err != nil {
			fmt.Printf("Error creating document %d: %s\n", i+1, err)
			continue
		}
		fmt.Printf("Document %d created successfully: ID = %s\n", i+1, response.Id)
	}

	fmt.Println("All documents created successfully.")
}
