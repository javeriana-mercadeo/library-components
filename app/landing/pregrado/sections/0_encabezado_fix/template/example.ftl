<script>
Liferay.on("allPortletsReady", function() {
  let boton1 = document.getElementById("boton_enviar1");
  let boton2 = document.getElementById("boton_enviar2");
  boton1.classList.remove("d-block");
  boton1.classList.add("d-none");
  boton2.classList.remove("d-none");
  boton2.classList.add("d-block");
});
//Captura del codigo SAE
//let codPrograma = "DSIND";
const {
  createApp
} = Vue;
const app = createApp({
  data() {
    return {
      programas: [],
      prefijoCel: [],
      // periodos: []
      ,
      ubicaciones: [],
      //periodoSel:[]
      ,
      formInValid: true,
      isSubmitting: false,
      data: {
        urlPrograma: "",
        first_name: "",
        last_name: "",
        tipo_doc: "",
        numero_doc: "",
        email: "",
        prefijoCel: "",
        mobile: "",
        pais: "",
        departamento: "",
        ciudad: "",
        programa: codPrograma,
        periodo_esperado: "",
        origen_sol: "Web to Lead",
        fuenteAutoriza: "Landing Programas",
        lead: "Landing Pages",
        company: "NA",
        fuente: "Javeriana",
        subfuente: "Organico",
        medio: "Landing",
        campana: "Mercadeo",
        autoriza: "",
      },
      errors: {
        urlPrograma: false,
        first_name: false,
        last_name: false,
        tipo_doc: false,
        numero_doc: false,
        email: false,
        prefijoCel: false,
        mobile: false,
        pais: false,
        departamento: false,
        ciudad: false,
        programa: false,
        periodo_esperado: false,
        origen_sol: false,
        fuenteAutoriza: false,
        lead: false,
        company: false,
        fuente: false,
        subfuente: false,
        medio: false,
        campana: false,
        autoriza: false,
      },
    };
  },
  watch: {
    "data.departamento": function(newVal, oldVal) {
      this.data.ciudad = "";
      this.errors.ciudad = false;
    },
    "data.first_name": function(newText, oldText) {
      this.data.first_name = this.limpiarTexto(newText);
    },
    "data.last_name": function(newText, oldText) {
      this.data.last_name = this.limpiarTexto(newText);
    },
    "data.mobile": function(newMobile, oldMobile) {
      this.data.mobile = this.limpiarNumeros(newMobile);
    },
    "data.email": function(newEmail, oldEmail) {
      const regex =
        /^(([^<>()[\]\\.,
      ;: \s @ "] +
        (\.[ ^ < > ()[\]\\., ;: \s @ "] +
        ) * ) | .(".+")) @((\[
      [0 - 9]
      {1,3}\.[0 - 9]
      {1,3}\.[0 - 9]
      {1,3}\.[0 - 9]
      {1,3}\
    ]) | (([a - zA - Z\ - 0 - 9] +
      \.) + [a - zA - Z] {2,})) $ / ;
    if (regex.test(newEmail) === false) {
      this.errors.email = true;
    } else {
      this.errors.email = false;
    }
  },
},
mounted() {
  // Recien carga el sitio se cargan los datos
  this.limpiarDatos();
  this.getUbicaciones();
  this.getProgramas(codPrograma);
  this.getParametersGet();
  this.getPrefijoCel();
},
methods: {
  /**
   * Funcion para limpiar la variable de los datos
   **/
  limpiarDatos() {
    this.data = {
      urlPrograma: "",
      first_name: "",
      last_name: "",
      tipo_doc: "",
      numero_doc: "",
      email: "",
      mobile: "",
      prefijoCel: "",
      pais: "",
      departamento: "",
      ciudad: "",
      programa: codPrograma,
      periodo_esperado: "",
      origen_sol: "Web to Lead",
      fuenteAutoriza: "Landing Programas",
      lead: "Landing Pages",
      company: "NA",
      fuente: "Javeriana",
      subfuente: "Organico",
      medio: "Landing",
      campana: "Mercadeo",
      autoriza: "",
    };
  },
  /**
   * Funcion para obtener los valores de los parametros que vienen por GET
   **/
  getParametersGet() {
    let urlParams = new URLSearchParams(window.location.search);
    this.data.fuente = urlParams.has("utm_source") ? urlParams.get("utm_source") : "Javeriana";
    this.data.subfuente = urlParams.has("utm_subsource") ? urlParams.get("utm_subsource") : "Organico";
    this.data.medio = urlParams.has("utm_medium") ? urlParams.get("utm_medium") : "Landing";
    this.data.campana = urlParams.has("utm_campaign") ? urlParams.get("utm_campaign") : "Mercadeo";
  },
  /**
   * Funcion para cargar los programas
   **/
  getProgramas(codPrograma) {
    //return axios.get('https://raw.githubusercontent.com/gesalas/feria/main/programas.json')
    return axios
      .get("https://www.javeriana.edu.co/recursosdb/1372208/10609114/programas.json")
      .then((response) => {
        const data = response.data;
        for (let facultadKey in data) {
          const facultad = data[facultadKey];
          for (let programaKey in facultad) {
            const programas = facultad[programaKey].Programas;
            for (let i = 0; i < programas.length; i++) {
              if (programas[i].Codigo === codPrograma) {
                this.data.urlPrograma = facultad[programaKey].url;
                return;
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  },
  //
  /**
   * Funcion para cargar los periodos
   **/
  /*getPeriodos() {
            axios.get('https://raw.githubusercontent.com/gesalas/feria/main/periodos.json')
                .then((response) => {
                    this.periodos = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },*/
  /**
   * Funcion para cargar las ubicaciones
   **/
  getUbicaciones() {
    axios
      .get("https://www.javeriana.edu.co/recursosdb/1372208/10609114/ubicaciones.json")
      //axios.get('https://raw.githubusercontent.com/gesalas/feria/main/ubicaciones.json')
      .then((response) => {
        this.ubicaciones = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  /**
   * Funcion para cargar los celulares
   **/
  getPrefijoCel() {
    axios
      .get("https://www.javeriana.edu.co/recursosdb/1372208/10609114/codigos_pais.json")
      //axios.get('https://raw.githubusercontent.com/gesalas/Piloto_registro_de_llamadas/main/Json/codigos_pais.json')
      .then((response) => {
        // Filtrar los datos para obtener solo los códigos de país y sus prefijos
        this.prefijoCel = response.data.map((pais) => {
          return {
            iso2: pais.iso2,
            phoneCode: pais.phoneCode,
            phoneName: pais.nameES,
          };
        });
      });
  },
  /**
   * Funcion para obtener las ciudades del departamento seleccionado
   **/
  getCiudades(departamento) {
    let departamentoSel = this.ubicaciones["COL"].departamentos.filter((res) => {
      return res.codigo == departamento;
    });
    return departamentoSel[0].ciudades;
  },
  /**
   * Funcion para validar si esta el campo de aceptar terminos
   **/
  validateAutoriza() {
    if (this.data.autoriza == "1") {
      this.errors.autoriza = false;
      this.formInValid = false;
    } else if (this.data.autoriza == "0") {
      this.errors.autoriza = true;
      this.formInValid = true;
    }
  },
  /**
   * Funcion para limpiar textos
   **/
  limpiarTexto(texto) {
    let textolimpio = texto.replace(/[^a-zA-Záéíóúñ ] /
      g, "");
    return textolimpio;
  },
  /**
   * Funcion para limpiar numeros
   **/
  limpiarNumeros(numero) {
    let textolimpio = numero.replace(/[^0-9 ] /
      g, "");
    return textolimpio;
  },
  /**
   * Funcion para limpiar json
   **/
  limpiarJson(texto) {
    return texto
      .replaceAll("|", "")
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/['"] +
        /g, "'")
        .trim();
      },
      /**
       * Funcion para limpiar alfanumericos
       **/
      limpiarAlfanumerico(text) {
        let textolimpio = text.replace(/[^a-zA-Z0-9- ] /
          g, "");
        return textolimpio;
      },
      /**
       * Funcion para validar que los campos tengan datos
       **/
      validateInputs() {
        let valid = true;
        let keys = Object.keys(this.data);
        keys.forEach((element) => {
            this.errors[element] = false;
            switch (element) {
              case "first_name":
              case "last_name":
              case "tipo_doc":
              case "numero_doc":
              case "urlPrograma":
              case "pais":
              case "periodo_esperado":
              case "prefijoCel":
              case "programa":
                if (this.data[element] ==
                  "" || this.data[element] ==
                  null) {
                  valid = false;
                  this.errors[element] = true;
                }
                break;
              case "departamento":
              case "ciudad":
                if ((this.data[element] ==
                    "" || this.data[element] ==
                    null) && this.data.pais == "COL") {
                  valid = false;
                  this.errors[element] = true;
                }
                break;
              case "email":
                const regex =
                  /^(([^<>()[\]\\.,
                ;: \s @ "] +
                  (\.[ ^ < > ()[\]\\., ;: \s @ "] +
                  ) * ) | .(".+")) @((\[
              [0 - 9]
              {1,3}\.[0 - 9]
              {1,3}\.[0 - 9]
              {1,3}\.[0 - 9]
              {1,3}\
            ]) | (([a - zA - Z\ - 0 - 9] +
              \.) + [a - zA - Z] {2,})) $ / ;
            if (this.data[element] ==
              "" || this.data[element] ==
              null) {
              valid = false;
              this.errors[element] = true;
            } else if (regex.test(this.data[element]) === false) {
              valid = false;
              this.errors[element] = true;
            }
            break;
            case "mobile":
            if (
              this.data[element] ==
              "" ||
              this.data[element] ==
              null ||
              this.data[element].length < 8 ||
              this.data[element].length > 10
            ) {
              valid = false;
              this.errors[element] = true;
            }
            break;
            default:
            break;
          }
        });
    return valid;
  },
  /**
   * Funcion para enviar el formulario
   **/
  validateForm: function(e) {
    if (!this.validateInputs()) {
      e.preventDefault();
      return false;
    } else {
      this.isSubmitting = true;
      this.$refs.form_SF.submit();
    }
  },
  /**
   * Funcion para limpiar en caso que sea invalido
   **/
  deleteInvalid(campo) {
    this.errors[campo] = false;
  },
},
});
app.mount("#app");
</script>