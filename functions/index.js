const functions = require('firebase-functions').region('europe-west3');

const getSuggestedFriends = require('./users/getSuggestedFriends').default;
exports.getSuggestedFriends = functions.https.onCall(getSuggestedFriends);
