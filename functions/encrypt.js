const { sendResponse } = require('../responses/response');


function encrypt(key, message) {
    const splitString = message.split('');
    const reverseArray = splitString.reverse();
    const joinedEncryptedMessage = reverseArray.join('');
    return sendResponse(200, {
        encryptedMessage: joinedEncryptedMessage,
        key: key
    })
}
module.exports = { encrypt };
