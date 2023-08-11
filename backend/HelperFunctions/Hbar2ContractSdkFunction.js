const { TransferTransaction } = require("@hashgraph/sdk");

async function func(sender, receiver, amount, pKey, client) {
    const transferTx = new TransferTransaction()
        .addHbarTransfer(sender, -amount)
        .addHbarTransfer(receiver, amount)
        .freezeWith(client);
    const transferSign = await transferTx.sign(pKey);
    const transferSubmit = await transferSign.execute(client);
    const transferRx = await transferSubmit.getReceipt(client);
    return transferRx;
}

module.exports = {func }