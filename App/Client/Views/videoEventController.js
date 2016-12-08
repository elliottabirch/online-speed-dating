//check which group user is in for event
  //if callee
    //wait for calls
    //receive call
    //might need to hang up on this end too
  //if caller
    //query db to get a list of people to call
    //check this user's position in caller group/event to determine where to start calls
    //iterate through list of people to call
      //start timer
      //for each person give user a button to press to start call
        //requires view/template update
        //display video!
      //end call after a certain amount of time has passed
  
  //Feedback!
    //record feedback in db? Link to event? 
    //allow for blocks/never speeddate again
    //check for matches--will probably need to be automated/happen later

import template from './videoTemplate.vue';
import Vue from 'vue';


//prepare the user to make calls/take part in an event
  //either immediately on page load or on a button press of some kind
userPhone = new PHONE(loggedInUsername);
  //possibly add to a stored 'ready for event' list to account for no shows

//get event data and create lists of callers/callees
  //find all the users for an event
  //other processing might be needed to get them into an array
const eventUsers = User.find({'events': ObjectId('')});

  //Run some kind of sort function--might need to be specified and stored with each event
  //This is a dummy sort--just splits users into 2 groups
var eventCallerGroup = [];
var eventCalleeGroup = [];
for (let i = 0; i < eventUsers.length; i++) {
  if (i % 2 === 0) {

    eventCalleeGroup.push(eventUsers[i]);

  } else {
    if (eventUsers[i] === currentUser) {
        //need to figure out what exactly these properties are being attached too/how they are being managed
      currentUserIsCaller = true; //can check to see if user will be making calls
      currentUserStartIndex = i; //lets us know when to start calls
    }
    eventCallerGroup.push(eventUsers[i]);
  }
}


//something triggers the start of an event that our user is part of
eventBegin = function() {
  //if user is in the caller list
    //transition user to a view that has a "ready to talk button" to start calls
  //else (ie if the user is a callee)
    //MAYBE MAYBE MAYBEß have a 'ready' button that sends a message (via pubnub chat functionality), to their 'caller' which in turn causes the caller's 
      //'ready to call' button to appear--in this case a "call" would already have needed to happen, just with video/audio shut down
      //the 'ready to call' button of the caller would simply turn on video and audio for the call rather than actually dialling
};

//if the user is a caller
var showVideo = false;
var totalCalls = 1;
var currentIndex = currentUserStartIndex;
  //run through the necessary calls for the event
    //on 'ready to talk' button press
userPhone.dial(eventCalleeList[currentIndex]);
showVideo = true; //this flag should toggle on video display elements and toggle off the button for making calls, alternatively, could possible be handled as a 'transition'
setTimeout(function() {
  userPhone.hangup();
  totalCalls++;
  if (currentIndex === eventCalleeList - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  showVideo = false; //toggles video off and buttons back on, again, could possibly be handled by a 'transition'
  
}, eventCallDuration);
    //check number of calls
if (totalCalls === eventCalleeList.lenght) {
      //event is over, transition to another page, hangup/destroy phone
}

//if user is a callee 
  //perhaps have a 'ready' button that lets caller make calls
  //otherwise, just display a waiting message and replace it with video when a call comes in/go back to waiting message when hangup
    

