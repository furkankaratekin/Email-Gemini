import Query from "../models/query.model";
import User from "../models/user.model";
import bcryptjs from 'bcryptjs';

//Tüm sorguları getir



//SorguID'ye göre ID'yi getir




//KullanıcıID'ye göre sorguları getir.





//Kullanıcı ID'ye göre  bir sorgu oluşturma
/* export const addQuery = async (req,res,next) => {
    if(req.body.password)
} */





//Kullanıcı ID'ye göre sorguyu sil














//Aşağıdaki kod bana örnek olması için yazılmıştır. 
//Bu kod tarafında girilen prompt sayesinde arama yapılabiliyor.


/* const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBNaReRTooBxrDIvM1w1ovIzBZwHSMKp0g");

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
    "Su anda java threadsler üzerinde çalısıyorum. Bana kisa bir ornekle acıklar misin";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
 */