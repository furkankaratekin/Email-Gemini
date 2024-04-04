import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Bu satırı genellikle ana componentinize eklemeniz daha iyi olur
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


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




  return <div>Geçmiş sorguları burad
   
    <p>{detailsQuery.firstprompt}</p>
    <p>{detailsQuery.secondprompt}</p>
    <p>{detailsQuery.updatedAt}</p>
    a göstereceğiz xkraltr</div>;

   


}

export default ListQuery
