<template>
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer permanent expand-on-hover>
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-avatar color="primary" size="56" ></v-avatar>
              >
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> </v-list-item-title>
              <v-list-item-subtitle>
                <ul>
                  <li>
                    <a> Usuario: {{ Nombre }}</a>
                  </li>
                  <li>
                    <a>Rol: {{ Rol }} </a>
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
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="Visitas()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Registrar Visitas</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="verVisitas()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Ver Visitas</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="Dependencias()" value="enviar">
            <v-list-item-icon>
              <v-icon>mdi-animation</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dependencias</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="Graficas()" value="enviar">
            <v-list-item-icon>
              <!-- <v-icon>mdi-animation</v-icon> -->
            </v-list-item-icon>
            <v-list-item-title>Graficas</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <!-- <img id="imagen_cabezera" src="../assets/Escudo_San_Gil.png" /> -->
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

    // Registros() {
    //   if (this.Rol == "ADMIN_ROL" || this.Rol == "REGISTRADOR_ROL") {
    //     console.log("Funcionando con permisos");

    //     this.$router.push("/registros");
    //   } else {
    //     console.log("Funcionando sin permisos");

    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "No posee los permisos para ir a esta ventana",
    //     });
    //   }
    // },
    // VerRegistros() {
    //   if (this.Rol == "ADMIN_ROL" || this.Rol == "REGISTRADOR_ROL") {
    //     console.log("Funcionando con permisos");

    //     this.$router.push("/verRegistros");
    //   } else {
    //     console.log("Funcionando sin permisos");

    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "No posee los permisos para ir a esta ventana",
    //     });
    //   }
    // },

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
  padding: 0px;
  margin: 0px;
  border-radius: 6px;
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
  background: #167ee0;
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 5px 10px;
  display: block;
}

.nav li a:hover {
  background-color: #080691;
}

.nav li ul {
  display: none;
  position: absolute;
  min-width: 100px;
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
  width: 20px;
  height: auto;
}
</style>