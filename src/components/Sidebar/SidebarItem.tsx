import { type ReactNode } from 'react';

interface SidebarItemProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
    icon?: ReactNode;
}

export function SidebarItem({ title, isActive, onClick, icon }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-lg px-3 py-2 text-left text-slate-950 dark:text-slate-50
                hover:bg-slate-200 dark:hover:bg-slate-800 
                ${isActive ? 'bg-slate-200 dark:bg-slate-800' : ''}`}
        >
            <div className="flex items-center gap-2">
                {icon && (
                    <span className="flex-shrink-0 w-4 h-4">
                        {icon}
                    </span>
                )}
                <span>{title}</span>
            </div>
        </button>
    );
} 