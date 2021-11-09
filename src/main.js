const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('7b37369de2cf0536a1ec07fd23cd2bfb33d63182a22a03c4c6bb317bf4730741');
const myWalletAddress = myKey.getPublic('hex');

const enuChain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);

enuChain.addTransaction(tx1);

console.log('\nStarting the miner...');
enuChain.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is', enuChain.getBalanceOfAddress(myWalletAddress));

enuChain.chain[1].transactions[0].amount = 1;

console.log('Is chain valid ?', enuChain.isChainValid());