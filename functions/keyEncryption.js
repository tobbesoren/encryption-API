const { sendResponse } = require("../responses/response");


/*This should be a bit more of a challenge: I'm thinking the
key property determines how the message is encoded. In the
simplest form, it could:
1. Convert the characters in the key to ascii codes and
2. Loop through each character in the message and key, 
3. Shifting the message character n times, where n is the ascii number of the current key character.

Of course, I could do it more interesting by shuffling the characters every other turn or something.*/

function stripInvalidCharacters(message, template) {
    // Create a regular expression pattern that matches characters not in the template
    const pattern = new RegExp(`[^${template}]`, 'g');
    // Replace all characters not in the template with an empty string
    return message.replace(pattern, '');
  }
  

/*
Builds a string containing printable ascii characters +
åÅäÄöÖ€
*/
function buildCharString () {
    let charString = 'åÅäÄöÖ€'
    for( var i = 32; i <= 126; i++ )
        {
          charString += String.fromCharCode(i);
        }
        return charString;
}


function keyEncrypt(key, message) {
    let encryptedMessage = '';
    //let asciiArray = [];
    let validCharacters = buildCharString();
    
    let strippedMessage = stripInvalidCharacters(message, validCharacters);

    
    
    for (let i = 0; i < strippedMessage.length; i++) {
        const messageChar = strippedMessage[i];
        const keyChar = key[i % key.length]; // Repeating the key if it's shorter than the message
        const shiftAmount = validCharacters.indexOf(keyChar); //We shift by the index of the char in the validCharacters array.
        const messageCharIndex = validCharacters.indexOf(messageChar);
        //asciiArray.push(shiftedCharCode + 32);
    
        const encryptedChar = validCharacters[
            (messageCharIndex + shiftAmount) % validCharacters.length
        ]
        encryptedMessage += encryptedChar;
  }
    return sendResponse(200, {
        encryptedMessage: encryptedMessage,
        // shiftedCharArray: asciiArray.toString(),
        key: key,
        validCharacters: validCharacters,
        strippedMessage: strippedMessage,
        validCharactersLength: validCharacters.length
    });

  
}



function keyDecrypt(key, message) {
    let decryptedMessage = '';
    let validCharacters = buildCharString();

    for (let i = 0; i < message.length; i++) {
        const encryptedChar = message[i];
        const keyChar = key[i % key.length]; // Repeating the key if it's shorter than the encrypted message
        const shiftAmount = validCharacters.indexOf(keyChar); //We shift by the index of the char in the validCharacters array.
        const encryptedCharIndex = validCharacters.indexOf(encryptedChar);
        const decryptedChar = validCharacters[
            (encryptedCharIndex - shiftAmount + validCharacters.length) % validCharacters.length
        ]// I had to think so hard that my head hurts for this
        decryptedMessage += decryptedChar;
  }
    return sendResponse(200, {
        decryptedMessage: decryptedMessage,
        key: key
    });
}
 


module.exports = { keyEncrypt, keyDecrypt };