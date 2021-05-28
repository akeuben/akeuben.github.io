import ProjectCard from "./projectCard"
import unknown from "../unknown.png";

const Projects = () => {
    return <>
        <h1>Projects</h1>
        <div className="projectContainer">
            <ProjectCard title="KappaEngine" image={unknown} link="https://github.com/Kappabyte/KappaEngine" description="This is a simple LWJGL game engine programmed in Java to help me learn low-level graphics programming using openGL. This project is still in an early stage, but has provided me the oppertunity to learn."/>
            <ProjectCard title="Event API" image={unknown} link="https://github.com/Kappabyte/EventAPI" description="A spigot library designed to allow for the easy implementation of hosted even style games on minecraft servers. The project is currently in 1.0 release."/>
            <ProjectCard title="Minecraft Map GUI" image={unknown} link="https://github.com/Vanilla-Redone/MinecraftMapGUI" description="A gui application to easily launch minecraft servers for playing your favorite maps. Supports multiple minecraft versions. Written using react and electron in typescript."/>
        </div>
    </>
}

export default Projects;