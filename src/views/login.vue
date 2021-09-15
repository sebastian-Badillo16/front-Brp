
<template >
<!-- <img id="sangil" src="../assets/sangil.jpg"> -->
<div >

 <div class="container" >

  
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="Email"
      :rules="EmailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="Password"
      :counter="10"
      :rules="PasswordRules"
      label="Password"
      required
    ></v-text-field>

    <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Terminos & Condiciones?"
      required
    ></v-checkbox>

    <v-btn
    v-on:click="login()"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Entrar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
     Limpiar
    </v-btn>

    <!-- <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn> -->
  </v-form>
  </div>
  <!-- </div> -->
</div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
  export default {
    
    data: () => ({
      valid: true,
     Password: '',
      PasswordRules: [
        v => !!v || 'Password  es requirido',
        v => (v && v.length <= 8) || 'Minimo 8 Caracteres ',
      ],
      Email: '',
      EmailRules: [
        v => !!v || 'E-mail es Requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
      ],
      
      checkbox: false,
    }),


methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    //   resetValidation () {
    //     this.$refs.form.resetValidation()
    //   },
login() {
            axios.post("usuario/login", {Email:this.Email, Password:this.Password})
            .then(response => { 

            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch('setRol', response.data.usuario.Rol);
            this.$store.dispatch('setNombre', response.data.usuario.Nombre);

            console.log('Probando token', this.$store.state.token);
            // console.log('Probando nombre', this.$store.state.Nombre);
            console.log('Probando rol', this.$store.state.Rol);

            this.$router.push("/home");
            console.log(response);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ingresado con exito!',
              showConfirmButton: false,
              timer: 1500
            });
            })
      .catch((error) =>{
            console.log(error.response);

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error con el correo o contraseña ',
            })
           
      })
    },
    errores() {
    
    Swal.fire({
      icon: 'question',
      text: 'Correo o contraseña no tiene caracteres',
    })    

    }
  }





};

</script>


<style scoped>

*{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
}

.container{
    width: 500px;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    background-image: linear-gradient(-225deg, #c0b6f8 50%, #8783b1 50%);
 
}


.cuerpo{
    border-top: 60px;
    border-bottom: 60px

}

#correo{
    background:#ffffff;
    border: rgba(255, 255, 255, 0) 1px solid;
    border-bottom: #ccc 6px solid;
    padding: 8px;
    width:210px;
    color:#ff0f0f;
    margin-top:10px;
    font-size:1em;
    border-radius:4px;
}

#clave{
    background:#ffffff;
    border: rgba(255, 255, 255, 0) 3px solid;
    border-bottom: #ccc 2px solid;
    padding: 10px;
    width:210px;
    color:#5d5d5d;
    margin-top:10px;
    font-size:1em;
    border-radius:5px;
}

#boton {
    margin-left:0px;
    margin-top: 20px;
    width: 50%;
    top: 100%;
    border-radius: 25px;
    padding-top:5px;
    padding-bottom:5px;
    background:#2ecc71;
    color:white;
    border-radius:4px;
    border-style: none;
}

#botonRed {
    margin-left:0px;
    margin-top: 10px;
    width: 50%;
    top: 100%;
    border-radius: 25px;
    padding-top:10px;
    padding-bottom:5px;
    background:#ac0707;
    color:white;
    border-radius:4px;
    border-style: none;
}


</style> 