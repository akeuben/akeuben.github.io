export type AutomotaState = number[]

export type RuleSet = {
    born: number[],
    survive: number[]
}


const randomBitmask = (bits: number) => Math.floor(Math.random() * Math.pow(2,bits));

export const resizeGameBoard = (boardState: AutomotaState, setBoardState: (state: AutomotaState) => void, newWidth: number, newHeight: number) => {
    const newState = new Array(Math.floor(newWidth)) as AutomotaState;

    for(let i = 0; i < newWidth; i++) {
        const column = i < boardState.length ? boardState[i] : (randomBitmask(newHeight) & randomBitmask(newHeight));

        newState[i] = column;
    }

    setBoardState(newState);
}

export const getValue = (board: AutomotaState, [x,y]: [number, number], [dx,dy]: [number, number], boardHeight: number) => {
    let nx = x + dx;
    let ny = y + dy;

    while(nx < 0) nx += board.length;
    while(nx >= board.length) nx -= board.length;

    while(ny < 0) ny += boardHeight;
    while(ny >= boardHeight) ny -= boardHeight;

    const col = board[nx];

    return ((col >> ny) & 1) == 1;
}

export const tickBoard = (boardState: AutomotaState, setBoardState: (state: AutomotaState) => void, ruleSet: RuleSet, boardHeight: number) => {
    const newState = new Array(boardState.length) as AutomotaState;

    for(let c = 0; c < boardState.length; c++) {
        let newColumn = 0;
        for(let r = 0; r < boardHeight; r++) {
            const wasAlive = getValue(boardState, [c,r], [0,0], boardHeight);
            let newAlive = false;
            let neighborCount = 0;
            for(let x = -1; x <= 1; x++) {
                for(let y = -1; y <= 1; y++) {
                    if(getValue(boardState,[c,r], [x,y], boardHeight)) neighborCount++;
                }
            }

            if(!wasAlive && ruleSet.born.includes(neighborCount)) {
                newAlive = true;
            }
            if(wasAlive && ruleSet.survive.includes(neighborCount)) {
                newAlive = true;
            }

            if(newAlive) {
                newColumn += (1 << r);
            }
        }

        newState[c] = newColumn;
    }

    setBoardState(newState);
}

export const toggleOnCell = (state: AutomotaState, setState: (s: AutomotaState) => void, [x,y]:[number, number]) => {
    const newState = structuredClone(state);
    newState[x] |= (1 << y);

    setState(newState);
}
