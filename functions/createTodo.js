const axios = require("axios")
require("dotenv").config()
const sendQuery = require("./utils/sendQuery")

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      err: JSON.stringify("Method not supported"),
    }
  }

  const CREATE_TODO = `
    mutation ($title: String!, $user: String!){
    createTodo(data: {title:$title , user:$user, completed: false}){
      _id
      user
      title
      completed
    }
  }
`

  const { title, user } = JSON.parse(event.body)
  const variables = { title, user, completed: false }

  try {
    const { createTodo } = await sendQuery(CREATE_TODO, variables)
    return {
      statusCode: 200,
      body: JSON.stringify(createTodo),
    }
  } catch (error) {
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    }
  }
}
