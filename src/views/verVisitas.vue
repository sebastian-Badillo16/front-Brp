<template>
  <div class="ex2">
    <!-- <canvas id="myChart"></canvas> -->
    <v-row>
      <v-column v-for="(visita, i) in visitas" :key="i" class="ma-16">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="visita.foto"
            height="200px"
          ></v-img>

          <v-card-title> {{ visita.Nombre }} </v-card-title>

          <v-card-subtitle> {{ visita.Cedula }} </v-card-subtitle>

          <v-card-subtitle> {{ visita.Ciudad}} </v-card-subtitle>

          <!-- <v-card-subtitle> {{ visita.Cedula }} </v-card-subtitle> -->
        </v-card>
      </v-column>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      /* datos:[],
      stock:[], */
      // categoriaArray: [],
      search: '',
      bd: 0,
      visitas: [],
    };
  },
  
  created() {
    this.listarVisitas();
    },

   methods: {
    listarVisitas(){
       let me = this;
      let header = {headers:{"token":this.$store.state.token}}
      axios.get('visitas', header)
      .then(function(response) {
        console.log(response);
        me.visitas = response.data.visitas;
        
      })
      .catch(error => {
        console.log(error.response)
      });
    },
    mounted() {
    
    this.listarVisitas()
  }

  }
   
  

//   methods: {
//     bucle() {
//       let me = this;
//       let header = { headers: { "x-token": this.$store.state.token } };
//       axios
//         .get("articulo", header)
//         .then(function (response) {
//           console.log(response);
//           me.categoriaArray = response.data.articulo;
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     },
//       },
// mounted() {
//     this.bucle();
// }
};
</script>