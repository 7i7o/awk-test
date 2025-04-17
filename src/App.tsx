import {
    // ArConnectStrategy,
    ArweaveWalletKit,
    // BrowserWalletStrategy,
    OthentStrategy,
    EmbedStrategy,
    WanderStrategy,
    WebWalletStrategy,
} from './utils/awk';
import Main from './components/Main';
import { ArweaveProvider } from './contexts/ArweaveContext';
import { useTheme } from './hooks/useTheme';
import {
    DEFAULT_BASE_URL,
    STORAGE_KEYS,
} from './components/MainContent/BaseUrlInput';

const wanderOptions = {
    clientId: 'ALPHA',
    iframe: {
        routeLayout: {
            auth: 'popup',
        },
    },
    button: {
        position: 'bottom-right',
        theme: 'system',
        label: true,
        wanderLogo: 'default',
    },
    // baseURL: "https://embed-dev.wander.app",
    // baseURL: "https://wander-embed-dev-git-arc-940-sign-dispatch-tags-community-labs.vercel.app",
    // baseServerURL: "https://embed-api-dev.wander.app",
};

function App() {
    const { theme } = useTheme();
    const baseUrl =
        localStorage.getItem(STORAGE_KEYS.BASE_URL) || DEFAULT_BASE_URL;
    return (
        <ArweaveProvider>
            <ArweaveWalletKit
                config={{
                    permissions: [
                        'ACCESS_ADDRESS',
                        'ACCESS_ALL_ADDRESSES',
                        'ACCESS_ARWEAVE_CONFIG',
                        'ACCESS_PUBLIC_KEY',
                        'DECRYPT',
                        'DISPATCH',
                        'ENCRYPT',
                        'SIGN_TRANSACTION',
                        'SIGNATURE',
                        // 'ACCESS_TOKENS',
                    ],
                    ensurePermissions: true,
                    strategies: [
                        new WanderStrategy(),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-expect-error
                        new EmbedStrategy({
                            ...wanderOptions,
                            baseURL: baseUrl,
                        }),
                        new WebWalletStrategy(),
                        new OthentStrategy(),
                        // new ArConnectStrategy(),
                        // new BrowserWalletStrategy(),
                    ],
                }}
                theme={{
                    radius: 'default',
                    displayTheme: theme,
                    // displayTheme: 'light',
                    accent: { r: 162, g: 115, b: 242 },
                }}
            >
                <Main />
            </ArweaveWalletKit>
        </ArweaveProvider>
    );
}

export default App;
