<template>
  <div>
    <nav-bar :key="navBarKey" @logOut="forceRerender"></nav-bar>
    <router-view name="side"></router-view>
   <!-- <router-view name="header"></router-view> -->
    <router-view :key="updateKey" @changedView="forceRenderChange" @loggedIn="forceRerender"></router-view>
    


    
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'


export default {
  components: {   
    'nav-bar' : NavBar

  },

  data() {
    return {
      navBarKey: 0,
      updateKey: 1000

    }
  },
  methods : {
        forceRerender(){
      this.navBarKey += 1;
    },

    forceRenderChange(){
      this.updateKey += 1;
    }
  }
}
</script>

<style>

h1{
  text-align: center;
  color: purple;
}

body{
  margin: 0;
}


</style>
