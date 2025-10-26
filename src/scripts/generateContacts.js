import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  try {
    if (
      typeof number !== 'number' ||
      number <= 0 ||
      !Number.isInteger(number)
    ) {
      throw new Error('❌ Count must be a positive integer');
    }

    if (number > 999) {
      throw new Error('❌ Cannot generate more than 999 contacts at once');
    }

    const existingContacts = await readContacts();
    const newContacts = Array.from({ length: number }, () =>
      createFakeContact(),
    );

    const updatedContacts = [...existingContacts, ...newContacts];
    await writeContacts(updatedContacts);

    console.log(
      `✅ Successfully added ${number} contacts. Total: ${updatedContacts.length}`,
    );
    return updatedContacts;
  } catch (error) {
    console.error('❌ Failed to generate contacts:', error.message);
    throw error;
  }
};

generateContacts(5);