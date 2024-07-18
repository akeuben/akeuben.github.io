import fs from "fs"

export const GetProjects = () => {
    let files = fs.readdirSync("public/projects/", {
        recursive: true
    }).filter(file => file.toString().endsWith(".md"))
        .filter(file => !file.includes("templates"))
        .filter(file => !file.includes(".trash"))

    const creationDate: Record<string, Date> = {};

    files.forEach(file => creationDate[file.toString()] = fs.statSync(`public/projects/${file}`).birthtime)

    files = files.sort((a, b) => creationDate[b.toString()].getTime() - creationDate[a.toString()].getTime());
    return files;
}
