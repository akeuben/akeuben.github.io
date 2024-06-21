export type Project = {
    filename: string;
    name: string;
    images: string[];
    description: {
        short: string;
        full: string;
    };
    source?: string;
    live?: string;
    tags: string[];
}
