import React from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

console.log("Hello console!");

console.log(React);

console.log(createRoot);

document.body.innerHTML = "Hello frontend! (from JS)";

const root = createRoot(document.body);

function App() {
  return (
    <>
      <h1>React App</h1>
      <p>Hello frontend! (from React)</p>
    </>
  )
}

root.render(App());