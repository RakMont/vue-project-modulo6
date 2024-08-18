<template>
    <div>
  <BForm @submit.prevent="submitForm()">
    <BFormGroup id="input-group-1" label="Name:" label-for="input-1">
      <BFormSelect id="input-3" v-model="form.name" :options="subjectsOptions" required />
    </BFormGroup>
    <BFormGroup id="input-group-2" label="Parallel Number:" label-for="input-2">
      <BFormInput id="input-2" type="number" v-model="form.pNumber" placeholder="Enter parallel Number" required />
    </BFormGroup>
    <BFormGroup id="input-group-3" label="Begin Date:" label-for="input-3">
      <BFormInput id="input-3"type="date" v-model="form.beginsAt" placeholder="Enter the begin date" required />
    </BFormGroup>
    <BFormGroup id="input-group-4" label="End Date:" label-for="input-4">
      <BFormInput id="input-4"type="date" v-model="form.endsAt" placeholder="Enterthe end date" required />
    </BFormGroup>
     <BFormGroup id="input-group-5" label="Teacher:" label-for="input-5">
     <BFormSelect  id="input-5" v-model="form.teacherId" required :class="{ 'is-invalid': errors.teacherId }">
          <BFormSelectOption  :value="teacher.id" v-for="(teacher, index) in teachersList" :key="`teacher-${index}`">{{ teacher.name }}
          </BFormSelectOption>
    </BFormSelect>

    </BFormGroup>
   <br>
   
    <BButton type="submit" style="float: right" variant="primary">Save</BButton>
  </BForm>

  <p class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
  </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['updateCourse'],
    data() {
        return {
            form: {
                name: '',
                pNumber:'',
                beginsAt: '',
                endsAt: '',
                teacherId: '',
                studentsIds:[]
          },
          teachersList: [],
          subjectsOptions: [ 'Science','Math'
          , 'History', 'Geography', 'French', 'Computer Science', 'Physics'
            , 'Chemistry', 'Biology', 'Psychology', 'Anthropology', 'Art', 'Music', 'Literature', 'Economics',
              'Political Science'],
            errors: {}
        }
    },
    methods: {
        ...mapActions(['increment']),
        submitForm() { 
            console.log('i shere')
          if (this.updateCourse) {
            this.saveUpdateCourse();
          } else {
              this.saveNewCourse();
          }
        },
        saveNewCourse() {
            const vm = this;
            this.axios.post(this.baseUrl + "/courses", this.form)
                .then(function (response) { 
                    if (response.status == '201') {
                        vm.$emit('on-register', response.data);
                    }
                    console.log(response);
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
      saveUpdateCourse() {
          const vm = this;
            this.axios.patch(this.baseUrl + "/courses/"+ this.updateCourse.id, this.form)
                .then(function (response) { 
                    if (response.status == '200') {
                        vm.$emit('on-update', response.data);
                    }
                    console.log(response);
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
      },
      setForm() {
        if (this.updateCourse) {
        console.log(this.updateCourse);
         this.form=Object.assign({}, this.updateCourse);
        }
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
        
      
    },
    computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
      },
      
    
    },
  mounted() {
    this.getTeachersList();
  },
  beforeMount() {
    this.setForm();
  }
  
}

</script>