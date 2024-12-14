import { createConfig } from 'wagmi';
import { 
  mainnet,
  polygon,
  configureChains,
  createClient,
} from 'wagmi';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { publicProvider } from '@wagmi/core/providers/public';

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    {
      ...mainnet,
      rpcUrls: {
        default: { http: ['https://eth.llamarpc.com'] },
        public: { http: ['https://eth.llamarpc.com'] },
      },
    },
    {
      ...polygon,
      rpcUrls: {
        default: { http: ['https://polygon-rpc.com'] },
        public: { http: ['https://polygon-rpc.com'] },
      },
    }
  ],
  [publicProvider()]
);

// Set up wagmi config
export const config = createConfig({
  autoConnect: false, // Don't auto-connect, let user initiate
  connectors: [
    // MetaMask
    new MetaMaskConnector({ chains }),
    // WalletConnect
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'dark',
        },
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});