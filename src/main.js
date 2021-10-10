const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ae18d4997d9037e754915d6ae67f86b41c013a9701547ecf3d8401be605168d6')
const myWalletAddress = myKey.getPublic('hex');


let melloCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public ke goes here', 10);
tx1.signTransaction(myKey);
melloCoin.addTransaction(tx1);

console.log("\n Starting the miner.\n");
melloCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Mello is', melloCoin.getBalanceOfAddress(myWalletAddress));

console.log ('Is chain valid?', melloCoin.isChainValid());