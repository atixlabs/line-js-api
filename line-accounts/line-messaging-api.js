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
  }

export default LineApi;