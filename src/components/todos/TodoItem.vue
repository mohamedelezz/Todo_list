<template>
  <div class="container">
    <SharedForm @save="updateTodo" @modalRef="getModalRef" :editingTodo="editingTodo"/>
    <div class="container">
      <div class="row">
        <div  v-for="item in todos" :key="item.id" class="col-md-4 mb-2">
          <div style="height: 95%; padding-bottom: 10px;" class="card rounded">
            <div  class="card-body btn-light rounded ">
              <h4 class="card-title d-flex justify-content-between">
                <h5 class="mb-4 d-inline mt-2" >Title: {{ item.title }} </h5> 
                <img v-if="item.image" width="20% d-inline mt-0" :src='item.image' class="rounded-circle" alt="...">
              </h4>
              <h6 v-if="item.status=='in progress'" class="card-subtitle mb-2 btn-warning rounded p-1 text-center text-capitalize" 
              style="color:white; width: 33%;"> {{ item.status }} </h6>
              <h6 v-else-if="item.status=='completed'" class="card-subtitle mb-2 btn-secondary rounded p-1 text-center text-capitalize"
               style="color:white; width: 33%;"> {{ item.status }} </h6>
              <h6 v-else-if="item.status=='created'" class="card-subtitle mb-2 btn-primary rounded p-1 text-center text-capitalize"
               style="color:white; width: 33%;"> {{ item.status }} </h6>
              <!-- <dev> {{item.status}} </dev> -->
              <p class="card-text mt-4"> {{ item.description }}</p>
              <div style="width: 95%; display: flex; justify-content: space-between" >
                <b-button class="btn-info" id="show-btn" @click="showModal(item)">Edit <span class="fa fa-pen card-link"></span></b-button>
                <button @click="deleteTodo(item.id, item.imageId)" type="button" class="btn btn-danger"> Delete! <span class="fa fa-trash card-link"></span>
                </button>
              </div>
            </div>
             <div class="bg-secondary" v-if="item.dueDate"> Due date: {{moment(item.dueDate).format('MM/DD/YYYY')}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import SharedForm from "./SharedForm.vue";

export default {
  name: "TodoApp",
  data() {
    return {
      modalRef: null,
      editingTodo: null,
    };
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
    getTodo : {
      type: Function,
    },
  },
  components: {
    // EditTodo,
    SharedForm,
  },
  methods: {
    showModal(todo) {
      this.modalRef.show();
      this.editingTodo = todo;
    },
    moment() {
      return moment();
    },
    getModalRef(modalRef) { // get modal reference from child component to use in parent component
      this.modalRef = modalRef;
    },
    updateTodo(todo) {
      this.$emit("updateTodo", todo);
    },
    deleteTodo(id, imageId) {
      const todo = {
        id,
        imageId
      };
      this.$emit("deleteTodo", todo);
    },
 
    },



};
</script>