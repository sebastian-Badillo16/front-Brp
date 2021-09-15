
<template>
<div>
  <v-data-table
    :headers="headers"
    :items="registro"
    :sort-by="['calories', 'fat']"
    :sort-desc="[false, true]"
    multi-sort
    class="elevation-1"
  >
  <template v-slot:[`Item.Opciones`]="{ Item }">
        <v-icon small class="mr-2" @click="dialogDelete(Item)"> mdi-delete </v-icon>  
      </template>
  
  </v-data-table>
  <a href="home">
   <v-btn
        class="ma-2"
        color="blue darken-1"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn> 
      </a>
      <!-- <a href="Home"><button type="button">Inicio</button></a> -->
 </div>
</template>


<script>    
import axios from 'axios'
  export default {
    data () {
      return {
      bd: 0,
      registro: [],

        headers: [
          {
            text: "Nombre",
            align: 'start',
            sortable: false,
            value: "Nombre",
          },
          { text: "Cedula", value: "Cedula" },
          { text: "Ciudad", value: "Ciudad" },
          { text: "Opciones", value: "Opciones", sortable: false },

        ],
        
      }
    },

    

    created() {
    this.listarRegistro();
    },



  methods: {
    listarRegistro(){
      let header = {headers:{"token":this.$store.state.token}}
      axios.get('registro', header)
      .then(response => {
        this.registro = response.data.registro;
        console.log(this.registro);
      })
      .catch(error => {
        console.log(error.response)
      });
    },
    deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  },

  }
  
</script>