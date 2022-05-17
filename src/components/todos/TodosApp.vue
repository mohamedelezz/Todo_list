<template>
  <div class="container">
    <SharedForm @save="postTodo" @modalRef="getModalRef" />
    <!-- <TodoForm @addTodo="(todo) => postTodo(todo)" />  -->
    <b-button class="m-3 bg-primary ml-4" id="show-btn" @click="modalRef.show()"
      >Add Todo <span class="fa fa-plus-square card-link"></span
    ></b-button>
    <br />
    <TodoItemVue :getTodo="getTodos" :todos="todos" @updateTodo="updateTodo" />
  </div>
</template>

<script>
// sengle responsibility principle
import TodoItemVue from "./TodoItem.vue";
import SharedForm from "./SharedForm.vue";
import http from "@/httpService";
// import TodoForm from "./TodoForm.vue";

export default {
  name: "TodoApp",
  data() {
    return {
      todos: [],
      modalRef: null,
    };
  },
  mounted() {
    this.getTodos();
  },
  components: {
    TodoItemVue,
    SharedForm,
    // TodoForm,
  },
  methods: {
    getTodos() {
      http
        .get("todos", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.$store.commit("setTodo", response.data);
          this.todos = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTodo(todo) {
      if (
        this.title == "" &&
        this.description == "" &&
        this.status == ""&&
        todo.dueDate == "" 
      ) {
      return this.error = "Please fill all fields";
      } else {
      const fd = new FormData();
      fd.append("title", todo.title);
      fd.append("description", todo.description);
      fd.append("status", todo.status);
      fd.append('dueDate', todo.dueDate);
      fd.append("image", todo.image);
      fd.append("imageId", todo.imageId);
      if(todo.file){
        fd.append("file", todo.file);
      }else{
        fd.append("file", null)
      }
      
      console.log("now i update todo", todo);
      http
        .put(`todos/${todo.id}`, fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.$store.commit("setTodo", [response.data]);
          this.getTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    }},

    postTodo(todo) {
      if (
        this.title == "" &&
        this.description == "" &&
        this.status == ""&&
        todo.dueDate == "" 
      ) {
      return this.error = "Please fill all fields";
      } else {
      const fd = new FormData();
      fd.append("title", todo.title);
      fd.append("description", todo.description);
      fd.append("status", todo.status);
      fd.append('dueDate', todo.dueDate);
      if(todo.file){
        fd.append("file", todo.file);
      }else{fd.append("file", null)}
      http
        .post("todos", fd, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          // this.$store.dispatch('setTodo', [response.data])

          this.$store.commit("setTodo", [response.data]);
          this.getTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    }},

    getModalRef(ref) {
      console.log(ref);
      this.modalRef = ref;
    },
  },
};
</script>
