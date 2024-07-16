import styles from "./page.module.css";
import { GetPosts } from "@/lib/server/posts";
import * as fs from "fs";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Metadata, ResolvingMetadata } from "next";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

export async function generateMetadata({params}: any, parent: ResolvingMetadata): Promise<Metadata> {
    const parentData = await parent;

    const post = await getPostData(params.id + ".md");
    
    const title = `${post.data.name || "Post"} | ${parentData.title?.absolute}`;
    const preview = (/<p>(.*?)<\/p>/g.exec(post.contentHtml) || ["", undefined])[1];

    
    return {
        title: title,
        description: preview,
        openGraph: {
            type: "article",
            title: title,
            description: preview,
            authors: post.data.author,
            publishedTime: post.data.date
        }
    }
}

export default async function PostPage({params}: {params: {id: string}}) {

    const post = await getPostData(params.id + ".md");

    return <main className={styles.page}>
        {post.data.name && <h1 className={styles.titleLine}>{post.data.name}</h1>}
        <h2 className={styles.authorLine}>
        {post.data.author && <span>{post.data.author}</span>}
        {post.data.author && post.data.date && <span>&bull;</span>}
        {post.data.date && <span>{post.data.date}</span>}
        </h2>
        <div dangerouslySetInnerHTML={{__html: post.contentHtml}} />
    </main>
}

async function getPostData(id: string) {
  const data = fs.readFileSync(`public/posts/${id}`);

  const matterResult = matter(data);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
        keepBackground: false
    })
    .use(rehypeMathjax, {
        svg: {
            scale: 1,
            displayAlign: "center"
        }
    })
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    data: matterResult.data,
  };
}

export async function generateStaticParams() {
    const posts = GetPosts() as string[];
 
    const result = posts.map((post) => ({
        id: post.replaceAll(".md", ""),
    }))

    return result;
}
