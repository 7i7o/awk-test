import { jsx as _jsx } from "react/jsx-runtime";
import {} from 'react';
export function Select(props) {
    const { children } = props;
    return (_jsx("select", { ...props, className: `${props.className} rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-950`, children: children }));
}
