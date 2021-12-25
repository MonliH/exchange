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
import { ExchangeType, ExRequest } from "lib/exchange";

export default async function getRequests(): Promise<
  (ExRequest & { key: string })[]
> {
  const dbRef = collection(getFirestore(), "requests");
  const q = query(dbRef, orderBy("likes"), limit(10));
  const snapshot = await getDocs(q);
  const results: Promise<ExRequest & { key: string }>[] = [];

  snapshot.forEach((d) => {
    const { description, time, likes, authorUid, location, remote } =
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
          place: { location, remote },
          author: { pfp: user.pfp, name: user.name, id: authorUid },
          key: d.id,
        } as ExRequest & { key: string };
      })()
    );
  });

  return Promise.all(results);

  return [
    {
      description: "I want to learn biology",
      time: 1.25,
      likes: 3,
      author: { name: "Lucy Miller", id: 8 },
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn piano",
      time: 0.75,
      likes: 7,
      author: { name: "Max Davis", id: 9 },
      place: {
        remote: false,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn French",
      time: 0.5,
      likes: 2,
      author: { name: "John Johnson", id: 10 },
      place: {
        remote: true,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn dance",
      time: 2,
      likes: 8,
      author: { name: "Joe Garcia", id: 11 },
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn web development",
      time: 1,
      likes: 3,
      author: { name: "Eyway Lai", id: 12 },
      place: {
        remote: false,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn psychology",
      time: 1.5,
      likes: 5,
      author: { name: "William Wilson", id: 13 },
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn to sing",
      time: 0.75,
      likes: 2,
      author: { name: "Tom Thomas", id: 14 },
      place: {
        remote: false,
        location: "Toronto",
      },
    },
  ].map(
    (old) =>
      ({
        ...old,
        key: old.author.id + old.description,
      } as ExRequest & { key: string })
  );
}
