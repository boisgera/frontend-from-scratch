

 1. Create a "Hello frontend!" `index.html` file with no JS
    and a (de-facto) standard `head` (thanks LLMs!)

 2. Add the appropriate `link` to make firefox complaining about the lack
    of favicon.

 3. Add a `main.js` file that displays a message in the console,
    install it as a module (deferred) in the HTML file.
  
 4. Make the `main.js` transform the message in the HTML file
    (for "Hello frontend ! (from JS)")

 5. Make the `main.js` file do the same thing with React (but "(from React)").
    To do this, I import `react` and `react-dom` from `esm.sh`, hardcoding this
    use in my js file. I don't "need" JSX yet since my `App` component
    (simple function) returns a text, no tags.

 6. I could write a slightly more complex document in HTML using
   `React.createElement` but that's painful. I immediately switch to
   `.jsx` and create a small `App` component with `<h1>` and `<p>` tags,
   then convert it to js using `esbuild` (via `npx`). Note that I generate
   a `main.js` so my import of that in the HTML is already present
   (and the `main.js` is visible if I want to import it).

TODO: 
  - split the main jsx file, organize the stuff a bit into a src folder. 
  - vendor the react ESM libs?
  - replace jsx with civet.
  - MDX stuff