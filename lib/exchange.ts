export enum ExchangeType {
  Music = 0,
  Programming = 1,
  Math = 2,
  Language = 3,
  Design = 4,
  Social_Studies = 5,
  Service = 6,
}

export function getCardColor(ty: ExchangeType): string {
  let hue = {
    [ExchangeType.Music]: 0,
    [ExchangeType.Programming]: 120,
    [ExchangeType.Math]: 212,
    [ExchangeType.Language]: 68,
    [ExchangeType.Design]: 306,
    [ExchangeType.Social_Studies]: 29,
    [ExchangeType.Service]: 176,
  }[ty];
  return `hsl(${hue}, 100%, 84%)`;
}

export function getCategoryName(ty: ExchangeType): string {
  return ExchangeType[ty];
}

import music from "public/images/piano.png";
import laptop from "public/images/laptop.png";
import calculator from "public/images/calculator.png";
import language from "public/images/language.png";
import design from "public/images/design.png";
import globe from "public/images/geography.png";
import service from "public/images/human.png";

export const TY_IMG_MAP = {
  [ExchangeType.Music]: music,
  [ExchangeType.Programming]: laptop,
  [ExchangeType.Math]: calculator,
  [ExchangeType.Language]: language,
  [ExchangeType.Design]: design,
  [ExchangeType.Social_Studies]: globe,
  [ExchangeType.Service]: service,
};

export interface Place {
  remote: boolean;
  location: null | string;
}

export type Author = { name: string; id: any; pfp?: string };

export interface ExRequest {
  description: string;
  time: number;
  likes: number;
  author: Author;
  place: Place;
}

export interface ExchangeInfo extends ExRequest {
  type: ExchangeType;
}
