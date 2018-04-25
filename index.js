const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const wif = require('wif');
const bip32util = require('bip32-utils');
// console.log(bitcoin.networks);
// let testPhrase = 'abandon abandon ability';
let phrase = 'endless witness morning zone nation soft blouse reflect edge cement dumb track';
// turn phrase to buffer
let seedBuffer = bip39.mnemonicToSeed(phrase);
// console.log(bip39.mnemonicToSeedHex(phrase));
let node = bitcoin.HDNode.fromSeedBuffer(seedBuffer);
// console.log(node.getNetwork());
let string = node.toBase58();
let restored = bitcoin.HDNode.fromBase58(string);
console.log(`root key WIF0:${restored.keyPair.toWIF()}`);
// console.log(JSON.stringify(restored.keyPair));
let masterNode = bitcoin.HDNode.fromSeedBuffer(seedBuffer);
console.log(`bip32 extended: ${string}`);
// Derived the first account based on  
console.log(`root key WIF:`, masterNode.keyPair.toWIF());
let wifS = masterNode.keyPair.toWIF();
let decodedWIF = wif.decode(wifS).privateKey;
let currentResult = Buffer(decodedWIF).toString('hex');
console.log(currentResult);
// console.log(`wif converter: ${currentResult}`)
// let account0 = masterNode.derivePath("m/44'/0'/0'");
// let xpubString = account0.neutered().toBase58();

// let key0 = account0.derivePath("0/0").keyPair;
// let key0FromXpub = account0.neutered().derivePath("0/0").keyPair;

// let address0 = key0.getAddress();
// let address0FromXpub = key0FromXpub.getAddress();

// console.log(address0);
// console.log(address0FromXpub);
// console.log(key0.toWIF());
console.log(masterNode.keyPair.toWIF());
// let resultNode = new bip32util.Chain(masterNode);
// console.log(resultNode);
// xprv9s21ZrQH143K2zg4AVUBcFopT2WhyLEuRdSwXZUfYHWTZHJVBvHVUDZQD5g3fZCB5KKNLVkhJq3sZvkcWh13oJYX7PKEHfmZRRQi7bk71um
// xprv9s21ZrQH143K2ZbcWeZRzfw231mZw2Uo4wh9cuHptv4juEsEiQyYpa3YVGNxM9uXY8PypJaaxCV2rQvjzrssTwnX8PecMohpjX896F5ycVn
// xprv9s21ZrQH143K2ZbcWeZRzfw231mZw2Uo4wh9cuHptv4juEsEiQyYpa3YVGNxM9uXY8PypJaaxCV2rQvjzrssTwnX8PecMohpjX896F5ycVn