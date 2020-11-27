import React, { useContext } from "react"
import { IdentityContext } from "../../identity-context"
import Button from "react-bootstrap/Button"
import Nav from "../components/Nav"

export default function Home() {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext)

  return (
    <div>
      <Nav />
      <h1>
        GET STUFF<span class="styling"> Done! </span>
      </h1>
      <div className="container">
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
