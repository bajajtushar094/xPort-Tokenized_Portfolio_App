console.clear();
const { Client, PrivateKey, TopicMessageQuery, Hbar, TopicCreateTransaction, AccountCreateTransaction, AccountId } = require("@hashgraph/sdk");
require('dotenv').config();
const { sendMessage } = require("./sendResponse.js");
const {MY_ACCOUNT_ID, MY_PRIVATE_KEY} = require('./help.js') 
const operatorId = AccountId.fromString(MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(MY_PRIVATE_KEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);


const QuerryFirstMessage = async () => {

  //const newTopicId = await createNewTopic();
  const newTopicId = '0.0.474284';

  var StringMessage = "";

  new TopicMessageQuery()
    .setTopicId(newTopicId)
    .subscribe(client, null, (message) => {
      let messageAsString = Buffer.from(message.contents, "utf8").toString();
      StringMessage = Buffer.from(message.contents, "utf8").toString();
      console.log(
        `${message.consensusTimestamp.toDate()} Received1: ${messageAsString}`
      );

    });

  const initBalance = 100;
  const aliceKey = PrivateKey.generateED25519();
  const [aliceAccSt, aliceId] = await accountCreatorFcn(aliceKey, initBalance);
  const client1 = Client.forTestnet().setOperator(aliceId, aliceKey);
  const transactionStatus1 = await sendMessage(newTopicId, client, "popindeersinghsodhi");
  const transactionStatus2 = await sendMessage(newTopicId, client1, "chup");


  const URL = `https://testnet.mirrornode.hedera.com/api/v1/topics/${newTopicId}/messages`;
  fetch(URL)
    .then(res => res.text())
    .then(text => {
      const obj = JSON.parse(text);

      var res = obj.messages.map(function (elem) {
        return elem.message;
      })

      const decodedString = atob(res[0]);

    })
    .catch(err => console.log(err));
  return StringMessage;
}

async function accountCreatorFcn(pvKey, iBal) {
  const response = await new AccountCreateTransaction()
    .setInitialBalance(new Hbar(iBal))
    .setKey(pvKey.publicKey)
    .execute(client);
  const receipt = await response.getReceipt(client);
  return [receipt.status, receipt.accountId];
}


module.exports = { QuerryFirstMessage };
