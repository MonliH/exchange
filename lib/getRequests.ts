import { ExchangeType, ExRequest } from "lib/exchange";

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
      description: "I want to learn piano",
      time: 0.75,
      likes: 7,
      author: ["Max", "Davis", 6],
      place: {
        remote: false,
        location: "Kingston",
      },
    },
    {
      description: "I want to learn French",
      time: 0.5,
      likes: 2,
      author: ["John", "Johnson", 7],
      place: {
        remote: true,
        location: "Kingston",
      },
    },
    {
      description: "I want to learn dance",
      time: 2,
      likes: 8,
      author: ["Joe", "Garcia", 8],
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn web development",
      time: 1,
      likes: 3,
      author: ["Eyway", "Lai", 9],
      place: {
        remote: false,
        location: "Kingston",
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
