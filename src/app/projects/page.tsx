import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Metadata, ResolvingMetadata } from "next";

export default function ProjectsPage() {
    return (
        <>
        <main>
            <h1>Projects</h1>
            <p>
                Below are a list of projects I have either completed, or am currently working on.
            </p>
            <ProjectGrid />
        </main>
        </>
    );
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const parentData = await parent;

    const title = `Projects | ${parentData.title?.absolute}`;
    
    return {
        title: title,
        openGraph: {
            type: "website",
            title: title,
        }
    }
}
