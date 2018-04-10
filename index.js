const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

let phrase = 'endless witness morning zone nation soft blouse reflect edge cement dumb track';
// turn phrase to buffer
let seedBuffer = bip39.mnemonicToSeed(phrase);
console.log(bip39.mnemonicToSeedHex(phrase));
let masterNode = bitcoin.HDNode.fromSeedBuffer(seedBuffer);
// Derived the first account based on BIP44
let account0 = masterNode.derivePath("m/44'/0'/0'");
let xpubString = account0.neutered().toBase58();

let key0 = account0.derivePath("0/0").keyPair;
let key0FromXpub = account0.neutered().derivePath("0/0").keyPair;

let address0 = key0.getAddress();
let address0FromXpub = key0FromXpub.getAddress();

console.log(address0);
console.log(address0FromXpub);
console.log(key0.toWIF());
// console.log(key0FromXpub.toWIF());
