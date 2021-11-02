<template>
  <div class="container"  id="cabezera_background">
    <div id="espacio">
    <form>
      <!-- <cabezera /> -->
      <div id="espacio">
        <v-text-field
          v-model="Nombre"
          :error-messages="nameErrors"
          :counter="20"
          label="Nombre & apellidos"
          required
          @input="$v.Nombre.$touch()"
          @blur="$v.Nombre.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="Cedula"
          :error-messages="item1Errors"
          :counter="10"
          label="Cedula"
          required
          @input="$v.Cedula.$touch()"
          @blur="$v.Cedula.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="Ciudad"
          :error-messages="item2Errors"
          :counter="10"
          label="Ciudad"
          required
          @input="$v.Ciudad.$touch()"
          @blur="$v.Ciudad.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="Asunto"
          :error-messages="item3Errors"
          :counter="40"
          label="Asunto"
          required
          @input="$v.Asunto.$touch()"
          @blur="$v.Asunto.$touch()"
        ></v-text-field>


         <v-select
         :items="dependencias"
        v-model="CodigoD"
        :error-messages="selectErrors"
        label="CodigoD"
        :menu-props="{ top: true, offsetY: true }"
        v-if="bd == 0"
        required
        
      ></v-select> 

        <v-btn class="mr-4" color="success darken-1" @click="submit">
          Guardar Datos
        </v-btn>
        <v-btn color="danger darken-1" @click="clear">Nueva visita</v-btn>
      </div>
    

      
    </form>

      <a link="home">
        <v-btn class="ma-6 container" color="blue darken-1" dark>
          <v-icon dark left> mdi-arrow-left </v-icon>Back
        </v-btn>
      </a>
  </div>
  </div>  

</template>

<script>
// import cabezera from '../components/cabezera'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'


  export default {


    
    mixins: [validationMixin],

    validations: {
      Nombre: { required, maxLength: maxLength(20) },
      Cedula: { required, maxLength: maxLength(10) },
      Asunto: { required, maxLength: maxLength(40) },
      // CodigoD: { required, maxLength: maxLength(15) },
      Ciudad: { required, maxLength: maxLength(10) },
      select: { required },
      
    
    },

    data: () => 
    ({
      Nombre: '',
      Asunto:'',
      Cedula:'',
      Ciudad:'',
      CodigoD:'',
      ruta:'',
      Select: null,
      // items: [
      //   ],
      editedItem: {
        dependencias:''
      },
      
       bd: 0,
      visitas: [], 
      dependencias:[]
    }),
    
    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.CodigoD) return errors
        !this.$v.CodigoD.required && errors.push('codigo es requerido')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.Nombre) return errors
        !this.$v.Nombre.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.Nombre.required && errors.push('Nombre es requerido.')
        return errors
      },
      item1Errors () {
        const errors = []
        if (!this.$v.Cedula) return errors
        !this.$v.Cedula.maxLength && errors.push('Cedula no puede tener mas de 10 caracteres')
        !this.$v.Cedula.required && errors.push('Cedula es requerido.')
        return errors
      },
      foto1Errors () {
        const errors = []
        if (!this.$v.Cedula) return errors
        !this.$v.Cedula.maxLength && errors.push('foto no puede pesar mas de 4mb')
        !this.$v.Cedula.required && errors.push('foto  es requerida.')
        return errors
      },
      item2Errors () {
        const errors = []
        if (!this.$v.Ciudad) return errors
        !this.$v.Ciudad.maxLength && errors.push('Ciudad no puede tener mas de 10 caracteres')
        !this.$v.Ciudad.required && errors.push('Ciudad es requerido.')
        return errors
      },
      item3Errors () {
        const errors = []
        if (!this.$v.Asunto) return errors
        !this.$v.Asunto.maxLength && errors.push('Asunto no puede tener mas de 20 caracteres')
        !this.$v.Asunto.required && errors.push('Asunto es requerido.')
        return errors
      }
    },

    created() {
      this.selectDependencia();
      
    },

    methods: {
      ejecuta(){
        window.location.href = '/'
        console.log(this.ejecuta)
     },
      submit () {
      if (this.bd == 0){
          console.log('Guardando', this.bd);
          let header = { headers: {'token': this.$store.state.token}}
          // const me = this;
          axios
          .post(
            `visitas`,
            {
              Nombre: this.Nombre,
              Asunto: this.Asunto,
              Cedula: this.Cedula,
              Ciudad:this.Ciudad,
              CodigoD:this.CodigoD ,
              select: this.CodigoD,
            },
            header
            
          ) 
          .then ((response) => {
            console.log(response);
            console.log("bien ")


          })
          .catch((error) => {
            console.log (error.response);
           alert('alert no seccion', this.ejecuta())
          });
          this.clear()

        
      } 
    },
      

      selectDependencia(){
          let me = this;
          let DependenciaArray = [];
          let header = { headers: { "token": this.$store.state.token } };
          axios
            .get(`dependencias`, header)
            .then(function (response) {
              DependenciaArray = response.data.dependencias;
              DependenciaArray.map(function (x) {
              me.dependencias.push({ text:x.Nombre, value: x._id });
              console.log(x._id)
              });
            })
            .catch(function (error) {
              console.log(error);             
             alert('alert no seccion', this.ejecuta())
            });
          },

      clear () {
        this.$v.$reset()
        this.Nombre = ''
        this.Asunto = ''
        this.Cedula=''
        this.Ciudad=''
        this.CodigoD=''
        this.select = null
   
      }
    },
  }
  
</script>

<style scoped>

#espacio{
  padding: 50px;
  width: -60px;

}

#cabezera_background{
  background:
  linear-gradient(
  rgba(143, 153, 201, 0.75),
  rgba(153, 163, 211, 0.95));
}
</style>