"use client"

import styles from "./GithubStats.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "Kappabyte";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Response {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear'
  };
  contributions: Array<Contribution>;
}

enum AnimationState {
    INITIAL,
    READY_TO_UPDATE,
    WAITIING,
    DONE
}

export default function GithubStats() {
    const ref = useRef<HTMLDivElement>(null);
    const [contributions, setContributions] = useState<Response | null>(null)
    const [repoCount, setRepoCount] = useState<number | null>(null);
    const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.INITIAL);


    // Fetching data
    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`).then(async (res) => {
            setContributions(await res.json());
        });
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`).then(async (res) => {
            setRepoCount(((await res.json()) as any[]).length);
        })
    }, [setContributions, setRepoCount]);

    const totalContributions = contributions ? Object.values(contributions.total).reduce((prev, curr) => prev + curr, 0) : -1;
    const currentYear = contributions ? Object.keys(contributions.total).toSorted((a, b) => parseInt(b)-parseInt(a))[0] : new Date().getFullYear();
    const contributionsThisYear = contributions ? contributions.total[currentYear] : -1;

    const [displayedTotalContributions, setDisplayedTotalContributions] = useState(-1);
    const [displayedYearContributions, setDisplayedYearContributions] = useState(-1);
    const [displayedRepoCount, setDisplayedRepoCount] = useState(-1);

    const animate = useCallback((repoCount: number) => {
        if(displayedTotalContributions < totalContributions) {
            setDisplayedTotalContributions(displayedTotalContributions + 1);
        } else if(displayedYearContributions < contributionsThisYear) {
            setDisplayedYearContributions(displayedYearContributions + 1);
        } else if(displayedRepoCount < repoCount) {
            setDisplayedRepoCount(displayedRepoCount + 1);
        } else {
            return;
        }

        setTimeout(() => animate(repoCount), 100);
    }, [displayedTotalContributions, setDisplayedTotalContributions, displayedYearContributions, setDisplayedYearContributions, displayedRepoCount, setDisplayedRepoCount, contributionsThisYear, totalContributions])

    // Animation
    useEffect(() => {
        if(!ref.current || !repoCount) return;
        if(totalContributions === -1) return;

        if(animationState === AnimationState.INITIAL) {
            new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) setAnimationState(AnimationState.READY_TO_UPDATE);
            },{
                threshold: 0.25
            }).observe(ref.current);
            setAnimationState(AnimationState.WAITIING);
        } else if(animationState === AnimationState.READY_TO_UPDATE) {
            if(displayedTotalContributions < totalContributions) {
                setDisplayedTotalContributions(displayedTotalContributions + 1);
            setTimeout(() => setAnimationState(AnimationState.READY_TO_UPDATE), 3E3 / totalContributions);
            } else if(displayedYearContributions < contributionsThisYear) {
                setDisplayedYearContributions(displayedYearContributions + 1);
                setTimeout(() => setAnimationState(AnimationState.READY_TO_UPDATE), 3E3 / contributionsThisYear);
            } else if(displayedRepoCount < repoCount) {
                setDisplayedRepoCount(displayedRepoCount + 1);
                setTimeout(() => setAnimationState(AnimationState.READY_TO_UPDATE), 3E3 / repoCount);
            } else {
                setAnimationState(AnimationState.DONE);
            }
            setAnimationState(AnimationState.WAITIING);
        }
    }, [ref, repoCount, displayedTotalContributions, setDisplayedTotalContributions, displayedYearContributions, setDisplayedYearContributions, displayedRepoCount, setDisplayedRepoCount, contributionsThisYear, totalContributions, contributions, animationState, setAnimationState]);

    return <div className={styles.stats} ref={ref}>
        <div>
            <span>{displayedTotalContributions === -1 ? "..." : displayedTotalContributions}</span>
            <p>Lifetime Github<br/>Contributions</p>
        </div>
        <div>
            <span>{displayedYearContributions === -1 ?  "..." : displayedYearContributions}</span>
            <p>{currentYear} Github<br/>Contributions</p>
        </div>
        <div>
            <span>{displayedRepoCount === -1 ? "..." : displayedRepoCount}</span>
            <p>Public<br/>Repositories</p>
        </div>
    </div>
}
