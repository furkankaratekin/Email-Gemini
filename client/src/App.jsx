import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Responder from './pages/Responder'
import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
const App = () => {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/responder" element={<Responder />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
