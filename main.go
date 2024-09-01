package main

import (
	"log"
	"os"

	"github.com/appwrite/sdk-for-go/appwrite"
	"github.com/appwrite/sdk-for-go/client"
	"github.com/appwrite/sdk-for-go/databases"
	"github.com/joho/godotenv"
	"github.com/thejunghare/dem-admin/pkg"
)

var (
	appwrite_client   client.Client
	appwrite_database *databases.Databases
	json_file_path    string
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	appwrite_project_id := os.Getenv("APPWRITE_PROJECT")
	appwrite_project_api_key := os.Getenv("APPWRITE_API_KEY")

	database_id := os.Getenv("DATABASE_ID")
	collection_id := os.Getenv("TEST_ID") //test collection
	json_file_path = "./test.json"

	appwrite_client = appwrite.NewClient(
		appwrite.WithProject(appwrite_project_id),
		appwrite.WithKey(appwrite_project_api_key),
	)

	appwrite_database = appwrite.NewDatabases(appwrite_client)

	//pkg.Delete(appwrite_database, database_id, collection_id)
	//pkg.List(appwrite_database, database_id, collection_id)
	pkg.Create(appwrite_database, database_id, collection_id, json_file_path)
}
