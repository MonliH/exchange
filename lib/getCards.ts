import { CardType, CardInfo } from "lib/card";

export default function getCards(): CardInfo[] {
  return [
    {
      description: "I will teach you piano",
      time: 0.5,
      likes: 3,
      author: ["David", "Li"],
      location: "Kingston",
      remote: false,
      type: CardType.Music,
    },
    {
      description: "I will design a website",
      time: 1,
      likes: 2,
      author: ["Jayway", "Zhang"],
      location: null,
      remote: true,
      type: CardType.Design,
    },
    {
      description: "I will teach you Python",
      time: 1,
      likes: 1,
      author: ["John", "Doe"],
      location: null,
      remote: true,
      type: CardType.Programming,
    },
    {
      description: "I will teach you calculus",
      time: 0.75,
      likes: 5,
      author: ["Alice", "Smith"],
      location: "Kingston",
      remote: false,
      type: CardType.Math,
    },
    {
      description: "I will teach you English",
      time: 0.25,
      likes: 4,
      author: ["Bob", "Brown"],
      location: "Toronto",
      remote: false,
      type: CardType.Language,
    },
  ];
}
