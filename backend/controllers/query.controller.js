import Query from "../models/query.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

//Kullanıcı ID'ye göre sorgu oluştur
const genAIKey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(genAIKey);

export const addQuery = async (req, res, next) => {
  if (req.body.password) {
    return next(errorHandler(401, "You can update only your account"));
  } else {
    try {
      // Kullanıcı giriş yapmış, tarif ekleme işlemi gerçekleştir
      const { firstprompt, secondprompt } = req.body;

      // İçerik üretmek için Google Generative AI kullanılır
      //const prompt = `${firstprompt} ${secondprompt}`;
      const prompt = `Merhaba, sana birazdan iki tane prompt vereceğim (firstprompt ve secondprompt). İlk prompt bana gelen e-mail olacak, 2.prompt ise o gelen maile nasıl karşılık vermeni istediğim prompt olacak. Birinci prompt ${firstprompt} , ikinci prompt ise ${secondprompt} bu şekilde . Bu verdiğim promptlara göre kişiye özel (maildeki ada ve ünvana göre) bir geri dönüş e-maili yazar mısın .Bir de firstprompt secondpropmt yazma sadece e-mail olarak cevap ver`;
      const genAI = new GoogleGenerativeAI(genAIKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedContent = await response.text();
      //console.log(response.text());

      // Yeni tarif nesnesi oluştur
      const newQuery = new Query({
        firstprompt,
        secondprompt,
        createdBy: req.user.id, // Kullanıcının ID'si, tarifi kimin oluşturduğunu belirlemek için
        output: generatedContent,
      });

      // Yeni tarifi veritabanına kaydet
      const savedQuery = await newQuery.save();

      // Başarılı bir şekilde kaydedildiğine dair yanıt gönder
      res.status(201).json({ query: savedQuery, generatedContent });
    } catch (error) {
      console.error("Error in addQueryAndGenerateContent:", error);

      next(error);
    }
  }
};

//SorguID'ye göre sorguları getir
export const getQueryById = async (req, res) => {
  try {
    //URL'den gelen ID parametresini al
    const { id } = req.params;

    //Doğrudan _id değerini kullanarak tarifi bul
    const query = await Query.findOne({ _id: id });

    if (!query) {
      return res.status(404).json({ message: "Sorgu Bulunamadı" });
    }

    // Tarif bulunursa, tarifi JSON formatında döndür
    res.json(query);
  } catch (error) {
    // Hata oluşursa, 500 hatası ile hata mesajını döndür
    res.status(500).json({ message: error.message });
  }
};

//KullanıcıID'ye göre sorguları getir.
export const getQueryByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const queries = await Query.find({ createdBy: userId });

    //Eğer sorgular bulunursa,bunları JSON formatına çevir
    if (queries.length > 0) {
      res.json(queries);
    } else {
      res.status(404).json({ message: "Bu kullanıcıya ait sorgu yoktur" });
    }
    console.log("Sorgular" + queries);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//Kullanıcının yaptığı girişe göre query'leri sil
export const deleteQuery = async (req, res) => {
  const { queryId } = req.params;

  try {
    const query = await Query.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    // Token ile gelen kullanıcı bilgilerini kullanarak kullanıcıyı bul
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Query.findByIdAndDelete(queryId);
    // Başarı yanıtı dön
    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};















//Yorumu sil
/* export const deleteComment = async (req, res) => {
  const { commentId } = req.params; // Yorumun ID'sini URL parametresinden al

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Token ile gelen kullanıcı bilgilerini kullanarak kullanıcıyı bul
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Yorumun sahibi ile isteği yapan kullanıcı aynı mı kontrol et
    if (comment.user_username !== user.username) {
      // Kullanıcılar eşleşmiyorsa yetki hatası ver
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    // Yorumu sil
    await Comment.findByIdAndDelete(commentId);

    // Başarı yanıtı dön
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

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
