#!/usr/bin/env bun
import { compile } from '@mdx-js/mdx'

const [input, output] = Bun.argv.slice(2)
const source = await Bun.file(input).text()
const result = await compile(source, {
  jsx: true,
  jsxImportSource: 'https://esm.sh/react',
  outputFormat: 'program',
})
await Bun.write(output ?? input.replace(/\.mdx$/, '.tsx'), String(result))