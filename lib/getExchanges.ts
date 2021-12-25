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
import { ExchangeType, ExchangeInfo } from "lib/exchange";

export default async function getCards(): Promise<
  (ExchangeInfo & { key: string })[]
> {
  const dbRef = collection(getFirestore(), "exchanges");
  const q = query(dbRef, orderBy("likes"), limit(10));
  const snapshot = await getDocs(q);
  const results: Promise<ExchangeInfo & { key: string }>[] = [];

  snapshot.forEach((d) => {
    const { description, time, likes, authorUid, location, remote, type } =
      d.data() as any;
    results.push(
      (async () => {
        const docQ = doc(getFirestore(), "users", authorUid);
        const userDoc = await getDoc(docQ);
        const user = userDoc.data();
        return {
          description,
          time,
          likes,
          type,
          place: { location, remote },
          author: { pfp: user.pfp, name: user.name, id: authorUid },
          key: d.id,
        } as ExchangeInfo & { key: string };
      })()
    );
  });

  return Promise.all(results);

  return [
    {
      description: "I will teach you piano",
      time: 0.5,
      likes: 3,
      author: { name: "David Li", id: 1 },
      place: {
        location: "Toronto",
        remote: false,
      },
      type: ExchangeType.Music,
    },
    {
      description: "I will design a website",
      time: 1,
      likes: 2,
      author: { name: "Jayway Zhang", id: 2 },
      place: {
        location: null,
        remote: true,
      },
      type: ExchangeType.Design,
    },
    {
      description: "I will teach you Python",
      time: 1,
      likes: 1,
      author: { name: "John Doe", id: 3 },
      place: {
        location: null,
        remote: true,
      },
      type: ExchangeType.Programming,
    },
    {
      description: "I will teach you calculus",
      time: 0.75,
      likes: 5,
      author: { name: "Alice Smith", id: 4 },
      place: {
        location: "Toronto",
        remote: false,
      },
      type: ExchangeType.Math,
    },
    {
      description: "I will teach you English",
      time: 0.5,
      likes: 4,
      author: { name: "Bob Brown", id: 5 },
      place: {
        location: "Toronto",
        remote: false,
      },
      type: ExchangeType.Language,
    },
    {
      description: "I will mow your lawn",
      time: 1,
      likes: 5,
      author: { name: "John Ford", id: 6 },
      place: {
        location: "Toronto",
        remote: false,
      },
      type: ExchangeType.Service,
    },
    {
      description: "I will teach you geography",
      time: 1.5,
      likes: 2,
      author: { name: "Mandy Miller", id: 7 },
      place: {
        location: null,
        remote: true,
      },
      type: ExchangeType.Social_Studies,
    },
  ].map(
    (old) =>
      ({
        ...old,
        key: old.author.id + old.description,
      } as ExchangeInfo & { key: string })
  );
}
