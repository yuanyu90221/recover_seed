const bitcoinType = 0;
/**
 * derived WIF from digit phrase
 * @param {*} phrase 
 * @param {*} accountIndex 
 * @param {*} accountType 
 * @param {*} addressIndex 
 */
function derivedWIF(phrase, accountIndex=0, accountType=0, addressIndex=0) {
  let seedBuffer = bip39.mnemonicToSeed(phrase);
  let masterNode = bitcoin.fromSeedBuffer(seedBuffer);
  // Derived the first account based on BIP44
  let coinType = bitcoinType;
  let account0 = masterNode.derivePath(`m/44'/${coinType}'/${accountIndex}'`);
  let key0 = account0.derivePath(`${accountType}/${addressIndex}`).keyPair;

  let address0 = key0.getAddress();
  return key0.toWIF();
}
document.addEventListener('DOMContentLoaded',function(){
  document.querySelector('[name=accountIndex]').value = 0;
  document.querySelector('[name=addressIndex]').value = 0;
  document.querySelector('.button').addEventListener('click', function(){
    let currentSeed = document.querySelector('[name=seed]').value;
    let currentAccountIndex = document.querySelector('[name=accountIndex]').value;
    let currentAddressIndex = document.querySelector('[name=addressIndex]').value;
    let currentAccountType = document.querySelector('[name=accountType]').value;
    let result = document.querySelector('.result');
    result.textContent= derivedWIF(currentSeed, currentAccountIndex, currentAccountType, currentAddressIndex);
  });
});