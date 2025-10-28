import React, { type ReactNode, useMemo } from 'react';
import { ArweaveContext } from '../hooks/useArweave';
import Arweave from 'arweave';
import { DEFAULT_GATEWAY } from '../utils/arweaveUtils';
import { CU_URL } from '../utils/arweaveUtils';
import { connect } from '@permaweb/aoconnect';
import { useSettings } from './SettingsContext';

export const ArweaveProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { settings } = useSettings();

    const arweave = useMemo(() => {
        const gateway = {
            host: settings.arweaveGatewayHost || DEFAULT_GATEWAY.host,
            port: parseInt(settings.arweaveGatewayPort) || DEFAULT_GATEWAY.port,
            protocol: settings.arweaveGatewayProtocol || DEFAULT_GATEWAY.protocol,
        };
        return Arweave.init(gateway);
    }, [settings.arweaveGatewayHost, settings.arweaveGatewayPort, settings.arweaveGatewayProtocol]);

    const ao = useMemo(() => {
        let message, dryrun, result;
        
        // Use custom CU URL if provided, otherwise fall back to default
        const cuUrl = settings.aoConnectCuUrl || CU_URL;
        
        // Create connection config
        const connectionConfig: any = {};
        if (cuUrl) {
            connectionConfig.CU_URL = cuUrl;
        }
        if (settings.aoConnectGatewayUrl) {
            connectionConfig.GATEWAY_URL = settings.aoConnectGatewayUrl;
        }

        const { message: m, dryrun: d, result: r } = connect(connectionConfig);
        message = m;
        dryrun = d;
        result = r;

        return { message, dryrun, result };
    }, [settings.aoConnectCuUrl, settings.aoConnectGatewayUrl]);

    return (
        <ArweaveContext.Provider
            value={{
                arweave,
                ao,
            }}
        >
            {children}
        </ArweaveContext.Provider>
    );
};
