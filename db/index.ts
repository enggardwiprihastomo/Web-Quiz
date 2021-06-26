import mysql from "serverless-mysql";

interface IQuery {
    query: string
    values?: any[]
}

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
})

async function executeQuery({ query, values }: IQuery) {
    try {
        const results = await db.query(query, values || [])
        await db.end()
        return results
    } catch (err) {
        throw Error(err.message)
    }
}

export default executeQuery