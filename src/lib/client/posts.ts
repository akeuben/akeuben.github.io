import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";

export async function getPostData(id: string) {
  const data = await fetch(`/posts/${id}`);
  const text = await data.text();

  const matterResult = matter(text);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    data: matterResult.data,
  };
}
