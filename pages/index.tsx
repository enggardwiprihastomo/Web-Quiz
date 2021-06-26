function Home() {
  return (
    <main className="quiz flex centerX centerY">
      <ul className="grid">
        <li>
          <a href="/quiz/html">
            <img src="./ic-html.svg" alt="HTML" />
            <p>HTML</p>
          </a>
        </li>
        <li>
          <a href="/quiz/css">
            <img src="./ic-css.svg" alt="CSS" />
            <p>CSS</p>
          </a>
        </li>
        <li>
          <a href="/quiz/react">
            <img src="./ic-react.svg" alt="React" />
            <p>React</p>
          </a>
        </li>
        <li>
          <a href="/quiz/node.js">
            <img src="./ic-node.js.svg" alt="Node.Js" />
            <p>Node.Js</p>
          </a>
        </li>
      </ul>
    </main>
  )
}

export default Home