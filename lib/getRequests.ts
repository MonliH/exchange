import { EchangeType, ExRequest } from "lib/exchange";

export default function getRequests(): (ExRequest & { key: string })[] {
  return [
    {
      description: "I want to learn biology",
      time: 1.25,
      likes: 3,
      author: ["Lucy", "Millier", 5],
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn biology",
      time: 1.25,
      likes: 3,
      author: ["Lucy", "Millier", 5],
      place: {
        remote: true,
        location: null,
      },
    },
  ].map(
    (old) =>
      ({
        ...old,
        key: old.author.join("_") + old.description,
      } as ExRequest & { key: string })
  );
}
