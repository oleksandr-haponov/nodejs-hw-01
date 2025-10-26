import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contacts = await readContacts();

    if (!Array.isArray(contacts)) {
      throw new TypeError('❌ Invalid contacts data format');
    }

    const count = contacts.length;

    if (count === 0) {
      console.log('⚠️ No contacts to remove');
      return;
    }

    const removedContact = contacts[count - 1];
    const updatedContacts = contacts.slice(0, -1);

    await writeContacts(updatedContacts);

    console.log(`✅ Removed contact [ID:${removedContact.id}]: "${removedContact.name}"`);
    console.log(`🔹 Remaining contacts: ${updatedContacts.length}`);
  } catch (error) {
    console.error('❌ Cannot remove last contact:', error.message);

    if (error.code === 'ENOENT') {
      console.log('❌ Contacts file not found');
      return null;
    }

    throw error;
  }
};

removeLastContact();