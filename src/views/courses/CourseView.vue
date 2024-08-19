<template>
   <div class="content">
        <div class="content-header"><span>COURSES</span>
            <BButton @click="search()" variant="light" class="btn btn-lith" style="float:right">Search</BButton>
            <BFormInput class="search-input" placeholder="Search here"  type="search" style="float:right" v-model="textToSearch" @search="search()"/>
            
            <div style="width: 500px; float: right; display: flex;">

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
                
                <label style="margin-right: 8px; margin: auto;" for="subject"> Teacher: </label>
                <BFormSelect style="width: 150px;" id="input-3" v-model="filter.teacherId">
                    <BFormSelectOption value="">All</BFormSelectOption>
                    <BFormSelectOption  :value="teacher.id" v-for="(teacher, index) in teachersList" 
                    :key="`teacher-${index}`">{{ teacher.name }}
                    </BFormSelectOption>
    </BFormSelect>
                
                <BButton type="submit" @click="filterText()" variant="light" >Filter</BButton>
            </div>
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
            textToFilter: '',
            itemList: [],
            teachersList:[],
            showNewModal: false,
            showEditModal: false,
            updateCourse: null,
            filter: {
                fecha: null,
                teacherId: '',
                subject:''
            },
            subjectsOptions: ['Science','Math'
          , 'History', 'Geography', 'French', 'Computer Science', 'Physics'
            , 'Chemistry', 'Biology', 'Psychology', 'Anthropology', 'Art', 'Music', 'Literature', 'Economics',
              'Political Science'],
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
            this.axios.get(this.baseUrl + "/courses?_expand=teacher" + this.textToFilter + "&q=" + this.textToSearch)
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
        getTeachersList() {
        const vm = this;
        this.axios.get(this.baseUrl + "/teachers")
            .then(function (response) {
            vm.teachersList = response.data;
            })
            .catch(function (error) {
            console.error(error);
            });
        },
      search() {
            this.getCourses();
        },
        filterText() {
            this.textToFilter = '';
            if (this.filter.subject != '') {
                this.textToFilter += "&name=" + this.filter.subject;
            }
            if (this.filter.teacherId != null && this.filter.teacherId != '') {
                this.textToFilter += "&teacherId=" + this.filter.teacherId;
            }
            this.getCourses();
        },
  },
    mounted() {
        this.getCourses();
        this.getTeachersList();
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