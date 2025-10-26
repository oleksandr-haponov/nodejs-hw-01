import { PATH_DB } from '../constants/contacts.js';

import fs from 'fs/promises';
import path from 'path';

export const writeContacts = async (updatedContacts) => {
  if (!Array.isArray(updatedContacts)) {
    throw new TypeError('❌ Expected "updatedContacts" to be an array.');
  }

  try {
    const data = JSON.stringify(updatedContacts, null, 2);

    const dir = path.dirname(PATH_DB);
    await fs.mkdir(dir, { recursive: true });

    const tempPath = path.join(dir, path.basename(PATH_DB) + '.tmp');
    await fs.writeFile(tempPath, data, 'utf8');
    await fs.rename(tempPath, PATH_DB);
  } catch (error) {
    console.error(
      `❌ Failed to write ${updatedContacts.length} contacts to ${PATH_DB}:`,
      error.message,
    );
    if (error.code === 'ENOSPC') {
      throw new Error('❌ Insufficient disk space to save contacts');
    }
    if (error.code === 'EACCES') {
      throw new Error('❌ No permission to write contacts file');
    }

    throw new Error(`❌ Failed to save contacts: ${error.message}`);
  }
};