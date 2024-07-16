import fs from "fs"

export const GetPosts = () => {
    let files = fs.readdirSync("public/posts/", {
        recursive: true
    }).filter(file => file.toString().endsWith(".md"))
        .filter(file => !file.includes("templates"))
        .filter(file => !file.includes(".trash"))

    const creationDate: Record<string, Date> = {};

    files.forEach(file => creationDate[file.toString()] = fs.statSync(`public/posts/${file}`).birthtime)

    files = files.sort((a, b) => creationDate[b.toString()].getTime() - creationDate[a.toString()].getTime());
    return files;
}
