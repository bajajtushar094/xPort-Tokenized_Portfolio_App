require("dotenv").config();
const {
  AccountId,
  AccountCreateTransaction,
  PrivateKey,
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  FileAppendTransaction,
  Hbar,
  ContractCreateFlow,
} = require("@hashgraph/sdk");
const fs = require("fs");


const createnewaccnt = async (mobileNumber) => {
  // Configure accounts and client
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (!myAccountId || !myPrivateKey) {
    throw new Error(
      "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
    );
  }

  //Create your Hedera Testnet client
  const client = Client.forTestnet();

  //Set your account as the client's operator
  client.setOperator(myAccountId, myPrivateKey);
  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(100));

  //Set the maximum payment for queries (in Hbar)
  client.setMaxQueryPayment(new Hbar(50));
  //Create new keys
   const newAccountPrivateKey = PrivateKey.generateED25519();
   const newAccountPublicKey = newAccountPrivateKey.publicKey;

  //  // Create a new account with 1,000 tinybar starting balance
   const newAccount = await new AccountCreateTransaction()
     .setKey(newAccountPublicKey)
     .setInitialBalance(new Hbar(1000))
     .execute(client);

   // Get the new account ID
   const getReceipt = await newAccount.getReceipt(client);
   const newAccountId = getReceipt.accountId;

   console.log("\nNew account ID: " + newAccountId);
   console.log("\nNew account public key: " + newAccountPublicKey);
   console.log("\nNew account private key: " + newAccountPrivateKey);

  // const mobile = "1111111";
  const mobile = mobileNumber;


  // Import the compiled contract bytecode
  const contractId = "0.0.461505";

  // map userid accntid
  // export private key
  // Call contract function to update the state variable
  const contractExecuteTx1 = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(10000000)
    .setFunction(
      "setaccntID",
      new ContractFunctionParameters().addString(mobile.toString()).addString(newAccountId.toString())
    );
  const contractExecuteSubmit1 = await contractExecuteTx1.execute(client);
  const contractExecuteRx1 = await contractExecuteSubmit1.getReceipt(client);
  console.log(`- Contract function call status: ${contractExecuteRx1.status} \n`);



  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(10000000)
    .setFunction(
      "setpubkey",
      new ContractFunctionParameters().addString(newAccountId.toString()).addString(newAccountPublicKey.toString())
    );
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);

  // Query the contract to check changes in state variable
  // const contractQueryTx1 = new ContractCallQuery()
  //   .setContractId(contractId)
  //   .setGas(100000)
  //   .setFunction("getaccntID", new ContractFunctionParameters().addString(mobile.toString()));
  // const contractQuerySubmit1 = await contractQueryTx1.execute(client);
  // const contractQueryResult1 = contractQuerySubmit1.getString(0);
  // console.log(`- Here's the accountID: ${contractQueryResult1} \n`);

  // const contractQueryTx2 = new ContractCallQuery()
  //   .setContractId(contractId)
  //   .setGas(100000)
  //   .setFunction("getpubkey", new ContractFunctionParameters().addString(contractQueryResult1));
  // const contractQuerySubmit2 = await contractQueryTx2.execute(client);
  // const contractQueryResult2 = contractQuerySubmit2.getString(0);
  // console.log(`- Here's the publickey: ${contractQueryResult2} \n`);

  return {
    "AccountId": newAccountId.toString(),
    "PrivateKey": newAccountPrivateKey.toString()
  }
}
// createnewaccnt();
module.exports = {createnewaccnt}
