"use client"

import Link from "next/link";
import styles from "./PostCard.module.css";
import { Post } from "@/types/Post";
import { getPostData } from "@/lib/posts";
import { useEffect, useState } from "react";

export const PostCard = ({postUrl}: {postUrl: Post}) => {

    const [post, setPost] = useState<Awaited<ReturnType<typeof getPostData>> | null>(null)

    useEffect(() => {
        const run = async () => {
            const p = await getPostData(postUrl);
            setPost(p);
        }
        run();
    }, [setPost])

    if(!post) {
        return <p>loading</p>
    }


    let preview = post.contentHtml.split(/<h[0-9]>/)[0];
    if(preview.trim() === "") preview = post.contentHtml.split(/<\/h[0.9]>/)[1]

    try {
        preview = preview.replaceAll(/<\/?[a-zA-Z0-9]*>/g, "").split(" ").slice(0, 50).join(" ").trim() + "...";
    } catch(e) {
        preview = "";
    }

    return <div className={styles.post}>
        <div className={styles.content}>
            <div className={styles.header}>
                {post.data.name && <h2>{post.data.name}</h2>}
                {post.data.author && <h3>{post.data.author}</h3>}
                <div className={styles.tags}>
                    {
                        post.data.tags && post.data.tags.map((tag: string) => <span key={tag} className={styles.tag}>
                            {tag}
                        </span>)
                    }
                </div>
            </div>
            <p>
                {preview}
            </p>
            <div className={styles.actions}>
                <Link href={`/post/${postUrl.split(".")[0]}`}>
                    <button>
                        More
                    </button>
                </Link>
            </div>
        </div>
    </div>
}
