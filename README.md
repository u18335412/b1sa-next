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

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Testing

Unit test are written using [React Testing Library](https://testing-library.com/docs/) and [Vitest](https://vitest.dev/) as the test runner.

To run the test use `yarn test` on the terminal.

## Bonus

The app has been deployed to vercel [Vercel](https://b1sa-next.vercel.app/), you can use the link to test or via local server.
Added debouncing to validating user input on the puzzle solver, to allow the user some buffer time to full type the number word and to not validate on every key stroke.
