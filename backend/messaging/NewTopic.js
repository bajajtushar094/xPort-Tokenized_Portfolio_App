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

// Grab the OPERATOR_ID and OPERATOR_KEY from the .env file
const {MY_ACCOUNT_ID, MY_PRIVATE_KEY} = require("./help.js");

const operatorId = AccountId.fromString(MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(MY_PRIVATE_KEY);
//const client = Client.forTestnet().setOperator(operatorId,operatorKey);
// var newTopicID;
// Build Hedera testnet and mirror node client
const client = Client.forTestnet();

// Set the operator account ID and operator private key
client.setOperator(operatorId, operatorKey);

const createNewTopic = async () => {
  // Create a new topic
  let txResponse = await new TopicCreateTransaction().execute(client);

  // Grab the newly generated topic ID
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  //let newTopicID = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  // Wait 5 seconds between consensus topic creation and subscription creation
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return topicId;
}

module.exports = {createNewTopic};