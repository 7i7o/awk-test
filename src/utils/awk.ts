import ArConnectStrategy from '@arweave-wallet-kit/arconnect-strategy';
import BrowserWalletStrategy from '@arweave-wallet-kit/browser-wallet-strategy';
import OthentStrategy from '@arweave-wallet-kit/othent-strategy';
import WanderConnectStrategy from '@7i7o/wc-strategy-beta';
import WanderStrategy from '@arweave-wallet-kit/wander-strategy';
import WebWalletStrategy from '@arweave-wallet-kit/webwallet-strategy';
import {
    useApi,
    useConnection,
    ConnectButton,
    ArweaveWalletKit,
} from '@arweave-wallet-kit/react';

export {
    ArweaveWalletKit,
    ConnectButton,
    useApi,
    useConnection,
    ArConnectStrategy,
    BrowserWalletStrategy,
    WanderConnectStrategy,
    OthentStrategy,
    WanderStrategy,
    WebWalletStrategy,
};
