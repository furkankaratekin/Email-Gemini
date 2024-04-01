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
  const [emailContent, setEmailContent] = useState(""); // State for email content
  const [shorthandResponse, setShorthandResponse] = useState(""); // State for shorthand response

  // State to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to delete a query and show toast notification
  const deleteQuery = (index) => {
    setQueries((prev) => prev.filter((_, i) => i !== index));
    toast.success("Query deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  // Check if either input is empty and show an error toast if so
  if (!emailContent.trim() || !shorthandResponse.trim()) {
    toast.error("Lütfen tüm alanları doldurun.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return; // Exit the submit handler if any field is empty
  }
  console.log("Email Content:", emailContent);
  console.log("Shorthand Response:", shorthandResponse);
  // Add any additional actions you want to take after form submission here
  
  // Clear the form fields after submission
  setEmailContent("");
  setShorthandResponse("");
};

  return (
    <div className="flex min-h-screen bg-black text-gray-100">
      <ToastContainer />
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-gray-700 text-white h-full fixed top-0 left-0 overflow-hidden`}
      >
        {/* Sidebar içeriği burada */}
        <h2 className="text-xl p-5">My Previous Queries</h2>
        <ul className="list-disc pl-10">
          {queries.map((query, index) => (
            <li
              key={index}
              className="py-2 flex justify-between items-center hover:bg-gray-600 cursor-pointer"
            >
              {query}
              <MdOutlineDelete
                className="text-2xl mr-3 text-gray-300 hover:text-red-500"
                onClick={() => deleteQuery(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Ana içerik kutusu, yan çubuk açma/kapama butonu dahil */}
      <div
        className={`flex-1 transition-margin duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } bg-gray-900`}
      >
        {/* Toggle buton */}
        <IoMdBook
          className="text-4xl cursor-pointer text-gray-200 relative top-5 left-5 z-50"
          onClick={toggleSidebar}
        />

        {/* Ana içerik */}
        <div className="p-10 mt-14">
          {/* Email Yanıtlayıcı Formu */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-4xl mx-auto"
          >
            <h3 className="text-3xl mb-12">Email Cevaplayıcı</h3>
            <p className="text-lg mb-2">
              Yapay zeka ile kolayca e-maillerini cevapla
            </p>
            <div>
              <label
                htmlFor="emailContent"
                className="block text-sm font-medium text-gray-200"
              >
                Email to Respond To
              </label>
              <textarea
                id="emailContent"
                rows="6"
                className="mt-1 block w-full border border-gray-800 rounded-lg shadow-sm bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste the email you want to respond to"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="shorthandResponse"
                className="block text-sm font-medium text-gray-200"
              >
                Shorthand Response
              </label>
              <textarea
                id="shorthandResponse"
                rows="4" // Bu değeri artırarak başlangıçta daha fazla satır gösterilmesini sağladık
                className="mt-1 block w-full border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Thanks!"
                value={shorthandResponse}
                onChange={(e) => setShorthandResponse(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Varsayılan işlemi engelle
                    handleSubmit(e); // Gönderme işleyicisini çağır
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Responder;
