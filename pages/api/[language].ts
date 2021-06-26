import executeQuery from "../../db";

export default async function (req, res) {
  const { method, query: { language }, body } = req

  const [{ id: id_language }] = await executeQuery({
    query: "SELECT id FROM languages WHERE name=?",
    values: [language]
  })

  switch (method) {
    case "GET":
      try {
        const results = await executeQuery({
          query: "SELECT questions.id AS question_id, answers.id AS answer_id, question, a, b, c, d, correct FROM questions INNER JOIN answers ON questions.id = answers.question_id WHERE questions.language_id=?",
          values: [id_language]
        })
        return res.json(results);

      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
    case "POST":
      try {
        const { question, options, answer } = body

        await executeQuery({
          query: "INSERT INTO questions(language_id, question) VALUES(?,?)",
          values: [id_language, question]
        })

        const [{ id: id_question }] = await executeQuery({
          query: "SELECT * FROM questions ORDER BY id DESC LIMIT 1",
          values: []
        })

        await executeQuery({
          query: "INSERT INTO answers(question_id, a, b, c, d, correct) VALUES(?,?,?,?,?,?)",
          values: [id_question, options.a, options.b, options.c, options.d, answer]
        })

        return res.json({ message: "New question has been successfully inserted to database" });

      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
    case "PUT":
      try {
        const { id_question, id_answer, question, options, answer } = body
        await executeQuery({
          query: "UPDATE questions SET question=? WHERE id=?",
          values: [question, id_question]
        })
        await executeQuery({
          query: "UPDATE answers SET a=?, b=?, c=?, d=?, correct=? WHERE id=?",
          values: [options.a, options.b, options.c, options.d, answer, id_answer]
        })
        return res.json({ message: "New question has been successfully updated from database" });
      }
      catch (err) {
        return res.status(500).json({ message: err.message })
      }
    case "DELETE":
      try {
        const { id_question, id_answer } = body
        await executeQuery({
          query: "DELETE FROM questions WHERE id=?",
          values: [id_question]
        })
        await executeQuery({
          query: "DELETE FROM answers WHERE id=?",
          values: [id_answer]
        })
        return res.json({ message: "A question has been successfully deleted from database" });
      }
      catch (err) {
        return res.status(500).json({ message: err.message })
      }
    default:
      return res.json([])
  }
}