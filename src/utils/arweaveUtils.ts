import { isAddress } from 'viem';
import { BigNumber } from 'bignumber.js';

export const DEFAULT_GATEWAY = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
};

export const CU_URL = undefined;
// export const CU_URL = 'http://localhost:6363';

export const isValidArweaveAddress = (addr: string) =>
    /^[a-zA-Z0-9_-]{43}$/.test(addr);

export const isValidEVMAddress = (addr: string) => isAddress(addr);

export const qtyToDenominationQty = (
    qtyString: string,
    { denomination = 12, formatted = false } = {}
) => {
    let number = stringToBigNum(qtyString, denomination).shiftedBy(
        denomination
    );

    return formatted ? number.toFormat() : number.toFixed(0);
};

const stringToBigNum = (
    stringValue: string,
    decimalPlaces: number = 12
): BigNumber => {
    const BigNum = (value: string, decimals: number): BigNumber => {
        let instance = BigNumber.clone({ DECIMAL_PLACES: decimals });
        return new instance(value);
    };
    return BigNum(stringValue, decimalPlaces);
};

export type Tag = {
    name: string;
    value: string;
};

export type Message = {
    process: string;
    data?: string;
    tags?: Tag[];
    anchor?: string;
};

export const tag = (k: string, v: string): Tag => {
    return { name: k, value: v };
};

export const createMessage = (process: string, tags?: Tag[]) => {
    return {
        process: process,
        tags: tags ? tags : [],
    };
};
