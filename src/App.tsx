import {
    // ArConnectStrategy,
    ArweaveWalletKit,
    // BrowserWalletStrategy,
    OthentStrategy,
    WanderStrategy,
    WebWalletStrategy,
} from './utils/awk';
import Main from './components/Main';
import { ArweaveProvider } from './contexts/ArweaveContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { useTheme } from './hooks/useTheme';

function App() {
    const { theme } = useTheme();
    return (
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
            <SettingsProvider>
                <ArweaveProvider>
                    <Main />
                </ArweaveProvider>
            </SettingsProvider>
        </ArweaveWalletKit>
    );
}

export default App;
