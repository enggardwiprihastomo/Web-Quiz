import { useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Menu from "../components/menu"
import usePopup from "../components/popupController";
import Popup from "../components/popup";
import { API_URL, fetchData, IOption, IQuestion, parseQuestionList, popupHandler } from "../utils";
import Option from "../components/option";
import { useEffect } from "react";

interface IModify {
    id_question: number
    id_answer: number
}

function isOptionsFilled(options: IOption) {
    return options.a !== "" && options.b !== "" && options.c !== "" && options.d !== ""
}

function Dashboard() {
    const initOptions = {
        a: "",
        b: "",
        c: "",
        d: ""
    }

    const menus = ["HTML", "CSS", "React", "Node.js"]

    const [question, setQuestion] = useState<string>("")
    const [correct, setCorrect] = useState<string>("")
    const [selectedMenu, setSelectedMenu] = useState<string>(menus[0])
    const [questionList, setQuestionList] = useState<IQuestion[]>([])
    const [isModifying, setIsModifying] = useState<IModify | null>(null)

    const { refOutside, isActive, setIsActive } = usePopup(false)
    const [options, setOptions] = useState<IOption>(initOptions)


    useEffect(() => {
        async function fetchQuestions() {
            setQuestionList(parseQuestionList(await fetchData(`${API_URL}/${selectedMenu}`)))
        }
        fetchQuestions()
    }, [selectedMenu])

    function resetState() {
        setQuestion("")
        setCorrect("")
        setOptions(initOptions)
        setIsModifying(null)
    }

    async function confirmEditHandler() {
        await fetchData(`${API_URL}/${selectedMenu}`, "PUT", {
            id_question: isModifying.id_question,
            id_answer: isModifying.id_answer,
            question,
            options,
            answer: correct
        })
        resetState()
        setQuestionList(parseQuestionList(await fetchData(`${API_URL}/${selectedMenu}`)))
        resetState()
    }

    async function confirmDeleteHandler() {
        await fetchData(`${API_URL}/${selectedMenu}`, "DELETE", {
            id_question: isModifying.id_question,
            id_answer: isModifying.id_answer
        })
        resetState()
        setQuestionList(parseQuestionList(await fetchData(`${API_URL}/${selectedMenu}`)))
        popupHandler(false, setIsActive)
    }

    function deleteHandler(question: IQuestion) {
        popupHandler(true, setIsActive)
        setIsModifying({
            id_question: question.id,
            id_answer: question.options.id
        })
    }

    function editHandler(question: IQuestion) {
        setQuestion(question.question)
        setOptions(question.options)
        setCorrect(question.correct)
        setIsModifying({
            id_question: question.id,
            id_answer: question.options.id
        })
    }

    async function addHandler() {
        if (isOptionsFilled(options) && correct !== "" && question !== "") {
            await fetchData(`${API_URL}/${selectedMenu}`, "POST", {
                question,
                options,
                answer: correct
            })
            resetState()
            setQuestionList(parseQuestionList(await fetchData(`${API_URL}/${selectedMenu}`)))
        }
        else {
            alert("Please fill in all the options and select the correct answer")
        }
    }

    return (
        <main className="dashboard">
            <section className="header flex" data-color={selectedMenu.toLowerCase()}>
                <img src={`./ic-${selectedMenu.toLowerCase()}.svg`} alt="No Icon" />
                <h1 className="flex centerX">{selectedMenu}</h1>
                <div className="flex endY">
                    <Menu menus={menus} state={selectedMenu} setState={setSelectedMenu} />
                </div>
            </section>
            <section className="question grid">
                <div className="question-description flex column">
                    <p>Question</p>
                    <textarea placeholder="Write a new question here ..." value={question} onChange={e => setQuestion(e.target.value)} />
                </div>
                <div className="question-options flex">
                    <ul className="flex column">
                        {Object.keys(options).map(option => {
                            if (option !== "id") {
                                return <Option
                                    key={`option-${option}`}
                                    value={option}
                                    state={options[option]}
                                    setState={setOptions}
                                    selectedMenu={selectedMenu}
                                    selected={correct}
                                    setSelected={setCorrect}
                                />
                            }
                        })}
                    </ul>
                </div>
                <div className="question-action flex centerY centerX">
                    {isModifying ?
                        <button
                            className="btn-delete"
                            data-color={selectedMenu.toLowerCase()}
                            onClick={confirmEditHandler}>
                            Edit Question
                        </button>
                        :
                        <button
                            className="btn-add"
                            data-color={selectedMenu.toLowerCase()}
                            onClick={addHandler}>
                            Add Question
                        </button>}
                </div>
            </section>
            {questionList.length ?
                <section className="question-list">
                    <p>Avaliable Questions</p>
                    <ul className="flex column">
                        {questionList.map(question => (
                            <li key={question.id} className="flex centerX">
                                <p>{question.question}</p>
                                <button onClick={() => editHandler(question)}><FiEdit2 /></button>
                                <button onClick={() => deleteHandler(question)}><FiTrash2 /></button>
                            </li>
                        ))}
                    </ul>
                </section>
                :
                <section className="question-empty flex centerY centerX column">
                    <img src="./ic-empty.svg" alt="Empty Questions" />
                    <h2>No Questions</h2>
                    <p>Oooops, there is no question found for {selectedMenu}</p>
                </section>
            }
            {isActive ? <Popup
                refOutside={refOutside}
                message={"Are you sure to delete this question?"}
                buttons={[{ label: "Cancel", action: () => { popupHandler(false, setIsActive) } }, { label: "Yes", action: confirmDeleteHandler }]}
            /> : null}
        </main>
    )
}

export default Dashboard