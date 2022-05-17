<template >
  <div id="app">
    <NavBar />
  <router-view ></router-view> <!-- Custom Directives -->
  </div>
</template> 

<script>
import NavBar from './components/NavBar.vue'; 
// import axios from 'axios';

export default {
  components: {
  NavBar
  },
  async created() {
    // const response = await axios.get('user'); 
    const response = localStorage.getItem('token');
      this.$store.dispatch('setToken', response);
     

  }
}   
</script>

<style>

</style>
