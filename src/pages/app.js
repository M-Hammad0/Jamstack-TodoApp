import { Router } from "@reach/router"
import React,{ useContext } from "react"
import { IdentityContext } from "../../identity-context"
import Dashboard from "../components/Dashboard"
import Nav from "../components/Nav"
import Button from 'react-bootstrap/Button'


let DashLoggedOut = props => {
  const {user, identity: netlifyIdentity } = useContext(IdentityContext)

  return (
    <div>
    <Nav />
    <h1>GET STUFF<span class="styling"> Done! </span></h1>
    <div className='container'>
    
      <h1>WELCOME {user && user.user_metadata.full_name.toUpperCase()}</h1>
      <Button
    variant="success"
        onClick={() => {
          netlifyIdentity.open()
        }}
      >
        Login
      </Button>
    </div>
      
    </div>
  )
}

export default props => {
  const { user } = useContext(IdentityContext)

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    )
  }
  return (
    <Router>
      <Dashboard path="/app" />
    </Router>
  )
}
