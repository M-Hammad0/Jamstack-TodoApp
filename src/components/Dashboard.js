import React, { useReducer, useState,useEffect,useContext  } from 'react'
import {IdentityContext} from '../../identity-context'
import axios from 'axios'
import { gql, useQuery } from '@apollo/client'


// function reducer(state,action) {
//     switch(action.type) {
//         case "add-todo":
//             return {
//                 todos: [...state.todos, {text: action.text, completed: false}]
//             }
//         case "delete-todo":
//             return {
//                 todos: [...state.todos.filter((todo,idx) => idx !== action.idx)]
//             }    
//         default:
//             return state    
//     }
// }


const GET_LINKS = gql` 
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
      `



const Dashboard = () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext)
    const [text,setText] = useState("")

    const userName = user.user_metadata.full_name

    const { loading, error, data,refetch } = useQuery(GET_LINKS,{
        variables: {
            user: userName
        }
    })

    return (
        <div>
            <form>
                <input value={text} onChange={e => setText(e.target.value)}></input>
            </form>
            <button onClick={async(e) => {
                e.preventDefault()
                await axios.post('/.netlify/functions/createTodo',{
                    data: {
                        title: text,
                        user: userName
                    }
                })
                setText("")
                refetch()
            }
            }>add todo</button>
            {data && data.todosByUser.data.map((t,idx) => (
                <div key={idx}>
                <span>{t.title}</span>
                <button style={{marginLeft: "20px"}} onClick={async(e) => {
                    e.preventDefault()
                    await axios.delete('/.netlify/functions/deleteTodo',{
                        data: {
                            id: t._id
                        }
                    })
                    refetch()
                }}>delete</button>
                </div>
                
            ))}
        </div>
    )
}

export default Dashboard



