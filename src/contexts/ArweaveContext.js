import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import { ArweaveContext } from '../hooks/useArweave';
import Arweave from 'arweave';
import { DEFAULT_GATEWAY } from '../utils/arweaveUtils';
import { CU_URL } from '../utils/arweaveUtils';
import { connect } from '@permaweb/aoconnect';
export const ArweaveProvider = ({ children, }) => {
    const arweave = useMemo(() => Arweave.init(DEFAULT_GATEWAY), []);
    const ao = useMemo(() => {
        let message, dryrun, result;
        if (CU_URL) {
            const { message: m, dryrun: d, result: r } = connect({ CU_URL });
            message = m;
            dryrun = d;
            result = r;
        }
        else {
            const { message: m, dryrun: d, result: r } = connect();
            message = m;
            dryrun = d;
            result = r;
        }
        return { message, dryrun, result };
    }, []);
    return (_jsx(ArweaveContext.Provider, { value: {
            arweave,
            ao,
        }, children: children }));
};