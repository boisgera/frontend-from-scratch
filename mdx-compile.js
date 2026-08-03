#!/usr/bin/env bun
import { compile } from '@mdx-js/mdx'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax'

const [input, output] = Bun.argv.slice(2)
const source = await Bun.file(input).text()
const result = await compile(source, {
  jsx: true,
  jsxImportSource: 'https://esm.sh/react',
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeMathJax],
  outputFormat: 'program',
})
await Bun.write(output ?? input.replace(/\.mdx$/, '.tsx'), String(result))