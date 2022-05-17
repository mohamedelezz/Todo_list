<template>
<div>
  
    <div style="width:40vw; margin-left:30vw; padding: 5vw; background-color:#0091fb; border-radius: 1vw; margin-top:3vw">
            <div v-if="error"  class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                   {{error}}
                  </div>
            </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

       <b-form-group id="input-group-1" label="Frist Name:" label-for="input-2">
          <b-form-input id="input-1" v-model="form.firstName" placeholder="Enter your frist name" required> </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.lastName" placeholder="Enter your last name" required> </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Email address:" label-for="input-1" >
          <b-form-input   id="input-3" v-model="form.email" type="email" placeholder="Enter email" required>
          </b-form-input>
        </b-form-group>

        <label for="text-password">Password</label>
       <b-form-input type="password" id="text-password" placeholder="Enter your password" v-model="form.password" required aria-describedby="password-help-block"></b-form-input>
      
      <label for="text-password">Password Confirm</label>
       <b-form-input type="password" id="text-password" placeholder="Enter your password" v-model="form.confirmPassword" required aria-describedby="password-help-block"></b-form-input>
      <br>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      
    </div>
  </div>
</template>

<script>
import http from "@/httpService";
  export default {
    name: 'SignUp',
    data() {  
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        error: '',      
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        if (this.form.password !== this.form.confirmPassword) { 
        return  this.error = 'Password and Confirm Password must be same'
            }
        http.post('auth/register', this.form)
        .then(response => {
            console.log(response)
            this.$router.push('/sign-in')
        }).catch(error => {
            if(error.response.data.message == 'Internal server error'){
              return this.error = 'This email already exist'
            }
            this.error = error.response.data.message[0]
            
        })
    },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.firstName = ''
        this.form.LastName = ''
        this.form.password = ''
        this.form.confirmPassword = ''
        
             // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => { // nextTick 
          this.show = true
        })
      }
    }
  }
</script>