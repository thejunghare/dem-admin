package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/appwrite/sdk-for-go/appwrite"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	checkerror(err)

	client := appwrite.NewClient(
		appwrite.WithEndpoint(os.Getenv("APPWRITE_ENDPOINT")),
		appwrite.WithProject(os.Getenv("APPWRITE_PROJECT")),
		appwrite.WithKey(os.Getenv("APPWRITE_API_KEY")),
	)

	databases := appwrite.NewDatabases(client)

	databaseID := "66502c6e0015d7be8526"
	survevyscollectionID := "6650391e00030acc335b"
	filename := "surveys.json"
	attributes := []string{"division", "ward", "area"}

	documents, err := databases.ListDocuments(
		databaseID,
		survevyscollectionID,
		appwrite.NewListDocumentsQueries().Attributes(attributes),
	)
	checkerror(err)

	file, err := os.Create(filename)
	checkerror(err)
	defer file.Close()

	encode := json.NewEncoder(file)
	encode.Encode(documents)

	/* for index, document := range documents.Documents {
		log.Println(index, document.Id)
	} */
	fmt.Println("Documents successfully exported to", file)
}

func checkerror(err error) error {
	if err != nil {
		log.Fatalf("something went wrong: %v", err)
	}
	return err
}
