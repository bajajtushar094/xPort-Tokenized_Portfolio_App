const { AccountCreateTransaction, Hbar } = require("@hashgraph/sdk");


exports.func = async (pvKey, iBal, client) =>{
    const response = await new AccountCreateTransaction()
        .setInitialBalance(new Hbar(iBal))
        .setKey(pvKey.publicKey)
        .execute(client);
    const receipt = await response.getReceipt(client);
    return [receipt.status, receipt.accountId];
}
