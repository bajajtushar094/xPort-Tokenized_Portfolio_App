const { Client, AccountCreateTransaction , AccountId, FileCreateTransaction, Hbar,PrivateKey, FileAppendTransaction} = require("@hashgraph/sdk");

require('dotenv').config();
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const accountCreatorFcn = require ("./HelperFunctions/AccountCreatorFcn.js")
const contractCallQueryFcn = require  ("./HelperFunctions/ContractCallQueryFcn")
const contractDeployFcn = require  ("./HelperFunctions/ContractDeployFcn")
const contractExecuteFcn = require  ("./HelperFunctions/ContractExecuteFcn")
const contractExecuteNoFcn = require  ("./HelperFunctions/ContractExecuteNoFcn")
const contractParamsBuilderFcn = require  ("./HelperFunctions/ContractParamsBuilderFcn")
const hbar2ContractSdkFcn = require  ("./HelperFunctions/Hbar2ContractSdkFunction")
const showContractBalanceFcn=  require("./HelperFunctions/ShowContractBalanceFcn")

async function main() {

  // Create treasuery account  (senders)
  console.log(`\n- Creating accounts...`);
  const initBalance = 100;

  //User buying portfolio
  const treasuryKey = PrivateKey.generateED25519();
  const [treasuryAccSt, treasuryId] = await accountCreatorFcn.func(
    treasuryKey,
    initBalance,
    client
  );
  console.log(`- Created Treasury account ${treasuryId} that has a balance of ${initBalance} ℏ`);

  // create receivers account 

  // Owner of portfolio
  const aliceKey = PrivateKey.generateED25519();
  const [aliceAccSt, aliceId] = await accountCreatorFcn.func(aliceKey, initBalance,client);
  console.log(`- Created Alice's account ${aliceId} that has a balance of ${initBalance} ℏ`);

  // Import the compiled contract bytecode
  const contractBytecode = fs.readFileSync("./transaction_sol_hbarToAndFromContract.bin");
  const fileCreateTx = new FileCreateTransaction()
    .setKeys([operatorKey])
    .freezeWith(client);
    const fileCreateSign = await fileCreateTx.sign(operatorKey);
    const fileCreateSubmit = await fileCreateSign.execute(client);
    const  fileCreateRx =  await fileCreateSubmit.getReceipt(client);
    const byteCodeFileId = fileCreateRx.fileId;

    console.log(`bytecode file id is : ${byteCodeFileId} \n`);

  //append contents to the file 
  const fileAppendTx = new FileAppendTransaction()
    .setFileId(byteCodeFileId)
    .setContents(contractBytecode)
    .setMaxChunks(10)
    .freezeWith(client);
  const fileAppendSign = await fileAppendTx.sign(treasuryKey);
  const fileAppendSubmit = await fileAppendSign.execute(client);
  const fileAppendRx = await fileAppendSubmit.getReceipt(client);

  console.log(`Content was added : ${fileAppendRx.status}`);

  // Deploy the smart contract on Hedera
  console.log(`\n- Deploying contract...`);
  let gasLimit = 100000;

  const [contractId, contractAddress] = await contractDeployFcn.func(
    byteCodeFileId,
    gasLimit,
    client
  );
  console.log(`- The smart contract ID is: ${contractId}`);
  console.log(
    `- The smart contract ID in Solidity format is: ${contractAddress}`
  );


  console.log(`====================================================GETTING HBAR TO THE CONTRACT====================================================`);
  
      // Transfer HBAR to the contract using .setPayableAmount WITHOUT specifying a function (fallback/receive triggered)
      let payableAmt = 30;
      console.log(`- Caller (Operator) PAYS ${payableAmt} ℏ to contract (fallback/receive)...`);
      const toContractRx = await contractExecuteNoFcn.func(contractId, gasLimit, payableAmt, client);
  
      // Get contract HBAR balance by calling the getBalance function in the contract AND/OR using ContractInfoQuery in the SDK
      await contractCallQueryFcn.func(contractId, gasLimit, "getBalance", client); // Outputs the contract balance in the console

    console.log(`====================================================GETTING HBAR FROM THE CONTRACT====================================================`);
    
        payableAmt = 0;
        moveAmt = 20;
    
        console.log(`- Contract TRANSFERS ${moveAmt} ℏ to Alice...`);
        const tParams = await contractParamsBuilderFcn.func(aliceId, moveAmt, 3, []);
        const tRx = await contractExecuteFcn.func(contractId, gasLimit, "transferHbar", tParams, payableAmt, client);
    
        // Get contract HBAR balance by calling the getBalance function in the contract AND/OR using ContractInfoQuery in the SDK
        await showContractBalanceFcn.func(contractId, client); // Outputs the contract balance in the console
}

main();