import { GetPosts } from "@/lib/server/posts";
import { PostCard } from "./PostCard";
import styles from "./PostGrid.module.css";

export const PostGrid = ({count}: {count?: number}) => {

    let files = GetPosts();
    if(count) files = files.slice(0, count);

    return <div className={styles["post-grid"]}>
        {
            files.map(file => <PostCard key={file.toString()} postUrl={file.toString() as `${string}.md`} />)
        }
    </div>
}
