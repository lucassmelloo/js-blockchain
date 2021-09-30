const SHA256 = require('crypto-js/sha256')


class Block{
    constructor(indexOfBlock, creationDate, informationInBlock, previusHash = ''){
        this.indexOfBlock = indexOfBlock;
        this.creationDate = creationDate;
        this.informationInBlock = informationInBlock;
        this.previusHash = previusHash;
        this.currentHash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.indexOfBlock + this.previusHash + this.creationDate + JSON.stringify(this.informationInBlock)).toString();
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
        newBlock.previusHash = this.getLatestBlock().currentHash;
        newBlock.currentHash = newBlock.calculateHash();
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
melloCoin.addBlock(new Block(1, '28/09/2021', { amount: 4}));
melloCoin.addBlock(new Block(2, '29/09/2021', { amount: 10}));

console.log(JSON.stringify(melloCoin,null,4))

console.log('Essa cadeia de blocos é valida?: ' + melloCoin.isChainValid());

melloCoin.chain[1].data = {amount: 100};
console.log(JSON.stringify(melloCoin,null,4))

console.log(melloCoin.chain[1].previusHash + "             " + melloCoin.chain[1].indexOfBlock);
console.log(melloCoin.chain[0].currentHash + "             " + melloCoin.chain[0].indexOfBlock);
console.log('Essa cadeia de blocos é valida?: ' + melloCoin.isChainValid());
//console.log(JSON.stringify(melloCoin, null, 4));