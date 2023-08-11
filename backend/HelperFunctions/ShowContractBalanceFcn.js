const { ContractInfoQuery } = require("@hashgraph/sdk");

async function func(cId, client) {
    const info = await new ContractInfoQuery().setContractId(cId).execute(client);
    console.log(`- Contract balance (ContractInfoQuery SDK): ${info.balance.toString()}`);
}

module.exports = {func}