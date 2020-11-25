import React, { useEffect } from "react"
import netlifyIdentity from 'netlify-identity-widget'
import { Link } from "gatsby";



export default function Home() {
  useEffect(() => {
    netlifyIdentity.init({});
  })
  return <div>
    <h1>Get Stuff Done!</h1>
    <Link to='/'></Link>
    <Link to='/app'></Link>
    <button onClick={() => {
      netlifyIdentity.open()
    }}>Login</button>
  </div>
}
