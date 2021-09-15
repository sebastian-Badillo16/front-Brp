<template>
  <div class="container">
    <form>
      <!-- <cabezera /> -->
      <div id="espacio">
        <v-text-field
          v-model="Nombre"
          :error-messages="nameErrors"
          :counter="20"
          label="Nombre"
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
        <!-- <v-select
        v-model="this.Codigo"
        :items="items"
        :error-messages="selectErrors"
        label="Codigo dependencia"
        :menu-props="{ top: true, offsetY: true }"
        v-if="bd == 0"
        required
        @change="$v.select"
        @blur="$v.select.$touch()"
      ></v-select> -->

        <!-- <v-file-input v-model="ruta"
    accept="image/*"
    label="File input"
    ></v-file-input>
    <button @click="cargar()" >guardar F</button> -->

        <v-btn class="mr-4" color="success darken-1" @click="submit">
          Guardar
        </v-btn>
        <v-btn color="danger darken-1" @click="clear"> Borrar</v-btn>
      </div>
      <a href="home">
        <v-btn class="ma-2" color="blue darken-1" dark>
          <v-icon dark left> mdi-arrow-left </v-icon>Back
        </v-btn>
      </a>

      <v-file-input
        v-model="ruta"
        accept="image/*"
        label="File input"
      ></v-file-input>
      <button @click="cargar()">guardar F</button>
    </form>
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
      Codigo: { required, maxLength: maxLength(15) },
      Ciudad: { required, maxLength: maxLength(10) },
      // select: { required },
      
    
    },

    data: () => 
    ({
      Nombre: '',
      Asunto:'',
      Cedula:'',
      Ciudad:'',
      Codigo:'',
      ruta:'',
      // Select: null,
      // items: [
      //   {Codigo:'01',Nombre:'secretaria general'},
      //   {Codigo:'02',Nombre:'secretaria de gobierno'},
      //   {Codigo:'02',Nombre:'secretariade aseo'},
      //   ],
      
       bd: 0,
      visitas: [], 
      dependencias:[]
    }),
    
    computed: {
      // selectErrors () {
      //   const errors = []
      //   if (!this.$v.select) return errors
      //   !this.$v.select.required && errors.push('Ciudad es requerido')
      //   return errors
      // },
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
      // this.selectDependencia();
      
    },

    methods: {

      // cargar(){
      //  if (this.bd == 0){
      //     console.log('Guardando', this.bd);
      //     let header = { headers: {'token': this.$store.state.token}}
      //   //   const me = this;
      //     axios
      //     .post()

      // console.log(this.ruta);
      
      // },

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
              CodigoDependencia:this.Codigo,
              // Select: this.items.Select,
            },
            header
          )
        
      } 
    },
      cargar () {
       if (this.bd == 0){
          console.log('Guardando', this.bd);
          let header = { headers: {'token': this.$store.state.token}}
        //   const me = this;
          axios
          .post(`foto `,{

          },
          header
          )

        console.log(this.ruta);
       }
      },





        // selectDependencia(){
        //   let me = this;
        //   let DependenciasArray = [];
        //   let header = { headers: { "token": this.$store.state.token } };
        //   axios
        //     .get("dependencias", header)
        //     .then(function (response) {
        //       DependenciasArray = response.data.dependencias;
        //       DependenciasArray.map(function (x) {
        //         me.dependencias.push({ text: x.Codigo, value: x._id });
        //       });
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        //   },

      clear () {
        this.$v.$reset()
        this.Nombre = ''
        this.Asunto = ''
        this.Cedula=''
        this.Ciudad=''
        this.Codigo=''
        // this.select = null
   
      }
    },
  }
  
</script>