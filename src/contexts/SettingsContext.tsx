import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useApi, useConnection } from '../utils/awk';

export interface SettingsConfig {
    arweaveGatewayHost: string;
    arweaveGatewayPort: string;
    arweaveGatewayProtocol: string;
    aoConnectGatewayUrl: string;
    aoConnectCuUrl: string;
}

export const DEFAULT_SETTINGS: SettingsConfig = {
    arweaveGatewayHost: 'arweave.net',
    arweaveGatewayPort: '443',
    arweaveGatewayProtocol: 'https',
    aoConnectGatewayUrl: '',
    aoConnectCuUrl: '',
};

interface SettingsContextType {
    settings: SettingsConfig;
    updateSettings: (newSettings: SettingsConfig) => void;
    resetSettings: () => void;
    isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const api = useApi();
    const { connected } = useConnection();
    const [settings, setSettings] = useState<SettingsConfig>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(false);
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>('');

    // Load wallet address when connected
    useEffect(() => {
        const loadWalletAddress = async () => {
            if (connected && api) {
                try {
                    const address = await api.getActiveAddress();
                    setCurrentWalletAddress(address);
                } catch (error) {
                    console.error('Failed to get wallet address:', error);
                    setCurrentWalletAddress('');
                }
            } else {
                setCurrentWalletAddress('');
            }
        };

        loadWalletAddress();
    }, [connected, api]);

    // Load settings from localStorage when wallet address changes
    useEffect(() => {
        if (currentWalletAddress) {
            setIsLoading(true);
            const storageKey = `awk_settings_${currentWalletAddress}`;
            const savedSettings = localStorage.getItem(storageKey);
            if (savedSettings) {
                try {
                    const parsed = JSON.parse(savedSettings);
                    setSettings({ ...DEFAULT_SETTINGS, ...parsed });
                } catch (error) {
                    console.error('Failed to parse saved settings:', error);
                    setSettings(DEFAULT_SETTINGS);
                }
            } else {
                setSettings(DEFAULT_SETTINGS);
            }
            setIsLoading(false);
        } else {
            // When disconnected, reset to defaults
            setSettings(DEFAULT_SETTINGS);
        }
    }, [currentWalletAddress]);

    // Listen for settings updates from the Settings component
    useEffect(() => {
        const handleSettingsUpdate = (event: CustomEvent) => {
            const { walletAddress, settings: newSettings } = event.detail;
            if (walletAddress === currentWalletAddress) {
                setSettings(newSettings);
            }
        };

        window.addEventListener('settings-updated', handleSettingsUpdate as EventListener);
        return () => {
            window.removeEventListener('settings-updated', handleSettingsUpdate as EventListener);
        };
    }, [currentWalletAddress]);

    const updateSettings = (newSettings: SettingsConfig) => {
        setSettings(newSettings);
        if (currentWalletAddress) {
            const storageKey = `awk_settings_${currentWalletAddress}`;
            localStorage.setItem(storageKey, JSON.stringify(newSettings));
        }
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        if (currentWalletAddress) {
            const storageKey = `awk_settings_${currentWalletAddress}`;
            localStorage.removeItem(storageKey);
        }
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSettings,
                resetSettings,
                isLoading,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
