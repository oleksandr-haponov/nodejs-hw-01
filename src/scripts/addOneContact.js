import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  try {
    const existingContacts = await readContacts();

    const MAX_ATTEMPTS = 5;
    let attempt = 0;
    let newContact;

    do {
      newContact = createFakeContact();
      attempt++;

      const isDuplicate = existingContacts.some(contact =>
        contact.email === newContact.email ||
        contact.phone === newContact.phone
      );

      if (isDuplicate) {
        console.warn(`⚠️ Attempt ${attempt}: duplicate found - ${newContact.email} or ${newContact.phone}`);
        newContact = null;
      }
    } while (!newContact && attempt < MAX_ATTEMPTS);

    if (!newContact) {
      throw new Error('❌ Unable to generate a unique contact after multiple attempts');
    }

    const updatedContacts = [...existingContacts, newContact];
    await writeContacts(updatedContacts);
    
    console.log(`✅ Contact "${newContact.name}" added successfully`);
    console.log(`Total contacts: ${updatedContacts.length}`);
  } catch (error) {
    console.error('❌ Error adding contact:', error.message);
    throw error;
  }
};

addOneContact();
