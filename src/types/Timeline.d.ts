type month = 'January' | 'Febuary' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
type year = number

export type TimelineEvent = {
    start: {
        month: month,
        year: year
    },
    end?: {
        month: month,
        year: year
    },
    name: string,
    location: string,
    description: string,
    relatedProjects?: string[]
}
