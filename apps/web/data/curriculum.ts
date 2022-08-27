import { IBelt, EBelt } from "lib/types";

export const BELTS: IBelt[] = [
  {
    colour: EBelt.White,
    description:
      "Neste primeiro contacto com o Ninja, procuramos ensinar conceitos básicos de programação, sem necessidade de dominar qualquer conceito.",
    image: "white.png",
    requirements: [
      "Ter iniciado os conceitos básicos de programação",
      "Ter começado pelo menos um projeto em Scratch",
    ],
  },
  {
    colour: EBelt.Yellow,
    description:
      "Após o primeiro cinturão, procura-se aprimorar os primeiros conceitos que foram introduzidos ao Ninja nas sessões anteriores, de forma a que ele se sinta mais confortável em usar o Scratch e começe já a criar projetos um pouco mais elaborados.",
    image: "yellow.png",
    requirements: [
      "Maior autonomia com os conceitos básicos",
      "Saber aplicar condicionais e ciclos",
      "Ter concluído pelo menos um projeto em Scratch",
    ],
  },
  {
    colour: EBelt.Blue,
    description:
      "Para obter o cinturão Azul, o Ninja já deve possuir uma maior autonomia com o Scratch, assim como ter concluído outros 2 projetos.",
    image: "blue.png",
    requirements: [
      "Manipular as variáveis da forma correta",
      "Apresentar um projeto a um Mentor",
      "Terminar outros 2 projetos em Scratch",
    ],
  },
  {
    colour: EBelt.Green,
    description:
      "O cinturão Verde poderá ser obtido depois de um período de transição entre a plataforma Scratch e uma linguagem de programação mais textual, que ficará a critério do Mentor e do Ninja. Recomendam-se linguagens de fácil aprendizagem e compreensão como Python, por exemplo.",
    image: "green.png",
    requirements: [
      "Aplicar o que aprendeu no Scratch noutra linguagem",
      "Compreender os conceitos e as aplicações de Listas e Strings",
      "Terminar 2 projetos na nova linguagem (1 deles pode ser uma adaptação de algum já feito em Scratch, se o Ninja quiser)",
      "Apresentar um projeto a 2 mentores",
    ],
  },
  {
    colour: EBelt.Orange,
    description:
      "Com o cinturão Laranja, o Ninja aprenderá a utilizar ferramentas da sua linguagem escolhida para criar interfaces ou até jogos simples. O Ninja deverá aprender também sobre os conceitos de I/O, com recurso às bibliotecas do sistema operativo.",
    image: "orange.png",
    requirements: [
      "Aprender a criar interfaces",
      "Utilizar módulos ou bibliotecas extra como Pygame, GUIZero, etc.",
      "Terminar 1 projeto usando interface e 1 adaptação de um projeto feito em Scratch",
      "Apresentar um projeto a 5 ninjas",
    ],
  },
  {
    colour: EBelt.Red,
    description:
      "Para este cinturão, o Ninja aprenderá mais sobre Web e deverá criar o seu próprio Website. Para a criação do Website, recomenda-se ensinar uma nova linguagem de programação como JavaScript, por exemplo.  Recomenda-se também que o Ninja possua um repositório de código para guardar os seus projetos como GitLab ou GitHub, por exemplo.",
    image: "red.png",
    requirements: [
      "Aprender a usar uma nova linguagem que lhe permita criar o Website",
      "Criar um Website",
      "Apresentar um projeto para uma turma",
      "Uma biblioteca para fazer Web servers (Flask para Python, Sinatra para Ruby, Spark para Java)",
    ],
  },
  {
    colour: EBelt.Purple,
    description:
      "Para o cinturão Roxo, o Ninja deverá aprender sobre o conceito de Regex e também sobre Bases de Dados, visando produzir projetos mais avançados nas linguagens que já aprendeu. Deverá ser também introduzido os conceitos de APIs como uma extensão de módulos de programas",
    image: "purple.png",
    requirements: [
      "Aprender como aplicar Regex",
      "Aprender como criar Bases de Dados",
      "Utilizar uma API externa",
      "Terminar 2 projetos com estes conceitos",
    ],
  },
  {
    colour: EBelt.Black,
    description:
      "Para conquistar o último cinturão, o Ninja deverá aprender a criar as suas próprias APIs. Ao aprender isto, o Ninja poderá aumentar ainda mais as suas capacidades de Web Development assim como a programação de servidores.",
    image: "black.png",
    requirements: [
      "Dominar APIs, incluindo como aplicá-las",
      "Utilizar uma API externa",
      "Criar uma API REST",
    ],
  },
];
