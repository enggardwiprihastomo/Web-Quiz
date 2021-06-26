import Failed from "./failed";
import Passed from "./passed";

function Result(props: { score: number, route: string }) {

    return (
        <section className="result flex column centerX centerY">
            <p>Your score</p>
            <p>{props.score}</p>
            {props.score >= 75 ? <Passed /> : <Failed />}
            <div>
                <a className="btn-try-again" href={`/quiz/${props.route}`}>Try again</a>
                <a className="btn-home" href="/">Home</a>
            </div>
        </section>
    )
}

export default Result