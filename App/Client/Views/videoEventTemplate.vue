<template>
  <div>
    <template v-if='beforeEvent'>
      <button v-on:click.prevent='joinEvent'>I'm Ready to Date!</button>
    </template>
    <template v-if='activeEvent'>
      <transition name='relocate'>
        <div v-if='outOfCall' key='outOfCall' v-html='myVideo'></div>
        <div v-else key='inCall' v-html='myVideo'></div>
      </transition>
      <template v-if='outOfCall'>
        <button v-if='isCaller' v-on:click.prevent='eventCall'>Your Date Awaits!</button>
        <div v-else>Please be patient while your date works up the courage to call</div> 
      </template>
      <template v-if='inCall'>
        <div v-html='videoOut'></div>
      </template>    
    </template>
  </div>
</template>     

//use transition to change size/location of own video when a call starts 

//using transitions could probably make the transition between states
//look better
//would also allow us to hook javascript into the transitions
//which might be helpful in terms of starting/ending calls etc

