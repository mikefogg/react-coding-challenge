## React Coding Challenge - Help.com

### Running The Challenge Locally

```bash
$ cd /your/cloned/directory
$ yarn install # Or $ npm install
$ yarn start # Or $ npm start
```
Your app should be running at http://localhost:3000

### Running tests

```bash
$ cd /your/cloned/directory
$ yarn test # Or $ npm test
```

### Notes

#### Notes:

- I decided at the beginning to setup a basic theme using ThemeProvider from Material UI, which honestly ended up causing tons of problems when it came down to testing. Apparently there's a bit of an issue currently with the state of functional components, enzyme, and wrapping the base component in a `<ThemeProvider/>`. Not to mention, you're unable to use anything like `setState` in your tests when using a functional component. Sigh.

#### TODO:

- Responsive: The next thing I'd do here is make sure it works well responsively. My initial thought was that the columns would grow too far if they were layered vertically, so the solution would be a bit more involved with something like a Toolbar toggling between the three options.
