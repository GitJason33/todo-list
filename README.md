# intro

this is my todo list project. I am GitJason33.

## database

using PostgreSQL database, I have 2 tables:
- users(id, name, email, password, created_at)
- tasks(id, title, description, due_date, done, priority, user_id)

## API

using Nodejs with Expressjs, I made a REST API with the routes:
- /api/user:
  1. GET  /info (load information based on session or cookie)
  2. POST /login (login a user)
  3. POST /register (create a new user)

- /api/task:
  1. GET  /all      (get all user todos, includes pagination)
  2. GET  /:id      (get a specific user todo)
  3. POST /         (create a new user todo)
  4. PUT  /done/:id (mark a todo as done)
  5. PUT  /:id      (edit an existing user todo)
  6. DEL  /:id      (delete an existing user todo)

also made a middleware for API key checking.


## vite configurations in the react project

- added the file [jsconfig.json] with configs to use an import alias "@" like nextjs, 
  so we can import files from `/src` folder using this example: 
  `import "@/styles/globals.scss";`
  also, modified [vite.config.js] to assure these changes works by adding: 
  `resolve: { alias: "@" }`

- I am using both tailwind and SCSS in this project. I installed 4 packages for that: 
  [sass], [tailwindcss], [postcss] and [autoprefixer] then I init using command: 
  `npx init tailwindcss -p`


## nextjs readme

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## deploying postgreSQL on render

1. it's a little complicated to do so, but first of all you must have a web service 
(mostly an API) and create a postgresql database in render, both on same region 
(example frankfurt)

2. the postgresql database should be renewed every 89 days to remain free.

3. postgresql is accessible through a client like pgadmin4 by using external
connection string and seperate the hostname, password, db from it. 
in pgadmin, register a new server by right clicking on [servers] tab, and 
then fill the infos required as so.

4. then you can manually manipulate data and see the database on your pc

5. in nodejs, you will need a package like [pg] in order to establish a connection
using the internal connection string provided by render. the configs must be like so:
```
const db_pool = new Pool({
  connectionString: "...",
})
```

6. and voila, thats it.