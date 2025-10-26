import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    switch (error.code) {
      case 'ENOENT':
        return [];
      case 'EACCES':
        console.error(`No permission to read ${PATH_DB}`);
        throw error;
      default:
        console.error(`Unexpected error reading ${PATH_DB}:`, error.message);
        throw new Error(`Failed to read contacts: ${error.message}`);
    }
  }
};