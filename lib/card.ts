export enum CardType {
  Music = 1,
  Programming = 2,
  Math = 3,
  Language = 4,
  Design = 5,
  Social_Studies = 6,
  Service = 7,
}

export function getCardColor(ty: CardType): string {
  let hue = {
    [CardType.Music]: 0,
    [CardType.Programming]: 120,
    [CardType.Math]: 212,
    [CardType.Language]: 68,
    [CardType.Design]: 306,
    [CardType.Social_Studies]: 29,
    [CardType.Service]: 176,
  }[ty];
  return `hsl(${hue}, 100%, 84%)`;
}

export function getCategoryName(ty: CardType): string {
  return CardType[ty];
}

export const TY_IMG_MAP = {
  [CardType.Music]: "/images/piano.png",
  [CardType.Programming]: "/images/laptop.png",
  [CardType.Math]: "/images/calculator.png",
  [CardType.Language]: "/images/language.png",
  [CardType.Design]: "/images/design.png",
};

export interface CardInfo {
  description: string;
  time: number;
  likes: number;
  author: [string, string];
  remote: boolean;
  location: null | string;
  type: CardType;
}
