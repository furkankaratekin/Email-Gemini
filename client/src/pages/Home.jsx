import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../../src/App.css"; // CSS dosyanızın adına bağlı olarak değişiklik yapın

const generateBalloons = (num) => {
  return Array.from({ length: num }).map((_, index) => ({
    id: index,
    size: Math.random() * (1.2 - 0.6) + 0.6, // 0.6 ile 1.2 arasında rastgele bir büyüklük
    startX: Math.random() * 100, // %0 ile %100 arasında rastgele bir başlangıç noktası
    animationDuration: Math.random() * (30 - 15) + 15, // 15 ile 30 saniye arasında rastgele bir animasyon süresi
  }));
};

const Home = () => {
   const [balloons, setBalloons] = useState([]);

   useEffect(() => {
     setBalloons(generateBalloons(20)); // Balon sayısını 20 olarak ayarlayalım
   }, []);
  return (
    <div className="min-h-screen animatedBackground flex flex-col justify-between">
      <div className="flex-grow">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="balloon"
            style={{
              transform: `scale(${balloon.size})`,
              left: `${balloon.startX}%`,
              animationDuration: `${balloon.animationDuration}s`,
            }}
          ></div>
        ))}
        <div className="content text-center">
          <h1 className="text-[#FBFAEE] font-bold mt-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            E-MAİL CEVAPLAYICI
          </h1>
          <h4 className="text-[#FBFAEE] text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-5 mx-4 sm:mx-6">
            Yapay Zeka İle Maillerini Hızlıca Cevapla
          </h4>
          <p className="text-[#FBFAEE] mt-8 hover:text-[#FAF9E6] transition duration-150 ease-in-out">
            Bu yapay zeka ile e-postalarınızı zahmetsizce yönetmenin keyfini
            çıkarın
          </p>

          <div className="mt-20  flex justify-center gap-2 mx-4  ">
            <Link
              className="text-blue-500 hover:text-blue-700 text-lg font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              to="/responder"
            >
              Dene
            </Link>
            <Link
              className="text-blue-500 hover:text-blue-700 text-lg font-semibold py-2 px-4 ml-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              to="/sign-in"
            >
              Giriş yap
            </Link>
          </div>
          <p className="text-violet-300 mt-8 hover:text-[#FAF9E6] transition duration-150 ease-in-out">
            Bu Yapay Zekayı Kullanabilmek İçin Giriş Yapılmalıdır
          </p>
        </div>
      </div>
      <Footer className="w-full" />
    </div>
  );
};

export default Home;
