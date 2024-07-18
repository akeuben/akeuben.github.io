import styles from "./ProjectGrid.module.css";
import { ProjectCard } from "./ProjectCard";
import { GetProjects } from "@/lib/server/projects";

export const ProjectGrid = ({count}: {count?: number}) => {

    let files = GetProjects();
    if(count) files = files.slice(0, count);

    return <div className={styles["project-grid"]}>
        {
            files.map(file => <ProjectCard key={file.toString()} projectUrl={file.toString() as `${string}.md`} />)
        }
    </div>
}
