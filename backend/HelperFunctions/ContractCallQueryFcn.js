const { ContractCallQuery } = require("@hashgraph/sdk");

async function func(cId, gasLim, fcnName, client) {
    const contractQueryTx = new ContractCallQuery()
        .setContractId(cId)
        .setGas(gasLim)
        .setFunction(fcnName);
    const contractQuerySubmit = await contractQueryTx.execute(client);
    const contractQueryResult = contractQuerySubmit.getUint256(0);
    console.log(`- Contract balance (getBalance fcn): ${contractQueryResult * 1e-8} ℏ`);
}
module.exports = { func}