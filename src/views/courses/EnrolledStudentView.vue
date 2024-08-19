<template>
    <div class="content" v-if="courseData">
      <div class="content-header">
<div>
        <span>Course Information</span>
        <p>Subject: {{ courseData?.name }}</p>
        <p>Parallel Number: {{ courseData.pNumber }}</p>
        <p>Begins At: {{ courseData.beginsAt }}</p>
        <p>Ends At: {{ courseData.endsAt }}</p>
      </div>
      <div>
        <span>Teachers Information</span>
        <p>Name: {{ courseData.teacher.name }}</p>
        <p>Teacher's Available subjects: <span style="font-weight: bold; margin-right: 8px; color: darkgray; font-size: 16px;" 
             v-for="item in courseData.teacher.subjectsSelected">{{ item}} - </span> </p>
      </div>
        <span>Enrolled Students</span>
        <hr></hr>
      </div>  
      
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
        <BTr v-for="(item, index) in studentsList" :key="index">
          <BTd>{{ 1 + index }}</BTd>
          <BTd>{{item.student.name}} {{ item.lastName }}</BTd>
          <BTd>{{item.student.email}}</BTd>
          <BTd>{{item.student.birthDate}}</BTd>
          <BTd>{{item.student.phone}}</BTd>
          <BTd>
            <BButton disabled  variant="secondary" size="sm">Quite</BButton>
          </BTd>
        </BTr>
        
      </BTbody>
    </BTableSimple>
    </div>
  </template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'KardexVacunaView',
    data() {
      return {
        courseData:null,
        studentsList:[],
      };
    },
    methods: {
      getCourse(){
        const courseId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/courses/"+courseId+"?_expand=teacher&")
        .then(function(response){
            vm.courseData = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      },
      getStudents(){
        const courseId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/coursesStudents?_expand=student&courseId="+courseId)
        .then(function(response){
          vm.studentsList = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      }
    },
    computed: {
      ...mapGetters(['getBaseUrl']),
    },
    mounted(){
      this.getCourse();
      this.getStudents();
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  