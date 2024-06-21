import * as fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';
import remarkPrism from "remark-prism";

export default async ({params}: {params: {id: string}}) => {

    const post = await getPostData(params.id + ".md");

    return <main>
        {post.data.name && <h1>{post.data.name}</h1>}
        {post.data.author && <h2>{post.data.author}</h2>}
        {post.data.date && <i>{post.data.date}</i>}
        <div dangerouslySetInnerHTML={{__html: post.contentHtml}} />
    </main>
}

export async function getPostData(id: string) {
  const data = fs.readFileSync(`public/posts/${id}`);

  const matterResult = matter(data);

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
