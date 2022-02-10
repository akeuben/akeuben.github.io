import style from "./ScrollButton.module.css"

export const ScrollButton = () => {
    return <>
        <div className={style.scrollButton} onClick={() => window.scroll(0, document.body.clientHeight)}>⟨</div>
    </>
}