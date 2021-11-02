<template>
  <div id="cabezera_background">
    <!-- <cabezera /> -->
    <div id="espacio">
    <v-data-table
      :headers="encabezados"
      :items="dependencias"
      
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> </v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar  Dependencia
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Dependencias</span>
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
                        v-model="editedItem.Descripcion"
                        label="Descripcion"
                        v-if="bd == 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Codigo"
                        label="Codigo"
                        v-if="bd == 0"
                      ></v-text-field>
                    </v-col>
                    

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeCancel">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="guardar()">
                  guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <!-- <v-card-title class="text-h5"
              >¿Está seguro de que quiere eliminar este elemento?</v-card-title> -->
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete()">Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="borrar">borrar</v-btn
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

    </v-data-table>
    <a href="home">
   <v-btn
        class="ma-2"
        color="blue darken-1"
        dark
      >
        <v-icon
          blue
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn> 
      </a>
   </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {


  data() {
    return {
      bd: 0,
      dependencias: [],

      encabezados: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "Nombre",
        },
        { text: "Codigo", value: "Codigo" },
        { text: "Descripcion", value: "Descripcion" },
        { text: "Estado", value: "Estado" },
        { text: "Opciones", value: "Opciones", sortable: false },
      ],
      editedItem: {
        Nombre: '',
        Estado: 0,
        Descripcion:'',
        Codigo:'',
      },
    };
  },

  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? "New Item" : "Edit Item";
  //   },
  // },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete();
  //   },
  // },

  created() {
    // this.initialize();
    this.listardependencias();
  },

  methods: {
    ejecuta(){
        window.location.href = '/'
        console.log(this.ejecuta)
     },
    listardependencias(){
      let header = {headers:{"token":this.$store.state.token}}
      axios.get('Dependencias', header)
      .then(response => {
        this.dependencias = response.data.dependencias;
        // console.log(this.dependencias);
      })
      .catch(error => {
        console.log(error.response)
        alert('alert no seccion', this.ejecuta())

        // alert("no ha iniciado seccion")
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
              `Dependencias/desactivar/${id}`,
              {
                Estado: 0
              },
              header              
            )

            .then(function () {
              me.listardependencias();

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
              `Dependencias/activar/${id}`,
              {
                Estado: 1
              },
              header              
            )
            .then(function () {
              
              me.listardependencias();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      this.dialog = true;
    },

    limpiarCajas(){
      this.editedItem.Nombre = '';
      this.editedItem.Estado= 0;
      this.editedItem.Descripcion='',
      this.editedItem.Codigo=''
   
    },

     guardar () {
      if (this.bd == 0){
          console.log('Guardando', this.bd);
          let header = { headers: {'token': this.$store.state.token}}
          const me = this;
          axios
          .post(
            `Dependencias`,
            {
              Nombre: this.editedItem.Nombre,           
              Estado:this.editedItem.Estado,
              Descripcion:this.editedItem.Descripcion,
              Codigo:this.editedItem.Codigo,
            },
            header
          )
          .then ((response) => {
            // alert(_id) 
            console.log(response);
            me.listardependencias();
            this.limpiarCajas();
          })
          .catch((error) => {
            console.log (error.response);
          });
          this.close()
      }
    },

     borrar(Item){
      let id = (Item._id);
      console.log(Item)
      console.log(id);
      let header = {headers:{"token":this.$store.state.token}}
      let me = this;
      axios.delete(
        `Dependencias/${id}`,header)
      .then(response => {
        this.dependencias = response.data.dependencias;
        console.log(this.dependencias);
        me.listardependencias();
                                      

      })
      .catch(error => {
        console.log(error.response)
        alert("404")
      });
      // listardependencias()
    },

    // editar(Item){
    //   console.log(Item);
    //   this.bd = 1;
    //   this.id = Item._id;
    //   this.editedItem.Nombre = Item.Nombre;
    //   this.editedItem.Descripcion = Item.Descripcion;
    //   this.editedItem.Codigo = Item.Codigo;
    //   this.editedItem.Estado = Item.Estado
      
    // },
    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeCancel () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // deleteItem (item) {
      //   this.editedIndex = this.encabezados.indexOf(item)
      //   this.editedItem = Object.assign({}, item)
      //   this.dialogDelete = true
      // },



      // deleteItemConfirm () {
      //   this.encabezados.splice(this.editedIndex, 1)
      //   this.closeDelete()
      // },


      // closeDelete () {
      //   this.dialogDelete = false
      //   this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.encabezados)
      //     this.editedIndex = -1
      //   })
      // },
  },
}
</script>

<style scoped>

#espacio{
  padding: 50px;
}

#cabezera_background{
  background:
  linear-gradient(
  rgba(88, 91, 105, 0.75),
  rgba(84, 89, 110, 0.95));
  
 box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

</style>
