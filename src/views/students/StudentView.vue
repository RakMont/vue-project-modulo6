
<template>
   <div class="content">
        <div>STUDENTS</div>

    <hr>
    <BButton class="button" variant="success" @click="showNewModal = true">ADD STUDENT</BButton>
    <BModal v-if="showNewModal" v-model="showNewModal" hide-footer centered title="New Student">
      <FormStudentView @on-register="onRegister($event)"></FormStudentView></BModal>
    
      <BModal v-if="showEditModal" v-model="showEditModal" hide-footer centered title="Edit Student">
      <FormStudentView :updateStudent="updateStudent" @on-update="onUpdate($event)"></FormStudentView></BModal>
      <p></p>
    <BTableSimple responsive bordered>
      <BThead variant="dark">
        <BTr>
          <BTh>#</BTh>
          <BTh>Name</BTh>
          <BTh>Email </BTh>
          <BTh>Birth Date</BTh>
          <BTh>Phone</BTh>
          <BTh>Actions</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in itemList" :key="index">
          <BTd>{{ 1 + index }}</BTd>
          <BTd>{{item.name}} {{ item.lastName }}</BTd>
          <BTd>{{item.email}}</BTd>
          <BTd>{{item.birthDate}}</BTd>
          <BTd>{{item.phone}}</BTd>
          <BTd>
            <BButton variant="primary" size="sm" style="margin-right: 15px;" @click="editStudent(item)">Edit</BButton>
            <BButton variant="danger" size="sm" @click="deleteStudent(item.id)">Delete</BButton>
          </BTd>
        </BTr>
        
      </BTbody>
      <!-- <BTfoot>
        <BTr>
          <BTh sticky-column>Footer</BTh>
          <BTh>Heading 1</BTh>
          <BTh>Heading 2</BTh>
          <BTh>Heading 3</BTh>
          <BTh>Heading 4</BTh>
        </BTr>
      </BTfoot>-->
    </BTableSimple>
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FormStudentView from './FormStudentView.vue';
export default {
  name: 'Students',
    data() {
      return {
        textToSearch: '',
        itemList: [],
        showNewModal: false,
        showEditModal: false,
        updateStudent:null,
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
        getStudents() {
            const vm = this;
            this.axios.get(this.baseUrl + "/students?_q=" + this.textToSearch)
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
            this.getStudents();
            this.showNewModal = false;
            this.$toast.show('Registro exitoso', 'success');
      },
      onUpdate(event) {
        console.log("on update");
        this.getStudents();
        this.showEditModal = false;
        this.updateStudent = null;
        this.$toast.show('Actualizacion exitoso', 'success');
      },
      deleteStudent(id) {

        if (confirm("¿Esta Seguro de eliminar el registro?")) {
               const vm = this;
          this.axios.delete(this.baseUrl + "/students/" + id)
                 .then(function (response) {
                    vm.getStudents();
                    vm.$toast.show("Registro eliminado.", "danger");
                  })
                 .catch(function (error) {
                    console.error(error);
                  });
            }
      },
      editStudent(student) {
        this.updateStudent = student
        this.showEditModal = true;
      }
  },
    mounted() {
      this.getStudents();
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