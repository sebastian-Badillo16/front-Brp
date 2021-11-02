<template>
<div class="container_login">
  <div class="login">
    <div class="login_up">
      <h1><strong>Login</strong></h1>
    </div>
    <div class="login_center">
      <div class="row-12">
        <img src="../assets/user.png">
        <!--Estado input-->
        <input id="input_invalido" v-if="valid == false" type="email" v-model="Email">
        <input id="input_valido" v-else-if="valid == true" type="email" v-model="Email">
      </div>
      <label> Insertar correo</label>
      <div class="row-12">
        <img src="../assets/cadado.png">
        <!--Estado input-->
        <input id="input_invalido" v-if="valid == false" type="password" v-model="Password" >
        <input id="input_valido" v-else-if="valid == true" type="password" v-model="Password" >
      </div>
      <label>Insertar clave</label>
    </div>
    <!-- Validacion con botones -->
    <div class="login_buttom">
      <input id="buttom_red" v-if="Password.length == 0 || Email.length == 0" type="button" v-on:click="log()" value="Enviar">
      <input id="buttom_green" v-else type="button" v-on:click="login()"  value="Enviar">
    </div>  
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
  export default {
    
    data: () => ({
      valid: true,
      Password: '',
      Email: '',
    }),


methods: {
  //Esta funcion muestra en pantalla que necesita agregar caracteres
  //al formulario del login 
  log(){
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Correo o contraseña estan vacios',
    })
  },

  //Al haber error en el ingreso, los input se podran rojos por unos segundos
  loginInvalido(){
    this.valid = false
  },

login() {
            axios.post("usuario/login", {Email:this.Email, Password:this.Password})
            .then(response => { 

            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch('setRol', response.data.usuario.Rol);
            this.$store.dispatch('setNombre', response.data.usuario.Nombre);
            // this.$store.dispatch('setId', response.data.usuario._id);


            console.log('Probando token', this.$store.state.token);
            // console.log('Probando nombre', this.$store.state.Nombre);
            console.log('Probando rol', this.$store.state.Rol);

            this.$router.push("/home");
            console.log(response);

            //Local
            this.valid = true

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

            this.loginInvalido()
           
      })
    },
  }
};

</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container_login{
  /*ocupacion de pantalla*/
  width: 100hv;
  margin-top: 10%;
}

.login{
  /*Establecer limites de ancho*/
  max-width: 600px;
  min-width: 300px;

  /*Centrar el login*/
  margin: auto;
  /*Centrar elementos internos*/
  align-items: center;
  /*medida del login*/
  width: 50%;
  /*Fondo*/
    background:
    linear-gradient(
    rgba(35,43,85,0.75),
    rgba(35,43,85,0.95));

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

.login div{
  padding-top: 10%;
}

.login_up{
  color: white;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.login_center{
  /*Hacer que cada elemente este dabajo del otro*/
  display: flex;
  flex-direction: column;
  /*Centrar elementos internos*/
  align-items: center;
}

.login_center img{
  /*Medida de las imagenes*/
  width: 8.5%;
  padding: 0.8%;
}

#input_valido{
  /*Medidas de los input*/
  width: 70%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1%;
  border-radius: 5px;
  color: azure;

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

#input_invalido{
  /*Medidas de los input*/
  width: 70%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1%;
  border-radius: 5px;
  border: 5px block red;
  color: rgb(199, 46, 25);

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

.login_center label{
  color: azure;
  padding-bottom: 20px;
}

/*Boton valido*/
#buttom_green{
  background-color: green;
  padding: 1%;
  color: white;
  border-radius: 15px; 
  margin-bottom: 5px;
  width: 20%;
  min-width: 100px;
  font-size: 20px;

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

#buttom_green:hover{
  background-color: rgb(93, 209, 27);
  padding: 1%;
  color: white;
  border-radius: 15px; 
  margin-bottom: 5px;
  width: 20%;
  min-width: 100px;
  font-size: 20px;

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

/*Boton no valido*/
#buttom_red{
  background-color: red;
  padding: 1%;
  color: white;
  border-radius: 15px; 
  margin-bottom: 5px;
  width: 20%;
  min-width: 100px;
  font-size: 20px;

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

#buttom_red:hover{
  background-color: rgb(158, 16, 16);
  padding: 1%;
  color: white;
  border-radius: 15px; 
  margin-bottom: 5px;
  width: 20%;
  min-width: 100px;
  font-size: 20px;

  /*Sombras*/
  box-shadow: 5px 2.5px 2.5px rgba(63, 63, 63, 0.445);
}

#papelera{
  width: 5%;
  min-width: 25px;
  border-radius: 50px;
  height: auto;
  background-color: white;
}

</style> 