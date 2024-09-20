const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6648c699000032e4623c') 
    .setKey(
        "6999a3b40772137237646f8485adbe712ddabbfc8868bc6e2450617391e03f6911fb8732a18b41412a93eb1ee820ad989bea2566729c8001a04ad1dfc63fb64cc31df7bf0361167d28b99c89982733c5d1a600b65470bf744669631ae2c0716e393b26314fe9c5fb6e39bc72da709d23a82eb75f986490d02738f1211476fd91"
      );

const account = new sdk.Account(client);
export { client, account };
