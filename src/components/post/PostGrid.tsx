import { PostCard } from "./PostCard";
import styles from "./PostGrid.module.css";
import * as fs from 'fs';

export const PostGrid = ({count}: {count?: number}) => {

    let files = fs.readdirSync("public/posts/", {
        recursive: true
    });

    const creationDate: Record<string, Date> = {};

    files.forEach(file => creationDate[file.toString()] = fs.statSync(`public/posts/${file}`).birthtime)

    files = files.sort((a, b) => creationDate[b.toString()].getTime() - creationDate[a.toString()].getTime());

    console.log(files)

    return <div className={styles["post-grid"]}>
        {
            files.map(file => <PostCard key={file.toString()} postUrl={file.toString() as `${string}.md`} />)
        }
    </div>
}
