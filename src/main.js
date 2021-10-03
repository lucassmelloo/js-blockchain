const {Blockchain, Transaction} = require('./blockchain');

let melloCoin = new Blockchain();

melloCoin.createTransaction(new Transaction('address1', 'address2', 100));
melloCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log("\n Starting the miner.\n");
melloCoin.minePendingTransactions('mello-address');

console.log('\nBalance of Mello is', melloCoin.getBalanceOfAddress('mello-address'));

console.log("\n Starting the miner again.\n");
melloCoin.minePendingTransactions('mello-address');
console.log('\nBalance of Mello is', melloCoin.getBalanceOfAddress('mello-address'));
