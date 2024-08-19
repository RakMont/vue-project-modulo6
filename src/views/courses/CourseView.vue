<template>
   <div class="content">
        <div class="content-header">COURSES
            <BButton @click="search()" variant="light" class="btn btn-lith" style="float:right">Search</BButton>
            <BFormInput class="search-input" placeholder="Search here"  type="search" style="float:right" v-model="textToSearch" @search="search()"/>
        </div>

    <hr>
    <BButton class="button" variant="success" @click="showNewModal = true">ADD NEW COURSE</BButton>
    <BModal v-if="showNewModal" v-model="showNewModal" hide-footer centered title="New Course">
      <FormCourseView @on-register="onRegister($event)"></FormCourseView></BModal>
    
      <BModal v-if="showEditModal" v-model="showEditModal" hide-footer centered title="Edit Course">
      <FormCourseView :updateCourse="updateCourse" @on-update="onUpdate($event)"></FormCourseView></BModal>
      <p></p>
    <BTableSimple responsive bordered>
      <BThead variant="dark">
        <BTr>
          <BTh>#</BTh>
          <BTh>Subject</BTh>
          <BTh>Parallel Number</BTh>
          <BTh>Begins At</BTh>
          <BTh>Ends At</BTh>
          <BTh>Teacher</BTh>
          <BTh>N.Students</BTh>
          <BTh>Actions</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in itemList" :key="index">
          <BTd>{{ 1 + index }}</BTd>
          <BTd>{{item.name}}</BTd>
          <BTd>P-{{item.pNumber}}</BTd>
          <BTd>{{item.beginsAt}}</BTd>
          <BTd>{{item.endsAt}}</BTd>
          <BTd>{{item.teacher.name}}</BTd>
          <BTd>{{item.studentsIds.length}}</BTd>
          <BTd>
            <BButton variant="primary" size="sm" style="margin-right: 15px;" @click="editCourse(item)">Edit</BButton>
            <BButton variant="danger" size="sm" style="margin-right: 15px;"  @click="deleteCourse(item.id)">Delete</BButton>
            <BButton variant="warning" size="sm" @click="enrolledStudents(item.id)">Enrolled students
</BButton>

          </BTd>
        </BTr>
        
      </BTbody>
    </BTableSimple>
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FormCourseView from './FormCourseView.vue';
export default {
  name: 'Course',
    data() {
      return {
        textToSearch: '',
        itemList: [],
        showNewModal: false,
        showEditModal: false,
        updateCourse:null,
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
        getCourses() {
            const vm = this;
            this.axios.get(this.baseUrl + "/courses?_expand=teacher&q=" + this.textToSearch)
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
            this.getCourses();
            this.showNewModal = false;
            this.$toast.show('Registro exitoso', 'success');
      },
      onUpdate(event) {
        console.log("on update");
        this.getCourses();
        this.showEditModal = false;
        this.updateCourse = null;
        this.$toast.show('Actualizacion exitosa', 'success');
      },
      deleteCourse(id) {

        if (confirm("¿Esta Seguro de eliminar el registro?")) {
               const vm = this;
          this.axios.delete(this.baseUrl + "/courses/" + id)
                 .then(function (response) {
                    vm.getCourses();
                    vm.$toast.show("Registro eliminado.", "danger");
                  })
                 .catch(function (error) {
                    console.error(error);
                  });
            }
      },
      editCourse(teacher) {
        this.updateCourse = teacher
        this.showEditModal = true;
        },
      enrolledStudents(id) {
        
        },
      search() {
            this.getCourses();
        },
  },
    mounted() {
      this.getCourses();
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