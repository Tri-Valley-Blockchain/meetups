Thanks to [Jordan Leigh](https://github.com/AlwaysBCoding) for his [excellent tutorial videos](https://www.youtube.com/watch?v=BFEzWYFZ7wA&t=275s) that formed the basis for the content of this [meetup](https://www.meetup.com/Tri-Valley-Blockchain-Crypto-Meetup/events/245155073/). 

The instructions below are useful if you want to learn by typing the code. We also have a [set of scripts](https://github.com/trivalley-blockchain/eth-playground/tree/master/meetup1) that can be run that do the same thing. 
# Pre-Reqs:
* For Windows users, review [this first](Windows-setup.md)
* Confirm/install [node.js 8.9.x](https://nodejs.org/en/) using `node --version`
* Get an API key from infura.io

# Step 1: Generate a Key Pair
Create a directory to run the tests, install some packages and start the Node.js [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).
```bash
mkdir ethereum
npm install web3@0.20.2 ethereumjs-util@5.1.2 ethereumjs-tx@1.3.3
node 
```
A key pair is the starting point for all blockchain transactions as explained eloquently in this [Blockchain 101 video](https://www.youtube.com/watch?v=bBC-nXj3Ng4). We now create the key pair.
```javascript
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/infura-key"))
// use your own brain wallet
const seed="LivermoreWine!".repeat(100)
const privateKey=web3.sha3(web3.sha3(seed))
privateKey
```
Exit node. Download [keygen.js](keygen.js) and type the following to generate your crypto public address (a.k.a. public key). 

```bash
node keygen.js <private-key>
```
Save both public and private keys in some text file.
See [here](https://github.com/ethereum/wiki/wiki/JavaScript-API) for more info on the Ethereum web3 JavaScript API.

# Step 2: Get free ethereum to use later in transactions
* https://faucet.metamask.io/
* Tweet: https://twitter.com/lakamsani/status/951513291750191105
* Ethereum faucet claim: https://www.rinkeby.io/#faucet
* Check transfer via rinkeby.etherscan.io

Verify eth balance received from faucet.
```javascript
const myAddr='0x4ccf51442c8b45e3518e10dc83b66886e8f22731'
web3.eth.getBalance(myAddr).toNumber()
```

# Step 4: Send Tx  and verify balances at sender and receiver after TX is done (check via etherscan)
```javascript
const theirAddr = 'their address'
const myTx = {
   nonce: web3.toHex(web3.eth.getTransactionCount(myAddr)),
   to: theirAddr,
   gasPrice: web3.toHex(21000000000),
   gasLimit: web3.toHex(21000),
   value: web3.toHex(web3.toWei(1,'ether')),
   data: ""
} 

// Create Tx
const EthTx = require('ethereumjs-tx')
const tx = new EthTx(myTx)

// Sign it
const myPrivateKey = 'your pkey' // remove the leading 0x
const pKeyHex = new Buffer(myPrivateKey,'hex')
tx.sign(pKeyHex)
const serializedTx=`0x${tx.serialize().toString('hex')}`
web3.eth.sendRawTransaction(serializedTx2,(error,data) => {
  if (!error) {
    console.log(data)
  } else {
    console.log(error)
  }
})

// confirm transfer by checking balance in both sender and receiver addresses
web3.eth.getBalance(theirAddr).toNumber()
web3.eth.getBalance(ourAddr).toNumber()


```
You can also check via etherscan.io.
```bash
https://rinkeby.etherscan.io/address/<wallet_public_key> 
and https://rinkeby.etherscan.io/tx/<transaction_addr>
```
Try sending more ETH than what you have and see what happens.




