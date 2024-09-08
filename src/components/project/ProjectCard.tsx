"use client"

import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { useEffect, useState } from "react";
import { getProjectData } from "@/lib/client/projects";

export const ProjectCard = ({projectUrl}: {projectUrl: `${string}.md`}) => {
    const [project, setProject] = useState<Awaited<ReturnType<typeof getProjectData>> | null>(null)

    useEffect(() => {
        const run = async () => {
            const p = await getProjectData(projectUrl);
            setProject(p);
        }
        run();
    }, [setProject, projectUrl])

    if(!project) {
        return <p>loading</p>
    }

    return <div className={styles.project}>
        <div className={styles.img} style={{backgroundImage: `url(${project.data.images[0]}`}}/>
        <div className={styles.content}>
            <div className={styles.header}>
                <h2>{project.data.name}</h2>
            </div>
            <div className={styles.tags}>
                {
                    project.data.tags.map((tag: string) => <span key={tag} className={styles.tag}>
                        {tag}
                    </span>)
                }
            </div>
            <p>
                {
                    project.data.description
                }
            </p>
        </div>
        <div className={styles.actions}>
            <Link href={`/project/${projectUrl.replaceAll(".md", "")}`}>
                <button>
                    More
                </button>
            </Link>
        </div>
    </div>
}
