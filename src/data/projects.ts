import { Project } from "@/types/Project";

const gears: Project = {
    filename: "gears",
    name: "GEARS",
    description: {
        short: "A game to help transition high school students with learning disabilities and ADHD to postsecondary.",
        full: "TODO"
    },
    images: [
        "/assets/images/project/gears/gears.png"
    ],
    tags: [
        "gamedev",
        "react"
    ]
};

export const Projects: Record<string, Project> = {
    gears: gears,
}

