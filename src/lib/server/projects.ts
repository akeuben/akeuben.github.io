import fs from "fs"

export const GetProjects = () => {
    let files = fs.readdirSync("public/projects/", {
        recursive: true
    }).filter(file => file.toString().endsWith(".md"))
        .filter(file => !file.includes("templates"))
        .filter(file => !file.includes(".trash"))

    return files;
}
