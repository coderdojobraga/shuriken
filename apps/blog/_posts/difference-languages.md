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

&nbsp;

Quando falamos sobre programação temos a ideia que vamos aprender diferentes linguagens de programação, mas na realidade o que estamos a aprender são diferentes paradigmas. Um paradigma é uma forma que existe de classificar uma linguagem baseada nas suas funcionalidades. A escolha desse paradigma vai influenciar toda a estrutura e execução do programa.

&nbsp;


## Paradigma Funcional

O Paradigma Funcional consiste em escrever funções puras, isto é, funções que não alteram o estado do programa, ou seja, não há alteração do valor de variáveis e em vez disso são criadas novas variáveis como forma de output. Por outras palavras, o output de uma função pura apenas depende do input recebido. 
Este paradigma é o mais similar à matemática, sendo assim a única barreira de entrada para quem está a começar é aprender a sua sintaxe , envolvendo apenas lógica e matemática que é estudada até ao 12º ano de escolaridade.

O Paradigma Funcional é usado em várias linguagens, como por exemplo [Haskell](https://www.youtube.com/watch?v=Qa8IfEeBJqk) e [Elixir](https://www.youtube.com/watch?v=R7t7zca8SyM), são populares porque permitem aos programadores criar e manter software com funções pequenas e limpas, o que é vital para organização de código.


&nbsp;

## Paradigma Imperativo

O Paradigma Imperativo é o mais antigo da computação, este consiste em numa característica central a definição sequencial de instruções que representam uma modificação no estado do programa. O Paradigma Imperativo centra-se muito na [arquitetura de Von Neumann’s](https://www.youtube.com/watch?v=tZ5W2LpdcEw) , ou seja, a memória armazena informações e instruções do programa que podem ser alterados a partir de operações aritméticas ou atribuidos a variáveis.
As linguagens mais conhecidas neste paradigma são por exemplo [C](https://www.youtube.com/watch?v=U3aXWizDbQ4) e [Rust](https://www.youtube.com/watch?v=5C_HPTJg5ek)

&nbsp;

## Paradigma Orientado a Objetos

O Paradigma Orientado a Objetos é baseado em, como o próprio nome indica, objetos (que contêm dados e métodos), que têm como objetivo modularizar e permitir reutilização de  código. Objetos são geralmente instâncias de classes que são usadas para interagir entre si para criar aplicações e programas.
Mas vocês devem-se tar a perguntar mas afinal o que são classes e instâncias de classes, porque pode soar um pouco estranho. 
Um exemplo:
```
 Temos uma pessoa a Maria que tem um nome, idade e altura. Uma classe de exemplo seria "Pessoa" que iria armazenar dados como o nome a idade e a altura, e a Maria seria uma instância dessa classe ou um objeto. 

 Classe - Pessoa
 Armazena - Nome, Idade, Altura

 Exemplos de instâncias dessa classe - Maria, João, Pedro, etc.
```
As linguagens mais usadas quando nos referimos a este paradigma são [Java](https://www.youtube.com/watch?v=l9AzO1FMgM8) e [C#](https://www.youtube.com/watch?v=ravLFzIguCM), apesar das suas vantagens este tipo de paradigma têm os seus contras que são performances lentas e um grande espaço de memôria necessário quando críamos aplicações.

&nbsp;

## Paradigma Orientado a Eventos

O Paradigma Orientado a Eventos é um paradigma onde as entendidades (objetivos, serviços, etc) comunicam indiretamente através de mensagens que são enviadas pelo um intermediário. Por norma estas mensagens são guardadas numa [fila de espera](https://www.youtube.com/watch?v=QCb6k2nik5k) antes de serem usadas. Por norma a execução do programa é determinada por novos "eventos" do usuário.
Mas o que são esses eventos? São por exemplo cliques no botão do rato, ou em teclas, mover o rato para umas coordenadas do mapa. 
A linguagem mais conhecida e mais usada neste paradigma é o [Scratch](https://www.youtube.com/watch?v=B1JoK3Vgd_w) e por norma é usada para introduzir crianças e jovens à programação de uma forma lúdica e divertida.

&nbsp;

## MultiParadigmas

Multi paradigmas acontecem quando uma linguagem não fica restrita apenas a um paradigma e consegue ser usadas de diferentes formas, ou seja, consegue ser funcional ou seja trabalhar apenas com [recursividade](https://www.youtube.com/watch?v=NKymAD4pJZI) e ao mesmo tempo imperativa tendo variáveis e instruções na memória.
Um bom exemplo de linguagem que é um multiparadigma é o [Python](https://www.youtube.com/watch?v=x7X9w_GIm1s) e o [Javascript](https://www.youtube.com/watch?v=DHjqpvDnNGE).

&nbsp;

## Mas afinal qual é o melhor paradigma?

A realidade é que não existe um paradigma melhor, cada paradigma têm um estrutura diferente para desenvolver um projeto, cada um têm as suas vantagens e desvantagens como referido previamente, tentem procurar a melhor [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) possível para desenvolverem o vosso projeto que seja eficiente e favorável ao que querem fazer, procurem projetos semelhantes e procurem perceber porque é que uma certa [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) foi usada por o/a programador/equipa. 
Pessoalmente, eu prefiro desenvolver com uma [stack](https://blog.betrybe.com/tecnologia/stack-tecnologico/) que use um/uma paradigma/linguagem funcional devido às razões apresentadas previamente e porque torna possível desenvolver bons projetos com relativamente poucas linhas relativamente à dimensão do projeto, ou seja, caso seja um projeto com um tamanho astronómico torna-se impossível de desenvolver com meia dúzia de linhas, mas acabamos sempre por escrever menos quando comparado com outras linguagens.

&nbsp;