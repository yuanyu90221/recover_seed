const bitcoinType = 0;
function changeNumberCodeMnemonic(phrase) {
  let phraseToken = phrase.split(' ');
  if( phraseToken[0].length != 6) {// check if number length is 5
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
 * derived WIF from digit phrase
 * @param {*} phrase 
 * @param {*} accountIndex 
 * @param {*} accountType 
 * @param {*} addressIndex 
 */
function derivedWIF(phrase, accountIndex=0, accountType=0, addressIndex=0) {

    let phraseParse = "";
    try {
      phraseParse =  changeNumberCodeMnemonic(phrase);
    }
    catch(e) {
     throw e;
    }
    console.log(phraseParse);
    let seedBuffer = bip39.mnemonicToSeed(phraseParse);
    let masterNode = bitcoin.fromSeedBuffer(seedBuffer);
    let shiftedAccountIndex = accountIndex - 1;
    let shiftedAddressIndex = addressIndex - 1;
  
  // catch(e) {
  //   throw e;
  // }
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
  document.querySelector('[name=accountIndex]').value = 1;
  document.querySelector('[name=addressIndex]').value = 1;
  
  document.querySelector('.button').addEventListener('click', function(){
    let currentSeed = document.querySelector('[name=seed]').value;
    let currentAccountIndex = document.querySelector('[name=accountIndex]').value;
    let currentAddressIndex = document.querySelector('[name=addressIndex]').value;
    let currentAccountType = document.querySelector('[name=accountType]').value;
    let wifDOM = document.querySelector('.wif');
    let addressDOM = document.querySelector('.address');
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