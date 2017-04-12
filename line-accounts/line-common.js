if (typeof Line === 'undefined') {
  Line = {};
}

if (typeof LineApi === 'undefined') {
  LineApi = {};
}

LineApi.getLoginUrl = function(redirectUri, stateParam) {
  var config = ServiceConfiguration.configurations.findOne({service: 'line'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return
  }
  
  var loginUrl =
    'https://access.line.me/dialog/oauth/weblogin' +
    '?response_type=code' +
    '&client_id=' + config.clientId +
    '&redirect_uri=' + redirectUri +
    '&state=' + stateParam;
    
  return loginUrl;
}

Accounts.oauth.registerService('line');