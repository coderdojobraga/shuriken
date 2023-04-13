export enum EBelt {
  White = "Branco",
  Yellow = "Amarelo",
  Blue = "Azul",
  Green = "Verde",
  Orange = "Laranja",
  Red = "Vermelho",
  Purple = "Roxo",
  Black = "Preto",
}

export interface IBelt {
  colour: EBelt;
  description: string;
  image: string;
  requirements: string[];
}

export interface ITeamMember {
  picture: string;
  name: string;
  role: string;
}
