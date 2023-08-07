import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";

export const uploadPhotoToServer = async (file) => {
  try {
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("error.message >>", error.message);
  }
};

export const addPostToServer = async (
  photo,
  title,
  locality,
  coords,
  userId,
  login
) => {
  try {
    await addDoc(collection(db, "posts"), {
      photo,
      title,
      locality,
      coords,
      userId,
      login,
      commentsCount: 0,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsById = async (userId) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    return await getDocs(q);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = async () => {
  try {
    return await getDocs(collection(db, "posts"));
  } catch (error) {
    console.log(error.message);
  }
};

export const getComments = async (postId) => {
  try {
    const refPost = doc(db, "posts", postId);
    const comments = await getDocs(collection(refPost, "comments"));
    return comments;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentsCount = async (postId) => {
  try {
    const refPost = doc(db, "posts", postId);
    const comments = await getDocs(collection(refPost, "comments"));
    return comments._snapshot.docs.sortedSet.root.size;
  } catch (error) {
    console.log(error.message);
  }
};

export const addCommentToServer = async (comment, login, postId) => {
  try {
    const ref = doc(db, "posts", postId);
    await addDoc(collection(ref, "comments"), {
      comment,
      login,
      createdAt: serverTimestamp(),
    });
    // await updateDoc(collection(ref), {commentsCount:})
  } catch (error) {
    console.log(error);
  }
};
