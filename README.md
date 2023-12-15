# Hedgehog Code Test

A NextJS app with a user registration, login, and dashboard where users can add and delete users (but not themselves).Typescript is used throughout.

CSS is written using styled-components as well as CSS variables in the app.css file for ease of use. Flexbox was used with a couple of media queries, and the page is suitably responsive.

Validation of form inputs takes place on the front end using react-hook-form, and toasts serve errors from the backend using react-toastify. Sometimes preference was taken to show one type of error over the other, in the interest of good UX.

Some effort was made to make the app accessible, such as by using aria-labels on inputs and 'role={h1}' on headings.

No state-management library was used as it seemed unnecessary for this project.

## Packages

- React Hook Form - https://react-hook-form.com/
- React Icons - https://react-icons.github.io/react-icons/
- React Toastify - https://www.npmjs.com/package/react-toastify

## Routes in order of user flow

A user should be able to Register and be sent to the Login screen where they can log in and be sent to the Dashboard.

- /: Registration Page
- /login: Login Page
- /dashboard: Dashboard page

They should also be able to log out.

A user should be able to navigate between pages if there is data on those pages. If a user is on a page with one item, and deletes the item, they get sent back a page. If they are on a page with the current max items and they add an item, they will get sent forwards a page.

## Improvements

- The auth token is currently in localStorage; it would be preferable if it were managed by ReactContext.
- Some of the Typescript can be improved.
- There are some unexpected CSS styling behaviours on Registration/Login screen at uncommon sizes. This only really appears to be a minor issue on Surface Duo devices.
- Accessibility can be improved by using more aria-labels and 'role' tags, as well as by potentially increasing the contrast between black/grey colours.
- For easier client-side data management, react-query could be used. This has the added benefit of having many useful in-built methods for fetching and mutating data.
- A hook such as useMemo could be used for the memoization of the list of users, but seemed unnecessary for the performance of the dashboard currently.
- Greater security can be inforced by updating the Input register() methods to, for example, require minimum password lengths and special characters.
- Saved user inputs could be truncated when they are too long.
- The page_length param could be controlled by user input instead of using the backend default.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
