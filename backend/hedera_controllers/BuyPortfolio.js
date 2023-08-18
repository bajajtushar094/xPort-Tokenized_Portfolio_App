const { Client, PrivateKey,ContractFunctionParameters ,ContractCreateTransaction,ContractCallQuery, ContractExecuteTransaction, Hbar, TransferTransaction, FileCreateTransaction, AccountId, TopicMessageQuery, AccountCreateTransaction, TopicMessageSubmitTransaction} = require("@hashgraph/sdk");
require('dotenv').config();

const fs = require('fs');

var myAccountId;
var myPrivateKey;
var client;

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


const QuerryFirstMessage = async (topicId) => {

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


async function purchasePortfolio (accountID, privateKey, topicId) {
    
    myAccountId = AccountId.fromString(accountID);
    myPrivateKey = PrivateKey.fromString(privateKey);


    client = Client.forTestnet().setOperator(myAccountId, myPrivateKey);

    const bytecodeFileId = '0.0.546432';
    //const ans = await QuerryFirstMessage();
    
    // Instantiate the contract instance
    const contractTx = new ContractCreateTransaction()
          //Set the file ID of the Hedera file storing the bytecode
          .setBytecodeFileId(bytecodeFileId)
          //Set the gas to instantiate the contract
          .setGas(100000)
          //Provide the constructor parameters for the contract
          .setConstructorParameters(new ContractFunctionParameters().addString(await QuerryFirstMessage(topicId)));
    
    //Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(client);
    
    //Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(client);
    
    //Get the smart contract ID
    const newContractId = contractReceipt.contractId;
    
    //Log the smart contract ID
    console.log("The smart contract ID is " + newContractId);
    
    // Calls a function of the smart contract
    const contractQuery = await new ContractCallQuery()
         //Set the gas for the query
         .setGas(100000)
         //Set the contract ID to return the request for
         .setContractId(newContractId)
         //Set the contract function to call
         .setFunction("get_message" )
         //Set the query payment for the node returning the request
         //This value must cover the cost of the request otherwise will fail
         .setQueryPayment(new Hbar(2));
    
    //Submit to a Hedera network
    const getMessage = await contractQuery.execute(client);
    
    // Get a string from the result at index 0
    const message = getMessage.getString(0);
    
    //Log the message
    console.log("The contract message: " + message);
    
    //v2 Hedera JavaScript SDK
    //v2 JavaScript SDK
     //Create the transaction to update the contract message
     const contractExecTx = await new ContractExecuteTransaction()
     //Set the ID of the contract
     .setContractId(newContractId)
     //Set the gas for the contract call
     .setGas(100000)
     //Set the contract function to call
     .setFunction("set_message", new ContractFunctionParameters().addString("Hello from Hedera again!"));
    
    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client);
    
    //Get the receipt of the transaction
    const receipt2 = await submitExecTx.getReceipt(client);
    
    //Confirm the transaction was executed successfully 
    console.log("The transaction status is " +receipt2.status.toString());
    
    //Query the contract for the contract message
    const contractCallQuery = new ContractCallQuery()
     //Set the ID of the contract to query
     .setContractId(newContractId)
     //Set the gas to execute the contract call
     .setGas(100000)
     //Set the contract function to call
     .setFunction("get_message")
     //Set the query payment for the node returning the request
     //This value must cover the cost of the request otherwise will fail 
     .setQueryPayment(new Hbar(10));
    
    //Submit the transaction to a Hedera network 
    const contractUpdateResult = await contractCallQuery.execute(client);
    
    //Get the updated message at index 0
    const message2 = contractUpdateResult.getString(0);
    
    //Log the updated message to the console
    console.log("The updated contract message: " + message2);
    
    //v2 Hedera JavaScript SDK
}

module.exports = {purchasePortfolio};