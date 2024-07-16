import { PostGrid } from "@/components/post/PostGrid";
import { Metadata, ResolvingMetadata } from "next";

export default function PostsPage() {
    return (
        <>
        <main>
            <h1>Posts</h1>
            <p>
                Below are a list of blog posts I have published.
            </p>
            <PostGrid />
        </main>
        </>
    );
}

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const parentData = await parent;

    const title = `Posts | ${parentData.title?.absolute}`;
    
    return {
        title: title,
        openGraph: {
            type: "website",
            title: title,
        }
    }
}
