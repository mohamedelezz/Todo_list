<template>
    <div style="width:40vw; margin-left:30vw; padding: 5vw; background-color:#0091fb; border-radius: 1vw; margin-top:3vw">
      
       <div v-if="error"  class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                   {{error}}
                  </div>
        </div>
      
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <label for="text-password"> New Password</label>
       <b-form-input type="password" id="text-password" placeholder="Enter your password" v-model="form.password" required aria-describedby="password-help-block"></b-form-input>
      
      <label for="text-password">Password Confirm</label>
       <b-form-input type="password" id="text-password" placeholder="Enter your password" v-model="form.passwordConfirm" required aria-describedby="password-help-block"></b-form-input>
      <br>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
</template>

<script>
import http from "@/httpService";
  export default {
    name: 'ResetPass',
    data() {  
      return {
        form: {
          password: '',
          passwordConfirm: '',
        },
        show: true,
        error: ''
      }
    },
    methods: {
      onSubmit(event) { 
        event.preventDefault()
        
        http.post('password/reset', {
          password: this.form.password,
          passwordConfirm: this.form.passwordConfirm,
          token: this.$route.params.token
        })
        .then(response => {
            console.log(response)
            this.$router.push('/sign-in') 
        }).catch(error => {  
          this.error = error.response.data.message
            console.log(error.response.data.message, "kujdkjf")
 
            console.log(error)
        })
    },
      onReset(event) {
        event.preventDefault()
        this.form.password = '';
        this.form.passwordConfirm = ''
        
        this.show = false
        this.$nextTick(() => { 
          this.show = true
        })
      }
    }
  }
</script>