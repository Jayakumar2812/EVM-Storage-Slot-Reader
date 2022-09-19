import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets,midnightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig,useProvider } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <Component {...pageProps}>
          {/* {console.log("provider-->",App)} */}
          {/* {App()} */}
          </Component>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
