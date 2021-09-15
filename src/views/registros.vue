<template>
  <form>
    <!-- <cabezera /> -->
    <div id="espacio" class="container-center">
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
        :error-messages="itemErrors"
        :counter="10"
        label="Cedula"
        required
        @input="$v.Cedula"
        @blur="$v.Cedula.$touch()"
      ></v-text-field>
      
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Ciudad-Dirección"
        required
        @change="$v.select"
        @blur="$v.select.$touch()"
      ></v-select>
      
      <!-- <v-file-input
        accept="image/*"
        label="File input"
      ></v-file-input> -->

      <v-btn class="mr-4"  @click="submit"> Guardar </v-btn>
      <v-btn @click="clear"> Borrar</v-btn>
    </div>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

  export default {


    mixins: [validationMixin],

    validations: {
      Nombre: { required, maxLength: maxLength(10) },
      select: { required },
      select1: { required },
    },

    data: () => 
    ({
      Nombre: '',
      Cedula: '',
      Ciudad:'',
      Select: null,
      items: [
        'Buenavista',
        'La Floresta',
        'La Playa',
        'Marsella Campestre I',
        'Marsella Campestre II',
        'Porto Velho',
        'Torres del Castillo',
        'Carlos Martínez Silva',
         'Centro, Cristo Resucitado', 
         'El Vergel',
          'Fátima',
           'Guanentá',
            'La Esperanza', 
            'La Gruta',
             'La Victoria',
              'Los Cedros', 
              'Los Libertadores',
               'María Auxiliadora', 
               'Pablo Sexto',
               'Ragonessi',
                'Rojas Pinilla', 
                'San Antonio', 
                'San Carlos', 
                'San Juan de Dios', 
                'Villa Carola',
                'Bella Isla I',
                'Bella Isla II', 
                'Bella Isla Reservado', 
                'Ciudadela Bellavista',
                'El Poblado', 
                'Palmeras I', 
                'Palmeras II', 
                'Jardines del bella Isla',
                'Alameda Real',
                'Carlos Martínez Reyes', 
                'Ciudad Blanca I',
                'Ciudad Blanca II',
                'Ciudad Jardín', 
                'Ciudadela del Fonce I',
                'Ciudadela del Fonce II',
                'Luis Carlos Galán', 
                'Niño Jesús',
                'Oscar Martínez Salazar',
                'Pedro Fermín de Vargas I', 
                'Pedro Fermín de Vargas II', 
                'Samuel Martínez Reyes', 
                'Villas de Mochuelo I',
               ' Villas de Mochuelo II',
                'Ciudad Futuro I',
               'Ciudad Futuro II',
                'Ciudad Futuro III',
               'El Bosque Villas del Fonce I',
                'Villas del Fonce II',
                'Villa Laura',
                'Lorenzo Alcantuz', 
                'Porvenir I', 
                'Porvenir II', 
                'San Martín', 
                'Villa del Rosario',
              
     ],
      
       bd: 0,
      Registros: [], 
    }),
    
    

    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Ciudad es requerido')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.Nombre.$dirty) return errors
        // !this.$v.Nombre.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.Nombre.required && errors.push('Nombre es requerido.')
        return errors
      },
      itemErrors () {
        const errors = []
        if (!this.$v.Cedula) return errors
        !this.$v.Cedula.maxLength && errors.push('Cedula must be at most 10 characters long')
        !this.$v.Cedula.required && errors.push('Cedula es requerido.')
        return errors
      },
    //   emailErrors () {
    //     const errors = []
    //     if (!this.$v.Email.$dirty) return errors
    //     !this.$v.Email.email && errors.push('Must be valid e-mail')
    //     !this.$v.Email.required && errors.push('E-mail is required')
    //     return errors
    //   },
    },

    methods: {
      submit () {
      if (this.bd == 0){
          console.log('Guardando', this.bd);
          let header = { headers: {'token': this.$store.state.token}}
        //   const me = this;
          axios
          .post(
            `registro `,
            {
              Nombre: this.Nombre,
              Cedula: this.Cedula,
            //   Ciudad: this.editedItem.Email,
              Select: this.items.Select,
            },
            header
          )
        //   .then ((response) => {
        //     console.log(response);
        //     me.listarUsuarios();
        //     this.limpiarCajas();
        //   })
        //   .catch((error) => {
        //     console.log (error.response);
        //   });
      } 
    },
      clear () {
        this.$v.$reset()
        this.Nombre = ''
        this.Cedula = ''
        this.Direccion=''
        this.Dependencia=''
        this.select = null
        this.select = null
        this.select1 = null

        // this.checkbox = false
      },
    },
  }
</script>