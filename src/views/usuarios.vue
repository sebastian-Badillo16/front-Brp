<template>
  <div class="container" >
  <!-- <div v-bind:style="{fontSize:'16',height:'50px',width:'50px',backgroundColor:'blue'}"> -->

    <!-- <cabezera /> -->
 
    <div id="espacio">
    <v-data-table
      :headers="encabezados"
      :items="usuarios"
      id="cabezera_background"
      
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios </v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success darken-1" dark class="mb-2" v-bind="attrs" v-on="on"  >
                New usuario
              </v-btn>
            </template>
            <v-card id="nuevo" >
              <v-card-title>
                <span class="headline">Usuarios</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Password"
                        label="Password"
                        v-if="bd == 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Email"
                        label="Email"
                        v-if="bd == 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-row align="center">
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.Rol"
                            :items="editedItem.Roles"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Role"
                            v-if="bd == 0"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="success darken-1" text @click="guardar">
                  guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Opciones`]="{ item }">
               <v-icon small @click="borrar(item)">mdi-delete</v-icon> 
        <template v-if='item.Estado'>
            <v-icon small @click="activarDesactivarMostrar (2, item)">
              mdi-block-helper
            </v-icon>
        </template>

        <template v-else>
            <v-icon small @click="activarDesactivarMostrar (1, item)">
              mdi-check
            </v-icon>
        </template>
      </template>


   <template> 
        <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
      </template>
    </v-data-table>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Cabezera from "../components/cabezera.vue";
export default {
 

  data() {
    return {
      bd: 0,
      usuarios: [],
      // visible:False,
      // visible:false,

      encabezados: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "Nombre",
        },
        { text: "Email", value: "Email" },
        { text: "Rol", value: "Rol" },
        { text: "Estado", value: "Estado" },
        { text: "Opciones", value: "Opciones", sortable: false },
      ],
      editedItem: {
        Nombre: '',
        Estado: 0,
        Email: '',
        Rol: '',
        Roles: ['ADMIN_ROL','REGISTRADOR_ROL'],
        Password: '',
        // Visible:false
      },
    };
  },

  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  

  created() {
    // this.initialize();
    this.listarusuarios();
  },

  methods: {
    listarusuarios(){
      let header = {headers:{"token":this.$store.state.token}}
      axios.get('usuario', header)
      .then(response => {
        this.usuarios = response.data.usuarios;
        console.log(this.usuarios);
      })
      .catch(error => {
        console.log(error.response)
      });
    },

    borrar(usuario){
     
      let id = usuario._id;
      console.log(id);
      let header = {headers:{"token":this.$store.state.token}}
      let me = this;
      axios.delete(
        `usuario/${id}`,header)
      .then(response => {
        console.log(response);
        this.usuario = response.data.usuario;
        console.log(this.usuario);
        me.listarusuarios();

      })
      .catch(error => {
        console.log(error.response)
        alert("404")
      });

    },

    activarDesactivarMostrar(accion, Item){
      console.log(Item);
      let id = Item._id;
      console.log('accion')
        if (accion == 2){
          console.log(id);
          let me = this;
          let header = { headers: { 'token': this.$store.state.token } };
          axios
            .put(
              `usuario/desactivar/${id}`,
              {
                Estado: 0
              },
              header              
            )

            .then(function () {
              me.listarusuarios();

            })
            .catch(function (error) {

              console.log(error);

            });
        } else if (accion == 1){
          console.log(id);
          let me = this;
          let header = { headers: { 'token': this.$store.state.token } };
          axios
            .put(
              `usuario/activar/${id}`,
              {
                Estado: 1
              },
              header              
            )
            .then(function () {
              
              me.listarusuarios();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      this.dialog = true;
    },

    limpiarCajas(){
      this.editedItem.Nombre = '';
      this.editedItem.Email = '';
      this.editedItem.Estado = 0;
      this.editedItem.Rol = '';
      this.editedItem.Password = ''
    },
     guardar () {
      if (this.bd == 0){
          console.log('Guardando', this.bd);
          let header = { headers: {'token': this.$store.state.token}}
          const me = this;
          axios
          .post(
            `usuario`,
            {
              Nombre: this.editedItem.Nombre,
              Rol: this.editedItem.Rol,
              Email: this.editedItem.Email,
              Password: this.editedItem.Password,
            },
            header
          )
          .then ((response) => {
            console.log(response);
            me.listarusuarios();
            this.limpiarCajas();
          })
          .catch((error) => {
            console.log (error.response);
          });
      // } else {
      //     console.log('Editando', this.bd);
      //     let header = { headers: {'token': this.$store.state.token}}
      //     const me = this;
      //     axios
      //       .put (
      //         `usuario/${this.id}`,
      //         {
      //           Nombre: this.editedItem.Nombre,
      //           Rol: this.editedItem.Rol
      //         },
      //           header
      //       )
      //       .then(function () {
      //         me.listarusuarios();
      //         me.limpiarCajas()
      //       })
      //       .catch(function (error) {
      //         console.log(error);
      //       })
      }
    },

    editar(Item){
      console.log(Item);
      this.bd = 1;
      this.id = Item._id;
      this.editedItem.Nombre = Item.nombre;
      this.editedItem.Email = Item.email;
      this.editedItem.Rol = Item.rol;
      this.editedItem.Password = Item.password;
      
    },
    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedItem = -1
        })
      },
      deleteItem (editedItem) {
        this.editedItem = this.encabezados.indexOf(editedItem)
        this.editedItem = Object.assign({}, editedItem)
        this.dialogDelete = true
      },
       deleteItemConfirm () {
        this.encabezados.splice(this.editedItem, 1)
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedItem = -1
        })
      },

  },
}
</script>

<style scoped>

#espacio{
  padding: 11px;


}

#cabezera_background{
  background:
  linear-gradient(
  rgba(100, 111, 165, 0.75),
  rgba(104, 118, 187, 0.95));
}
/* #nuevo{
  background:
  linear-gradient(
  rgba(12, 47, 226, 0.75),
  rgba(29, 45, 124, 0.95));
} */





</style>

