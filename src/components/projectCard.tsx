const ProjectCard = (props: any) => {
    return <> 
        <a href={props.link}>
            <div className="project">
                <h2>{props.title}</h2>
                <img src={props.image} alt=""/>
                <p>{props.description}</p>
            </div>
        </a>
    </>
}

export default ProjectCard;