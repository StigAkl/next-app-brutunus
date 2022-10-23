import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout';
import { LoadScript } from '@react-google-maps/api';
import { libs } from './utils';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={libs}
    >
      <ChakraProvider>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ChakraProvider>
    </LoadScript>
  )
}

export default MyApp
