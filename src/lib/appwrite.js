import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6648c699000032e4623c");

const account = new Account(client);
export const databases = new Databases(client);

export { client, account };
