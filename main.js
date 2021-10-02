const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(indexOfBlock, creationDate, informationInBlock, previusHash = ''){
        this.indexOfBlock = indexOfBlock;
        this.creationDate = creationDate;
        this.informationInBlock = informationInBlock;
        this.previusHash = previusHash;
        this.currentHash = this.calculateHash();
        this.nonceDificult = 0;
    }

    calculateHash(){
        return SHA256(this.indexOfBlock + this.previusHash + this.creationDate + JSON.stringify(this.informationInBlock) + this.nonceDificult).toString();
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
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, '27/09/2021', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previusHash = this.getLatestBlock().currentHash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

console.log('Mining block 1...')
melloCoin.addBlock(new Block(1, '28/09/2021', { amount: 4}));

console.log('Mining block 2...')
melloCoin.addBlock(new Block(2, '29/09/2021', { amount: 10}));

