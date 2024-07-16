import { PostGrid } from "@/components/post/PostGrid";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Hero } from "@/components/visual/Hero";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
        <Hero />
        <main>
            <h1>Projects</h1>
            <ProjectGrid count={2} />
            <Link href="/projects">See More</Link>
            <h1>Recent Posts</h1>
            <PostGrid count={2} />
            <Link href="/projects">See More</Link>
        </main>
        </>
    );
}
