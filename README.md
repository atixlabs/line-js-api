# line-js-api

## Overview

This package provides a Meteor wrapper for the LINE API methods, including the Login and the Message APIs.

## Login

This feature provides integration with the OAuth LINE Login method. Amongst its main dependencies, you can find ```accounts```, ```service-configuration``` and ```oauth``` Meteor packages.

### Getting Started

Before we can use the login feature, first we must configure the service with our keys, by adding them to this snippet inside ```accounts.js``` file.

```
ServiceConfiguration.configurations.update(
  { "service": "line" },
  {
    $set: {
      "clientId": <your_client_id>,
      "secret": <your_client_secret>,
    }
  },
  { upsert: true }
);
```
#### Important

Also, take into account that the default redirect uri of this package is ```<YOUR_DOMAIN>/_oauth/line``` so don't forget to add that url to the allowed Callback Urls inside Line channel config.

### Usage

The next step is to integrate the ```loginWithLine``` feature inside the LINE button (Don't forget to follow [these guidelines](https://developers.line.me/web-api/setting-up-login-button) to implement the LINE Login Button).

```
Meteor.loginWithLine(function (err, res) {
  console.log('login callback', err, res);
  if (err !== undefined) {
    console.log('sucess ' + res);
  } else {
    console.log('login failed ' + err);
  }
});
```

## Message API

All message methods are wrapped inside ```LineApi``` object.

### Getting Started

First we need to configure the service. To do so, we must use the method ```registerService``` defined inside the LineApi object.
This method expects to receive two params, which are the channelSecret and the channelAccessToken. Please take into account that the Login and the Message channels are different, and each has different keys.

So, from the server side you must invoke that method in your app like this.

```LineApi.registerService( <your_channel_secret>, <your_channel_access_token>);```

### Usage

Once the service has been initialized, then we are able to use these two methods:

- ```sendMessage(lineUserId, messages)```: Sends to a determinate user, an array of one or more messages. Refer to the [official documentation](https://devdocs.line.me/en/?go#push-message) to see how the messages array should be set.

- ```validateMessage(requestBody, signature)```: Checks if a message received in the webhook URL is valid or not returns true or false). It validates if the request came from a trusty source, by following [these guidelines](https://devdocs.line.me/en/?go#webhooks).


### Get User Information API

This package also provides some methods to get the LINE User profile information without logging that user into your app. 
To do so, we provide the ```getLoginUrl``` method, which will receive the ```redirectUri``` and the ```state``` as params, and it will return the loginUrl.

The last and most important method that this package provides to get the user information, is "getLineUserData", which will receive the authentication code as a param, and will return an object with the necessary data to append to the user in the users collection.
It's very important to take into account that this method should be called from the client through a Meteor.call, in order to avoid CORS issues, since the data is returned through REST APIs.
