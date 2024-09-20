package pkg

import (
	"fmt"
	"time"

	"github.com/appwrite/sdk-for-go/databases"
)

func DeleteDocs(appwrite_database *databases.Databases, database_id, collection_id string) {
	startTime := time.Now()
	fmt.Println("Running delete document API!")

	response, err := appwrite_database.ListDocuments(database_id, collection_id)
	if err != nil {
		fmt.Println("Error list document:", err)
		return
	}

	for i, document := range response.Documents {
		fmt.Printf("Document %d: ID = %s\n", i+1, document.Id)
		_, err := appwrite_database.DeleteDocument(database_id, collection_id, document.Id)
		if err != nil {
			fmt.Printf("Error deleting document %d: %s\n", i+1, err)
			continue
		}
		fmt.Printf("Document %d deleted successfully.\n", i+1)
	}

	elapsedTime := time.Since(startTime)
	fmt.Printf("All documents created successfully in %s.\n", elapsedTime)
}
