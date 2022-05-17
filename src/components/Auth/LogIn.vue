<template>
    <div style="width:40vw; margin-left:30vw; padding: 5vw; background-color:#0091fb; border-radius: 1vw; margin-top:7vw">

          <div v-if="error"  class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                   {{error}}
                  </div>
            </div>
     <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1" >
          <b-form-input   id="input-1" v-model="form.email" type="email" placeholder="Enter email" required>
          </b-form-input>
        </b-form-group>
      <br>
      <label for="text-password">Password</label>
       <b-form-input type="password" id="text-password" placeholder="Enter your password" v-model="form.password" required aria-describedby="password-help-block"></b-form-input>
       <br><p >
         <router-link to="forgot-password" style="color:white">Forgot password !!? click here</router-link>
       </p>
      <br>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
</template>

<script>
// import axios from 'axios';
import http from "@/httpService";
  export default {
    name: 'LogIn', 

    data() {  
      return {
        form: {
          email: '',
          password: '',
          error: ''
        },
        error: '',      
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        http.post('auth/login', this.form)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.$store.dispatch('setToken', response.data.token) //dispatch will trigger the action
            this.$router.push('/')
        }).catch(error => {
            console.log(error)
            this.error = error.response.data.message
        })
    
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>