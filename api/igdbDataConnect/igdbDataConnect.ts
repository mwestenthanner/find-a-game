import { schedule } from '@netlify/functions';
import fetch from "node-fetch";
import Airtable from 'airtable';
import 'dotenv/config';

const handler = async function() {

    await setAirtableData();

    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("@weekly", handler);

async function getIgdbGameData(ids: Array<number>) {

    const {IGDB_CLIENT_ID, IGDB_API_KEY } = process.env;
  
    const igdbEndpoint = 'https://api.igdb.com/v4/games';
    const idsString = '(' + ids.join() + ')'
    const raw = 'fields cover,summary,aggregated_rating,genres; where id = ' + idsString + ';';
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Client-ID': IGDB_CLIENT_ID,
        'Authorization': 'Bearer ' + IGDB_API_KEY,
        'Content-Type': 'text/plain'
      },
      body: raw
    };
  
    const response = await fetch(igdbEndpoint, requestOptions);

    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(response);
    }
  
}

async function getIgdbCover(coverId: number) {

    const {IGDB_CLIENT_ID, IGDB_API_KEY } = process.env;
  
    const igdbEndpoint = 'https://api.igdb.com/v4/covers';
  
    const raw = 'fields image_id; where id = ' + coverId + ';';
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Client-ID': IGDB_CLIENT_ID,
        'Authorization': 'Bearer ' + IGDB_API_KEY,
        'Content-Type': 'text/plain'
      },
      body: raw
    };
  
    const response = await fetch(igdbEndpoint, requestOptions);
    return await response.json();
  
}

async function getIgdbGenres(genres: Array<number>) {

    if (genres == undefined) {
        return [];
    }

    const genreString = "(" + genres.join() + ")";
    const igdbEndpoint = 'https://api.igdb.com/v4/genres';
    const {IGDB_CLIENT_ID, IGDB_API_KEY } = process.env;
  
    const raw = 'fields name; where id = ' + genreString + ';';

    const requestOptions = {
        method: 'POST',
        headers: {
          'Client-ID': IGDB_CLIENT_ID,
          'Authorization': 'Bearer ' + IGDB_API_KEY,
          'Content-Type': 'text/plain'
        },
        body: raw
      };
    
      const response = await fetch(igdbEndpoint, requestOptions);
      return await response.json();

}

async function getIgdbGameID(name: string) {

    const {IGDB_CLIENT_ID, IGDB_API_KEY } = process.env;
  
    const igdbEndpoint = 'https://api.igdb.com/v4/games';
    const raw = 'fields id; where name = "' + name + '";';
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Client-ID': IGDB_CLIENT_ID,
        'Authorization': 'Bearer ' + IGDB_API_KEY,
        'Content-Type': 'text/plain'
      },
      body: raw
    };
  
    const response = await fetch(igdbEndpoint, requestOptions);
    return await response.json();

}

function parseCoverUrl(imageId: string) {
    return 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + imageId + '.png'
}

function parseGenres(genreData: Array<unknown>) {

    // [{"id":11,"name":"Real Time Strategy (RTS)"},{"id":15,"name":"Strategy"}]
    const genres = [];

    genreData.forEach(element => {
        genres.push(element['name']);
    });

    return genres;

}

async function setAirtableData() {

    const {AIRTABLE_BASE_ID, AIRTABLE_API_KEY } = process.env;

    const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);
    const table = base('v2');

    
    const records = await table.select(({
        fields: ['IGDB-ID'],
        filterByFormula: 'IF({Image} = BLANK(), TRUE(), FALSE())',
        maxRecords: 5,
        sort: [{field: "Game", direction: "asc"}]
    })).all();

    const airtableData = records.map( record => {
        return {
          id: record.getId(),
          igdbId: record.get('IGDB-ID')
        }
      });

    // pull IDs get game data for all
    const igdbIds = [];
    airtableData.forEach(record => {
        igdbIds.push(record.igdbId);
    });

    const gameData = await getIgdbGameData(igdbIds) as Record<string, unknown>;

    const gameDataArray = [];

    for (const entry of Object.entries(gameData)) {

        const gameId = entry[1]['id'];
        const coverId = await getIgdbCover(entry[1]['cover']);
        const coverUrl = parseCoverUrl(coverId[0]['image_id']);
        const genreData = await getIgdbGenres(entry[1]['genres']);
        const genres = parseGenres(genreData as Array<unknown>);
        const summary = entry[1]['summary'];
        const rating = entry[1]['aggregated_rating'] ?? 0;

        const obj = {
            'id': gameId,
            'cover': coverUrl,
            'genres': genres,
            'summary': summary,
            'rating': rating
        };

        gameDataArray.push(obj);

    }

    airtableData.forEach(async record => {

        // find matching entry in gameDataArray
        const updateData = gameDataArray.find(entry => entry['id'] == record['igdbId'])

        // write IGDB ID to Airtable
        table.update([
            {
              "id": record.id,
              "fields": {
                    'Image': updateData.cover,
                    'Description': updateData.summary,
                    'Genres': updateData.genres,
                    'Score': updateData.rating
              }
            }
        ], {typecast: true}) 

    })

}

