const bip39 = require('bip39');
/**
 * transfer mnemonic to seed
 * @param {*} phrase 
 */
function mnemonicToSeed(phrase) {
  return bip39.mnemonicToSeed(phrase);
}

function mnemonicToSeedHex(phrase) {
  return bip39.mnemonicToSeedHex(phrase);
}

module.exports = {
  mnemonicToSeed,
  mnemonicToSeedHex
}