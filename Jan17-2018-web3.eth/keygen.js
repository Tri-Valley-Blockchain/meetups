// from https://www.npmjs.com/package/decyphertv
var EthUtil = require("ethereumjs-util")

var hexToBytes = function (hex) {
    for (var bytes = [], c= 0; c < hex.length; c+=2) {
        bytes.push(parseInt(hex.substr(c,2),16))
        return bytes;
    }
}

var privateKeyToAddress = function(privateKey) {
    var pkey=new Buffer(process.argv[2],"hex");
    //let bytes = hexToBytes(privateKey)
    return `0x${EthUtil.privateToAddress(pkey).toString('hex')}`
}

console.log(privateKeyToAddress(process.argv[2]))