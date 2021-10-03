const SHA256 = require('crypto-js/sha256')

class Transaction{
    constructor (fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(creationDate, transaction, previusHash = ''){
        this.creationDate = creationDate;
        this.transaction = transaction;
        this.previusHash = previusHash;
        this.currentHash = this.calculateHash();
        this.nonceDificult = 0;
    }

    calculateHash(){
        return SHA256(this.previusHash + this.creationDate + JSON.stringify(this.transaction) + this.nonceDificult).toString();
    }

    mineBlock(difficult){
        while(this.currentHash.substring(0, difficult) !== Array(difficult + 1).join("0")){
            this.nonceDificult++;
            this.currentHash = this.calculateHash();
        }

        console.log("Block mined: " + this.currentHash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('27/09/2021', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previusBlock = this.chain[i - 1];

            if(currentBlock.currentHash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previusHash !== previusBlock.currentHash){
                return false;
            }
        }
        return true;
    }
}

let melloCoin = new Blockchain();

melloCoin.createTransaction(new Transaction('address1', 'address2', 100));
melloCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log("\n Starting the miner.\n");
melloCoin.minePendingTransactions('mello-address');

console.log('\nBalance of Mello is', melloCoin.getBalanceOfAddress('mello-address'));

console.log("\n Starting the miner again.\n");
melloCoin.minePendingTransactions('mello-address');
console.log('\nBalance of Mello is', melloCoin.getBalanceOfAddress('mello-address'));
