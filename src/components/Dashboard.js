import React, { useReducer, useState,useEffect,useContext  } from 'react'
import { graphql } from "gatsby"
import {IdentityContext} from '../../identity-context'
import axios from 'axios'


function reducer(state,action) {
    switch(action.type) {
        case "add-todo":
            return {
                todos: [...state.todos, {text: action.text, completed: false}]
            }
        case "delete-todo":
            return {
                todos: [...state.todos.filter((todo,idx) => idx !== action.idx)]
            }    
        default:
            return state    
    }
}

const Dashboard = () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext)

    useEffect(() => {
        const gettodo = async () => {
            const {data} = await axios.get('.netlify/functions/getTodo')
            console.log(data)
        }
        gettodo()
     },[])

    // const {loading,data,error} = useQuery(GET_TODOS,{
    //     variables: {
    //         user: user
    //     }
    // })

    return (
        <div>
            <form>
                <input></input>
            </form>
            {/* {todos && todos.map((t,idx) => (
                <div key={idx}>
                <span>{t.text}</span>
                <button style={{marginLeft: "20px"}} onClick={() => dispatch({type: 'delete-todo', idx})}>delete</button>
                </div>
                
            ))} */}
        </div>
    )
}

export default Dashboard
