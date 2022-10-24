This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## App description

This is a web app created using next js, typescript, chakra-ui, styled-components and sqlite as database.
Prisma, whic is an open-source ORM for Node.js and TypeScript, is used as the database access tool. It connects to the dev.db sqlite file and automatically migrates the database and creates table based on model definitions found in prisma/schema.prisma.

### What does this app do?

This app is made to edit, add, remove, search and filter data found in datasett.csv json, as well as presenting some overall statistics about the data. It also creates a heatmap using google maps API based on the geo locations found in the dataset, but this needs some optimization and is currently disabled as it requires a google API key.

Enable it by uncommenting the <LoadScript> tag in \_app.tsx, add your own google API key and visit [http://localhost:3000/map](http://localhost/map). Then you need to toggle the heatmap after data has loaded.

## How to run

First, install all dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## API endpoints

Following API endpoints are available in the app:

### GET

```
/api/v1/userdata/list?page={1}?pagecount={50}
/api/v1/userdata/stats
/api/v1/userdata/{userId}
/api/v1/userdata/locations
/api/v1/userdata/search?filter=['firstName' | 'lastName' | 'age' | 'city']&query=text
```

### POST

```
/api/v1/userdata/update
/api/v1/userdata/remove
/api/v1/userdata/create
```

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/v1/stats).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Prisma Studio

```
npx prisma studio
```

## How the database is populated

imported CSV file into SQLite database through sqlite studio
