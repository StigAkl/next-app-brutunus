import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }
  body {
      box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
