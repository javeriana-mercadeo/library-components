// Función de llamada a la API
async function callApi(API) {
  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: '', visibilidad: 'yes', tipoPrograma: '', areas: '', facultad: '' })
    })
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

// Función para buscar un programa específico
function findProgramByCode(data, code) {
  return data.find(item => item.codigo === code)
}

// Función para compilar programas en un Set sin duplicados
function compilePrograms(...programLists) {
  const programSet = new Set()
  programLists.flat().forEach(program => programSet.add(JSON.stringify(program)))
  return Array.from(programSet).map(program => JSON.parse(program))
}

// Evento de carga del DOM
document.addEventListener('DOMContentLoaded', async () => {
  // document.addEventListener("dataRendered", async () => {
  // Código del programa a buscar
  const COD_PROGRAM = codPrograma
  // const COD_PROGRAM = "ARQUI";

  // const API_PROGRAMS = '/prg-api/searchpuj/general-search-program';
  // const API_PROGRAMS = "./data_programs.json";
  const API_PROGRAMS = 'https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program'
  const dataPrograms = await callApi(API_PROGRAMS)

  // Buscar programa por código
  let program = findProgramByCode(dataPrograms, COD_PROGRAM)

  if (program) {
    const { areas, facultad, tipoPrograma } = program
    let faculty = Array.isArray(facultad) ? facultad[0] : facultad

    // Filtración por nivel académico
    const programsByLevel = dataPrograms.filter(program => program.tipoPrograma === tipoPrograma)

    // Filtración por facultad
    const programsByFaculty = programsByLevel.filter(program => {
      const programFaculty = Array.isArray(program.facultad) ? program.facultad[0] : program.facultad
      return programFaculty == faculty
    })

    // Filtración por área
    const programByArea = dataPrograms.filter(program => program.areas.some(area => areas.includes(area)))

    // Compilación de todos los programas en un Set para evitar duplicados
    let compiledPrograms = compilePrograms(programsByFaculty, programByArea)

    // Filtrar el programa ya existente en `program`
    compiledPrograms = compiledPrograms.filter(item => item.codigo !== program.codigo)

    // filtración por visibilidad
    compiledPrograms = compiledPrograms.filter(program => program.visibilidad === 'yes')

    compiledPrograms = compiledPrograms.slice(0, 6)

    console.log('Programas compilados sin duplicados y sin el programa encontrado:', compiledPrograms)

    // Creación de cards de programas
    const relatedPrograms = document.getElementById('relatedPrograms')

    compiledPrograms.forEach(program => {
      const newStart = 'https://www.javeriana.edu.co/recursosdb/'
      let urlImage = program.urlImagenPrograma

      // Verifica si la URL comienza con 'documents/'
      if (program.urlImagenPrograma.startsWith('documents/')) {
        // Reemplaza 'documents/' por el nuevo inicio
        urlImage = program.urlImagenPrograma.replace('documents/', newStart)
      } else if (program.urlImagenPrograma.startsWith('/documents/')) {
        // Reemplaza '/documents/' por el nuevo inicio
        urlImage = program.urlImagenPrograma.replace('/documents/', newStart)
      }

      const card = document.createElement('div')
      card.classList.add('swiper-slide')

      card.innerHTML = `
                        <div class="program-card"> 
                            <div class="program-card__container-img">
                                <img src="${urlImage}" alt="Imagen de fondo">
                            </div>
                            <div class="program-card__overlay"></div>
                            <div class="program-card__content">
                                <div class="program-card__header">
                                    <h3 class="program-card__title">${program.nombre}</h3>
                                    <h4 class="program-card__info">${faculty}</h4>
                                    <h4 class="program-card__info modality">${program.modalidad}</h4>
                                </div>
                                <a
                                    href="${program.urlPrograma}"
                                    class="btn btn-outline program-card__button"
                                    data-senna-off
                                >
                                    Visitar programa
                                </a>
                            </div>
                        </div>
                        `

      relatedPrograms.appendChild(card)
    })
  } else {
    console.log('Programa no encontrado en los datos.')
  }
})
