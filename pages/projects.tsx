import { NextPage } from "next";
import Head from "next/head";
import { StaticMainContent } from "../components/AnimatedMainContent";
import Background from "../components/Background";
import Header from "../components/Header";

const Projects: NextPage = () => {
    return <>
        <Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <Background mode='sub'/>
        <StaticMainContent>
		    <h1>Projects</h1>
        </StaticMainContent>
    </>
}

export default Projects;