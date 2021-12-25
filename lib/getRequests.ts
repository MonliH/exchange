import { ExchangeType, ExRequest } from "lib/exchange";

export default function getRequests(): (ExRequest & { key: string })[] {
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
