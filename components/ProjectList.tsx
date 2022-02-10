import style from "./ProjectList.module.css"
import Project, { ProjectData } from "./Project"
import { useEffect, useState } from "react"
import axios from "../util/Axios";

const ProjectList = () => {
    const [projects, setProjects] = useState([] as Array<ProjectData>);
    const [projectIndex, setProjectIndex] = useState(0);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    })

    useEffect(()=>{
        //Thank you to the author of this service. The functionality to get a user's pinned repos does not exist in the github API.
        axios.get("https://gh-pinned-repos.egoist.sh/?username=kappabyte", {
            cache: {
                excludeFromCache: false
            }
        }).then(async repos => {
            for(const i in repos.data) {
                repos.data[i].tags = [];
            }
            setProjects(repos.data as Array<ProjectData>)
        })
        const onResize = () => {
            setWindowSize({
                width: document.body.clientWidth,
                height: document.body.clientHeight
            })
            if(projectIndex >= projects.length - (count + 1)) {
                let count = Math.floor(windowSize.width / 400);
                if(count > projects.length) count = projects.length;
                
                console.log(projectIndex - projects.length - (count + 1))
            }
        }
        onResize();
        window.addEventListener('resize', onResize)
    },[])

    let count = Math.floor(windowSize.width / 400);
    if(count > projects.length) count = projects.length;
    const width = (windowSize.width - 75)/count;

    return (
        <div className={style.projects}>
            <span className={style.back} onClick={() => {
                setProjectIndex(projectIndex > 0 ? projectIndex - 1 : projectIndex);
            }}>‹</span>
            <div>
                <div className={style["project-list"]} style={{gridTemplateColumns: `repeat(${count}, ${width}px)`, gridAutoColumns: `${width}px`, transform: `translateX(${-width * projectIndex}px)`}}>
                    {
                        projects.map((project, i) => <div key={project.repo}><Project project={project} /></div>)
                    }
                </div>
            </div>
            <span className={style.back} onClick={() => {
                console.log(`a: ${projects.length - (count)}`);
                console.log(`i: ${projectIndex}`)
                setProjectIndex(projectIndex <= projects.length - (count + 1) ? projectIndex + 1 : projectIndex);
            }}>›</span>
        </div>
    )
}

export default ProjectList;