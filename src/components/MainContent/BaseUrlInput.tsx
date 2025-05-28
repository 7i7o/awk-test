import { useEffect, useState } from 'react';

// Add these constants at the top after imports
// eslint-disable-next-line react-refresh/only-export-components
export const STORAGE_KEYS = {
    BASE_URL: 'wander-base-url',
} as const;

export const DEFAULT_BASE_URL = 'https://embed-dev.wander.app';

export default function BaseUrlInput() {
    const [needsReload, setNeedsReload] = useState(false);
    const [baseURL, setBaseURL] = useState<string>(() => {
        return localStorage.getItem(STORAGE_KEYS.BASE_URL) || DEFAULT_BASE_URL;
    });

    useEffect(() => {
        const fixedBaseURL = baseURL.replace(/\/+$/, '');
        const storedBaseURL = localStorage.getItem(STORAGE_KEYS.BASE_URL);

        if (storedBaseURL !== fixedBaseURL) {
            localStorage.setItem(STORAGE_KEYS.BASE_URL, fixedBaseURL);
            setNeedsReload(true);
        }
    }, [baseURL]);

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Base URL:
            </label>
            <input
                type="text"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
                placeholder="e.g., http://localhost:5173"
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
            />
            {needsReload && (
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600"
                    title="Reload to apply changes"
                >
                    <span>Reload</span>
                </button>
            )}
        </div>
    );
}
