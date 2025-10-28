import React, { useState } from 'react';
import { useApi, useConnection } from '../utils/awk';
import { useSettings } from '../contexts/SettingsContext';
import { Button } from './Button';
import { Input } from './Input';

export function Settings() {
    const api = useApi();
    const { connected } = useConnection();
    const { settings, updateSettings, resetSettings, isLoading: contextLoading } = useSettings();
    const [loading, setLoading] = useState(false);
    const [localSettings, setLocalSettings] = useState(settings);
    const [walletAddress, setWalletAddress] = useState<string>('');

    // Update local settings when context settings change
    React.useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    // Load wallet address when connected
    React.useEffect(() => {
        const loadWalletAddress = async () => {
            if (connected && api) {
                try {
                    const address = await api.getActiveAddress();
                    setWalletAddress(address);
                } catch (error) {
                    console.error('Failed to get wallet address:', error);
                }
            } else {
                setWalletAddress('');
            }
        };

        loadWalletAddress();
    }, [connected, api]);

    const handleSave = async () => {
        if (!walletAddress) {
            alert('No wallet connected');
            return;
        }

        setLoading(true);
        try {
            updateSettings(localSettings);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        resetSettings();
    };

    if (!connected) {
        return (
            <div className="flex w-full flex-col items-center justify-center gap-4 p-8">
                <p className="text-slate-600 dark:text-slate-400">
                    Please connect your wallet to access settings.
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-start justify-between gap-6 p-6">
            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Global Settings</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Configure gateways and endpoints for Arweave and AO operations.
                    Settings are saved per wallet: {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </p>
            </div>

            <div className="w-full space-y-6">
                {/* Arweave Gateway Settings */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Arweave Gateway</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Protocol</label>
                            <select
                                value={localSettings.arweaveGatewayProtocol}
                                onChange={(e) => setLocalSettings(prev => ({ 
                                    ...prev, 
                                    arweaveGatewayProtocol: e.target.value 
                                }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:border-slate-600 dark:bg-slate-800"
                            >
                                <option value="https">HTTPS</option>
                                <option value="http">HTTP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Host</label>
                            <Input
                                value={localSettings.arweaveGatewayHost}
                                onChange={(e) => setLocalSettings(prev => ({ 
                                    ...prev, 
                                    arweaveGatewayHost: e.target.value 
                                }))}
                                placeholder="arweave.net"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Port</label>
                            <Input
                                value={localSettings.arweaveGatewayPort}
                                onChange={(e) => setLocalSettings(prev => ({ 
                                    ...prev, 
                                    arweaveGatewayPort: e.target.value 
                                }))}
                                placeholder="443"
                                type="number"
                            />
                        </div>
                    </div>
                </div>

                {/* AO Connect Settings */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">AO Connect</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Gateway URL</label>
                            <Input
                                value={localSettings.aoConnectGatewayUrl}
                                onChange={(e) => setLocalSettings(prev => ({ 
                                    ...prev, 
                                    aoConnectGatewayUrl: e.target.value 
                                }))}
                                placeholder="https://arweave.net (leave empty for default)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">CU (Compute Unit) URL</label>
                            <Input
                                value={localSettings.aoConnectCuUrl}
                                onChange={(e) => setLocalSettings(prev => ({ 
                                    ...prev, 
                                    aoConnectCuUrl: e.target.value 
                                }))}
                                placeholder="https://cu.ao-testnet.xyz (leave empty for default)"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1"
                >
                    {loading ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button
                    onClick={handleReset}
                    disabled={loading}
                    className="bg-slate-500 hover:bg-slate-600"
                >
                    Reset to Defaults
                </Button>
            </div>
        </div>
    );
}
