interface IOption {
    id?: number
    a: string
    b: string
    c: string
    d: string
}

interface IQuestion {
    id?: number
    question: string
    options: IOption
    correct: string
    answer?: string
}

const API_URL = "http://localhost:3000/api"

async function fetchData(url: string, method: string = "GET", body: any = {}) {
    if (method.toUpperCase() === "GET") {
        const response = await fetch(url)
        return response.json()
    }

    const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return response.json()
}

function popupHandler(state: boolean, setState: (value: boolean) => void) {
    document.body.style.overflow = state ? "hidden" : "auto"
    if (state) {
        Promise.resolve(setState(state))
            .then(() => document.querySelector(".popup").style.top = `${window.scrollY}px`)
    }
    else {
        setState(state)
    }
}

function setProgressBar(value: number, progress: number, ref: any) {
    ref.current.style.width = progress ? `${progress * value}%` : "100%"
}

function calculateScore(data: IQuestion[]) {
    return Math.round(data.reduce((sum, value) => value.answer === value.correct ? sum + 1 : sum, 0) / data.length * 100)
}


function parseQuestionList(questions: []) {
    return questions.map(question => {
        return {
            id: question.question_id,
            question: question.question,
            options: {
                id: question.answer_id,
                a: question.a,
                b: question.b,
                c: question.c,
                d: question.d,
            },
            correct: question.correct
        }
    })
}

function slideLeft(selected: number, setState: (value: number) => void, ref: any) {
    ref.current.style.left = "-100%"
    setTimeout(() => {
        ref.current.style.opacity = "0"
        ref.current.style.left = "200%"
        setState(selected)
        setTimeout(() => {
            ref.current.style.opacity = "1"
            ref.current.style.left = "50%"

        }, 125);
    }, 125);
}

function slideRight(selected: number, setState: (value: number) => void, ref: any) {
    ref.current.style.left = "200%"
    setTimeout(() => {
        ref.current.style.opacity = "0"
        ref.current.style.left = "-100%"
        setState(selected)
        setTimeout(() => {
            ref.current.style.opacity = "1"
            ref.current.style.left = "50%"
        }, 125);
    }, 125);
}

export { popupHandler, setProgressBar, calculateScore, slideLeft, slideRight, fetchData, parseQuestionList, API_URL }

export type { IQuestion, IOption }