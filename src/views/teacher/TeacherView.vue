<template>
   <div class="content">
        <div class="content-header">TEACHERS
          <BButton @click="search()" variant="light" class="btn btn-lith" style="float:right">Search</BButton>
            <BFormInput class="search-input" placeholder="Search here"  type="search" style="float:right" v-model="textToSearch" @search="search()"/>
       
        </div>

    <hr>
    <BButton class="button" variant="success" @click="showNewModal = true">ADD TEACHER</BButton>
    <BModal v-if="showNewModal" v-model="showNewModal" hide-footer centered title="New Teacher">
      <FormTeacherView @on-register="onRegister($event)"></FormTeacherView></BModal>
    
      <BModal v-if="showEditModal" v-model="showEditModal" hide-footer centered title="Edit Teacher">
      <FormTeacherView :updateTeacher="updateTeacher" @on-update="onUpdate($event)"></FormTeacherView></BModal>
      <p></p>
    <BTableSimple responsive bordered>
      <BThead variant="dark">
        <BTr>
          <BTh>#</BTh>
          <BTh>Name</BTh>
          <BTh>Subjects</BTh>
          <BTh>Actions</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in itemList" :key="index">
          <BTd>{{ 1 + index }}</BTd>
          <BTd>{{item.name}} {{ item.lastName }}</BTd>
          <BTd>{{item.subjectsSelected}}</BTd>
          <BTd>
            <BButton variant="primary" size="sm" style="margin-right: 15px;" @click="editTeacher(item)">Edit</BButton>
            <BButton variant="danger" size="sm" @click="deleteStudent(item.id)">Delete</BButton>
          </BTd>
        </BTr>
        
      </BTbody>
    </BTableSimple>
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FormTeacherView from './FormTeacherView.vue';
export default {
  name: 'Teachers',
    data() {
      return {
        textToSearch: '',
        itemList: [],
        showNewModal: false,
        showEditModal: false,
        updateTeacher:null,
      }
  },
    computed: {
        ...mapState(['count']),
        ...mapGetters(['doubleCount', 'getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    methods: {
     ...mapActions(['increment']),
        getTeachers() {
            const vm = this;
            this.axios.get(this.baseUrl + "/teachers?q=" + this.textToSearch)
                .then(function (response) {
                    console.log(response);
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
      },
       onRegister(event) {
            console.log("on register");
            this.getTeachers();
            this.showNewModal = false;
            this.$toast.show('Registro exitoso', 'success');
      },
      onUpdate(event) {
        console.log("on update");
        this.getTeachers();
        this.showEditModal = false;
        this.updateTeacher = null;
        this.$toast.show('Actualizacion exitosa', 'success');
      },
      deleteStudent(id) {

        if (confirm("¿Esta Seguro de eliminar el registro?")) {
               const vm = this;
          this.axios.delete(this.baseUrl + "/teachers/" + id)
                 .then(function (response) {
                    vm.getTeachers();
                    vm.$toast.show("Registro eliminado.", "danger");
                  })
                 .catch(function (error) {
                    console.error(error);
                  });
            }
      },
      editTeacher(teacher) {
        this.updateTeacher = teacher
        this.showEditModal = true;
      },
      search() {
            this.getTeachers();
        },
  },
    mounted() {
      this.getTeachers();
    },
    components: {

  }
  }
</script>
<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>
<style>
 .content{
  width: 90%;
  margin: auto;
  padding-top: 24px;
 }
</style>