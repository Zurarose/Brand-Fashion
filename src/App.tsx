import React from 'react';
import { ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Routes } from './Routes';
import { createGlobalStyle } from 'styled-components';
import theme from './ui-kit/theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  .ant-menu-item-active, .ant-menu-item-selected {
    background-color: ${theme.palette.primary} !important;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
