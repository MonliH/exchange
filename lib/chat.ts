import { getAuth } from "firebase/auth";

export function getChats() {
  getAuth().currentUser.uid;
}
