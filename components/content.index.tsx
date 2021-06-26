function Content({ refQuestion, language, selectedQuestion, content, handleAnswer }) {

    return (
        <section className="content-quiz flex centerX centerY" data-color={language} >
            <div ref={refQuestion} className="content-question flex centerX centerY column">
                <p>{content.question}</p>
                <ul>
                    {Object.keys(content.options).map(option => {
                        if (option !== "id") {
                            return (<li key={`key-${selectedQuestion}-${option}`}>
                                <input
                                    id={`radio-${selectedQuestion}-${option}`}
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    onClick={handleAnswer}
                                    defaultChecked={content.answer === option ? true : false}
                                />
                                <label htmlFor={`radio-${selectedQuestion}-${option}`} data-color={language}>
                                    {content.options[option]}
                                </label>
                            </li>)
                        }
                    }
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Content