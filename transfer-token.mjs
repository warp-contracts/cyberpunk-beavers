import { readFileSync } from "node:fs";
import {
    createDataItemSigner,
    message
} from "@permaweb/aoconnect";

// TODO: update tx id after game contract deployment and run it

const wallet = JSON.parse(readFileSync(".secrets/wallet.json").toString());

await message({
    /*
      The arweave TXID of the process, this will become the "target".
      This is the process the message is ultimately sent to.
    */
    process: "Iny8fK0S1FCSVVOIWubg2L9EXV1RFaxgRJwv5-mwEYk",
    // Tags that the process will use as input.
    tags: [
        { name: "From-Process", value: "Iny8fK0S1FCSVVOIWubg2L9EXV1RFaxgRJwv5-mwEYk" }, // ;)
        { name: "Recipient", value: "NC0qIOI0Lyr9PJRoq3OkZIvA0p2LKD9saETy_1KXfiw" },
        { name: "Action", value: "Transfer" },
        { name: "Quantity", value: "1000000" },
    ],
    // A signer function used to build the message "signature"
    signer: createDataItemSigner(wallet),
    /*
      The "data" portion of the message
      If not specified a random string will be generated
    */
    data: "any data",
})
    .then(console.log)
    .catch(console.error);

