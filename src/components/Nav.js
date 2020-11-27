import React,{useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { IdentityContext } from "../../identity-context"
import Button from "react-bootstrap/Button"



const Nav = () => {
    const { identity: netlifyIdentity } = useContext(IdentityContext)

    return (
        <Navbar expand="lg" variant="light" bg="dark">
    <Navbar.Brand href="/">HOME</Navbar.Brand>
    <Navbar.Brand href="app">DASHBOARD</Navbar.Brand>
    <Button size="sm" className="float-right" variant="secondary" onClick={() => {netlifyIdentity.open()}}>SignOut</Button>
  </Navbar>
    )
}

export default Nav
