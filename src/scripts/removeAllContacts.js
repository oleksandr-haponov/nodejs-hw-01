import { writeContacts } from '../utils/writeContacts.js';
import { readContacts } from '../utils/readContacts.js';
import { PATH_DB } from '../constants/contacts.js';

export const removeAllContacts = async () => {
  try {
    const contacts = await readContacts();
    const contactCount = contacts.length;

    if (contactCount === 0) {
      console.log('✅ Contact list is already empty');
      return;
    }

    await writeContacts([]);
    console.log(`✅ Removed ${contactCount} contacts`);
    console.log(`File cleared: ${PATH_DB}`);

    return contactCount;
  } catch (error) {
    console.error('❌ Error removing contacts:', error.message);
    throw error;
  }
};

removeAllContacts();