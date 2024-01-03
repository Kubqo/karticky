import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { database } from "../../firebase";

export const getAllIncorrectQuestion = async (
  uid: string,
  questionType: string
) => {
  const snapshot = await getDocs(
    collection(database, `incorrectQuestions/${uid}/${questionType}`)
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    question: doc.data().question,
  }));
};

export const addToIncorrectQuestions = async (
  question: string[],
  uid: string,
  questionType: string
) => {
  await addDoc(
    collection(database, `incorrectQuestions/${uid}/${questionType}`),
    {
      question,
    }
  );
};

export const deleteIncorrectQuestion = async (
  uid: string,
  id: string,
  questionType: string
) => {
  await deleteDoc(
    doc(database, `incorrectQuestions/${uid}/${questionType}`, id)
  );
};
