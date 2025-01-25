import remarkCallout from '@r4ai/remark-callout';
import * as fs from 'fs';
import matter from 'gray-matter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeReact from 'rehype-react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { Counter } from '@/components/post/components/Counter';
import rehypeRaw from 'rehype-raw';
import rehypeMathJaxSvg from 'rehype-mathjax';
import { TuringMachine } from '@/components/post/components/TuringMachine';

async function rehypeMath() {
  const plugin = rehypeMathJaxSvg({ svg: { scale: 1 } });
  return () => (tree: import("hast").Root) => {
    plugin(tree);

    // If the last added child in the tree is a stylesheet containing 'mjx-container',
    // remove it. It causes Next.js hydration errors.
    //
    // Workaround for https://github.com/remarkjs/remark-math/issues/80.
    const lastChild = tree.children[tree.children.length - 1];
    if (lastChild.type === "element" && lastChild.tagName === "style") {
      const content = lastChild.children[0];

      // Make sure that this is a Mathjax related stylesheet before removing it.
      const isMathjaxStylesheet =
        content.type === "text" && content.value.includes("mjx-container");
      if (isMathjaxStylesheet) {
        tree.children.pop(); // Remove!
      }
    }
  };
}

export async function renderMarkdownFile(path: string) {
  const data = fs.readFileSync(`public/${path}.md`);

  const matterResult = matter(data);

  const processedContent = await unified()
    .use(remarkParse, {
        blocks: ["turing-machine"]
    })
    .use(remarkCallout)
    .use(remarkMath)
    .use(remarkRehype, {allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(await rehypeMath())
    .use(rehypePrettyCode, {
        keepBackground: false
    })
    .use(rehypeStringify)
    // @ts-ignore
    .use(rehypeReact, {
        Fragment: Fragment,
        jsx: jsx,
        jsxs: jsxs,
        components: {
            "counter": Counter,
            "turing-machine": TuringMachine
        }
    })
    .process(matterResult.content);

  return {
    content: processedContent.result,
    metadata: matterResult.data,
  };
}
