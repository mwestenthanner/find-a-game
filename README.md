# find a game
## Filter Xbox Game Pass to find your preferred game.

With find a game, you can filter the current games on XGP by playtime, critic score and preferred genres.

## Tech Stack

The frontend is written in Vue 3 and Typescript. This is a serverless SPA with no backend stack. Instead, it's sitting on top of an Airtable base containing a part of the data, accessing the IGDB API for additional data. All serverless functions are executed in Netlify Functions.
