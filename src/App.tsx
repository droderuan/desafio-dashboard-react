import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import GlobalStyle from './styles/GlobalStyles';

import ConextProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ConextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ConextProvider>
    </>
  );
};

export default App;
