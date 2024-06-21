import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { Project } from "@/types/Project";

export const ProjectCard = ({project}: {project: Project}) => {
    return <div className={styles.project}>
        <div className={styles.img} style={{backgroundImage: `url(${project.images[0]}`}}/>
        <div className={styles.content}>
            <div className={styles.header}>
                <h2>{project.name}</h2>
                <div className={styles.tags}>
                    {
                        project.tags.map(tag => <span key={tag} className={styles.tag}>
                            {tag}
                        </span>)
                    }
                </div>
            </div>
            <p>
                {
                    project.description.short
                }
            </p>
            <div className={styles.actions}>
                <Link href={`/project/${project.filename}`}>
                    <button>
                        More
                    </button>
                </Link>
                {project.live && <Link href={project.live}><button>View</button></Link>}
                {project.source && <Link href={project.source}><button>Source</button></Link>}
            </div>
        </div>
    </div>
}
