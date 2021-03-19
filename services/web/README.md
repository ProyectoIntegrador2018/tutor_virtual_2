## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder structure

These are some relevant pointers to understand the folder structure of the web project.

- `components/`
  Every component must be a folder and export the main component from an index.tsx file.
  Any additional components used in a given component can be placed inside the main component folder in
  similar fashion.

  - `elements/`
    Every _atomic_ component should be here. For example, a custom button, a custom input, a card, etc.
    These components are the basic building blocks of every other component.
  - `layouts/`
    Layouts are components that wrap a page content with some navigation/header/footer etc.
  - `modules/`
    These are components that can be reused amongst pages but are not small enough to be considered an element.
    For example, a form to create/edit a student, a widget that displays information about a certain course, etc.
  - `contents/`
    These are the components that mashes everything together and create the content of a page. These components
    are usually composed of `elements`, `modules` and any extra component local to the content of a page.
    **Layouts should not be included here.**

- `pages/`
  These folder is strictly used for routing as per NextJS. Only `layouts` and `contents` should be placed
  inside a page.

## Additional Info

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
