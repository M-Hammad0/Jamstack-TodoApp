const axios = require("axios")
require("dotenv").config()

exports.handler = async event => {
  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      err: JSON.stringify("Method not supported"),
    }
  }

  const DELETE_TODO = `
    mutation ($id: ID!){
        deleteTodo(id: $id){
                _id
            }
    }`

  const { id } = JSON.parse(event.body)

  try {
    const { deleteTodo } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET_KEY}`,
      },
      data: {
        query: DELETE_TODO,
        variables: {
          id,
        },
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(deleteTodo), // stringyfy json to send to faunadb
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    }
  }
}
