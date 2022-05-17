<template>
    <div style="width:40vw; margin-left:30vw; padding: 5vw; background-color:#0091fb; border-radius: 1vw; margin-top:7vw">
     
      <div v-if="error"  class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                   {{error}}
                  </div>
            </div>
            <div v-if="success" class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                {{success}}
                </div>
          </div>

     <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1" >
          <b-form-input   id="input-1" v-model="form.email" type="email" placeholder="Enter email" required>
          </b-form-input>
        </b-form-group>
        
      <br>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
</template>

<script>
import http from "@/httpService";

  export default {
    name: 'LogIn', 
    data() {  
      return {
        form: {
        email: '',
         },      
        show: true,
        success: '',
        error: ''
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        http.post('password/forgot', this.form)
        .then(response => {
          this.error = ''
          console.log(response)
         return this.success= 'Email sent successfully please check your email' 
        }).catch(error => {
          if(error.response.data.message == 'Internal server error'){
            return this.error = ' there is an error with the server'
          }
            this.error = error.response.data.message
        })
        
      },
      onReset(event) {
        event.preventDefault()
        this.form.email = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>