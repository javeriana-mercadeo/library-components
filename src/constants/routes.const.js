// Función recursiva para concatenar las rutas
const buildFullRoutes = (routes, parentUrl = '') => {
  const result = {}

  for (const key in routes) {
    const currentRoute = routes[key]

    // Si tiene `url`, concatenamos con el parentUrl
    const fullUrl = parentUrl + (currentRoute.url.startsWith('/') ? currentRoute.url : `/${currentRoute.url}`)

    // Dividimos la URL en un array
    let urlParts = fullUrl.split('/').filter(Boolean) // filter(Boolean) para eliminar elementos vacíos

    // Si encontramos 'administrador', lo movemos al inicio
    if (urlParts.includes('administrador')) {
      urlParts = ['administrador', ...urlParts.filter(part => part !== 'administrador')]
    }

    // Reconstruimos la URL
    const modifiedUrl = `/${urlParts.join('/')}`

    result[key] = {
      ...currentRoute,
      url: modifiedUrl
    }

    // Si tiene más subrutas, llamamos a la función recursivamente
    for (const subKey in currentRoute) {
      if (typeof currentRoute[subKey] === 'object' && currentRoute[subKey].url) {
        result[key][subKey] = buildFullRoutes({ [subKey]: currentRoute[subKey] }, modifiedUrl)[subKey]
      }
    }
  }
  return result
}

// Exportar las rutas de la aplicación
export const ROUTES = {
  home: {
    url: '/',
    text: 'Inicio',

    admin: {
      url: 'administrador',
      text: 'Administración de inicio'
    }
  },

  agreement: {
    url: 'convenios',
    text: 'Convenios',

    admin: {
      url: 'administrador',
      text: 'Administración de convenios',

      create: {
        url: 'crear',
        text: 'Crear convenio'
      },
      update: {
        url: 'actualizar',
        text: 'Modificar convenio'
      },
      content: {
        url: 'contenido',
        text: 'Modificar contenido'
      }
    }
  },

  undergraduate: {
    url: 'actividades-pregrado',
    text: 'Pregrado',

    admin: {
      url: 'administrador',
      text: 'Administración de pregrado',

      content: {
        url: 'contenido',
        text: 'Modificar contenido'
      }
    }
  },

  postgraduate: {
    url: 'actividades-posgrado',
    text: 'Posgrado',

    admin: {
      url: 'administrador',
      text: 'Administración de posgrado',

      content: {
        url: 'contenido',
        text: 'Modificar contenido'
      }
    }
  },

  event: {
    url: 'evento',
    text: 'Actividades',

    admin: {
      url: 'administrador',
      text: 'Administración de eventos',

      create: {
        url: 'crear',
        text: 'Crear evento'
      },
      update: {
        url: 'actualizar',
        text: 'Modificar evento'
      }
    }
  },

  user: {
    url: 'usuario',
    text: 'Usuarios',

    login: {
      url: 'inicio',
      text: 'Inicio de sesión'
    },

    admin: {
      url: 'administrador',
      text: 'Administración de usuarios',

      register: {
        url: 'registro',
        text: 'Registro de usuario'
      }
    }
  }
}

// Crear las rutas con las URLs concatenadas
export const FULL_ROUTES = buildFullRoutes(ROUTES)
