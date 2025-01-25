"use client"

import { CSSProperties, useCallback, useEffect, useState } from "react";
import styles from "./AutomotaComponent.module.css";
import { AutomotaState, resizeGameBoard, RuleSet, tickBoard, toggleOnCell } from "./Automota";

const ANIMATION_TIME = 750;

const stop = (interval: NodeJS.Timeout | undefined, setRunning: (r: boolean) => void) => {
    console.log("stopping");
    if(interval) clearInterval(interval);
    setRunning(false);
}

const start = (interval: NodeJS.Timeout | undefined, setIntervalState: (a: NodeJS.Timeout) => void, updateFn: () => void, setRunning: (r: boolean) => void) => {
    stop(interval, setRunning);
    console.log("starting");
    setIntervalState(setInterval(updateFn, ANIMATION_TIME));
    setRunning(true);
}

export const Automota = ({boardHeight, tileSize, ruleSet}: {boardHeight: number, tileSize: number, ruleSet: RuleSet}) => {
    const [state, setState] = useState<AutomotaState>([]);
    const [running, setRunning] = useState(true);
    const i = useState<NodeJS.Timeout>();

    useEffect(() => {
        resizeGameBoard(state, setState, (window.innerWidth - 80) / tileSize - 1, boardHeight);
    },[])

    const update = useCallback(() => {
        if(state.length !== 0) tickBoard(state, setState, ruleSet, boardHeight);
    }, [state, setState])


    useEffect(() => {
        if(running) start(i[0], i[1], update, setRunning);
    }, [update, running, setRunning])

    useEffect(() => {
        const updateSize = () => resizeGameBoard(state, setState, (window.innerWidth - 80) / tileSize - 1, boardHeight);
        window.addEventListener('resize', updateSize)
    }, [])

    return <div className={styles.automota}>
        <div className={styles.board}>
            {
                state.map((column, i) => <div key={`col${i}`} className={styles.column}>
                    {
                        (Array.apply(null, Array(boardHeight)) as number[])
                            .map((_,j) => 
                                <div key={`col${i}-cell${j}`} 
                                    style={{
                                        "--delay": `${(i + j) / ((4000 / ANIMATION_TIME) * state.length)}s`
                                    } as CSSProperties} 
                                    className={`${styles.cell} ${((column >> j) & 1) == 1 ? styles.active : ""}`}
                                    onMouseEnter={() => toggleOnCell(state, setState, [i,j])}
                                />)
                    }
                </div>)
            }
        </div>
        <div className={styles.meta}>
            <i>Ruleset: {`B${ruleSet.born.join("")}/S${ruleSet.survive.join("")}`}</i>
            <button onClick={!running ? () => start(i[0], i[1], update, setRunning) : () => stop(i[0], setRunning)}>
                {
                    `${!running ? String.fromCharCode(0x23f5) : String.fromCharCode(0x23f8)}${String.fromCharCode(0xFE0E)}`
                }
            </button>
            <button onClick={() => tickBoard(state, setState, ruleSet, boardHeight)} disabled={running}>&#x23ED;&#xFE0E;</button>
        </div>
    </div>
    
}
