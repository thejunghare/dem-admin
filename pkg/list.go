package pkg

import (
	"fmt"

	"github.com/appwrite/sdk-for-go/databases"
)

func List(appwrite_database *databases.Databases, database_id, collection_id string) {
	fmt.Println("Running list document API!")

	response, err := appwrite_database.ListDocuments(database_id, collection_id)
	if err != nil {
		fmt.Println("Error list document:", err)
		return
	}

	for i, document := range response.Documents {
		fmt.Printf("Document %d: ID = %s\n", i+1, document.Id)
	}

	fmt.Println("Document listed successfully.")
}
