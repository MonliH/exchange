export enum EchangeType {
  Music = 1,
  Programming = 2,
  Math = 3,
  Language = 4,
  Design = 5,
  Social_Studies = 6,
  Service = 7,
}

export function getCardColor(ty: EchangeType): string {
  let hue = {
    [EchangeType.Music]: 0,
    [EchangeType.Programming]: 120,
    [EchangeType.Math]: 212,
    [EchangeType.Language]: 68,
    [EchangeType.Design]: 306,
    [EchangeType.Social_Studies]: 29,
    [EchangeType.Service]: 176,
  }[ty];
  return `hsl(${hue}, 100%, 84%)`;
}

export function getCategoryName(ty: EchangeType): string {
  return EchangeType[ty];
}

export const TY_IMG_MAP = {
  [EchangeType.Music]: "/images/piano.png",
  [EchangeType.Programming]: "/images/laptop.png",
  [EchangeType.Math]: "/images/calculator.png",
  [EchangeType.Language]: "/images/language.png",
  [EchangeType.Design]: "/images/design.png",
};

export interface Place {
  remote: boolean;
  location: null | string;
}

export type Author = [string, string, number];

export interface ExRequest {
  description: string;
  time: number;
  likes: number;
  author: Author;
  place: Place;
}

export interface ExchangeInfo extends ExRequest {
  type: EchangeType;
}
