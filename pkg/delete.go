package pkg

import (
	"fmt"

	"github.com/appwrite/sdk-for-go/databases"
)

func Delete(appwrite_database *databases.Databases, database_id, collection_id string) {
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

	fmt.Println("Document deleted successfully.")
}
