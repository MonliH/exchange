import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
} from "firebase/firestore";
import { WithKey, ExRequest } from "lib/exchange";

export default async function getRequests(): Promise<(ExRequest & WithKey)[]> {
  const dbRef = collection(getFirestore(), "requests");
  const q = query(dbRef, orderBy("likes", "desc"), limit(10));
  const snapshot = await getDocs(q);

  return Promise.all(
    snapshot.docs.map((d) => {
      const { description, time, likes, authorUid, location, remote } =
        d.data() as any;
      return (async () => {
        const docQ = doc(getFirestore(), "users", authorUid);
        const userDoc = await getDoc(docQ);
        const user = userDoc.data();
        return {
          description,
          time,
          likes,
          place: { location, remote },
          author: { pfp: user.pfp, name: user.name, id: authorUid },
          key: d.id,
        } as ExRequest & WithKey;
      })();
    })
  );
}
