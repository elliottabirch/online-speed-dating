import Vue from 'vue';
import Vuex from 'vuex';
import PubNub from 'pubnub';
import PHONE from './Dependencies/pubnubWebrtc.js';

Vue.use(Vuex);


var store = new Vuex.Store({
  state: {
    user: {
      username: '',
    },
    videoOut: '<video></video>',
    beforeEventFlag: true,
    soloViewFlag: true,
    calleeReadyFlag: false,
    activeViewFlag: false,
    beforeStartFlag: true,
    currentRound: null
  },
  getters: {
    getProfileInfo(state, name) {
      return state.user;
    }
  },
  mutations: {
    clearUser (state) {
      state.user = {
        username: ''
      };
    },
    setUser (state, obj) {
      for (var key in obj) {
        state.user[key] = obj[key];
      }
      console.log(state);
    },
    initPubNub (state) {
      state.pubnub = new PubNub({
        publishKey: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Our Pub Key
        subscribeKey: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Our Sub Key
        ssl: true
      });
      state.pubnub.message(function(message) {
        if (message.message === 'Ready') {
          state.calleeReadyFlag = true;
        } else if (message.message === 'End') {

          state.activeViewFlag = false;
          state.pubnub.stop();
          state.phone.hangup();
          state.phone.stop();

        } else {
          state.phone.hangup();
          if (state.currentRound) {
            state.pubnub.unsubscribe({
              channels: [state.user.calllist[state.currentRound]]
            });
          }
          console.log(message.message);
          state.currentRound = message.message;
          state.pubnub.subscribe({
            channels: [state.user.calllist[state.currentRound]]
          });
          state.soloViewFlag = true;
          state.beforeStartFlag = false;
          state.calleeReadyFlag = false;
        }
      });
    },
    initPhone (state) {
      state.phone = window.phone = new PHONE({
        number: state.user.username,
        publish_key: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Our Pub Key
        subscribe_key: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Our Sub Key
        ssl: true
      });

      var sessionConnected = function(session) {
        console.log('connected with', session);
        state.videoOut = session.video.outerHTML;
      }; 
      state.phone.ready(function() {
        console.log('phone ready');
      });
      state.phone.receive(function(session) {
        state.soloViewFlag = false;
        console.log( 'i receieved', session);
        state.videoIn = session;

        session.connected(sessionConnected);
        session.ended(function(idk) {
          console.log('sessionn ended', idk);
        });
      });
    },
  }
  // action: {
  //   setName ({commit}, name) {
  //     commit(set_Name, name);
  //   }
  // }
});



export default store;