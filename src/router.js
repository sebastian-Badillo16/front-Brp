import login from './views/login'
import home from './views/home'
import dependencias  from './views/dependencias'
import usuarios  from './views/usuarios'
import registros from './views/registros'
import verRegistros from './views/verRegistros'
import visitas from './views/visitas'
import verVisitas from './views/verVisitas'
import graficas from './views/graficas'

export const routes = [
    {
      path: "/home",
      name: 'home',
      component: home
    },
    {
      path: "/",
      name: 'login',
      component: login
    },

    {
      path: "/dependencias",
      name: 'dependencias',
      component: dependencias
    }, 

    {
      path: '/usuarios',
      name: 'usuarios',
      component: usuarios
    },
    {
      path: '/Registros',
      name: 'registros',
      component: registros
    },
    {
      path: '/verRegistros',
      name: 'verregistros',
      component: verRegistros
    },
    {
      path: '/visitas',
      name: 'visitas',
      component: visitas
    },
    {
      path: '/verVisitas',
      name: 'verVisitas',
      component: verVisitas
    },
    {
      path: '/graficos',
      name: 'grficas',
      component: graficas
    }
]
