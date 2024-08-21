package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/appwrite/sdk-for-go/appwrite"
	"github.com/xuri/excelize/v2"
)

func main() {
	filePath := "test_2.xlsx" // Replace with your file path
	appwriteEndpoint := os.Getenv("APPWRITE_ENDPOINT")
	appwriteProject := os.Getenv("APPWRITE_PROJECT")
	appwriteKey := os.Getenv("APPWRITE_API_KEY")
	databaseID := os.Getenv("DATABASE_ID")
	collectionID := os.Getenv("COLLECTION_ID")

	// Initialize Appwrite Client
	client := appwrite.NewClient()
	client.SetEndpoint(appwriteEndpoint)
	client.SetProject(appwriteProject)
	client.SetKey(appwriteKey)

	databases := appwrite.NewDatabases(client)

	// Open the Excel file
	f, err := excelize.OpenFile(filePath)
	if err != nil {
		log.Fatalf("Failed to open Excel file: %v", err)
	}

	// Get the first sheet
	sheetName := f.GetSheetName(0)
	rows, err := f.GetRows(sheetName)
	if err != nil {
		log.Fatalf("Failed to get rows from Excel sheet: %v", err)
	}

	// Iterate over the rows and upload to Appwrite
	for i, row := range rows[1:] {
		documentData := map[string]interface{}{
			"ac_number":     row[0],
			"part_number":   row[1],
			"serial_number": row[2],
			"house_number":  row[3],
			"first_name":    row[4],
			"last_name":     row[5],
			"age":           row[6],
			"gender":        row[7],
			"epic_number":   row[8],
			"address":       row[9],
			"booth_address": row[10],
		}

		documentID := strconv.Itoa(i + 1)
		_, err := databases.CreateDocument(databaseID, collectionID, documentID, documentData)
		if err != nil {
			log.Printf("Failed to upload document %d: %v", i+1, err)
		} else {
			fmt.Printf("Uploaded document %d/%d\n", i+1, len(rows)-1)
		}
	}
}
