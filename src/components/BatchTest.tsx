import { Button } from './Button';
import { DataItem } from 'warp-arbundles';
import TagsDisplay from './TagsDisplay';

// const tagsExample = [
//     { name: 'Content-Type', value: 'image/png' },
//     { name: 'Creator', value: '3-wJvHy394n92g' },
//     { name: 'Title', value: 'soggystarrynight2' },
//     { name: 'Description', value: "ade mc @ ade's press 2023-4" },
//     { name: 'Implements', value: 'ANS-110' },
//     { name: 'Date-Created', value: '1719048914300' },
//     { name: 'Action', value: 'Add-Uploaded-Asset' },
// ];

const processId = 'n2DbyGJVMMyZuDt8zDTS5QCfo4j1TRRsCEU9oj0uJ8M';
const recipient = 'E_pOZW6MDRtcTraQlIEM0p4l_AedIadAO9j-RzuPol8';

const aoTags = [
    { name: 'Data-Protocol', value: 'ao' },
    { name: 'Variant', value: 'ao.TN.1' },
    { name: 'Type', value: 'Message' },
    { name: 'Target', value: processId },
    { name: 'Action', value: 'Transfer' },
    { name: 'Recipient', value: recipient },
];
const batchItems = [
    {
        target: processId,
        data: '1984',
        tags: [...aoTags, { name: 'Quantity', value: '1000000000000' }],
    },
    {
        target: processId,
        data: '1985',
        tags: [...aoTags, { name: 'Quantity', value: '2000000000000' }],
    },
];

export function BatchTest() {
    const test = async () => {
        if (!window.arweaveWallet) return;

        console.log('Batch items:', batchItems);

        const signedDis =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            await window.arweaveWallet.batchSignDataItem(batchItems);
        console.log('Signed data items:', signedDis);

        for (const rawDI of signedDis) {
            const di = new DataItem(rawDI as Buffer);
            const response = await fetch(`https://upload.ardrive.io/v1/tx`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                body: di.getRaw(),
            });
            console.log(await response.json());
        }
    };

    return (
        <div className="justify-betweengap-2 flex w-full flex-col items-start">
            <div className="mt-6 flex w-full flex-col items-start justify-between space-y-2">
                <Button
                    onClick={() => test()}
                    disabled={!window.arweaveWallet}
                    className="mx-auto"
                >
                    Test Batch Sign
                </Button>
                <div className="pt-8 text-lg font-semibold">
                    Transactions Tags:
                </div>
                <div className="ml-2 text-base">Tx 1</div>
                <TagsDisplay tags={batchItems[0]?.tags || []} />
                <div className="ml-2 text-base">Tx 2</div>
                <TagsDisplay tags={batchItems[1]?.tags || []} />
            </div>
        </div>
    );
}
