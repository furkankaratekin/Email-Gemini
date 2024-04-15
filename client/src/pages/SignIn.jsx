import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"

        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        toast.error(data.message || "Sign in failed");
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("Signed in successfully");
      navigate("/responder");
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    // Local storage'da signupSuccess kontrolü
    if (localStorage.getItem("signupSuccess")) {
      toast.success("Giriş yapıldı");
      localStorage.removeItem("signupSuccess");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-violet-50 via-violet-200 to-gray-200 ...">
      <Navbar></Navbar>
      <ToastContainer />
      <div className="flex-grow mt-36">
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Giriş Yap</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="E-mail"
              id="email"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Parola"
              id="password"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Giriş Yap"}
            </button>
           {/*  <OAuth /> */}
          </form>
          <div className="flex gap-2 mt-5">
            <p>Hesabını Yok mu?</p>
            <Link to="/sign-up">
              <span className="text-blue-500">Üye Ol</span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
