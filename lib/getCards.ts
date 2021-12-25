import { EchangeType, ExchangeInfo } from "lib/exchange";

export default function getCards(): (ExchangeInfo & { key: string })[] {
  return [
    {
      description: "I will teach you piano",
      time: 0.5,
      likes: 3,
      author: ["David", "Li", 1],
      place: {
        location: "Kingston",
        remote: false,
      },
      type: EchangeType.Music,
    },
    {
      description: "I will design a website",
      time: 1,
      likes: 2,
      author: ["Jayway", "Zhang", 2],
      place: {
        location: null,
        remote: true,
      },
      type: EchangeType.Design,
    },
    {
      description: "I will teach you Python",
      time: 1,
      likes: 1,
      author: ["John", "Doe", 3],
      place: {
        location: null,
        remote: true,
      },
      type: EchangeType.Programming,
    },
    {
      description: "I will teach you calculus",
      time: 0.75,
      likes: 5,
      author: ["Alice", "Smith", 4],
      place: {
        location: "Kingston",
        remote: false,
      },
      type: EchangeType.Math,
    },
    {
      description: "I will teach you English",
      time: 0.25,
      likes: 4,
      author: ["Bob", "Brown", 5],
      place: {
        location: "Toronto",
        remote: false,
      },
      type: EchangeType.Language,
    },
  ].map(
    (old) =>
      ({
        ...old,
        key: old.author.join("_") + old.description,
      } as ExchangeInfo & { key: string })
  );
}
