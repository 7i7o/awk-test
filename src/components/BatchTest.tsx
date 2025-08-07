import { useApi } from '../utils/awk';
// import { AODataItemBuilder } from '../utils/dataItemHelper';
import { Button } from './Button';
import { DataItem } from 'warp-arbundles';
// import TagsDisplay from './TagsDisplay';

export function BatchTest() {
    const api = useApi();

    // const tagsExample = [
    //     { name: 'Content-Type', value: 'image/png' },
    //     { name: 'Creator', value: '3-wJvHy394n92g' },
    //     { name: 'Title', value: 'soggystarrynight2' },
    //     { name: 'Description', value: "ade mc @ ade's press 2023-4" },
    //     { name: 'Implements', value: 'ANS-110' },
    //     { name: 'Date-Created', value: '1719048914300' },
    //     { name: 'Action', value: 'Add-Uploaded-Asset' },
    // ];

    const test = async () => {
        if (!api) return;

        const batchItems = [
            {
                data: '1984',
                tags: [
                    { name: 'Data-Protocol', value: 'ao' },
                    { name: 'Variant', value: 'ao.TN.1' },
                    { name: 'Type', value: 'Message' },
                    {
                        name: 'Target',
                        value: 'n2DbyGJVMMyZuDt8zDTS5QCfo4j1TRRsCEU9oj0uJ8M',
                    },
                    { name: 'Action', value: 'Transfer' },
                    {
                        name: 'Recipient',
                        value: 'E_pOZW6MDRtcTraQlIEM0p4l_AedIadAO9j-RzuPol8',
                    },
                    { name: 'Quantity', value: '1000000000000' },
                ],
            },
            {
                data: '1985',
                tags: [
                    { name: 'Data-Protocol', value: 'ao' },
                    { name: 'Variant', value: 'ao.TN.1' },
                    { name: 'Type', value: 'Message' },
                    {
                        name: 'Target',
                        value: 'n2DbyGJVMMyZuDt8zDTS5QCfo4j1TRRsCEU9oj0uJ8M',
                    },
                    { name: 'Action', value: 'Transfer' },
                    {
                        name: 'Recipient',
                        value: 'E_pOZW6MDRtcTraQlIEM0p4l_AedIadAO9j-RzuPol8',
                    },
                    { name: 'Quantity', value: '2000000000000' },
                ],
            },
        ];
        // const builder = new AODataItemBuilder();
        // const tags = builder.createAOTags('Transfer', [
        //     { name: 'Quantity', value: '1000000000000' },
        //     {
        //         name: 'Recipient',
        //         value: 'E_pOZW6MDRtcTraQlIEM0p4l_AedIadAO9j-RzuPol8',
        //     },
        // ]);
        // const di = builder.buildDataItem(
        //     'n2DbyGJVMMyZuDt8zDTS5QCfo4j1TRRsCEU9oj0uJ8M',
        //     '1984',
        //     tags
        // );
        // batchItems.push({ data: di.toString(), tags: [] });
        // batchItems.push({ data: di.toString(), tags: [] });
        console.log('Batch items:', batchItems);

        const signedDis =
            //@ts-ignore
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
            <div className="-mt-2 flex w-full flex-col items-center justify-between space-y-2">
                <Button onClick={() => test()} disabled={!api}>
                    Test Batch Sign
                </Button>
                <div className="text-lg font-semibold">Tags Example:</div>
                {/* <TagsDisplay tags={tagsExample} /> */}
            </div>
        </div>
    );
}
