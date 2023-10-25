const { sendResponse } = require('../responses/response');

function decrypt(key, message) {
    const splitString = message.split('');
    const reverseArray = splitString.reverse();
    const joinedDecryptedMessage = reverseArray.join('');
    
    return sendResponse(200, {
        decryptedMessage: joinedDecryptedMessage,
        key: key
    })
}
    
module.exports = { decrypt };
