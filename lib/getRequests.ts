import { ExchangeType, ExRequest } from "lib/exchange";

export default function getRequests(): (ExRequest & { key: string })[] {
  return [
    {
      description: "I want to learn biology",
      time: 1.25,
      likes: 3,
      author: ["Lucy", "Millier", 8],
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn piano",
      time: 0.75,
      likes: 7,
      author: ["Max", "Davis", 9],
      place: {
        remote: false,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn French",
      time: 0.5,
      likes: 2,
      author: ["John", "Johnson", 10],
      place: {
        remote: true,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn dance",
      time: 2,
      likes: 8,
      author: ["Joe", "Garcia", 11],
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn web development",
      time: 1,
      likes: 3,
      author: ["Eyway", "Lai", 12],
      place: {
        remote: false,
        location: "Toronto",
      },
    },
    {
      description: "I want to learn psychology",
      time: 1.5,
      likes: 5,
      author: ["William", "Wilson", 13],
      place: {
        remote: true,
        location: null,
      },
    },
    {
      description: "I want to learn psychology",
      time: 1.5,
      likes: 5,
      author: ["Tom", "Thomas", 14],
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
