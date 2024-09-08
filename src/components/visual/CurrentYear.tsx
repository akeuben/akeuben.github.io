"use client"

export const CurrentYear = () => {
    const year = new Date().getFullYear();
    return <span>{year}</span>
}

export const YearsSince = ({date, includeSuffix}: {date: Date, includeSuffix: boolean}) => {
    const diff = Math.abs(new Date().getTime() - date.getTime());
    const years = Math.floor(diff / 31556952000);

    return <span>{years}{includeSuffix ? ` year${years === 1 ? '' : 's'}` : ""}</span>
}
