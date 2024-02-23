import { Client, Account, Databases } from 'appwrite';
import envs from '../vite-env';

// Client Configuration
const client = new Client();
client.setEndpoint(`${envs.VITE_ENDPOINT_URL}`).setProject(`${envs.VITE_PROJECT_ID}`);
export const account = new Account(client);

// Configure and refer to the Databases
export const databases = new Databases(client, `${envs.VITE_DATABASES_ID}`)