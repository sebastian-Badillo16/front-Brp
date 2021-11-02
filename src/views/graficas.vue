<template>
  <div id="container" style="height: 600px">
    <h1>hola visitas</h1>
  </div>
</template>
<script>

import Highcharts from "highcharts";
import axios from "axios";
export default {

    data(){
        return{
            visitas:[],
            
        }
    },
  created() {
    this.graficar();
  },
  methods: {
    async graficar() {

    let me = this;
      let visitas = [];
      let header = { headers: { "token": this.$store.state.token } };
       await axios
        .get("visitas", header)
        .then(function (response) {
          visitas = response.data.visitas;
          visitas.map(function (x) {
            me.visitas.push(x.nombre);
            me.visitas.push(x.cedula);
            // me.visitas.push(x.nombre);
            // me.stock.push(x.stock) 
          
          });       
        })
        let datosY = me.datos
        // let datosX = me.stock
        console.log(datosY);
        // console.log(datosX);
      /* eslint-disable no-unused-vars */
      var ctx = document.getElementById("myChart");
      Highcharts.chart("container", {
        chart: {
          type: "pie",
        },
        title: {
          text: "visitas",
        },
        xAxis: {
          visita:datosY
          }
        ,
        yAxis: {
          title: {
            text: "Cantidad de articulos",
          },
        },
        series: [{
            // data:datosX
        }]
      });
    },
  },
};
</script>

<style>
  
</style>