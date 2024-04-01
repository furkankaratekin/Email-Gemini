import React, { useState } from "react";
import { IoMdBook } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Responder = () => {
  const [queries, setQueries] = useState([
    "Query 1",
    "Query 2",
    "Query 3",
    "Query 4",
    "Query 5",
  ]);

  // State to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to delete a query and show toast notification
  const deleteQuery = (index) => {
    setQueries((prev) => prev.filter((_, i) => i !== index));
    toast.success("Query silindi!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-gray-800 text-white h-full fixed top-0 left-0 overflow-hidden`}
      >
        {/* Sidebar content here */}
        <h2 className="text-xl p-5">Geçmiş Sorgularım</h2>
        <ul className="list-disc pl-10">
          {queries.map((query, index) => (
            <li
              key={index}
              className="py-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer"
            >
              {query}
              <MdOutlineDelete
                className="text-2xl mr-3"
                onClick={() => deleteQuery(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Main content wrapper including the toggle button */}
      <div
        className={`flex-1 transition-margin duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Toggle button */}
        <IoMdBook
          className="text-4xl cursor-pointer relative top-5 left-5 z-50"
          onClick={toggleSidebar}
        />

        {/* Main content */}
        <div className="p-10 mt-14">
          <h1>Main Content Here</h1>
          {/* Your main content */}
        </div>
      </div>
    </div>
  );
};

export default Responder;
