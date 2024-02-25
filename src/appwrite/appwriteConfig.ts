import { Client, Account, Databases, Avatars } from 'appwrite';

const appwriteConfig = {
    url: `${import.meta.env.VITE_ENDPOINT_URL}`,
    projectID: `${import.meta.env.VITE_PROJECT_ID}`,
    databasesID: `${import.meta.env.VITE_DATABASES_ID}`,

}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectID);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatar = new Avatars(client);
