---
title: "São todas as linguagens de programação iguais?"
date: "2022-11-27"
author:
  name: "Mário Rodrigues"
  photo: "mario.jpg"
  username: "mariorodrigues"
draft: false
topic: "Linguagens"
featured: "true"
---

Quando falamos sobre programação, temos a ideia que vamos aprender diferentes linguagens de programação mas, na realidade, o que estamos a aprender são diferentes paradigmas. Um paradigma é uma forma que existe de classificar uma linguagem baseada nas suas funcionalidades e a sua escolha vai influenciar toda a estrutura e execução do programa.

## Paradigma Funcional

O Paradigma Funcional consiste em escrever funções puras, isto é, funções que não alteram o estado do programa, ou seja, não há alteração do valor de variáveis e, em vez disso, são criadas novas variáveis como forma de output. Por outras palavras, o output de uma função pura apenas depende do input recebido.
Este paradigma é o mais similar à matemática. Sendo assim, a única barreira de entrada para quem está a começar é aprender a sua sintaxe, que envolve apenas lógica e matemática estudada até ao 12º ano de escolaridade.

O Paradigma Funcional é usado em várias linguagens, como por exemplo [Haskell](https://www.youtube.com/watch?v=Qa8IfEeBJqk) e [Elixir](https://www.youtube.com/watch?v=R7t7zca8SyM). Estas linguagens são populares porque permitem aos programadores criar e manter software com funções pequenas e limpas, o que é vital para organização de código.

## Paradigma Imperativo

O Paradigma Imperativo é o mais antigo da computação. A sua característica central é a definição sequencial de instruções que representam uma modificação no estado do programa. O Paradigma Imperativo centra-se muito na [arquitetura de Von Neumann’s](https://www.youtube.com/watch?v=tZ5W2LpdcEw), ou seja, a memória armazena informações e instruções do programa que podem ser alteradas a partir de operações aritméticas ou atribuídas a variáveis.
As linguagens mais conhecidas neste paradigma são, por exemplo, [C](https://www.youtube.com/watch?v=U3aXWizDbQ4) e [Rust](https://www.youtube.com/watch?v=5C_HPTJg5ek)

## Paradigma Orientado a Objetos

O Paradigma Orientado a Objetos é baseado em, como o próprio nome indica, objetos (que contêm dados e métodos), que têm como objetivo modularizar e permitir reutilização de código. Objetos são, geralmente, instâncias de classes usadas para interagir entre si para criar aplicações e programas.
Mas agora uma questão premente: afinal, o que são classes e instâncias de classes? 
Um exemplo:

```
 Temos uma pessoa: a Maria, que tem um nome, idade e altura. Podemos construir a classe "Pessoa", que iria armazenar dados como o nome, a idade e a altura, e a Maria seria uma instância dessa classe ou um objeto.

 Classe - Pessoa
 Armazena - Nome, Idade, Altura

 Exemplos de instâncias dessa classe - Maria, João, Pedro, etc.
```

As linguagens mais usadas quando nos referimos a este paradigma são [Java](https://www.youtube.com/watch?v=l9AzO1FMgM8) e [C#](https://www.youtube.com/watch?v=ravLFzIguCM). Apesar das suas vantagens, este tipo de paradigma têm os seus contras, nomeadamente, performances lentas e um grande espaço de memória necessário quando criamos aplicações.

## Paradigma Orientado a Eventos

O Paradigma Orientado a Eventos é um paradigma onde as entidades (objetivos, serviços, etc) comunicam indiretamente através de mensagens enviadas por um intermediário. Por norma, estas mensagens são guardadas numa [fila de espera](https://www.youtube.com/watch?v=QCb6k2nik5k) antes de serem usadas e a execução do programa é determinada por novos "eventos" do usuário.
Mas o que são esses eventos? São, por exemplo, cliques no botão do rato ou em teclas ou mover o rato para umas coordenadas num mapa.
A linguagem mais conhecida e mais usada neste paradigma é o [Scratch](https://www.youtube.com/watch?v=B1JoK3Vgd_w) e costuma ser usada para introduzir crianças e jovens à programação de uma forma lúdica e divertida.

## Multiparadigmas

Multiparadigmas acontecem quando uma linguagem não fica restrita apenas a um paradigma e consegue ser usada de diferentes formas, ou seja, consegue ser funcional (trabalhar apenas com [recursividade](https://www.youtube.com/watch?v=NKymAD4pJZI)) e, ao mesmo tempo, imperativa, tendo variáveis e instruções na memória.
Dois bons exemplos de linguagem multiparadigma são [Python](https://www.youtube.com/watch?v=x7X9w_GIm1s) e [Javascript](https://www.youtube.com/watch?v=DHjqpvDnNGE).

## Mas, afinal, qual é o melhor paradigma?

Pessoalmente, eu prefiro desenvolver com uma [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) que use um paradigma ou uma linguagem funcionais, uma vez que se torna possível desenvolver bons projetos com relativamente poucas linhas face à sua dimensão (é claro que, com um projeto de tamanho astronómico, torna-se impossível de desenvolver com meia dúzia de linhas, mas acabamos sempre por escrever menos, comparando a outras linguagens de programação).
Todavia,  a realidade é que não existe um paradigma melhor. Cada paradigma têm estruturas diferentes para desenvolver projetos, assim como vantagens e desvantagens. Procurem a melhor [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) possível e mais favorável à construção do vosso projeto desejado e estudem projetos semelhantes, de forma a perceber porque é que uma certa [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) foi usada pelo programador ou equipa.
Entretanto, explora os vários paradigmas e vê com o qual é que te sentes mais confortável. O que importa é programar e aprender!