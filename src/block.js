const { SHA256 } = require('crypto-js')

class Block {

  constructor(transactions, timestamp = String(new Date()), previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;

    this.hash = this.calculateHash();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }

  calculateHash() {
    return SHA256(this.transactions + this.index + this.timestamp + this.previousHash + this.nonce).toString();
  }

  hasValidTransactions(){
    for(const tx of this.transactions) {
      if(!tx.isValid()){
        return false;
      }
    }
    return true;
  }
}

module.exports = Block;