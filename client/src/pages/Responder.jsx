import React, { useState } from "react";
import { IoMdBook } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCopy } from "react-icons/fa";

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
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [submittedResponses, setSubmittedResponses] = useState({
    emailContent: "",
    shorthandResponse: "",
  });

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
    /*  console.log("Email Content:", emailContent);
    console.log("Shorthand Response:", shorthandResponse); */

    // Add any additional actions you want to take after form submission here
    setSubmittedResponses({ emailContent, shorthandResponse });
    setShowFirstDiv(!showFirstDiv); // Gösterilen div'i değiştir
    // Clear the form fields after submission
    setEmailContent("");
    setShorthandResponse("");
  };



  /* ---------AXIOS İLE İLGİLİ İŞLEMLER---------------------------------------------------------- */






  
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
        {/* Burada 2 tane div olacak ve bu divler değişkenlik gösterecek */}
        <div>
          {" "}
          {showFirstDiv ? (
            //arama öncesi div
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
          ) : (
            //arama sonrası div
            <div className="bg-black text-white ">
              <div className="py-4">
                <img
                  src="https://media.istockphoto.com/id/1300845620/tr/vekt%C3%B6r/kullan%C4%B1c%C4%B1-simgesi-d%C3%BCz-beyaz-arka-plan-%C3%BCzerinde-izole-kullan%C4%B1c%C4%B1-sembol%C3%BC-vekt%C3%B6r-ill%C3%BCstrasyonu.jpg?s=612x612&w=0&k=20&c=BapxTLg8R3jjWnvaSXeHqgtou_-FcyBKmAkUsgwQzxU="
                  alt=""
                  className="mx-auto h-10 w-10"
                />
                <h4 className="mt-2 text-center">Yazılan email</h4>
                <div className="p-4 bg-gray-800 mx-auto my-2 rounded-lg max-w-md">
                  <p>{submittedResponses.emailContent}</p>
                </div>

                <h4 className="mt-10 text-center">
                  Nasıl bir şekilde yazacağın kısım
                </h4>
                <div className="p-4 bg-gray-800 mx-auto my-2 rounded-lg max-w-md">
                  <p>{submittedResponses.shorthandResponse}</p>
                </div>
              </div>
              <hr />
              <div className="py-4 mt-10">
                <img
                  src="https://media.istockphoto.com/id/1452604857/tr/foto%C4%9Fraf/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=WTKgDne7V_AuiC5JjaUF-50fABjpvIU_bKo9EmhD7rM="
                  alt=""
                  className="mx-auto h-14 w-14"
                />
                <h4 className="mt-10 text-center">Çıktı olarak alınan mail</h4>
                <div className="p-4 bg-gray-800 mx-auto my-2 rounded-lg max-w-md">
                  <p>
                    Gayet güzel falan çok iyi bir çıktı alındı göstermleik yazı
                  </p>
                </div>
              </div>
            </div>
          )}
          {/*           <button onClick={toggleDiv}>Değiştir </button>
           */}
        </div>
      </div>
    </div>
  );
};

export default Responder;
