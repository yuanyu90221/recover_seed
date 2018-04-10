// first import lib
let bitcoin = require('bitcoinjs-lib');
/**
 * gen keyPair from seed
 * @param {*} seedBuffer 
 */
function fromSeedBuffer(seedBuffer) {
  return bitcoin.HDNode.fromSeedBuffer(seedBuffer);
}

module.exports = {
  fromSeedBuffer
}