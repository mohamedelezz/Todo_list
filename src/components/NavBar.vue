<template>
    <div>
      <nav class="nav nav-pills nav-fill bg-success border border-primary p-1 rounded">
        <ul class="nav nav-pills" v-if="!token" >
            <li class="nav-item  bg-primary rounded ml-2" >
              <router-link to="/" class="nav-link " active-class="active" style="color: white;" exact aria-current="page" href="#" ><div id="show-btn" @click="$bvModal.show('bv-modal-example')">Home</div></router-link>
            </li>
          
            <li class="nav-item  bg-primary rounded ml-2" style="margin-left: 83vw;">
              <router-link to="/sign-up" class="nav-link" style="color: white;" active-class="active"> Sign Up</router-link>
            </li>

            <li class="nav-item  bg-primary rounded ml-2" >
              <router-link to="/sign-in" class="nav-link " style="color: white;" active-class="active">Log In</router-link>
            </li>
                         
        </ul>
        <ul class="nav nav-pills" v-if="token">
            <li class="nav-item ">
              <router-link to="/" class="nav-link " active-class="active" exact aria-current="page" href="#" >Home</router-link>
            </li>
         
            <li class="nav-item bg-primary rounded " style="color: white; margin-left: 83vw;"> 
              <a style="color: white;" href="javascript:void(0)" @click="handleClick" class="nav-link" active-class="active"> Log Out !</a>
            </li>
        
        </ul>
      </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'; 

export default {
  name : 'NavBar',
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$store.dispatch('setToken', null);
      this.$router.push('/sign-in');
    }
},
computed: {
  ...mapGetters(['token'])
}
}
</script>
