import React, { useContext } from "react"
import { Link } from "gatsby"
import { IdentityContext } from "../../identity-context"

export default function Home() {
  const {user, identity: netlifyIdentity} = useContext(IdentityContext)


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
