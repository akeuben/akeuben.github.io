import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";

export async function getProjectData(id: string) {
    console.log(id);
    const data = await fetch(`/projects/${id}`);
    const text = await data.text();

    const matterResult = matter(text);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        data: matterResult.data,
    };
}
