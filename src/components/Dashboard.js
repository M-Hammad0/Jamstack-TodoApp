import React, { useState,useContext  } from 'react'
import {IdentityContext} from '../../identity-context'
import axios from 'axios'
import { gql, useQuery } from '@apollo/client'
import '../global.css'
import Nav from './Nav'



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

    const { user } = useContext(IdentityContext)
    const [text,setText] = useState("")

    const userName = user.user_metadata.full_name

    const {data,refetch } = useQuery(GET_LINKS,{
        variables: {
            user: userName
        }
    })


    return (
        <div>
        <Nav />
        <h1><span class="styling">TODO</span>List</h1>

            <div class="input_div">
            <input class="input" placeholder="What Do You Want to Do ..." value={text} onChange={e => setText(e.target.value)}></input>
            <button class="addButton" onClick={async(e) => {
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
            }><span style={{fontSize: "1.5rem"}}>+</span></button>
    </div>
    <div class="container">
    </div>
            <div className='container'>
            {data && data.todosByUser.data.map((t,idx) => (
                <div className="item" key={idx}>
                <div >
                <span style={{float: "left"}} >{t.title}</span>
                <button className="removeButton" onClick={async(e) => {
                    e.preventDefault()
                    await axios.delete('/.netlify/functions/deleteTodo',{
                        data: {
                            id: t._id
                        }
                    })
                    refetch()
                }}><span role='img' aria-label='dustbin-emoji'>🗑️</span></button>
                </div>
                
                </div>
                
            ))}
            </div>
            
            
        </div>
    )
}

export default Dashboard



