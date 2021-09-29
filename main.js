const SHA256 = require('crypto-js/sha256')


class Block{
    constructor(blockIndex, blockCreationDate, blockInformation, blockPreviousHash = ''){
        this.blockIndex = blockIndex;
        this.blockCreationDate = blockCreationDate;
        this.blockInformation = blockInformation;
        this.blockPreviousHash = blockPreviousHash;
        this.blockCurrentHash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.blockIndex + this.blockPreviousHash + this.blockCreationDate + JSON.stringify(this.blockInformation)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '27/09/2021', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.blockPreviousHash = this.getLatestBlock().blockCurrentHash;
        newBlock.blockCurrentHash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const blockCurrentBlock = this.chain[i];
            const previusBlock = this.chain[i-1];
        }
    }
}

let melloCoin = new Blockchain();
melloCoin.addBlock(new Block(1, '28/09/2021', { amount: 4}));
melloCoin.addBlock(new Block(2, '29/09/2021', { amount: 10}));

console.log(JSON.stringify(melloCoin, null, 4));