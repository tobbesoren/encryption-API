const { encrypt, decrypt } = require("./functions/reverse");
const { keyEncrypt, keyDecrypt } = require("./functions/keyEncryption");

//const { sendResponse } = require('./responses/response');

exports.handler = async (event, context) => {
    const {method, path} = event.requestContext.http;

    const message = JSON.parse(event.body).message;

    if (method === 'GET' && path.startsWith('/encrypt/')) {
        const key = path.split('/encrypt/')[1];
        
        return keyEncrypt(key, message);
        
    } 
    else if (method === 'GET' && path.startsWith('/decrypt/')) {
        const key = path.split('/decrypt/')[1];
        
        return keyDecrypt(key, message);
    }
    else {
        return {
            statusCode: 400,
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type' 
            },
            body: {
            message: message,
            event: event
            }
        }
    }
}