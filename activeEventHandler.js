var userModel = require('../../Database/models/userModel.js');
var db = require('../../Database/config.js');
var Event = require('../../Database/models/eventModel.js');
var PubNub = require('pubnub');

exports.initiateEvent = function(eventName) {
  var pubnub = PUBNUB({
    publish_key: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Our Pub Key
    subscribe_key: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Our Sub Key
    ssl: true
  });
  Event.findOne({ eventName: eventName})
   .exec(function(err, event) {
     var currentEvent = event;
     var eventName = event.name; //could be a unique event  ID instead, might be better to avoid any possible duplication
     var dateDuration = event.dateDuration;
     var totalRounds = event.totalRounds;

     //send message to start event -- maybe this is on its own channel, could be easier than parsing message content

    //Set Timeout based on dateDuration that sends message whenever a call should end
      //sends message to channel--possibly a channel just for messages when hangups should happen to avoid parsing/just watch the channel for any message
      //if the total number of rounds (set in event's data) not been reached, call setTimeout function recursively
      //if the total number of rounds has been reached, the event is over and a message should be sent to that effect (again, possibly on its own channel)
    

   });



};
