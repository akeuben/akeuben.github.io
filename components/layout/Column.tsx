import style from "./Column.module.css"

export const Column = (props: {ratios: number[], children: JSX.Element[]}) => {

    const columns = props.ratios.map((ratio, i) => `${ratio}%`).join(" ");
    console.log(columns)
    return (
        <section className={style.column} style={{gridTemplateColumns: columns}}>
            {props.children}
        </section>
    )
}