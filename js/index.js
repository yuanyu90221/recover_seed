const bitcoinType = 0;
/**
 * changeNumberCodeMnemonic
 * 
 * @param {string} phrase 
 */
function changeNumberCodeMnemonic(phrase) {
  let phraseToken = phrase.split(' ');
  if( phraseToken[0].length == 5) {// check if number length is 5
    try {
      let nonZeroSeed = phraseToken.filter((phraseContent)=>{
        return phraseContent!=="";
      }).map((phraseContent)=>{
        return search(phraseContent);
      }).join(' ');
      return nonZeroSeed;
    }
    catch(e){
      throw e;
    }
  }
  else {
    return phrase;
  }
}
/**
 * @description derived rootkey from seed
 * @param {string} phrase 
 */
function derived2NHDWif(phrase) {
  let phraseParse = "";
  try {
    phraseParse =  changeNumberCodeMnemonic(phrase);
  }
  catch(e) {
    throw e;
  }
  let seedBuffer = bip39.mnemonicToSeed(phraseParse);
  let masterNode = bitcoin.fromSeedBuffer(seedBuffer);
  let wif = masterNode.keyPair.toWIF();
  let bip32_ext_address = masterNode.toBase58();
  return {wif:wif,bip32_ext_address:bip32_ext_address};
}
/**
 * derived WIF from digit phrase
 * @param {string} phrase 
 * @param {number} accountIndex 
 * @param {number} accountType 
 * @param {number} addressIndex 
 */
function derivedWIF(phrase, accountIndex=0, accountType=0, addressIndex=0) {

  let phraseParse = "";
  try {
    phraseParse =  changeNumberCodeMnemonic(phrase);
  }
  catch(e) {
    throw e;
  }
  let seedBuffer = bip39.mnemonicToSeed(phraseParse);
  let masterNode = bitcoin.fromSeedBuffer(seedBuffer);
  let shiftedAccountIndex = accountIndex - 1;
  let shiftedAddressIndex = addressIndex - 1;
  
  if (shiftedAccountIndex < 0) {
    throw new Error(`shiftedAccountIndex must large than 0, current shiftedAccountIndex: ${shiftedAccountIndex}`)
  }
  if (shiftedAddressIndex < 0) {
    throw new Error(`shiftedAddressIndex must large than 0, current shiftedAddressIndex: ${shiftedAddressIndex}`)
  }
  // Derived the first account based on BIP44
  let coinType = bitcoinType;
  let account = masterNode.derivePath(`m/44'/${coinType}'/${shiftedAccountIndex}'`);
  let key = account.derivePath(`${accountType}/${shiftedAddressIndex}`).keyPair;

  let address = key.getAddress();
  
  return {wif:key.toWIF(), address:address};
}

document.addEventListener('DOMContentLoaded',function(){
  document.querySelector('#accountIndex').value = 1;
  document.querySelector('#addressIndex').value = 1;
  
  document.querySelector('#button').addEventListener('click', function(){
    let currentSeed = document.querySelector('#seed').value;
    let currentAccountIndex = document.querySelector('#accountIndex').value;
    let currentAddressIndex = document.querySelector('#addressIndex').value;
    let currentAccountType = document.querySelector('#accountType').value;
    let wifDOM = document.querySelector('#wif');
    let addressDOM = document.querySelector('#address');
    try {
      let {wif,address} = derivedWIF(currentSeed, currentAccountIndex, currentAccountType, currentAddressIndex);
      wifDOM.textContent = wif;
      addressDOM.textContent = address;
    } 
    catch(err) {
      alert(err.message);
    } 
  });
});