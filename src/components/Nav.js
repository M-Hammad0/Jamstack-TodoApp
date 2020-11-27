import React from 'react'
import Navbar from 'react-bootstrap/Navbar'


const Nav = () => {
    return (
        <Navbar expand="lg" variant="light" bg="dark">
    <Navbar.Brand href="/">HOME</Navbar.Brand>
    <Navbar.Brand href="app">DASHBOARD</Navbar.Brand>
  </Navbar>
    )
}

export default Nav
