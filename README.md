# SEED RESTORE

# purpose
  transfer mnemonic seed into Wallet Import Format(WIF) string

# code

```code
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
```
# 參考

bip44 HD錢包架構格式 <https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki>

bip39 mnemonic encode
<https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md>

HD錢包格式說明文章
<https://medium.com/taipei-ethereum-meetup/%E8%99%9B%E6%93%AC%E8%B2%A8%E5%B9%A3%E9%8C%A2%E5%8C%85-%E5%BE%9E-bip32-bip39-bip44-%E5%88%B0-ethereum-hd-%EF%BD%97allet-a40b1c87c1f7>