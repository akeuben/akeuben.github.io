import styles from "./page.module.css";
import contentStyles from "@/styles/content.module.css";
import { GetPosts } from "@/lib/server/posts";
import { Metadata, ResolvingMetadata } from "next";
import { renderMarkdownFile } from "@/lib/server/markdown";

export async function generateMetadata({params}: any, parent: ResolvingMetadata): Promise<Metadata> {
    const parentData = await parent;

    const post = await renderMarkdownFile(`posts/${params.id}`);
    
    const title = `${post.metadata.name || "Post"} | ${parentData.title?.absolute}`;
    
    return {
        title: title,
        openGraph: {
            type: "article",
            title: title,
            authors: post.metadata.author,
            publishedTime: post.metadata.date
        }
    }
}

export default async function PostPage({params}: {params: {id: string}}) {
    const post = await renderMarkdownFile(`posts/${params.id}`);

    return <main className={styles.page} suppressHydrationWarning>
        {post.metadata.name && <h1 className={styles.titleLine}>{post.metadata.name}</h1>}
        <h2 className={styles.authorLine}>
        {post.metadata.author && <span>{post.metadata.author}</span>}
        {post.metadata.author && post.metadata.date && <span>&bull;</span>}
        {post.metadata.date && <span>{post.metadata.date}</span>}
        </h2>
        <div className={contentStyles.content}>
            {
                post.content
            }
        </div>
    </main>
}

export async function generateStaticParams() {
    const posts = GetPosts() as string[];
 
    const result = posts.map((post) => ({
        id: post.replaceAll(".md", ""),
    }))

    return result;
}
