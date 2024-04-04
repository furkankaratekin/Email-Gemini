import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Bu satırı genellikle ana componentinize eklemeniz daha iyi olur
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const ListQuery = () => {
  const { id } = useParams(); // URL'den ID'yi almak için useParams hook'unu kullanın
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [detailsQuery, setDetailsQuery] = useState(null);


  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/query/${id}`
        );
        setDetailsQuery(response.data);
      } catch(error) {
        console.error("Sorgular gelirken bir hata oluştu")
      }
    };
    fetchQueryDetails();
  },[id]); //id değiştiğinde useEffect tekrardan çalışır.
   if (!detailsQuery) {
    return <p>Yükleniyor...</p>;
   }




  return (
    <div className="bg-gray-800 min-h-screen">
      <div class="bg-gray-800 text-white">
        <section class="body-font">
          <div className="flex justify-center   ">
            <Link
              className=" mt-32 text-blue-500 hover:text-blue-700 text-lg font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              to="/responder"
            >
              Yeni Sohbet
            </Link>
          </div>
          <div class="container px-5 py-24 mx-auto flex flex-col">
            <div class="lg:w-4/6 mx-auto">
              <div class="flex flex-col sm:flex-row mt-10">
                <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div class="flex flex-col items-center text-center justify-center">
                    <h2 class="font-medium title-font mt-4 text-white text-lg">
                      {detailsQuery.secondprompt}
                    </h2>
                    <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <p class="text-base">{detailsQuery.firstprompt}</p>
                  </div>
                </div>
                <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-600 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p class="leading-relaxed text-lg mb-4">
                    {detailsQuery.output}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-56"></div>
        <Footer></Footer>
      </div>
    </div>
  );

   


}

export default ListQuery

/* 
Geçmiş sorguları burad
    <Link></Link>
   
    <p>{detailsQuery.firstprompt}</p>
    <p>{detailsQuery.secondprompt}</p>
    <p>{detailsQuery.output}</p>
    <p>{detailsQuery.updatedAt}</p>
    a göstereceğiz xkraltr */