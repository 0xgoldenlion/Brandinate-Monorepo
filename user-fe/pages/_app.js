import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'jotai';
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'


import { publicProvider } from 'wagmi/providers/public'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

// Set up client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

import { client } from '../lib/graphql';


function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
