<template>
   <div class="content">
        <div class="content-header"><span>TEACHERS</span>
          <BButton @click="search()" variant="light" style="float:right">Search</BButton>
            <BFormInput class="search-input" placeholder="Search here"  type="search" style="float:right" v-model="textToSearch" @search="search()"/>
       
            <div style="width: 300px; float: right; display: flex;">

                <!-- <label for="fecha"> Fecha: </label>
                <BFormInput id="fecha" type="date"  v-model="filter.fecha" placeholder="Enterthe end date" />
-->
                <label style="margin-right: 8px; margin: auto;" for="subject"> Subject: </label>
                <BFormSelect  id="input-3" v-model="filter.subject" style="width: 150px;">
                  <BFormSelectOption value="">All</BFormSelectOption>
                  <BFormSelectOption  :value="subject" v-for="(subject, index) in subjectsOptions" 
                      :key="`teacher-${index}`">{{ subject }}
                      </BFormSelectOption>
                </BFormSelect>                
                <BButton type="submit" @click="filterText()" variant="light" >Filter</BButton>
            </div>
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
          <BTd><span style="font-weight: bold; margin-right: 8px; color: darkgray;" v-for="sub in item.subjectsSelected">{{ sub }} | </span></BTd>
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
        textToFilter:'',
        itemList: [],
        showNewModal: false,
        showEditModal: false,
        updateTeacher: null,
        subjectsOptions: ['Science','Math'
          , 'History', 'Geography', 'French', 'Computer Science', 'Physics'
            , 'Chemistry', 'Biology', 'Psychology', 'Anthropology', 'Art', 'Music', 'Literature', 'Economics',
              'Political Science'],
        filter: {
                fecha: null,
                subject:''
            }
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
            this.axios.get(this.baseUrl + "/teachers?q=" + (this.textToFilter!= '' ? this.textToFilter : this.textToSearch))
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
        filterText() {
          console.log("filter")
          this.textToFilter = this.filter.subject;
          this.textToSearch = '';
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