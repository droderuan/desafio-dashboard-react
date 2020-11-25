# Desafio Dashboard Front-End

Projeto desenvolvido para um desafio de estágio. O site pode ser acessado através deste link: https://desafio-dashboard-ruan-react.herokuapp.com/

> O desafio consistia em desenvolver um back-end que deveria ter operações de CRUD para entidades, cada uma relacionada com outra, de empresas, unidades, ativos e  > funcionários. Também era necessário que cada ativo pudesser ter uma imagem, logo deveria ter upload de arquivo.
> O front-end deveria consumir o back-end, tendo opções para adicionar, ler, editar e deletar, e também exibir gráficos.

Houve uma preocupação em sobre a experiência do usuário. Adicionei como requisito que o site fosse intuitivo e de fácil utilização, com cada funcionalidade separada de outras.

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
