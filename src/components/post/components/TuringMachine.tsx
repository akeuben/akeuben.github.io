"use client"
import { useCallback, useEffect, useState } from "react"
import styles from "./TuringMachine.module.css"
import dynamic from "next/dynamic"

const GraphCanvas = dynamic(() => import("reagraph").then(mod => mod.GraphCanvas), {ssr: false});

type TuringMachineInstruction = {
    oldState: number,
    read: string,
    newState: number,
    write: string,
    direction: -1 | 0 | 1,
}

type TuringMachine = {
    instructions: Record<'{number}/{string}', TuringMachineInstruction>
}

const directions = {
    "L": -1,
    "S": 0,
    "R": 1,
}

const inverse_directions = [
    "L", "S", "R"
]

const nodes = (machine: TuringMachine, state: number) => {
    const states = Object.values(machine.instructions)
        .filter(ins => (
            ins.oldState === state
        ))
        .map(ins => [ins.newState])
        .flat()
        .filter((a, i, l) => l.indexOf(a) === i);

    return states.map(state => ({
        id: state + "",
        label: state + "",
    })).concat([{
        id: "self",
        label: state + ""
    }])
}

const edges = (machine: TuringMachine, state: number) => {
    const transitions = Object.values(machine.instructions)
        .filter(ins => ins.oldState === state);

    return transitions.map(transition => {
        const {oldState, read, newState, write, direction} = transition;
        return {
            id: `${oldState}/${read}`,
            source: 'self',
            target: newState + '',
            label: `${read}/${write}/${inverse_directions[direction + 1]}`
        }
    })
}

const parseTuringFile = (content: string): TuringMachine => {
    const lines = content.split("\n");
    const instructions: Record<string, TuringMachineInstruction> = {};

    for(const line of lines) {
        const result = /([0-9]*)\/(.)->([0-9]*)\/(.)\/([LRS])/.exec(line);
        if(!result) continue;
        const [_, oldState, read, newState, write, direction] = result;
        instructions[`${parseInt(oldState)}/${read}`] = {
            oldState: parseInt(oldState),
            read,
            newState: parseInt(newState),
            write,
            direction: (directions[direction as keyof typeof directions] as -1 | 0 | 1),
        };
    }

    return {
        instructions: instructions,
    }
}

const isHaltState = (code: TuringMachine, state: number) => {
    return Object.values(code.instructions).find(ins => ins.oldState === state) === undefined;
}

const TICK_RATE = 1000;

const stop = (interval: NodeJS.Timeout | undefined, setRunning: (r: boolean) => void) => {
    console.log("stopping");
    if(interval) clearInterval(interval);
    setRunning(false);
}

const start = (interval: NodeJS.Timeout | undefined, setIntervalState: (a: NodeJS.Timeout) => void, updateFn: () => void, setRunning: (r: boolean) => void) => {
    stop(interval, setRunning);
    console.log("starting");
    setIntervalState(setInterval(updateFn, TICK_RATE));
    setRunning(true);
}

export const TuringMachine = ({machine, tape, label}: {machine: string, tape: string, label: string}) => {
    const [code, setCode] = useState<TuringMachine|null>(null);
    const [currentTape, setCurrentTape] = useState<string>(tape);
    const [state, setState] = useState<number>(0);
    const [tapeHead, setTapeHead] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const i = useState<NodeJS.Timeout>();

    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsBrowser(true);
        }
    }, []);

    const step = useCallback(() => {
        if(!code) return;
        let instruction = code.instructions[`${state}/${currentTape[tapeHead]}` as keyof typeof code.instructions];
        if(!instruction) {
            instruction = code.instructions[`${state}/*` as keyof typeof code.instructions];
        };
        if(!instruction) return;
        const newTape = structuredClone(currentTape).split("");
        if(instruction.write !== "*") newTape[tapeHead] = instruction.write;
        setCurrentTape(newTape.join(""));
        setTapeHead(tapeHead + instruction.direction);
        setState(instruction.newState);
    }, [code, state, setState, currentTape, setCurrentTape, tapeHead, setTapeHead])


    useEffect(() => {
        if(running) start(i[0], i[1], step, setRunning);
    }, [step, running, setRunning])

    useEffect(() => {
        if(!code) return;
        if(isHaltState(code, state)) {
            setRunning(false);
        }
    }, [code, state]);

    useEffect(() => {
        fetch(machine).then(response => {
            response.text().then(text => {
                setCode(parseTuringFile(text));
            });
        });
    }, [machine])

    if(!code || !isBrowser) return <></>

    return <div className={styles.turingmachine}>
        <h3>{label}</h3>
        <div className={styles.graphWrapper}>
            <GraphCanvas
                animated={true}
                draggable={false}
                disabled={true}
                theme={{
                    canvas: {
                        background: "#1a1a1a",
                        fog: "#1a1a1a",
                    },
                    node: {
                        fill: "#dddddd",
                        activeFill: "#016ACE",
                        opacity: 1,
                        selectedOpacity: 1,
                        inactiveOpacity: 0.2,
                        label: {
                            color: '#fff',
                            activeColor: "#016ACE"
                        },
                        subLabel: {
                            color: '#2A6475',
                            stroke: '#eee',
                            activeColor: '#1DE9AC'
                        }
                    },
                    lasso: {
                        border: '1px solid #55aaff',
                        background: 'rgba(75, 160, 255, 0.1)'
                    },
                    ring: {
                        fill: '#D8E6EA',
                        activeFill: '#1DE9AC'
                    },
                    edge: {
                        fill: "#444444",
                        activeFill: "#016ACE",
                        opacity: 1,
                        selectedOpacity: 1,
                        inactiveOpacity: 0.1,
                        label: {
                            color: "#fff",
                            activeColor: "#016ACE",
                        }
                    },
                    arrow: {
                        fill: "#444444",
                        activeFill: "#016ACE"
                    }
                }}
                minDistance={500}
                maxDistance={1000}
                nodes={nodes(code, state)}
                edges={edges(code, state)}
                labelType="all"
                layoutType="hierarchicalLr"
                layoutOverrides={{nodeSize: [100,100], nodeSeparation: 0.5}}
                edgeLabelPosition={"above"}
                actives={["self"]}
            />
        </div>
        <div className={styles.tape + ` ${isHaltState(code, state) ? styles.halt : ""}`}>
            {
                currentTape.split("").map((cell, i) => <input key={i} type="text" value={cell} className={tapeHead === i ? styles.active : ""} onChange={(e) => {
                    const char = e.currentTarget.value.replace(cell, "");
                    if(char.length !== 1) {
                        return;
                    }
                    const newTape = currentTape.split("");
                    newTape[i] = char;

                    setCurrentTape(newTape.join(""));
                    const newTarget = e.currentTarget.parentElement?.children[i + 1] as HTMLInputElement | undefined;
                    if(newTarget) newTarget.focus();
                    return;
                }} onKeyDown={(e) => {
                    if(e.key === "Backspace") {
                        const newTape = currentTape.split("");
                        newTape[i] = " ";

                        setCurrentTape(newTape.join(""));
                        const newTarget = e.currentTarget.parentElement?.children[i - 1] as HTMLInputElement | undefined;
                        if(newTarget) newTarget.focus();
                    }
                }} />)
            }
        </div>
        <div className={styles.controls}>
            <button onClick={() => {
                setCurrentTape(tape);
                setState(0);
                setTapeHead(0);
            }}>Reset</button>
            <button onClick={() => {
                if(running) {
                    stop(i[0], setRunning);
                } else {
                    start(i[0], i[1], step, setRunning)
                }
            }} disabled={isHaltState(code, state)}>{running ? "Stop" : "Start"}</button>
            <button onClick={() => {
                stop(i[0], setRunning);
                step();
            }} disabled={isHaltState(code, state)}>Step</button>
        </div>
    </div>
}
