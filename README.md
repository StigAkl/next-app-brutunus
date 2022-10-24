This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What does this app do?

This web application presents and allows to filter / search the data found in root/datasett.csv.

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
[/api/v1/userdata/list?page={1}?pagecount={50}]()
[/api/v1/userdata/list?page={1}?pagecount={50}]()
[/api/v1/userdata/list?page={1}?pagecount={50}]()
[/api/v1/userdata/list?page={1}?pagecount={50}]()
[/api/v1/userdata/list?page={1}?pagecount={50}]()
```

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma Studio

```
npx prisma studio
```

## How the database is populated

imported CSV file into SQLite database through sqlite studio
