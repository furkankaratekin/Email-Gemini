import React, { useEffect, useState } from "react";
import { IoMdBook } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RiChatNewLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";


const Responder = () => {
  const [emailContent, setEmailContent] = useState(""); // State for email content
  const [shorthandResponse, setShorthandResponse] = useState(""); // State for shorthand response
  // State to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [submittedResponses, setSubmittedResponses] = useState({
    emailContent: "",
    shorthandResponse: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = currentUser.token;
  const [generatedContent, setGeneratedContent] = useState(""); // State for generated content
  const [listQuery, setListQuery] = useState([]);

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
  const refreshPage = () => {
    window.location.reload();
  };

  /* ---------AXIOS İLE İLGİLİ İŞLEMLER---------------------------------------------------------- */

  //yapay zeka ile sorgu yapan kısım.
  const handleSubmit = async (e) => {
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

    const bodyParameters = {
      firstprompt: emailContent,
      secondprompt: shorthandResponse,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/query/add",
        bodyParameters,
        config
      );
      console.log("Generated Content:", response.data.generatedContent);
      setGeneratedContent(response.data.generatedContent); // Save the generated content to state

        setListQuery((prevQueries) => [...prevQueries, response.data.query]);


      toast.success("Sorgu başarıyla gerçekleşti.");
    } catch (error) {
      console.error("Sorgu eklerken bir hata oluştu:", error);
      toast.error(
        `Sorgu eklenirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  //Tüm sorguları listeleme kısmı
  useEffect(() => {
    const fetchListQueries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/query/user-query/${currentUser._id}`
        );
        setListQuery(response.data);
      } catch (error) {
        console.error("Tüm sorgular yüklenirken bir hata oluştu!", error);
      }
    };

    fetchListQueries(); // Fonksiyonun doğru yerde çağrıldığından emin olun.
  }, []);

  //önceki sorguları id'ye göre listeleme kısmı

  //önceki sorguları id'ye göre silen kısım
  const handleDeleteQuery = async (queryId) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios.delete(
        `http://localhost:5000/api/query/delete/${queryId}`,
        config
      );
      toast.success("Yorum başarıyla silindi!");
      // Silinen yorumu yorum listesinden çıkar
      const updatedListQuery = listQuery.filter(
        (query) => query._id !== queryId
      );

      setListQuery(updatedListQuery);
    } catch (error) {
      console.error("Yorum silinirken bir hata oluştu:", error);
      toast.error(
        `Yorum silinirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  /*------------AXIOS İLE İŞLEMLER BİTİŞ-------------------------------------------------------------- */
  return (
    <div className="bg-gray-900">
      <div className="flex min-h-screen bg-black text-gray-100 ">
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
            {listQuery.map((query, index) => (
              <li
                key={query._id} // Daha güvenli bir key değeri için query'nin unique _id'sini kullanıyoruz.
                className="py-2 flex flex-col justify-between items-start hover:bg-gray-600 cursor-pointer mb-4"
              >
                <div className="flex justify-between items-start w-full">
                  <Link to={`/responder/${query._id}`}>
                    <div className="flex flex-col">
                      <div>{query.secondprompt || "Boş"}</div>
                    </div>
                  </Link>

                  <MdOutlineDelete
                    className="text-2xl ml-3 mr-3 text-gray-300 hover:text-red-500 self-start"
                    onClick={() => handleDeleteQuery(query._id)} // Burada düzeltme yapıldı
                  />
                </div>
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
            className="text-4xl cursor-pointer text-gray-200 relative top-5  left-5 z-50"
            onClick={toggleSidebar}
          />
          <div>
            <RiChatNewLine
              className="text-4xl ml-5 mt-10 cursor-pointer"
              onClick={refreshPage}
            />
          </div>

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
              <div className="bg-gray-900 text-white ">
                <div className="py-4">
                  <img
                    src="https://thumbs.dreamstime.com/z/user-profile-avatar-solid-black-line-icon-simple-vector-filled-flat-pictogram-isolated-white-background-134042540.jpg"
                    alt=""
                    className="mx-auto h-12 w-12 border-r rounded-full"
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

                  <p className="text-center mb-3 mt-7">
                    Sorgu yapma işlemi internet hızınıza bağlı olarak 10 ile 30
                    saniye arası sürmektedir.
                  </p>
                </div>
                <hr />
                <div className="py-4 mt-10">
                  <img
                    src="https://st3.depositphotos.com/4376739/19472/v/450/depositphotos_194722654-stock-illustration-artificial-intelligence-logo-artificial-intelligence.jpg"
                    alt=""
                    className="mx-auto h-12 w-12 rounded-full"
                  />
                  <h4 className="mt-10 text-center">
                    Çıktı olarak alınan mail
                  </h4>
                  <div className="p-4 bg-gray-800 mx-auto my-2 rounded-lg max-w-md content-container">
                    {generatedContent ? (
                      <p>{generatedContent}</p>
                    ) : (
                      <div className="loading"></div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/*           <button onClick={toggleDiv}>Değiştir </button>
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responder;
