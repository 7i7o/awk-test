import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { createMessage, isValidAddress, tag, } from '../utils/arweaveUtils';
import { dryrun } from '@permaweb/aoconnect';
import { LoaderPinwheel } from 'lucide-react';
import { LetterIcon } from './LetterIcon';
export function AOTokenInfo(props) {
    const { process } = props;
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState();
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [logo, setLogo] = useState('');
    const [, setDenomination] = useState('');
    useEffect(() => {
        if (!isValidAddress(process)) {
            setLoading(false);
            setTags(undefined);
        }
        const getTokenInfo = async (addr) => {
            setLoading(true);
            try {
                const info = await dryrun(createMessage(addr, [tag('Action', 'Info')]));
                console.log(info);
                if (!info || !info.Messages || !info.Messages[0].Tags) {
                    setTags(undefined);
                    return;
                }
                console.log(info);
                setTags(info.Messages[0].Tags);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        getTokenInfo(process);
    }, [process]);
    useEffect(() => {
        setName('');
        setTicker('');
        setLogo('');
        setDenomination('');
        tags?.forEach((t) => {
            switch (t.name) {
                case 'Name':
                    setName(t.value);
                    break;
                case 'Ticker':
                    setTicker(t.value);
                    break;
                case 'Logo':
                    setLogo(t.value);
                    break;
                case 'Denomination':
                    setDenomination(t.value);
                    break;
                default:
                    break;
            }
        });
    }, [tags]);
    if (loading)
        return _jsx(LoaderPinwheel, { className: "ml-2 h-8 w-8 animate-spin" });
    if (!process || !tags)
        return;
    return (_jsx("div", { className: "ml-2 flex items-center justify-start", children: (logo || name || ticker) && (_jsxs("a", { target: "_blank", href: `https://www.ao.link/#/token/${process}`, className: "flex items-center justify-start gap-2", children: [logo && (_jsx("img", { src: `https://arweave.net/${logo}`, alt: "logo", className: "inline-flex h-8 w-8 rounded-full" })), !logo && ticker && (_jsx(LetterIcon, { letter: ticker.substring(0, 1), className: "w-8 rounded-full bg-white text-slate-500" })), name && _jsx("span", { children: name }), ticker && _jsxs("span", { children: ["(", ticker, ")"] })] })) }));
}