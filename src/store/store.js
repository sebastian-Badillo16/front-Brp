import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store ({

    state: {
        token: 'hola mundo',
        Rol: 'que rol tiene',
        Nombre: 'nombre persona'
    
    },
    mutations: {
        setToken (state,value){
            state.token = value;
        },

        setRol (state, value) {
            state.Rol = value
        },

        setNombre (state,value){
            state.Nombre = value;
        }
    },
    actions: { 
        setToken (context, value){
            context.commit ("setToken", value)
        },

        setRol (context, value) {
            context.commit ('setRol', value)
        },

        setNombre (context,value){
            context.commit ("setNombre", value)
        }
     }


})
