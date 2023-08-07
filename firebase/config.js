// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHynXMsUyrwt-_SyIWibozrG871VegjQA",
  authDomain: "rn-homework-c99d4.firebaseapp.com",
  projectId: "rn-homework-c99d4",
  storageBucket: "rn-homework-c99d4.appspot.com",
  messagingSenderId: "178461727784",
  appId: "1:178461727784:web:777585dfbe1481e79fa91d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
