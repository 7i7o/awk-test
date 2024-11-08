import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useApi } from 'arweave-wallet-kit';
import { useArweave } from '../hooks/useArweave';
import { useState } from 'react';
import { isValidAddress } from '../utils/arweaveUtils';
import { Button } from './Button';
import { Input } from './Input';
import { emptyTxResult, TxResult } from './TxResult';
export function SendAR() {
    const api = useApi();
    const { arweave } = useArweave();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState('0');
    const [target, setTarget] = useState('');
    const [txResult, setTxResult] = useState(emptyTxResult);
    const createTx = async () => {
        if (!quantity || !target)
            return;
        if (!isValidAddress(target)) {
            console.error(`Target address is not a valid Arweave address`);
            return;
        }
        if (Number(quantity) <= 0) {
            console.error(`Quantity to send is not valid`);
            return;
        }
        const tx = await arweave.createTransaction({
            quantity: arweave.ar.arToWinston(quantity),
            target: target,
        });
        return tx;
    };
    const sendAR = async () => {
        if (!arweave || !api)
            return;
        const tx = await createTx();
        if (!tx)
            return;
        setLoading(true);
        try {
            const signedTx = await api.sign(tx);
            const postResult = await arweave.transactions.post(signedTx);
            console.log(' | Signed Tx: ', signedTx);
            console.log(' | Post Result: ', postResult);
            setTxResult({
                txId: signedTx.id,
                status: `${postResult.status}`,
                statusMsg: postResult.statusText,
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "justify-betweengap-2 flex w-full flex-col items-start", children: [_jsxs("div", { className: "flex w-full items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1", children: ["Qty:\u00A0", _jsx(Input, { type: "number", placeholder: "Amount", value: quantity, onChange: (e) => setQuantity(e.target.value), className: "w-40" }), "\u00A0AR\u00A0To:\u00A0", _jsx(Input, { type: "text", placeholder: "Recipient wallet address", value: target, onChange: (e) => setTarget(e.target.value), className: "w-96" })] }), _jsx(Button, { onClick: sendAR, disabled: !quantity || !target || loading, children: "Send" })] }), txResult.status && _jsx(TxResult, { txResult: txResult })] }));
}
