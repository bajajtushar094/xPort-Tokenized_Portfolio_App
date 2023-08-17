const { ContractExecuteTransaction } = require("@hashgraph/sdk");

async function func(cId, gasLim, amountHbar, client) {
    const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(cId)
        .setGas(gasLim)
        .setPayableAmount(amountHbar);
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    return contractExecuteRx;
}

module.exports = {func }