function sendResponse(code, response) {
    
    return {
        statusCode: code,
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type' 
        },
        body: response
    };
}

module.exports = { sendResponse };