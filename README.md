#  **Sistema de Gerenciamento de Pedidos para Restaurantes**

##  **Objetivos e Principais Features**

Este projeto visa desenvolver um sistema de gerenciamento de pedidos para restaurantes, permitindo a digitalização do processo de atendimento. Os principais objetivos incluem:

-  **Criar uma aplicação funcional para administração de pedidos.**
-  **Permitir que garçons ou clientes realizem pedidos pelo sistema.**
-  **Implementar controle de status dos pedidos (pendente, em preparo, pronto, entregue).**
-  **Fornecer um painel administrativo para gerenciar pedidos e cardápios.**
-  **Fornecer um painel de analytics para avaliar as vendas e resultados.**
-  **Simular um sprint ágil utilizando uma abordagem baseada em Scrum.**
-  **Trabalhar em equipe para desenvolver um sistema de pequeno porte.**


##  **Membros da Equipe**

- **Carolina Moya Pilla** – *Frontend*
- **Mateus Gonçalves Moreira** – *Backend*
- **Gustavo Dias Apolinário** – *Backend*
- **Letícia Scofield Lenzoni** – *Full-Stack*


##  **Pilha de Tecnologias**

- **Framework:** *Electron.js* → Permite criar aplicativos desktop usando HTML, CSS e JavaScript.
- **Interface:** *Vue.js ou React.js* → Frameworks leves para criar a interface do usuário.
- **Versionamento:** *Git (GitHub)*
- **Metodologia:** *Scrum-like*

## **Para Rodar**

O sistema usa Electron com front-end separado, então é necessário rodar dois comandos em paralelo:

1. Em um terminal, iniciar o servidor de desenvolvimento do front:
   ```bash
   npm run dev
2. Em outro terminal, iniciar a aplicação Electron:
   ```bash
   npm start

---

# Retrospectiva do Projeto

## Planejamento Inicial

O projeto foi pensado como um sistema desktop para gerenciar pedidos em restaurantes. As funcionalidades principais definidas desde o início foram:

- Cadastro e visualização de produtos  
- Realização de pedidos com interface intuitiva  
- Organização por mesas e categorias  
- Controle de estoque básico  
- Persistência local dos dados

A ideia era criar um MVP funcional que cobrisse o fluxo principal de um restaurante pequeno. Dividimos o trabalho com base nos módulos do sistema e usamos um board no GitHub para acompanhar o progresso.

## Execução

- O sistema foi desenvolvido com **Electron.js** e **Vue.js**, com uma estrutura voltada para componentes reutilizáveis.
- A interface conta com modais para adicionar e editar pedidos, e navegação simples para facilitar o uso.

Distribuição principal das tarefas:
- **Letícia:** estrutura do front-end, modais e setup inicial  
- **Gustavo:** fluxo dos pedidos, carrinho e comunicação entre as telas  
- **Mateus:** controle de estoque e lógica de decremento/validação  
- **Carolina:** sistema de mesas e visualização por mesa

Apesar das divisões, todo mundo mexeu tanto no front quanto no back em algum momento. Acabamos nos ajudando quando o escopo de uma parte batia no da outra — o que aconteceu bastante.

## Resultados

- O sistema está funcional e cobre o fluxo básico de uso: adicionar produtos, fazer pedidos, associar a uma mesa e atualizar o estoque.
- A arquitetura se manteve simples, mas escalável para futuras melhorias.
- Conseguimos fazer entregas em ritmo constante, mesmo com os imprevistos de tempo.

## Aprendizados

- Montar uma aplicação desktop com Electron e Vue exigiu adaptações, principalmente com o uso local de dados.
- Ter um fluxo de comunicação claro entre partes do sistema (por exemplo, pedido → mesa → estoque) é o que realmente determina se o sistema funciona de ponta a ponta.
- Estimar tarefas por funcionalidade é mais efetivo do que por tempo, principalmente em projetos curtos.

## Dificuldades

- Subestimamos o tempo necessário para integrar os módulos feitos por pessoas diferentes. 
- Algumas decisões do início (como estrutura de dados) tiveram que ser revistas no meio do caminho.
- Conciliar o projeto com outras demandas da faculdade e estágio/trabalho foi um desafio constante.


