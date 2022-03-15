import { Handler } from '@netlify/functions'
import Airtable from 'airtable';
import 'dotenv/config';

export const handler: Handler = async () => {

  const airtableData = await getAirtableData();

  return {
    statusCode: 200,
    body: JSON.stringify({data: airtableData}),
  };

}

// Fetches called data from Airtable and returns a promise
async function getAirtableData() {

  const {AIRTABLE_BASE_ID, AIRTABLE_API_KEY } = process.env;

  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);
  const table = base('v2');

  const records = await table.select({
    maxRecords: 75,
    sort: [{field: "Game", direction: "asc"}]
  }).all();

  const airtableData = records.map( record => {
    return {
      id: record.getId(),
      title: record.get('Game'),
      img: record.get('Image'),
      description: record.get('Description'),
      platform: record.get('Platforms'),
      genres: record.get('Genres'),
      score: record.get('Score'),
      playtime: record.get('Playtime'),
      added: record.get('Added'),
      leaving: record.get('Removed'),
      comingSoon: setComingSoon(record.get('Status')),
      leavingSoon: setLeavingSoon(record.get('Status'))
    }
  });

  return airtableData;

}

function setComingSoon(status: unknown) {

  if (status == 'Coming Soon') {
    return true;
  } else return false;

}

function setLeavingSoon(status: unknown) {

  if (status == 'Leaving Soon') {
    return true;
  } else return false;
  
}
