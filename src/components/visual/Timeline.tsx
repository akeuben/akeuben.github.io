import {TimelineEvent} from "@/types/Timeline";
import styles from "./Timeline.module.css";
import Link from "next/link";

const monthNameToIndex = (month: TimelineEvent["start"]["month"]) => {
    const months = [
        'January',
		'Febuary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
    ]

    return months.indexOf(month);
}

export const Timeline = ({events}: {events: TimelineEvent[]}) => {
    const eventsByYear: Record<string, TimelineEvent[]> = {};
    events.forEach(event => {
        const year = event.start.year;
        if(!eventsByYear[year]) {
            eventsByYear[year] = [event];
        } else {
            eventsByYear[year].push(event);
        }
    });

    Object.values(eventsByYear).forEach(eventList => eventList.sort((a, b) => monthNameToIndex(b.start.month) - monthNameToIndex(a.start.month)));

    console.dir(eventsByYear);

    return <div className={styles.timeline}>
        {Object.keys(eventsByYear).toSorted((a, b) => parseInt(b) - parseInt(a)).map((year) => 
            <div key={year}>
                <i>{year}</i>
                <div className={styles.timelineYearBox}>
                    {
                        eventsByYear[year].map(event => <TimelineEventComponent key={event.name} event={event} />)
                    }
                </div>
            </div>
        )}
    </div>
}

const makeReadableDate = (event: TimelineEvent) => {
    if(!event.end) {
        return `${event.start.month} ${event.start.year} - current`;
    }
    if(event.start.month === event.end.month && event.start.year === event.end.year) {
        return `${event.start.month} ${event.start.year}`;
    }

    return `${event.start.month} ${event.start.year} - ${event.end.month} ${event.end.year}`
}

const TimelineEventComponent = ({event}: {event: TimelineEvent}) => {
    return <div className={styles.timelineEvent}>
        <b>{event.name}</b>
        <i className={styles.location}>{event.location}</i>
        <i className={styles.time}>{makeReadableDate(event)}</i>
        <p>{event.description}</p>
        {
            event.relatedProjects && <p>Projects: {event.relatedProjects.map(project => <Link href={`/project/${project}`}>{project}</Link>)}</p>
        }
    </div>
}
