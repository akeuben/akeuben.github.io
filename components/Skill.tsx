import style from "./Skill.module.css"

export const Skill = ({name, value, colour, delay}: {name: string, value: number, colour: string, delay: number}) => {
    return (
        <div className={style.languageContainer}>
            <span>{name}</span>
            <div>
                <div style={{width:`${value}%`}}>
                    <div className={style.animated} style={{backgroundColor: colour, animationDelay: `${delay}s`}} />
                </div>
            </div>
        </div>
    )
}