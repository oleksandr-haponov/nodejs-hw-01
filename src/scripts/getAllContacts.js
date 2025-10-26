import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await readContacts();

    if (!Array.isArray(contacts)) {
      throw new TypeError('❌ Invalid contacts data format');
    }

    if (contacts.length === 0) {
      console.log('⚠️ No contacts yet');
    } else {
      console.log(`🔹 Total contacts: ${contacts.length}`);
      console.table(contacts);
    }

    return contacts;
  } catch (error) {
    console.error('❌ Error retrieving contacts:', error.message);

    if (error.code === 'ENOENT') {
      console.log('⚠️ Run: "npm run add-one" to create your first contact');
    }

    throw error;
  }
};

console.log(await getAllContacts());