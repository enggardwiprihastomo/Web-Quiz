import { useRouter } from "next/router";
import { useRef } from "react"

interface IProps {
    value: number
    activeQuestion: number
    refBar: any
    handleSelect: (event, question) => void
}

function QuestionList({ value, activeQuestion, refBar, handleSelect }: IProps) {
    const { language } = useRouter().query
    const refInfo = useRef<HTMLSelectElement | null>(null)
    const list: any[] = []

    for (let i = 0; i < value; i++) {
        const question = `Question ${i + 1}`
        list.push(<span key={`question-${i}`} onClick={e => handleSelect(e, i)} className={activeQuestion === i ? "question-active" : null}>{question}</span>)
    }

    return (
        <section ref={refInfo} className="content-info" onWheel={e => refInfo.current.scrollLeft = refInfo.current.scrollLeft + e.deltaY}>
            <div className="content-bar" data-color={language} ref={refBar} />
            {list}
        </section >
    )
}

export default QuestionList