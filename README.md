
 1. Create a "Hello frontend!" `index.html` file with no JS
    and a (de-facto) standard `head` (thanks LLMs!)

 2. Add the appropriate `link` to make firefox complaining about the lack
    of favicon.

 3. Add a `main.js` file that displays a message in the console,
    install it as a ES module (deferred) in the HTML file.

 4. Make the `main.js` transform the message in the HTML file
    (for "Hello frontend ! (from JS)")

 5. Make the `main.js` file do the same thing with React (but "(from React)").
    To do this, I import `react` and `react-dom` from `esm.sh`, hardcoding this
    use in my js file. I don't "need" JSX yet since my `App` component
    (simple function) returns a text, no tags.

    Why the harcoding? I could use names to refer to the modules and provide 
    an import map, it woud be cleaner. Actually I should do that since at
    the "sources are JS" stage, afaict, VS Code doesn't check at all what
    the imports are or what they contain: it provides me with little service
    BUT at least doesn't complain.

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

    TODO: solve the shitty annotations that VS Code is giving me for what
    is perfectly fine civet code. Configure ts settings I get (???
    have a look at what the VS code civet plugin actually needs/uses)

    OK, at this stage, this is tsc (Typescript compiler) stuff, integrated
    into VS Code.
    And it does not understand "https://..." ESM stuff by default.

    If I go the "import map" route, I have to:
      - rewrite the imports in the source
      - write the import map
      - insert the import maps into the HTML file during the build.
        That could be done with esbuild and esbuild-plugin-import-map. 
      - "make VS code aware" of the import maps (directly or through a 
        classic "build system" it knows of?)

   Shit, to get some intellisense I need some types and even though these
   types exist with esm.sh no build system (but Deno) knows how to use
   them ... So that's too much, I need to install some stuff locally at
   the very least to provide the types.

   NAH, at this stage this would be a major complexity issue, 
   instead I am using `// @ts-nocheck` at the top of every civet file.

 9. Markdown stuff. Meow ... I need a CLI compiler but it does not exist.
    OK, I can wrap a single-file compiler using the JS API with Bun
    (not Node afaict since I have no "node project" and I can't get 
    the `@mdx-js/mdx` dep installed in a cache/tmp dir).
    Then unfortunately I have to tweak the options a bit to get the
    imports it uses in the generated file using ESM raw http:// paths.

10. MDX. Define a "Warning" React component, use it in a MDX file that
    is integrated into a larger component. OK, easy peasy!

11. MathJax works pretty well if we adapt our bun script that compiles
    MDX files. (It generates SVG out of the box).

    However, the VS Code MDX plugin support doesn't grok our math expression,
    and any attempt to configure it in our `tsconfig.json` will fail since
    VS Code trying to resolve the plugins assuming that this stuff is 
    installed in node_modules.

    OK, fuck that, there are too many thing that assume that at least dev
    tool are installed in node_modules, I am going to `bun add -d` what I
    need (`remark-math` and `rehype-mathjax` ... aaah and `@mdx-js/mdx` too)

   I am accepting that I need stuff installed for Bun (or Node, whatever),
   BUT ONLY FOR BUILD TOOLS. I am *not* installing anything that will be
   shipped for my HTML inside node_modules, still going for online ESM
   stuff.

12. Make a React `Button` component, styled with inline styles, 
    use it somewhere. Arf, if I need fonts I am going to have to reach
    for CSS? Nah, hard-coded imports in the HTML head is good enough.

13. ~~Use vanilla-extract for the button.~~ NAH, let's try emotion/css first
    That suits my tastes and there is no magic. This is really nice!

14. Global styles with emotion

15. Insert a TLDRaw canvas. Shit I have a nasty case of double instance of
    React (well, **maybe** that's the issue), so I turn my all my shit into
    source maps and drop the "raw" imports from my source files.

    Jeez there are some licensing issues, I was not expecting that.
    Try with excalidraw?

16. Tried static generation of MDX file. But they have import, that need
    https access (to esm.sh), so to prerender with Node I would need to
    install a resolve hook that replaces such import with a local one...
    At the end of the day, much more complex, I'd better go for everything
    in node_modules. At least I am going to see if I can serve dependencies
    out of node_modules directly and not bundle everything (which means
    that I lose completely the transparency on the build process).

17. Gone to use of node_modules bundling with esbuild. It it slightly
    more complex than the standard approach because I insist on NOT
    bundling my code (for transparency and troubleshooting), only my
    dependencies.

    OK, I am in the SSR generation at the stage where I generate some
    "raw" HTML for each page, with no headers, no emotion styling, 
    no font information, etc.

    I am also at a point where I need to reorganize everything a bit,
    since I need to make my own scripts (components, etc) available
    for the MDX pages.

    The static rendered stuff is meant to drive everything, while the
    stuff in src is merely "library stuff".

    So maybe it's time to start a `pages` folder and work from there,
    specifically with MDX pages only? Also if everything is generated,
    including index.html the root, that changes the stuff a bit.
    (more than a bit actually)

    Yeah, remove index.html, make pages, make custom build for the pages
    stuff specifically (refactor build), adapt serve, etc.
    Also, `main.js` is dead. Rename `src` as `components` (mmm dunno,
    there are other stuff there)

18. At the end of the day, I go for a single hierarchy with .civet code and
    .mdx pages. So I can either "co-localize" content and code or not, 
    there is no rigid convention

19. Long/hard : work our a components and pages split, with mdx in pages
    that use hard links and therefore automatically follow a MPA / 
    "file-based routing" scheme. But I need to statically generate them
    + insert (optional, for non-static stuff) hydration code, emotion cache 
    then needs to be handled, etc.

    Done: static, hydration and client-side rendering (all MPA)

20. React Three fiber components.

21. Beautiful Mermaid.

22. TOC stuff

23. Beginning of a design system (some design tokens) in styles.civet.




  - Smart (auto-locating) TOC for MDX, see e.g. https://blog.n.ichol.ai/packaging-latent-reasoning-as-a-real-model#two-knobs-worth-understanding

    Try it with stuff that is fully static first?
 
  - Shiki coloring from MDX

  - Code editors, not merely displays.

  - Embed Strudel?

  - Framer/Motion stuff (try background with SVG anim and mouse tracking)

  - React Flow stuff

  - Tldraw React component (not open-source :() or excalidraw

  - Marimo React component

  - Pagefind Stuff?
  
  - Try Microlighter: https://daverupert.com/2026/08/microlighter/