import { Octokit } from "@octokit/core";
import { Dispatch, SetStateAction, useState } from "react";

var totalCommits: number;
var setTotalCommits: Dispatch<SetStateAction<number>>;
var totalRepos = 0;
var setTotalRepos: Dispatch<SetStateAction<number>>;
var totalYearsCoding = new Date().getFullYear() - 2015;

var hasPinged = false;

const Stats = () => {
    [totalCommits, setTotalCommits] = useState(-1);
    [totalRepos, setTotalRepos] = useState(-1);

    if(!hasPinged) {
        fetch("https://agreeable-salty-shallot.glitch.me/").then(res => {
            res.json().then(json => {
                setTotalCommits(json.totalCommits);
                setTotalRepos(json.totalRepos);
            })
        })
        hasPinged = true;
    }

    return <>
        <div className="stats">
            <h3 className="statCounter">{totalCommits === -1 ? "<api error>" : totalCommits}</h3>
            <h3 className="statCounter">{totalRepos === -1 ? "<api error>" : totalRepos}</h3>
            <h3 className="statCounter">{totalYearsCoding}</h3>
            <p className="statInfo">Total GitHub Commits</p>
            <p className="statInfo">Total GitHub Repos</p>
            <p className="statInfo">Years of Programming</p>
        </div>
    </>
}

export default Stats;