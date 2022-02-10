import { setup } from 'axios-cache-adapter'
import style from "./Project.module.css"

export type ProjectData = {
    owner: string,
    repo: string,
    link: string,
    tags: string[],
    description?: string,
    image?: string,
    website?: string,
    language?: string,
    languageColor?: string,
    stars: number,
    forks: number,
}

const axios = setup({

});

const Project = (props: {project: ProjectData}) => {
    return (
        <div className={style.project}>
            <img src={props.project.image ? props.project.image : `/assets/textures/project_image.png`} />
            <h1>{props.project.repo}</h1>
            <p>{props.project.description ? props.project.description : "No project description provided."}</p>
            <a href={props.project.link}><button>Project Page</button></a>
        </div>
    )
}

export default Project;