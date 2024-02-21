import React from 'react';
import { ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Routes } from './Routes';
import { createGlobalStyle } from 'styled-components';
import ApolloConnect from './ApolloConnect';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import theme from './ui-kit/theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.palette.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.primary};
    min-height: 64px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.darkBlue};
  }
  .ant-typography {
    margin-bottom: 0 !important;
  }
`;

const antConfig = {
  token: {
    colorPrimary: theme.palette.primary,
    colorBgContainer: theme.palette.secondary,
    darkItemBg: 'red',
    fontSize: 16,
  },
  components: {
    Layout: {
      bodyBg: theme.palette.secondary,
      headerBg: theme.palette.primary,
    },
  },
} as const;

function App() {
  return (
    <BrowserRouter>
      <ApolloConnect>
        <ConfigProvider theme={antConfig}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes />
          </ThemeProvider>
        </ConfigProvider>
      </ApolloConnect>
    </BrowserRouter>
  );
}

export default App;
