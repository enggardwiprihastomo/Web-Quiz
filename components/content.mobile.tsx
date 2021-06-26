function MobileContent({ refQuestion, language, selectedQuestion, content, handleAnswer }) {
    return (
        <section className="content-quiz-mobile flex column" data-color={language} >
            {language && <img src={`../../ic-${language}.svg`} alt="Programming language" />}
            <div>
                <p>Question</p>
                <p>{content.question}</p>
            </div>
            <span>{language && language.toUpperCase()}</span>
            <div className="flex centerX centerY" data-color={language}>
                <ul ref={refQuestion}>
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

export default MobileContent