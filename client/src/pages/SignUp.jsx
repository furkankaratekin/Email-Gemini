import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OAuth from "../components/OAuth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message || "An error occurred during signup.");
        toast.error(data.message || "An error occurred during signup.");
        return;
      }
      localStorage.setItem("signupSuccess", "true");
      toast.success("Hesabınız başarı ile oluşturuldu.");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong!");
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-violet-50 via-violet-200 to-gray-200 ...">
      <Navbar></Navbar>
      <ToastContainer />
      <div className="flex-grow mt-36">
        <div className="p-3 max-w-lg mx-auto">
      
          <h1 className="text-3xl text-center font-semibold my-7">Hesap Oluştur</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg"
            />
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg"
            />
            <input
              type="password"
              id="password"
              placeholder="Parola"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg"
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Parolayı Doğrula"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Hesap Oluştur"}
            </button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 mt-5">
            <p>Hesabınız var mı?</p>
            <Link to="/sign-in" className="text-blue-500">
              Giriş Yap
            </Link>
          </div>
          <p className="text-center mt-6">Şu an demo olduğu için email doğrulaması yoktur</p>
          <p className="text-center">Örnek email:namesurname@gmail.com</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
