# Foorbal.org GraphQL idea

This demo uses GraphQL to query footbal data from various open sources: footbal.org, wikipedia, twitter and youtube.

## Prerequisites

For all open data sources used in this demo, except for wikipedia, you need an api key. I do not cover extensively how to obtain a key but below I provide the links to sites with more info. Api keys are imported in data/api scripts at the top of the file. The key is passed in the header of request (using axios).

### Api key links

- footbal.org [key page](https://api.football-data.org/client/register)
- tweeter.com [create new app](https://apps.twitter.com/)
- youtube.com [how to create key](https://developers.google.com/youtube/v3/getting-started)
- wikipedia [main api page](https://www.mediawiki.org/wiki/API:Main_page)

## GraphQL training 1

First example is from [mpj youtube video](https://www.youtube.com/watch?v=lAJWHHUz8_8)

## GraphQL training 2

Second example is from [traversy media video](https://www.youtube.com/watch?v=e9Zxzr7sy60)

## Development

Main script is api.js. This is node app. You can start it with

```node
  node api.js
```

To start in development mode using nodemon use

```bash
  npm run dev
```
