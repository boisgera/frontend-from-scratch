

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
   NOTE: at this step I have a `build`!

 7. Split the `main.jsx` into a main and an `app.jsx` file, 
    put eveything inside a `src` folder, adjust the `build` 
    and HTML file accordingly.

 8. Replace `app.jsx` and `main.js` with `civet` files, 
    adjust the build accordingly. Use the occasion to keep `src` clean
    and copy everything into `dist` dir. Add this into `.gitignore`
    Note: the Civet compiler can turn ".civet" files into ".ts" or
    even ".js" but any uninterpreted JSX syntax will remain.
    So I am actually turning `.civet` files into `.tsx` file with
    the Civet compiler and then using `esbuild` to generate the 
    `js` files (with JSX translated to the React JS API).
    -> update the build script.

TODO: 

  - replace jsx with civet.
  - MDX stuff
  - StyleX stuff
  - tree shaking with esbuild