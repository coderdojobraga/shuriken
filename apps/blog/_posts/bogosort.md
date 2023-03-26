---
title: "Bogosort (e porque é que a eficiência é importante)"
date: "2023-03-26"
author:
  name: "Rui Ribeiro"
  photo: "ruiasribeiro.jpg"
  username: "ruiasribeiro"
draft: true
topic: "Algoritmos"
featured: false
---

Algoritmos de ordenação são bastante utilizados no mundo da computação para, tal como o nome indica, ordenar listas fornecidas como _input_. Todos eles resultam no mesmo _output_ ordenado, diferindo apenas na forma como o fazem.

Iremos neste artigo mostrar-te dois dos algoritmos mais simples de ordenação e de que forma é que podem ser avaliados quanto ao seu desempenho.

## _Bubble sort_

_Bubble sort_ é um dos algoritmos mais simples de ordenação. À semelhança de outros, efetua várias travessias pelo _input_ até o deixar completamente ordenado.

Em cada travessia, o algoritmo começa no início da lista e analisa os seus elementos dois a dois. Caso estejam fora de ordem, são trocados. O processo repete-se até que se suceda uma travessia em que não seja feita nenhuma troca, altura em que se conclui que a lista se encontra ordenada.

### Exemplo

Imaginemos que temos a lista [5, 9, 3, 4] e queremos ordená-la na ordem crescente com o _bubble sort_.

Numa primeira travessia:

- [**5**, **9**, 3, 4] → [**5**, **9**, 3, 4]
  - Começamos por comparar os dois primeiros elementos e não os trocamos, visto que 5 < 9.
- [5, **9**, **3**, 4] → [5, **3**, **9**, 4]
  - De seguida, comparamos o 9 com o 3 e trocamos, já que 9 > 3.
- [5, 3, **9**, **4**] → [5, 3, **4**, **9**]
  - Por fim, comparamos o 9 com o 4 e também trocamos, visto que 9 > 4.

Numa segunda travessia:

- [**5**, **3**, 4, 9] → [**3**, **5**, 4, 9]
  - Trocamos, já que 5 > 3.
- [3, **5**, **4**, 9] → [3, **4**, **5**, 9]
  - Trocamos, já que 5 < 4.
- [3, 4, **5**, **9**] → [3, 4, **5**, **9**]
  - Não trocamos.

Conseguimos ver que no final da segunda travessia já temos a lista ordenada, mas o algoritmo ainda tem de fazer mais uma travessia para o saber.

> **Aparte:** Reparaste que, a cada travessia, os maiores números vão agrupando-se no fundo da lista? Isto acontece porque o _bubble sort_ vai "empurrando" o maior número que encontra em cada iteração, sendo esse na primeira o 9 e na segunda o 5. Isto permite que seja feita uma pequena otimização no algoritmo: em cada iteração, pode-se deixar de verificar aqueles elementos que foram empurrados para o fundo da lista, porque já se sabe que estes não irão sair do sítio.

## _Bogosort_

Ao contrário do _bubble sort_, o _bogosort_ não possui uma sequência de passos que o leva a ordenar uma lista num período finito de tempo, baseando-se apenas no acaso.

De que forma em concreto? Bem, é o equivalente a lançar um baralho de cartas ao ar, pegar nelas por uma ordem qualquer e verificar se estão por ordem. Se não estiverem, volta-se a repetir o processo. Devido a isto, não é considerado como um algoritmo propriamente útil para ordenação.

## Notação _Big O_

Não são necessárias medições para ver que o _bogosort_ é ineficiente, isto é, pode levar bastante tempo até conseguir ordenar uma lista.

Coloca-se agora a questão: como é que podemos comparar dois algoritmos de forma objetiva para saber qual é o melhor?

Existe na matemática uma notação conhecida como _Big O_, ou “Grande O” em português. Podemos utilizá-la para caracterizar a performance de um algoritmo relativamente ao número de vezes que atua sobre os elementos de uma lista, tendo por base o tamanho desta.

Eis algumas das complexidades mais comuns, ordenadas por performance decrescente:

- O(1) → diz-se que é **constante**, o algoritmo não varia consoante o tamanho do _input_ (num mundo ideal todos os algoritmos seriam assim, mas não é uma situação realista para ordenação)
- O(log N) → diz-se que é **logarítmico**, o algoritmo cresce em complexidade a um ritmo mais lento que o aumento do tamanho do _input_
- O(N) → diz-se que é **linear**, o algoritmo cresce em complexidade ao mesmo ritmo que o tamanho do _input_ aumenta
- O(N^2) → diz-se que é **exponencial**, o algoritmo cresce em complexidade a um ritmo mais rápido que o aumento do tamanho do _input_

Como a performance também depende da própria constituição da lista dada, como veremos a seguir, geralmente avaliamos três casos: **o melhor**, **o pior** e **o médio**, sendo que o caso médio é normalmente o mais importante na escolha de que algoritmo usar.

### Performance do _bogosort_

Vejamos então, em primeiro lugar, a performance do _bogosort_.

No melhor dos casos, voltando ao exemplo das cartas, atiramos o baralho ao ar e pegamos nas cartas todas na ordem correta. Se assumirmos que temos N cartas, temos uma complexidade de O(N), visto que apenas iteramos por cada elemento uma única vez.

No pior dos casos, temos algo que não é caracterizável pela notação _Big O_, já que é possível que a lista nunca venha a ficar ordenada, independentemente do número de iterações.

Por fim, no caso médio, temos O(N × N!), algo com um crescimento de complexidade ainda maior que o exponencial. A explicação matemática para isto já foge um pouco do âmbito do artigo (e é mais complexa!), por isso iremos deixar de lado.

### Performance do _bubble sort_

Vejamos agora como é que o _bubble sort_ se comporta.

O melhor dos casos é já ter a lista de _input_ ordenada, que na prática não constitui um caso útil para um algoritmo de ordenação, mas que é importante ter em mente neste tipo de avaliação. Assim sendo, o _bubble sort_ irá efetuar uma única travessia pela lista e não trocar nada, pelo que temos uma complexidade de O(N).

O pior dos casos é precisamente o oposto, ter uma lista de _input_ ordenada no sentido contrário ao que pretendemos. Assim, todas as comparações feitas entre dois elementos irão resultar numa troca. Lembrando o aparte do _bubble sort_, sabemos que a cada iteração vamos colocando um elemento no final na sua posição correta, pelo que podemos deduzir que iremos precisar de cerca de N iterações para ordenar a lista. Considerando que em cada uma delas iremos atravessar todos os N elementos, temos uma complexidade de O(N \* N), ou O(N^2).

Por fim, o caso médio é novamente algo mais complexo de se analisar que o melhor e o pior, mas sabe-se que se assemelha ao pior caso, tendo uma complexidade de O(N^2).

### Comparação

Com a análise de complexidade feita, vemos que a nossa dedução inicial estava correta, o _bogosort_ é de facto mais lento (para um caso médio) que o _bubble sort_. Isto, no entanto, não significa que o _bubble sort_ seja por si só considerado como um algoritmo eficiente, outros como _quicksort_ e _merge sort_ tem uma complexidade média de apenas O(N × log N).

## Porque é que isto é importante?

Pensado a uma escala pequena, talvez a escolha de algoritmo de ordenação não importe muito.

Usando uma lista de quatro elementos como exemplo, a diferença entre N e N^2 (4 e 16) é relativamente pequena. No entanto, a partir do momento que atingimos uma quantidade nas centenas ou até mesmo logo nas dezenas, a diferença torna-se bastante significativa, ficando cada vez maior a cada elemento extra.

No final de contas, o mais importante é escolher tendo em conta o contexto. É perfeitamente possível existirem situações em que certos algoritmos são mais adequados que outros.

Isto é, excluindo o _bogosort_. Diria que o melhor é mesmo evitá-lo.
