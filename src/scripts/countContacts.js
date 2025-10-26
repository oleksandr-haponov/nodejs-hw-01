import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  try {
    const contacts = await readContacts();

    if (!Array.isArray(contacts)) {
      throw new TypeError('❌ Invalid contacts data format');
    }

    const count = contacts.length;

    console.log(`✅ Total contacts: ${count}`);
    return count;
  } catch (error) {
    console.error('❌ Error counting contacts:', error.message);
    if (error.code === 'ENOENT') {
      console.log('⚠️ Contacts file not found. Run: "npm run add-one" to create your first contact',);
    }

    throw error;
  }
};

console.log(await countContacts());
