import { Handler } from '@netlify/functions'
import Airtable from 'airtable';
import 'dotenv/config';

export const handler: Handler = async () => {

  const airtableData = await getAirtableData();

  return {
    statusCode: 200,
    body: JSON.stringify(airtableData),
  };

}

// Fetches called data from Airtable and returns a promise
async function getAirtableData() {

  const {AIRTABLE_BASE_ID, AIRTABLE_API_KEY } = process.env;

  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);
  const table = base('xgp');

  const records = await table.select().all();

  const airtableData = records.map( record => {
    return {
      id: record.getId(),
      title: record.get('Game'),
      platforms: record.get('Platforms'),
      status: record.get('Status'),
      added: record.get('Added Date'),
      leaving: record.get('Leaving Date'),
      playtime: record.get('Playtime'),
      score: record.get('Score'),
      genres: record.get('Genres'),
    }
  });

  return airtableData;

}
