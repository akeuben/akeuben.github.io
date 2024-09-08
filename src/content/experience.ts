import { TimelineEvent } from "@/types/Timeline";

export const experience: TimelineEvent[] = [
    {
        name: "Code Team Member",
        location: "Scarlett Robotics",
        start: {
            month: "September",
            year: 2019
        },
        end: {
            month: "June",
            year: 2022
        },
        description: "Member of the Scarlett Robotics code team. Responsible for adding both autonomous and driver controlled logic to the robot controller.",
    },
    {
        name: "Code Team Member",
        location: "AC Robotics",
        start: {
            month: "December",
            year: 2019
        },
        end: {
            month: "December",
            year: 2019
        },
        description: "Contributor to the AC Robotics team during their RI3D (Robot in 3 days) challenge for the 2019/2020 FRC (First Robotics Competition) season.",
    },
    {
        name: "Robotics Team President",
        location: "Scarlett Robotics",
        start: {
            month: "September",
            year: 2021
        },
        end: {
            month: "June",
            year: 2022
        },
        description: "President of the Scarlett Robotics FTC team. Responsible for organizing, teaching, and contributing to a functional robot.",
    },
    {
        name: "Research Assistant/Developer",
        location: "University of Calgary",
        start: {
            month: "May",
            year: 2023
        },
        description: "Member of the Serious Games research group, helping build a game and engine to help transition high school students with ADHD and learning disabilities to postsecondary.",
        relatedProjects: ["gears"]
    }
]
