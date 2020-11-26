const axios = require("axios"); // use nodejs syntax
require("dotenv").config(); // get env variables

exports.handler = async (event) => {


    const GET_LINKS = ` 
    query($user: String!){
      todosByUser(user: $user){
        data{
          _id
          title
          completed
          user
        }
      }
    }
      `;


  const { data: {data}} = await axios({
    url: "https://graphql.fauna.com/graphql", // url for all is same secret determines db
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET_KEY}`, // must write Bearer
    },
    data: {
      query: GET_LINKS,
      variables: {
          user: "not hammad"
      }
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};