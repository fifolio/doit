import { Client, Account, Databases } from 'appwrite';

// Client Configuration
const client = new Client();

client.setEndpoint(`${import.meta.env.VITE_ENDPOINT_URL}`).setProject(`${import.meta.env.VITE_PROJECT_ID}`);
    
export const account = new Account(client);

// Configure and refer to the Databases
export const databases = new Databases(client);