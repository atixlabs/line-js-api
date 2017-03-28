var crypto = require('crypto');

LineApi = {};

LineApi.registerService = function( channelSecret, channelAccessToken ) {
  this.LineApi = { channelSecret, channelAccessToken };
}

LineApi.sendMessage = function(userId, messages) {
  // Header must contain Channel Access Token
  var headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${this.LineApi.channelAccessToken}`
  };
  // Body must contain the receipient userId and an array of messages
  var data = {
    "to": userId,
    "messages": messages
  };
  HTTP.post('https://api.line.me/v2/bot/message/push', { headers, data });
};

LineApi.validateMessage = function(body, signature) {
  var hmac = crypto.createHmac('sha256', this.LineApi.channelSecret);
  hmac.update(JSON.stringify(body));
  return hmac.digest('base64') === signature;
};

export default LineApi;