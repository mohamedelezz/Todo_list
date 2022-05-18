<template>
  <div>
    <div>
      <b-modal ref="my-modal" hide-footer title="">
  
          <div v-if="error" class="alert alert-danger" role="alert"> {{error}} </div>

        <div class="d-block text-center">

          <div class="mb-3">
            <label for="formFile" class="form-label">Default file input example</label>
            <input @change="onFileSelected" class="form-control" type="file" id="formFile" accept=".png, .gif, .jpeg, .jpg" >
          </div>

          <label style="width: 100%; text-align: left" class="" for="" >Title</label>
          <b-form-input id="input-default" v-model="title" placeholder=" title" class="mb-4"></b-form-input>

          <label style="width: 100%; text-align: left" class="" for="" >Description</label>
          <b-form-input id="input-default" v-model="description" placeholder=" description" class="mb-4" ></b-form-input>

          <label style="width: 100%; text-align: left" class="" for="" >Due date</label >
          <b-form-datepicker id="example-datepicker"  v-model="due_date" class="mb-2" ></b-form-datepicker>

          <label style="width: 100%; text-align: left" class="" for="" >status</label>
          <b-form-select style="width: 100%; text-align: left"  v-model="status"  :options="options" ></b-form-select>
        </div>
        <b-button class="mt-2" variant="outline-warning" block @click="saveChange">Save</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancle</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SharedForm",
  props: {
    isModalShow: {
      type: Boolean,
    },
    editingTodo: {
      type: Object,
    }, 
  },
  watch: {
    editingTodo(to) {  
      this.title = to.title;
      this.description = to.description;
      this.due_date = to.dueDate;
      this.status = to.status;
    },
   },
  data() {
    return {
      title: "",
      description: "",
      due_date: null,
      status: "created",
      selectedFile: null,
     
      options: [
        { value: "created", text: "created" },
        { value: "in progress", text: "in progress" },
        { value: "completed", text: "completed" },
      ],

      error: "",
    };
  },
  mounted() { 
    this.$emit("modalRef", this.$refs["my-modal"]);
  },

  methods: {
    moment() {
      return moment();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      
    },
    onFileSelected: function (e) {
      this.selectedFile = e.target.files[0];    
     
    },
    //
    saveChange() {     
      if (
        this.title == "" ||
        this.description == "" ||
        this.status == "" ||
        this.due_date == null
      ) {
      return this.error = "Please fill all fields";
      } else {

        this.hideModal();
        const todo = { 
          title: this.title,
          description: this.description,
          dueDate: this.due_date,
          status: this.status,
          file: this.selectedFile,
        }
        if(this.editingTodo){ 
          todo['id'] = this.editingTodo.id
          todo['image'] = this.editingTodo.image
          todo['imageId'] = this.editingTodo.imageId          
          }          
        this.$emit("save", todo);
    }},
  },
};
</script>
