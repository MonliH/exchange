import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { User } from "./exchange";

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

export async function getUserInfo(uid: string): Promise<User> {
  const docQ = doc(getFirestore(), "users", uid);
  const userDoc = await getDoc(docQ);
  const user = userDoc.data();
  return { ...user, id: uid } as User;
}
