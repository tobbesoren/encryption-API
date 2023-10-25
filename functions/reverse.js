const { sendResponse } = require("../responses/response");

//I only need one function here, since they do (almost) the same!
//I shoud rename it to 'reverse' too.
function encrypt(key, message) {
    const splitString = message.split('');
    const reverseArray = splitString.reverse();
    const joinedEncryptedMessage = reverseArray.join('');
    return sendResponse(200, {
         //This is the only difference: de/en
        encryptedMessage: joinedEncryptedMessage,
        key: key
    })
}


function decrypt(key, message) {
    const splitString = message.split('');
    const reverseArray = splitString.reverse();
    const joinedDecryptedMessage = reverseArray.join('');

    return sendResponse(200, {
        //This is the only difference: de/en
        decryptedMessage: joinedDecryptedMessage,
        key: key
    });
}

module.exports = { encrypt, decrypt };

