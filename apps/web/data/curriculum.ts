import { IBelt, EBelt } from "lib/types";

export const BELTS: IBelt[] = [
  {
    colour: EBelt.White,
    description:
      "Neste primeiro contacto com o Ninja, procuramos ensinar conceitos básicos de programação, sem necessidade de dominar qualquer conceito. Para a primeira sessão, o Mentor já pode introduzir Scratch ou usar ferramentas como o Lightbot (não é preciso completar todos os níveis) para familiarizar o Ninja com os conceitos básicos e os tipos de desafios que lhe serão apresentados.",
    image: "white.png",
    requirements: [
      "Conhecer os conceitos básicos de programação",
      "Ter começado pelo menos um projeto em Scratch",
    ],
  },
  {
    colour: EBelt.Yellow,
    description:
      "Após o primeiro cinturão, procura-se aprimorar os primeiros conceitos que foram introduzidos ao Ninja nas sessões anteriores, de forma a que se sinta mais confortável em usar o Scratch e comece já a criar projetos um pouco mais elaborados.",
    image: "yellow.png",
    requirements: [
      "Ter maior autonomia com os conceitos básicos",
      "Saber aplicar condicionais e ciclos",
      "Ter concluído pelo menos um projeto em Scratch",
    ],
  },
  {
    colour: EBelt.Blue,
    description:
      "Para obter o cinturão azul, o Ninja já deve possuir uma maior autonomia com o Scratch, assim como ter concluído outros 2 projetos. Deve também ter completado todos os níveis do Lightbot.",
    image: "blue.png",
    requirements: [
      "Saber manipular variáveis da forma correta",
      "Saber aplicar o conceito de módulos",
      "Completar todos os níveis do Lightbot",
      "Terminar outros 2 projetos em Scratch",
      "Terminar pelo menos 1 projeto usando o conceito de módulos",
    ],
  },
  {
    colour: EBelt.Green,
    description:
      "O cinturão verde poderá ser obtido depois de um período de transição entre a plataforma Scratch e uma linguagem de programação mais textual, que ficará a critério do Mentor e do Ninja. Recomendam-se linguagens de fácil aprendizagem e compreensão como Python, por exemplo.",
    image: "green.png",
    requirements: [
      "Aplicar o que aprendeu no Scratch noutra linguagem",
      "Compreender os conceitos e as aplicações de listas e strings",
      "Terminar 2 projetos na nova linguagem (1 deles pode ser uma adaptação de algum já feito em Scratch, se o Ninja quiser)",
    ],
  },
  {
    colour: EBelt.Orange,
    description:
      "Com o cinturão laranja, o Ninja aprenderá a utilizar ferramentas da sua linguagem escolhida para criar interfaces ou até jogos simples. O Ninja deverá aprender também HTML, de modo a conseguir criar uma página web simples.",
    image: "orange.png",
    requirements: [
      "Aprender a criar interfaces",
      "Utilizar módulos ou bibliotecas extra como Pygame, GUIZero, etc",
      "Terminar 1 projeto usando interface e 1 adaptação de um projeto feito em Scratch",
      "Criar um website simples, recorrendo a HTML (não necessita de CSS nem JavaScript)",
    ],
  },
  {
    colour: EBelt.Red,
    description:
      "Para este cinturão, o Ninja aprenderá mais sobre Web e deverá decorar e adicionar interatividade ao seu próprio website.  Recomenda-se também que o Ninja possua um repositório de código para guardar os seus projetos como GitLab ou GitHub, por exemplo. Para isto, deverá aprender a trabalhar com o terminal e a usar Git. Alternativamente, poderão ser utilizadas ferramentas gráficas para introduzir o conceito de repositórios, como GitHub Desktop.",
    image: "red.png",
    requirements: [
      "Aprender a usar CSS para alterar a estrutura e a estética de uma página HTML, com recurso a layouts flexbox e/ou grid e a animações",
      "Aprender JavaScript para adicionar interatividade (botões, avisos, etc) a uma página HTML",
      "Conhecer os utilitários básicos de linha de comandos (cd, mkdir, ls/dir, rm, cat, etc)",
      "Conhecer os comandos básicos de Git (clone, add, commit, push, pull, etc), em terminal ou em interface gráfica",
    ],
  },
  {
    colour: EBelt.Purple,
    description:
      "Para o cinturão roxo, o Ninja deverá aprender sobre os conceitos de expressões regulares (Regex) e bases de dados, visando produzir projetos mais avançados nas linguagens que já aprendeu. Recomenda-se o uso de SQLite como motor de base de dados devido à sua simplicidade e facilidade de instalação. Pretende-se também que o Ninja seja introduzido à programação concorrente, usando threads e locks.",
    image: "purple.png",
    requirements: [
      "Aprender como aplicar Regex",
      "Aprender como criar Bases de Dados (usando SQLite, por exemplo)",
      "Aprender os conceitos básicos de programação com threads e exclusão mútua (locks)",
      "Terminar 2 projetos com estes conceitos",
    ],
  },
  {
    colour: EBelt.Black,
    description:
      "Para conquistar o último cinturão, o Ninja deverá aprender a criar as suas próprias APIs. Ao aprender isto, o Ninja poderá aumentar ainda mais as suas capacidades de Web Development assim como a programação de servidores.  Por fim, o Ninja deverá ser introduzido a containers, usando Docker para empacotar aplicações e suas dependências.",
    image: "black.png",
    requirements: [
      "Dominar APIs, incluindo utilizar APIs externas e como aplicá-las",
      "Criar uma API REST",
      "Aprender a usar Docker para distribuição de aplicações em containers",
      "Fazer um projeto com Raspberry Pi",
    ],
  },
];
