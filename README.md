# Desafio Dashboard Front-End

Projeto desenvolvido para um desafio de estágio. O site pode ser acessado através deste link: https://desafio-dashboard-ruan-react.herokuapp.com/

> O desafio consistia em desenvolver um back-end que deveria ter operações de CRUD para entidades, cada uma relacionada com outra, de empresas, unidades, ativos e funcionários. Também era necessário que cada ativo pudesser ter uma imagem, logo deveria ter upload de arquivo. O front-end deveria consumir o back-end, tendo opções para adicionar, ler, editar e deletar, e também exibir gráficos. Também deveria utilizar o ant design como lib de componentes e o highcharts para gráficos.

Houve uma preocupaçãosobre a experiência do usuário, eu gostaria que o site ficasse claro e intuitivo, sem a sensação de quem foi feito "às pressas". Adicionei como requisito que o site fosse intuitivo e de fácil utilização, com cada funcionalidade separada de outras.

## Dependências:
* Componentes: [Ant Deisgn](https://ant.design/)
* Gráficos: [HighCharts React](https://github.com/highcharts/highcharts-react)
* Requisições HTTP: [Axios](https://github.com/axios/axios)
* Estilizações de componentes: [Styled-Components](https://styled-components.com/)

## Funcionalidades implementadas no front-end

### Mostrar gráficos

- [x]  Gráfico principal
- [x]  Gráficos de ativos

### Company

- [x]  Criar
- [x]  Editar
- [x]  excluir

### Unidade

- [x]  Criar
- [x]  Editar
- [x]  Excluir
- [x]  Adicionar Ativo

### Ativo

- [x]  Criar
- [x]  Editar
- [x]  Adicionar imagem
- [ ]  Excluir imagem
- [x]  Atribuir responsável
- [ ]  Excluir ativo

### Usuário

- [x]  Criar
- [x]  editar
- [x]  excluir

### Como executar
Faça o clone do repositório e instale todas as dependências.

Com yarn:
```
git clone https://github.com/droderuan/desafio-dashboard-react.git && cd desafio-dashboard-react && yarn
```
Com npm: 
```
git clone https://github.com/droderuan/desafio-dashboard-react.git && cd desafio-dashboard-react && npm install
```

Crie um arquivo **.env** na raiz do projeto e adicione a seguinte variável:
```
REACT_APP_BASE_API_URL=https://desafio-backend-node.herokuapp.com/
```

Por fim execute `yarn start` ou `npm run start` e se tudo ocorreu bem, o projeto deverá abrir.

#### Se tudo deu certo o projeto deve aparecer assim para você:
![gif](https://media.giphy.com/media/EU1obAC38GuWI/giphy.gif)
