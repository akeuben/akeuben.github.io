import styles from "./page.module.css";
import { TwoCol } from "@/components/layout/TwoCol";
import { PostGrid } from "@/components/post/PostGrid";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import GithubStats from "@/components/visual/GithubStats";
import { Hero } from "@/components/visual/Hero";
import { Timeline } from "@/components/visual/Timeline";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import Link from "next/link";
import { YearsSince } from "@/components/visual/CurrentYear";
import Image from "next/image";
import { ProjectCard } from "@/components/project/ProjectCard";

const featuredProjects = [
    "mineclone",
    "gears"
]

export default function HomePage() {
    return (
        <>
        <Hero />
        <main>
            <GithubStats />
            <TwoCol fit="left">
                <Image className={styles.portrait} src="/assets/me.jpg" alt="portrait photo of Avery Keuben" width={200} height={200}/>
                <section>
                    <p>Hi! I'm Avery</p>
                    <p>I'm a software engineer based out of Calgary, Alberta. I have over <YearsSince date={new Date("2013/09/01 00:00:00")} includeSuffix /> years of hobbiest programming experience, 
                        and just over <YearsSince date={new Date("2023/05/01 00:00:00")} includeSuffix /> of professional experience. Over my programming career, I have learned a variety of languages,
                        created many personal projects, and have strived to learn as much as possible.</p>
                    <p>My current areas of interest are game development (especially engine development), low level programming (including operating systems and firmware), and theoretical computer science. However,
                        I am always open to learning new technologies and fields when I get the chance.</p>
                </section>
            </TwoCol>
            <TwoCol fit="none">
                <div>
                    <h1>Experience</h1>
                    <Timeline events={experience}/>
                </div>
                <div>
                    <h1>Education</h1>
                    <Timeline events={education}/>
                </div>
            </TwoCol>
            <section>
                <h1>Projects</h1>
                <TwoCol fit="none">
                    <ProjectCard projectUrl={featuredProjects[0] + ".md" as `${string}.md`} />
                    <ProjectCard projectUrl={featuredProjects[1] + ".md" as `${string}.md`} />
                </TwoCol>
                <Link href="/projects">See More</Link>
            </section>
            <section>
                <h1>Recent Posts</h1>
                <PostGrid count={2} />
                <Link href="/posts">See More</Link>
            </section>
        </main>
        </>
    );
}
