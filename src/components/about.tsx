const About = (props:any) => {
    return <section id="about">
        <h1>Hi! I'm Avery!</h1>
        <p>Hi, I'm Avery, a high school student in Alberta, Canada with a passion for programming and solving puzzles. I am currently seeking internship oppertunities over the summer.</p>
        <p>My goal is to become a backend, frontend, or full stack developer for a software development company. I would like to continue to learn new frameworks, APIs, and languages as I continue my path to a bachelor’s degree in computer science. I am also interested in improving my project organization and planning skills to help me complete more projects.</p>
        {props.children}
    </section>
}

export default About;