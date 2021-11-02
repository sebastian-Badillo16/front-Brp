<template>
  <div class="ma-23 pa-13" id="fondo_background">
    <v-card id="cabezera_background">
      <v-navigation-drawer id='navigation' permanent expand-on-hover>
        <v-list>
          <v-list-item class="px-100">
            
            <img id="imagen" src="../assets/sangil2.png" />

          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> </v-list-item-title>
              <v-list-item-subtitle>
                <ul>
                  <li>
                    <a> <strong> Usuario: {{ Nombre }} </strong></a>
                  </li>
                  <li>
                    <a> <strong> Rol: {{ Rol }} </strong> </a>
                  </li>
                  <li>
                    <a
                      ><router-link :to="{ name: 'login' }">
                        <v-btn icon>
                          <v-icon>mdi-export</v-icon>
                        </v-btn>
                      </router-link></a
                    >
                  </li>
                </ul>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item link @click="usuarios()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-badge-account-horizontal</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <strong> Usuarios </strong> </v-list-item-title>
          </v-list-item>

          <v-list-item link @click="Visitas()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <strong> Registrar Visitas </strong> </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="verVisitas()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <strong> Ver Visitas </strong> </v-list-item-title>
          </v-list-item>

          <v-list-item link @click="Dependencias()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-animation</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <strong> Dependencias </strong> </v-list-item-title>
          </v-list-item>

          <!-- <v-list-item link @click="Graficas()" value="enviar">
            <v-list-item-icon>
               <v-icon>mdi-animation</v-icon> -->
            <!-- </v-list-item-icon>
            <v-list-item-title> <strong> Graficas </strong> </v-list-item-title>
          </v-list-item> --> 

        </v-list>
        
      </v-navigation-drawer>
      <!-- <img id="imagen" src="../assets/sangil2.png" /> -->
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
// import { mdi } from '@mdi/js';

export default {
  data() {
    return {
      Nombre: this.$store.state.Nombre,
      Rol: this.$store.state.Rol,
    };
  },

  methods: {
    Visitas() {
      if (this.Rol == "ADMIN_ROL" || this.Rol == "REGISTRADOR_ROL") {
        console.log("Funcionando con permisos");

        this.$router.push("/visitas");
      } else {
        console.log("Funcionando sin permisos");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posee los permisos para ir a esta ventana",
        });
      }
    },

    Dependencias() {
      if (this.Rol == "ADMIN_ROL" || this.Rol == "REGISTRADOR_ROL") {
        console.log("Funcionando con permisos");

        this.$router.push("/dependencias");
      } else {
        console.log("Funcionando sin permisos");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posee los permisos para ir a esta ventana",
        });
      }
    },
    Graficas() {
      if (this.Rol == "ADMIN_ROL" || this.Rol == "REGISTRADOR_ROL") {
        console.log("Funcionando con permisos");

        this.$router.push("/graficas");
      } else {
        console.log("Funcionando sin permisos");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posee los permisos para ir a esta ventana",
        });
      }
    },



    usuarios() {
      if (this.Rol == "ADMIN_ROL") {
        console.log("Funcionando con permisos");

        this.$router.push("/usuarios");
      } else {
        console.log("Funcionando sin permisos");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posee los permisos para ir a esta ventana",
        });
      }
    },
    verVisitas() {
      if (this.Rol == "ADMIN_ROL"|| this.Rol == "REGISTRADOR_ROL") {
        console.log("Funcionando con permisos");

        this.$router.push("/verVisitas"); 
      } else {
        console.log("Funcionando sin permisos");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posee los permisos para ir a esta ventana",
        });
      }
    }
  },
};
</script>

<style scope>
* {
  padding: 50px;
  margin: 200px;
  border-radius: 5px;
}

#headers {
  margin: auto;
  width: max-content;
  /*background-color: #dc9fff;*/
  text-align: center;
  display: block;
  color: #fff;
  max-width: 1000px;
}

ul,
ol {
  list-style: none;
}

.nav li a {
  background: #e01638;
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 20px 20px;
  display: block;
}

.nav li a:hover {
  background-color: #080691;
}

.nav li ul {
  display: none;
  position: absolute;
  min-width: 300px;
}

.nav > li {
  float: left;
}

.nav li:hover > ul {
  display: block;
}

a {
  text-align: center;
}

#imagen {
  width: 120px;
  height: auto;
}
/*Color al navigation drawer*/
#navigation{
  background:
  linear-gradient(
  rgba(160, 175, 245, 0.75),
  rgba(87, 99, 163, 0.95));
    /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);

  /*Centrar el navegador*/
  padding-top: 50px;
  padding-bottom: 90px;
}

#navigation :hover{
  color: #fff;
}

#cabezera_background{
  background:
  linear-gradient(
  rgba(35,43,85,0.75),
  rgba(35,43,85,0.95));
}

#fondo_background{
  background:
  linear-gradient(
  rgba(207, 226, 199, 0.75),  
  rgb(124, 160, 107));
}
</style>