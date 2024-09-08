import remarkCallout from '@r4ai/remark-callout';
import * as fs from 'fs';
import matter from 'gray-matter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeMathjax from "rehype-mathjax";
import rehypeRaw from 'rehype-raw';

export async function renderMarkdownFile(path: string) {
  const data = fs.readFileSync(`public/${path}.md`);

  const matterResult = matter(data);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkCallout)
    .use(remarkMath)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypePrettyCode, {
        keepBackground: false
    })
    .use(rehypeMathjax, {
        svg: {
            scale: 1,
            displayAlign: "center"
        }
    })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const content = processedContent.toString();

  return {
    content,
    metadata: matterResult.data,
  };
}
