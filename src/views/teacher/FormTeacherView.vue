<template>
    <div>
  <BForm @submit.prevent="submitForm()">
    <BFormGroup id="input-group-1" label="Name:" label-for="input-1">
      <BFormInput id="input-1" v-model="form.name" placeholder="Enter your name" required />
    </BFormGroup>
    <br>
    <BFormGroup id="input-group-2" label="Subjects:" label-for="input-2">
      <BFormCheckboxGroup
      v-model="form.subjectsSelected"
      :options="subjectsOptions"
      name="flavour-1a"
    />

    </BFormGroup>
   <br>
   
    <BButton type="submit" style="float: right" variant="primary">Save</BButton>
  </BForm>

 <!--  <p class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
  </p>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['updateTeacher'],
    data() {
      return {
          form: {
            name: '',
            subjectsSelected: [],
        },
        subjectsOptions: [{ text: 'Math', value: 'Math' }, { text: 'Science', value: 'Science' },
          'English', 'History', 'Geography', 'French', 'Computer Science', 'Physics'
          , 'Chemistry', 'Biology', 'Psychology', 'Anthropology', 'Art', 'Music', 'Literature', 'Economics',
        'Political Science']
      }
    },
    methods: {
        ...mapActions(['increment']),
        submitForm() { 
          if (this.updateTeacher) {
            this.saveUpdateTeacher();
          } else {
              this.saveNewTeacher();
          }
        },
        saveNewTeacher() {
            const vm = this;
            this.axios.post(this.baseUrl + "/teachers", this.form)
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
      saveUpdateTeacher() {
          const vm = this;
            this.axios.patch(this.baseUrl + "/teachers/"+ this.updateTeacher.id, this.form)
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
        if (this.updateTeacher) {
        console.log(this.updateTeacher);
         this.form=Object.assign({}, this.updateTeacher);
        }
      }
        
      
    },
    computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
      },
      
    
  },
  beforeMount() {
    this.setForm();
  }
  
}

</script>