const { ContractFunctionParameters } = require("@hashgraph/sdk");

async function func(aId, amountHbar, section, tId) {
    let builtParams = [];
    if (section === 2) {
        builtParams = new ContractFunctionParameters()
            .addAddress(aId.toSolidityAddress())
            .addAddress(tId.toSolidityAddress());
    } else if (section === 3) {
        builtParams = new ContractFunctionParameters()
            .addAddress(aId.toSolidityAddress())
            .addUint256(amountHbar * 1e8);
    } else {
    }
    return builtParams;
}

module.exports = { func }