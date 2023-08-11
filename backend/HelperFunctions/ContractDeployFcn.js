const { ContractCreateFlow, ContractCreateTransaction } = require("@hashgraph/sdk");

async function func(bytecode, gasLim, client) {
    const contractCreateTx = new ContractCreateTransaction().setBytecodeFileId(bytecode).setGas(gasLim);
    // const contractCreateTx = new ContractCreateFlow().setBytecode(bytecode).setGas(gasLim);
    const contractCreateSubmit = await contractCreateTx.execute(client);
    const contractCreateRx = await contractCreateSubmit.getReceipt(client);
    const contractId = contractCreateRx.contractId;
    const contractAddress = contractId.toSolidityAddress();
    return [contractId, contractAddress];
}

module.exports = {func}