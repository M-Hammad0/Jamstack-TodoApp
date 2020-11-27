const axios = require("axios");
require("dotenv").config();

exports.handler = async (event) => {
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

  const {data:{title,user}} = JSON.parse(event.body)

  try {
    const {data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET_KEY}`,
      },
      data: {
        query: CREATE_TODO,
        variables: {
          title,
          user,
          completed: false
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data), // stringyfy json to send to faunadb
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    };
  }
};
