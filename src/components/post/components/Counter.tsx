"use client"
import { useState } from "react"

export const Counter = ({defaultvalue}: {defaultvalue: string}) => {
    const [value, setValue] = useState<number>(parseInt(defaultvalue));

    return <button onClick={() => setValue(value + 1)}>
        {value}
    </button>
}
