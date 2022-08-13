import fs from "fs";
import { join, extname } from "path";

export const LEVELS = {
  NO_BELT: null,
  WHITE: "white",
  YELLOW: "yellow",
  BLUE: "blue",
  GREEN: "green",
  ORANGE: "orange",
  RED: "red",
  PURPLE: "purple",
  BLACK: "black",
};

export const PT = {
  null: "Sem Cinturão",
  white: "Cinturão Branco",
  yellow: "Cinturão Amarelo",
  blue: "Cinturão Azul",
  green: "Cinturão Verde",
  orange: "Cinturão Laranja",
  red: "Cinturão Vermelho",
  purple: "Cinturão Roxo",
  black: "Cinturão Preto",
};

export const getStaticBeltInfo = () => {
  const fullPath = join(process.cwd(), "data/curriculum.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return JSON.parse(fileContents);
};
