import { ConnectButton } from '../../utils/awk';
import BaseServerUrlInput from './BaseServerUrlInput copy';
import BaseUrlInput from './BaseUrlInput';

interface MainContentHeaderProps {
    selectedItemTitle: string;
}

export function MainContentHeader({
    selectedItemTitle,
}: MainContentHeaderProps) {
    return (
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedItemTitle}</h2>
                <div className="flex flex-col items-start justify-center">
                    <BaseUrlInput />
                    <BaseServerUrlInput />
                </div>
                <ConnectButton
                    showBalance={false}
                    // showProfilePicture={true}
                    accent="#A273F2"
                    // useAns={false}
                    // useArNS={true}
                />
            </div>
        </div>
    );
}
