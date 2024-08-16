<template>
    <div>
  <BForm @submit.prevent="submitForm()">
    <BFormGroup id="input-group-1" label="Name:" label-for="input-1">
      <BFormInput id="input-1" v-model="form.name" placeholder="Enter your name" required />
    </BFormGroup>
    <BFormGroup id="input-group-2" label="Lastname:" label-for="input-2">
      <BFormInput id="input-2" v-model="form.lastName" placeholder="Enter lastname" required />
    </BFormGroup>
    <BFormGroup
      id="input-group-3"
      label="Email address:"
      label-for="input-3"
    >
      <BFormInput
        id="input-3"
        v-model="form.email"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>
    <BFormGroup id="input-group-4" label="Phone:" label-for="input-4">
      <BFormInput id="input-4" v-model="form.phone" placeholder="Enter phone" required />
    </BFormGroup>
    <BFormGroup id="input-group-5" label="Birthdate:" label-for="input-5">
      <BFormInput id="input-5"type="date" v-model="form.birthDate" placeholder="Enter your birthDate" required />
    </BFormGroup>
     <BFormGroup id="input-group-6" label="Address:" label-for="input-6">
      <BFormTextarea id="input-6" v-model="form.address" placeholder="Enter your address" rows="2" required />
    </BFormGroup>
   <!--- 
    <BFormGroup id="input-group-3" label="Food:" label-for="input-3">
      <BFormSelect id="input-3" v-model="form.food" :options="foods" required />
    </BFormGroup>
   -->

   <br>
   
    <BButton type="submit" style="float: right" variant="primary">Save</BButton>
  </BForm>

  <!-- <p class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
  </p>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
//const foods = [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn']

export default {
  props: ['updateStudent'],
    data() {
      return {
          form: {
            name: '',
            lastName:'',
            email: '',
            birthDate: '',
            address:'',
            phone: '',
        },
            foods:[{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn']
      }
    },
    methods: {
      //onSubmit,
      //onReset,
        ...mapActions(['increment']),
        submitForm() { 
            console.log('i shere')
          if (this.updateStudent) {
            this.saveUpdateStudent();
          } else {
              this.saveNewStudent();
          }
        },
        saveNewStudent() {
            const vm = this;
            this.axios.post(this.baseUrl + "/students", this.form)
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
      saveUpdateStudent() {
          const vm = this;
            this.axios.patch(this.baseUrl + "/students/"+ this.updateStudent.id, this.form)
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
        if (this.updateStudent) {
        console.log(this.updateStudent);
         this.form=Object.assign({}, this.updateStudent);
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