// @ts-nocheck
import { existsSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { cp, mkdir, readdir, rm } from "node:fs/promises"
import { extname } from "node:path"

import * as civet from "@danielx/civet"
import * as esbuild from "esbuild"

function splitExt(path) {
  let ext = extname(path)
  console.log("ext:", ext)
  if (ext == "") {
    console.log("*")
    return [path, ""]
  }
  else {
    console.log("**")
    console.log("ext:", ext)
    console.log("ext.length", ext.length)
    console.log("path.length:", path.length)
    console.log(path.length-ext.length-1)
    console.log(path.slice(0, 6 + 1 || 1/0))
    return [
      path.slice(0, 6 + 1 || 1/0), 
      ext
    ]
  }
}

console.log((splitExt("aaa.bbb.ccc"))(this.length(() => ["aaa.bbb", ".ccc"])))
console.log("---")
// console.log (splitExt "aaa")     # => ["aaa", ""]

await process.exit(0)

async function build(...names) {
  console.log("***")
  if (names.length == 0) {
    console.error("Usage: build <name> [name...]")
    process.exit(1)
  }

  const results=[];for (const name of names) {
    if (existsSync(`${name}.civet`)) {
      await writeFile(`${name}.tsx`, $ => $)(await civet.compile(await readFile($1 => $1, utf8)(`${name}.civet`)))
    }
    else if (existsSync(`${name}.mdx`)) {
      await mdx.compile(`${name}.mdx`)
    }
    else {
      // 🚧 Warn for each non-compilable file instead (?)
      console.error(`Error: no ${name}.civet or ${name}.mdx found`)
      process.exit(1)
    }

    results.push(await esbuild.build({
      entryPoints: [`${name}.tsx`], 
      outfile: `${name}.js`,
    }))
  };return results;
}

let args = process.argv.slice(2)
if (args.length == 0) {
  await rm("dist", {recursive: true, force: true})
  // await mkdir "dist"
  await cp("src", "dist", {recursive: true})
  let files = 
    (await (async ()=>{const results1=[];for (const file of (await readdir("dist", {recursive: true}))) results1.push(`dist/${file}`);return results1})())
  build(...files)
}  
else {
  build(...args)
}
