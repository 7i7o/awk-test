import { UploadFile } from '../components/UploadFile';
import { SendAR } from '../components/SendAR';
import { EncryptDecrypt } from '../components/EncryptDecrypt';
import { SendAOToken } from '../components/SendAOToken';
import { SendAOMessage } from '../components/SendAOMessage';
import { DryRunAOMessage } from '../components/DryRunAOMessage';
import { BatchTest } from '../components/BatchTest';
import { GraphQLTest } from '../components/GraphQLTest';
import { SignMessage } from '../components/SignMessage';
// import { SendARtoEVM } from '../components/SendARtoEVM';
// import { SendAOTokenToEVM } from '../components/SendAOTokenToEVM';

export interface SidebarItemConfig {
    id: string;
    title: string;
    component: React.ReactNode;
}

export const sidebarItems: SidebarItemConfig[] = [
    {
        id: 'upload',
        title: 'Upload a File',
        component: <UploadFile />,
    },
    {
        id: 'send-ar',
        title: 'Send AR',
        component: <SendAR />,
    },
    // {
    //     id: 'send-ar-to-evm',
    //     title: 'Send AR to EVM',
    //     component: <SendARtoEVM />,
    // },
    {
        id: 'encrypt',
        title: 'Encrypt / Decrypt',
        component: <EncryptDecrypt />,
    },
    {
        id: 'signMessage',
        title: 'Sign Message',
        component: <SignMessage />,
    },
    {
        id: 'send-ao-token',
        title: 'Send AO Token',
        component: <SendAOToken />,
    },
    // {
    //     id: 'send-ao-token-to-evm',
    //     title: 'Send AO Token to EVM',
    //     component: <SendAOTokenToEVM />,
    // },
    {
        id: 'send-ao-message',
        title: 'Send AO Message',
        component: <SendAOMessage />,
    },
    {
        id: 'dry-run',
        title: 'Dry Run AO Message',
        component: <DryRunAOMessage />,
    },
    {
        id: 'batch',
        title: 'Test Batch',
        component: <BatchTest />,
    },
    {
        id: 'graphql',
        title: 'Test GraphQL',
        component: <GraphQLTest />,
    },
];
