import type { Tag } from './arweaveUtils';

class AODataItemBuilder {
    encoder: TextEncoder;
    constructor() {
        this.encoder = new TextEncoder();
    }

    // Convert string to 32-byte buffer, padding with zeros if needed
    to32ByteArray(str = '') {
        const buffer = new Uint8Array(32);
        if (str) {
            const encoded = this.encoder.encode(str);
            buffer.set(encoded.slice(0, 32));
        }
        return buffer;
    }

    // Encode tags following ANS-104 format
    encodeTags(tags: Tag[]) {
        const tagCount = new Uint8Array(8);
        const view = new DataView(tagCount.buffer);
        view.setBigUint64(0, BigInt(tags.length), true); // little endian

        const tagBuffers = [];
        for (const tag of tags) {
            const nameBytes = this.encoder.encode(tag.name);
            const valueBytes = this.encoder.encode(tag.value);

            // Name length (8 bytes, little endian)
            const nameLength = new Uint8Array(8);
            const nameLengthView = new DataView(nameLength.buffer);
            nameLengthView.setBigUint64(0, BigInt(nameBytes.length), true);

            // Value length (8 bytes, little endian)
            const valueLength = new Uint8Array(8);
            const valueLengthView = new DataView(valueLength.buffer);
            valueLengthView.setBigUint64(0, BigInt(valueBytes.length), true);

            tagBuffers.push(nameLength, nameBytes, valueLength, valueBytes);
        }

        return this.concatBuffers([tagCount, ...tagBuffers]);
    }

    // Concatenate multiple Uint8Arrays
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    concatBuffers(buffers: any[]) {
        const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buf of buffers) {
            result.set(buf, offset);
            offset += buf.length;
        }
        return result;
    }

    // Build the complete dataitem (without signature)
    buildDataItem(target: string, data = '', tags: Tag[] = [], anchor = '') {
        const targetBytes = this.to32ByteArray(target);
        const anchorBytes = this.to32ByteArray(anchor);
        const dataBytes = this.encoder.encode(data);
        const tagsBytes = this.encodeTags(tags);

        // Build header without signature (signature will be added after signing)
        const header = this.concatBuffers([
            targetBytes, // 32 bytes
            anchorBytes, // 32 bytes
            tagsBytes, // variable length
        ]);

        return this.concatBuffers([header, dataBytes]);
    }

    // Create AO message tags
    createAOTags(action: string, additionalTags: Tag[] = []) {
        const baseTags = [
            { name: 'Data-Protocol', value: 'ao' },
            { name: 'Variant', value: 'ao.TN.1' },
            { name: 'Type', value: 'Message' },
            { name: 'Action', value: action },
        ];

        return [...baseTags, ...additionalTags];
    }
}

// Usage example with Arweave wallet signing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// async function sendAOMessage(processId:string, action:string, data:any, additionalTags = []) {
//     const builder = new AODataItemBuilder();

//     // Create the tags
//     const tags = builder.createAOTags(action, additionalTags);

//     // Build the unsigned dataitem
//     const unsignedDataItem = builder.buildDataItem({
//         target: processId,
//         data: data,
//         tags: tags,
//     });

//     try {
//         // Sign with ArConnect/Wander wallet
//         const signedDataItem = await window.arweaveWallet.signDataItem({
//             data: unsignedDataItem,
//             // You may need to specify additional parameters depending on wallet
//         });

//         // Submit to AO
//         const response = await fetch('https://cu.ao-testnet.xyz/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/octet-stream',
//             },
//             body: signedDataItem,
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Message sent:', result);
//         return result;
//     } catch (error) {
//         console.error('Error sending AO message:', error);
//         throw error;
//     }
// }

// Example usage:
// sendAOMessage(
//   'your-process-id',
//   'Balance',
//   JSON.stringify({ Target: 'some-target' }),
//   [{ name: "Custom-Tag", value: "custom-value" }]
// );

export { AODataItemBuilder };
