<template>
  <div>
    <!-- <h3 v-if="token" > Hi user </h3> -->
    <div v-if="!token">
      <div>
        <b-modal id="bv-modal-example" hide-footer>
          <template #modal-title>
             <code>Login Message !</code> 
          </template>
          <div class="d-block text-center">
            <h4>Please you have must log in first</h4>
          </div>
          <b-button
            class="mt-3"
            block
            @click="$bvModal.hide('bv-modal-example')"
          >
            <router-link
              to="/sign-in"
              class="nav-link"
              style="color: white; padding: 0px"
              active-class="active"
            >
              Log In
            </router-link></b-button
          >
        </b-modal>
      </div>
    </div>
    <TodoApp v-if="token"></TodoApp>
  </div>
</template>

<script>
import TodoApp from "./todos/TodosApp.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapGetters(["token"]),
  },
  components: {
    TodoApp,
  },
};
</script>
