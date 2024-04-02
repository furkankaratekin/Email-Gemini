import Query from "../models/query.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

//Tüm sorguları getir

//SorguID'ye göre ID'yi getir

//KullanıcıID'ye göre sorguları getir.

//Kullanıcı ID'ye göre sorgu oluştur
export const addQuery = async (req, res, next) => {
  if (req.body.password) {
    return next(errorHandler(401, "You can update only your account"));
  } else {
    try {
      // Kullanıcı giriş yapmış, tarif ekleme işlemi gerçekleştir
      const { firstprompt, secondprompt } = req.body;

      // Yeni tarif nesnesi oluştur
      const newQuery = new Query({
        firstprompt,
        secondprompt,
        createdBy: req.user.id, // Kullanıcının ID'si, tarifi kimin oluşturduğunu belirlemek için
      });

      // Yeni tarifi veritabanına kaydet
      const savedQuery = await newQuery.save();

      // Başarılı bir şekilde kaydedildiğine dair yanıt gönder
      res.status(201).json(savedQuery);
    } catch (error) {
      next(error);
    }
  }
};

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
