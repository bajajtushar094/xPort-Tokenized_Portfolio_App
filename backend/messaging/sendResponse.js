console.clear();
const { Client, PrivateKey,TopicMessageSubmitTransaction,TopicMessageQuery,TopicCreateTransaction , AccountId } = require("@hashgraph/sdk");
require('dotenv').config();
const {MY_ACCOUNT_ID, MY_PRIVATE_KEY} = require("./help.js");

const operatorId = AccountId.fromString(MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(MY_PRIVATE_KEY);
//const client = Client.forTestnet().setOperator(operatorId,operatorKey);

const sendMessage = async (newTopicId,client,ans) => { 
let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: newTopicId,
    message: ans,
  }).execute(client);

  const getReceipt = await sendResponse.getReceipt(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status;
  return transactionStatus;
}

module.exports = {sendMessage};