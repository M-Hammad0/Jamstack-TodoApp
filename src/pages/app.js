import { Router, Link } from "@reach/router"
import React,{ useContext } from "react"
import { IdentityContext } from "../../identity-context"
import Dashboard from "../components/Dashboard"

// let Dash = () => {
//   const { user } = useContext(IdentityContext)
//   return <div>Dash hasUser: {user && user.user_metadata.full_name}</div>
// }

let DashLoggedOut = props => {
  const {user, identity: netlifyIdentity } = useContext(IdentityContext)


  return (
    <div>
      <h1>Get Stuff Done!</h1>
      <Link to="/">home</Link>
      <Link to="/app">Dashboard</Link>
      <h3>Welcome {user && user.user_metadata.full_name}</h3>
      <button
        onClick={() => {
          netlifyIdentity.open()
        }}
      >
        Login
      </button>
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
