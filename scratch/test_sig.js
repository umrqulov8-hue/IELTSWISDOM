const crypto = require('crypto');

const data = "90199345:10000:1776787187";
const expected = "d9f068848b5369c66f1fdb167962b359c441b443586cd1769622d64539665bc7";

const secrets = [
    "696f9c0bb7854113", // Merchant ID
    "7e5082f37ca9f94afcbfe635f9c5147bf58a7b997c4fc499" // API Key
];

for (const secret of secrets) {
    const hash = crypto.createHmac('sha256', secret).update(data).digest('hex');
    console.log(`Secret: ${secret}`);
    console.log(`Generated: ${hash}`);
    console.log(`Match: ${hash === expected}`);
    console.log('---');
}
