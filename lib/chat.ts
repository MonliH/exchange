import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export async function sendMessage(
  formValue: string,
  author: string,
  to: string,
  andThen: () => void
) {
  const chatsCol = collection(getFirestore(), "chatLogs");
  addDoc(chatsCol, {
    message: formValue,
    date: serverTimestamp(),
    author,
    to,
  }).then(() => {
    if (andThen) {
      andThen();
    }
  });
}
