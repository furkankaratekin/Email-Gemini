import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      Home Ekran


      <Link to="/responder">
        try it
      </Link>

      <Link to="/sign-in">
        Giriş yap
      </Link>

      <Footer></Footer>
    </div>
  )
}

export default Home
