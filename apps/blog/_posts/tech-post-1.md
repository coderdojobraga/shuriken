---
title: "[Tech Post #1] Como nasceu a plataforma do Coderdojo Braga?"
date: "2022-09-17"
author:
  name: "Rui Oliveira"
  photo: "ruioliveira02.jpg"
  username: "ruioliveira02"
draft: false
topic: "Desenvolvimento"
featured: true
---

---

&nbsp;

Este é o primeiro post de uma série em que vamos discutir as plataformas do CoderDojo Braga. Como foram feitas, dificuldades técnicas, histórias engraçadas e o seu futuro são alguns dos temas que podem esperar daqui. Espero sinceramente que, antes de um blog técnico, isto seja um blog educativo, e que demonstre o trabalho necessário para fazer uma aplicação que vai ser usada por várias pessoas, trazendo assim uma maior sensibilidade para a engenharia de software.

&nbsp;

## O nascimento

Pode só ter sido lançada recentemente, mas esta plataforma já se encontra em desenvolvimento há mais de um ano e meio. Se formos a ver o histórico no [Github](https://github.com/coderdojobraga/bokken/commit/5729ea8239adcbafa1e9b2a9e6df6fe779e7908a), vemos que o desenvolvimento começou em março de 2021.

Falando em Github, vamos começar pela premissa básica do desenvolvimento de software no CoderDojo Braga: todo o código produzido é open source. Código ser open source significa que é público e acessível por qualquer pessoa. Se quiserem, podem consultar o código [neste link](https://github.com/coderdojobraga/bokken) e [neste](https://github.com/coderdojobraga/shuriken). Além de ser público, toda a gente pode contribuir e programar para o CoderDojo Braga.

Há vários exemplos de software open source que são fundamentais para o funcionamento do mundo e da internet. O mais óbvio é o sistema operativo Linux, que opera em grande maioria dos servidores na internet (incluindo aquele que hospeda este site), mas existem outros, como o Mozilla Firefox, LibreOffice, etc.

Se estão a prestar atenção ao que estão a ler, devem ter reparado que eu pus dois links diferentes para o código da plataforma. Porquê? Porque a plataforma está dividida em dois grandes componentes: o site, que estão a visitar agora - nome de código [shuriken](https://github.com/coderdojobraga/shuriken) - e o serviço responsável por toda a lógica envolvente a sessões, contas, etc - nome de código [bokken](https://github.com/coderdojobraga/bokken).

Estes serviços comunicam entre si pela internet, de tal forma que, quando fazem login na plataforma, por exemplo, o site pergunta ao servidor se as credenciais estão corretas e, se estiverem, redireciona-vos para o dashboard inicial. Todas as comunicações são encriptadas, o que garante a segurança da informação transmitida.

## Desenvolvimento

O site está a ser desenvolvido em [NextJS](https://nextjs.org/), e o backend (o serviço responsável pela lógica da plataforma) em [Phoenix](https://www.phoenixframework.org/). Esta decisão acrescentou alguma complexidade ao projeto, porque obrigou a termos de tratar explicitamente da conexão entre os dois componentes da plataforma. A vantagem é que a maior separação entre o site, aquilo que vocês veem, e a lógica por trás dá uma maior liberdade a ambas as partes de
seguirem o seu caminho.

Ao longo deste ano e meio muito código foi desenvolvido. Pessoalmente, duas partes deste caminho foram as mais difíceis, mas também gratificantes. Uma delas, que foi a minha primeira contribuição para o CoderDojo Braga, foi exatamente este blog. Mais concretamente, a parte de converter o texto para uma página web.

Este post está a ser escrito em [Markdown](https://markdownguide.org), e precisa de ser transformado numa página HTML. Felizmente, isso já estava feito, e, por isso essa parte não foi muito difícil. O mais chato foi o estilo da página, porque o componente que usamos não forçava nenhum estilo, o que desformatava o conteúdo.

A outra funcionalidade que se destacou, e esta não foi implementada por mim (créditos ao [Daniel Pereira](https://github.com/danielsp45)), foi o algoritmo de emparelhamento entre ninjas e mentores antes de uma sessão. Foi uma tarefa bastante complexa do ponto de vista algorítmico, e foi resolvida implementando o [algoritmo húngaro](https://en.wikipedia.org/wiki/Hungarian_algorithm)

&nbsp;

## Publicação

Com a plataforma desenvolvida, chega o momento de a publicar. Como há dois projetos desenvolvidos, é preciso publicar a plataforma em duas frentes. O site em si foi publicado no [Netlify](https://www.netlify.com/). O processo é bastante simples, basta ligar o Netlify ao repositório no Github que o site é publicado praticamente instantaneamente. Exceto que é preciso fazer isso 3 vezes. Porquê 3 vezes? Porque o site está, na verdade, dividido em 3 subsites: a página web, o blog e a aplicação, cada um a ter de ser publicado em separado. Isto causou algumas frustrações com reencaminhamentos entre os 3 subsites, mas isso é história para outro dia.

O backend, por seu lado, foi publicado num servidor do Departamento de Informática, através de containers [Docker](https://www.docker.com/). Isto traz-nos responsabilidade acrescida, pois somos nós os responsáveis por fazer os backups dos dados.

Finalmente, o último passo é configurar o [DNS](https://pt.wikipedia.org/wiki/Sistema_de_Nomes_de_Dom%C3%ADnio), que, no nosso caso, faz-se no [Namecheap](https://www.namecheap.com/).

&nbsp;

## E agora?

E agora pouco ou nada muda. O desenvolvimento da plataforma vai continuar, procurando sempre melhorá-la o mais possível. O facto de já estar publicada traz alguma responsabilidade - afinal de contas a última coisa que queremos é partir algo que já está feito e que funciona -, mas isso faz parte do jogo.

Espero que o trabalho que tivemos e estamos a ter sirva, de facto, para melhorar a qualidade do serviço que o CoderDojo Braga presta, e que permita educar sobre o mundo da informática. Sendo uma organização que ensina crianças a programar, temos de dar o exemplo e garantir que a nossa plataforma é a melhor possível.
