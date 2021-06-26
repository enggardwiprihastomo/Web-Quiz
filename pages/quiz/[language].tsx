import { GetServerSideProps } from 'next'
import { useRef, useState, useEffect } from "react";
import { IoMdArrowBack, IoIosArrowBack } from "react-icons/io";
import MobileContent from "../../components/content.mobile";
import QuestionList from "../../components/questionList";
import Content from "../../components/content.index";
import Result from "../../components/result";
import Popup from "../../components/popup";
import usePopup from "../../components/popupController";
import { setProgressBar, calculateScore, IQuestion, slideLeft, slideRight, popupHandler, fetchData, API_URL, parseQuestionList } from "../../utils";

function Quiz(props) {
    const { language } = props.params
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0)
    const [windowWidth, setWindowWidth] = useState<number>(null)
    const [isResult, setIsResult] = useState<boolean>(false)

    const { refOutside, isActive, setIsActive } = usePopup(false)

    const refBar = useRef<HTMLDivElement | null>(null)
    const refBarProgress = useRef<HTMLDivElement | null>(null)
    const refQuestion = useRef<HTMLDivElement | null>(null)

    const content = questions[selectedQuestion]
    const progress = 100 / questions.length

    useEffect(() => {
        setIsLoading(true)
        fetchData(`${API_URL}/${language}`).then(questions => {
            setIsLoading(false)
            setQuestions(parseQuestionList(questions))
        })

        setWindowWidth(window.innerWidth)

        function handleResize() {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (refBarProgress.current) {
            refBarProgress.current.style.width = `${progress}%`
        }
    }, [questions])

    function handleSelect(event, question) {
        setProgressBar(question + 1, progress, refBarProgress)
        refBar.current.style.left = event.target.offsetLeft + "px"
        if (selectedQuestion > question) {
            slideRight(question, setSelectedQuestion, refQuestion)
        }
        if (selectedQuestion < question) {
            slideLeft(question, setSelectedQuestion, refQuestion)
        }
    }

    function handleAnswer(event) {
        content.answer = event.target.value
        if (selectedQuestion < questions.length - 1) {
            setProgressBar(selectedQuestion + 2, progress, refBarProgress)
            setTimeout(() => {
                slideLeft(selectedQuestion + 1, setSelectedQuestion, refQuestion)
                refBar.current.style.left = (20 + (selectedQuestion + 1) * 110) + "px"
            }, 250);
        }
        else {
            setTimeout(() => {
                popupHandler(true, setIsActive)
            }, 250);
        }
    }

    const contentProps = {
        content,
        refQuestion,
        language,
        selectedQuestion,
        handleAnswer
    }

    return !isLoading ?
        content ?
            isResult ?
                (<Result score={calculateScore(questions)} route={language} />)
                : (<main className="content flex column">
                    <section className="content-header">
                        <a className="btn-back" href="/">
                            <IoMdArrowBack />
                        </a>
                        <a className="btn-back-mobile" href="/">
                            <IoIosArrowBack />
                        </a>
                        <div className="content-info-mobile">
                            <p>{selectedQuestion + 1}</p>
                            <p>/{questions.length}</p>
                        </div>
                        <QuestionList value={questions.length} activeQuestion={selectedQuestion} refBar={refBar} handleSelect={handleSelect} />
                    </section>
                    <section className="content-title">
                        {language && <img src={`../../ic-${language}.svg`} alt="Programming language" />}
                        <p>{language && language.toUpperCase()}</p>
                    </section>
                    <section className="content-progress-mobile">
                        <div className="content-bar-wrapper">
                            <div className="content-bar-progress" data-color={language} ref={refBarProgress} />
                        </div>
                    </section>
                    {isActive ? <Popup
                        refOutside={refOutside}
                        message={"Are you sure to submit your answers?"}
                        buttons={[{ label: "Cancel", action: () => popupHandler(false, setIsActive) }, { label: "Submit", action: () => setIsResult(true) }]}
                    /> : null}
                    {windowWidth > 480 ? <Content {...contentProps} /> : <MobileContent {...contentProps} />}
                </main>)
            : (
                <section className="content-empty flex column centerX centerY">
                    <p>There is no question for {language.toUpperCase()}</p>
                    <a href="/">Back to Home</a>
                </section>
            ) : null
}

export default Quiz

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: { params: context.params }
    }
}