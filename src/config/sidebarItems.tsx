import { UploadFile } from '../components/UploadFile';
import { SendAR } from '../components/SendAR';
import { EncryptDecrypt } from '../components/EncryptDecrypt';
import { SendAOToken } from '../components/SendAOToken';
import { SendAOMessage } from '../components/SendAOMessage';
import { DryRunAOMessage } from '../components/DryRunAOMessage';
import { BatchTest } from '../components/BatchTest';
import { GraphQLTest } from '../components/GraphQLTest';
import { SignMessage } from '../components/SignMessage';
import { Settings } from '../components/Settings';
import { 
    Upload, 
    Send, 
    Lock, 
    Coins, 
    MessageCircle, 
    PlayCircle, 
    Layers, 
    Database, 
    FileSignature, 
    Settings as SettingsIcon 
} from 'lucide-react';
// import { SendARtoEVM } from '../components/SendARtoEVM';
// import { SendAOTokenToEVM } from '../components/SendAOTokenToEVM';

export interface SidebarItemConfig {
    id: string;
    title: string;
    component: React.ReactNode;
    icon?: React.ReactNode;
}

export const sidebarItems: SidebarItemConfig[] = [
    {
        id: 'upload',
        title: 'Upload a File',
        component: <UploadFile />,
        icon: <Upload size={16} />,
    },
    {
        id: 'send-ar',
        title: 'Send AR',
        component: <SendAR />,
        icon: <Send size={16} />,
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
        icon: <Lock size={16} />,
    },
    {
        id: 'signMessage',
        title: 'Sign Message',
        component: <SignMessage />,
        icon: <FileSignature size={16} />,
    },
    {
        id: 'send-ao-token',
        title: 'Send AO Token',
        component: <SendAOToken />,
        icon: <Coins size={16} />,
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
        icon: <MessageCircle size={16} />,
    },
    {
        id: 'dry-run',
        title: 'Dry Run AO Message',
        component: <DryRunAOMessage />,
        icon: <PlayCircle size={16} />,
    },
    {
        id: 'batch',
        title: 'Test Batch',
        component: <BatchTest />,
        icon: <Layers size={16} />,
    },
    {
        id: 'graphql',
        title: 'Test GraphQL',
        component: <GraphQLTest />,
        icon: <Database size={16} />,
    },
    {
        id: 'settings',
        title: 'Settings',
        component: <Settings />,
        icon: <SettingsIcon size={16} />,
    },
];
