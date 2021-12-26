import {
  getFirestore,
  orderBy,
  limit,
  query,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { WithKey, ExchangeInfo } from "lib/exchange";
import { getUserInfo } from "./chat";

export default async function getExchanges(): Promise<
  (ExchangeInfo & WithKey)[]
> {
  const dbRef = collection(getFirestore(), "exchanges");
  const q = query(dbRef, orderBy("likes", "desc"), limit(10));
  const snapshot = await getDocs(q);

  return Promise.all(
    snapshot.docs.map((d) => {
      const { description, time, likes, authorUid, location, remote, type } =
        d.data() as any;
      return (async () => {
        const user = await getUserInfo(authorUid);
        return {
          description,
          time,
          likes,
          type,
          place: { location, remote },
          author: user,
          key: d.id,
        } as ExchangeInfo & WithKey;
      })();
    })
  );
}
