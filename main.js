const SHA256 = require('crypto-js/sha256')


class Block{
    constructor(blockIndex, blockCreationDate, blockInformation, blockPreviousHash = ''){
        this.blockIndex = blockIndex;
        this.blockCreationDate = blockCreationDate;
        this.blockInformation = blockInformation;
        this.blockPreviousHash = '';
    }

    calculateHash(){
        return SHA256(this.blockIndex + this.blockPreviousHash + this.blockCreationDate + JSON.stringify(this.blockInformation).toString())
    }
}

class Blockchain{
    constructor(){
        this.chain = [];
    }

    createGenesisBlock(){
        return new Block(0, '27/09/2021', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.blockPreviousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let melloCoin = new Blockchain();
melloCoin.addBlock