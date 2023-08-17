console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  TopicCreateTransaction,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");
const axios = require("axios");
const TextDecoder = require("text-encoding").TextDecoder

// Grab the OPERATOR_ID and OPERATOR_KEY from the .env file
const myAccountId = AccountId.fromString(process.env.OPERATOR_ID);
const myPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

// Build Hedera testnet and mirror node client
var client = Client.forTestnet();

// Set the operator account ID and operator private key
client.setOperator(myAccountId, myPrivateKey);


async function createNewTopic(){
  let txResponse = await new TopicCreateTransaction()
  .setSubmitKey(myPrivateKey.publicKey)
  .execute(client);
  return txResponse;
}

async function getTopicId(txResponse){
  console.log("txResponse: ",txResponse);
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);
  return topicId;
}

async function topicMessageQuery(topicId){
  console.log("Topic Id from topicMessageQuery: ", topicId);
  new TopicMessageQuery()
    .setTopicId(topicId)
    .subscribe(client, null, (message) => {
      let messageAsString = Buffer.from(message.contents, "utf8").toString();
      console.log(
        `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
      );
    });
}

async function submitMessage(topicId){
  console.log("Topic Id from submitMessage: ", topicId);
  letvalue = { name: "Logan", age: 21, location: "London" };
  letresult = JSON.stringify(letvalue);
  // Send message to private topic
  let submitMsgTx = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: letresult,
  })
  .freezeWith(client)
  .sign(myPrivateKey);
  return submitMsgTx;
}

async function getStatus(submitMsgTx){
  console.log("Submit Message Transaction: ", submitMsgTx);
  let submitMsgTxSubmit = await submitMsgTx.execute(client);
  let getReceipt = await submitMsgTxSubmit.getReceipt(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status;
  console.log("The message transaction status: " + transactionStatus.toString());
}

async function getMessage(topicId){
  console.log("entered the fetch block");
  const data = fetch(`https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`).then(res =>res.text()).then(
    text=>{
      const obj = JSON.parse(text);
      var res = obj.messages.map(function(elem) {
          return elem.message;
      })
      console.log(res[0]);
      const decodedString = atob(res[0]); 
      console.log(decodedString)
    }
  );
}



//pass arguments
async function submitPrivateMessage() {

 
  txResponse = await createNewTopic();

  topicId = await getTopicId(txResponse);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await topicMessageQuery(topicId);

  submitMsgTx = await submitMessage(topicId);

  await getStatus(submitMsgTx)
  
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // topicId = "0.0.466401";
  await getMessage(topicId);

}

submitPrivateMessage()