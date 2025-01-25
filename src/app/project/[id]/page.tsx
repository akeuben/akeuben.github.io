import styles from "./page.module.css";
import contentStyles from "@/styles/content.module.css";
import { GetProjects } from "@/lib/server/projects";
import { Metadata, ResolvingMetadata } from "next";
import ScrollArrow from "@/components/visual/ScrollArrow";
import { renderMarkdownFile } from "@/lib/server/markdown";

export async function generateMetadata({params}: any, parent: ResolvingMetadata): Promise<Metadata> {
    const parentData = await parent;

    const project = await renderMarkdownFile(`projects/${params.id}`);
    
    const title = `${project.metadata.name || "Post"} | ${parentData.title?.absolute}`;
    
    return {
        title: title,
        description: project.metadata.description,
        openGraph: {
            type: "website",
            title: title,
            description: project.metadata.description,
        }
    }
}

export default async function ProjectPage({params}: {params: {id: string}}) {

    const project = await renderMarkdownFile(`projects/${params.id}`);

    return <>
        <div className={styles.hero}>
            <div className={styles.background} style={{backgroundImage: `url(${project.metadata.images[0]})`}} />
            <div className={styles.projectCard}>
                <h1>{project.metadata.name}</h1>
                <div className={styles.tags}>
                    {
                        project.metadata.tags.map((tag: string) => <span key={tag} className={styles.tag}>
                            {tag}
                        </span>)
                    }
                </div>
                <p>{project.metadata.description}</p>
                <div className={styles.links}>
                    {
                        Object.keys(project.metadata.links).map(title => <a key={title} href={project.metadata.links[title]}><button>{title}</button></a>)
                    }
                </div>
                <ScrollArrow />
            </div>
        </div>
        <main>
            <h1 className={styles.title}>{project.metadata.name}</h1>
            <div className={contentStyles.content}>
                {
                    project.content
                }
            </div>
        </main>
    </>
}

export async function generateStaticParams() {
    const projects = GetProjects() as string[];
 
    const result = projects.map((project) => ({
        id: project.replaceAll(".md", ""),
    }))

    return result;
}
