import { Client, Databases, Query } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6648c699000032e4623c');

export { databases, Query };