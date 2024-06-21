import styles from "./ProjectGrid.module.css";
import { Projects } from "@/data/projects"
import { ProjectCard } from "./ProjectCard";

export const ProjectGrid = ({count}: {count?: number}) => {

    let projects = Object.values(Projects);
    if(count) projects = projects.slice(0, count);

    return <div className={styles["project-grid"]}>
        {projects.map(project => <ProjectCard key={project.name} project={project} />)}
    </div>
}
