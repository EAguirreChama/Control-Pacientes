<script setup>
  import { ref, reactive, watch, onMounted} from 'vue';
  
  // Paquete para generar ids únicos
  import { uid } from 'uid'
  
  // Importamos componentes
  import Header from './components/Header.vue';
  import Formulario from './components/Formulario.vue'
  import Paciente from './components/Paciente.vue'

  // Listado de pacientes
  const pacientes = ref([])

  // State de pacientes
  const paciente = reactive({
        id: null,
        nombre: '',
        propietario: '',
        email: '',
        alta: '',
        sintomas: ''
    })
    
  // Para que sea más facil de utilizar una función
  watch(pacientes, () => {
    guardarLocalStorage()
  }, {
    deep: true
  })

  const guardarLocalStorage = () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes.value))
  }

  onMounted(() => {
    const pacientesStorage = localStorage.getItem('pacientes')
    if(pacientesStorage) {
      pacientes.value = JSON.parse(pacientesStorage)
    }
  })

  // Función para actualizar un paciente
  const actualizarPaciente = (id) => {
      const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0]
      Object.assign(paciente, pacienteEditar)
  };

  // Función para eliminar un paciente
  const eliminarPaciente = (id) => {
      pacientes.value = pacientes.value.filter(paciente => paciente.id !== id)
  };

  // Función para guardar paciente
  const guardarPaciente = () => {
    if(paciente.id) {
      const { id } = paciente
      // findIndex solo funciona para arreglos
      const i = pacientes.value.findIndex(paciente => paciente.id === id )
      pacientes.value[i] = {...paciente}
    } else {
      pacientes.value.push({
        ...paciente,
        // Aqui se genera el id único
        id: uid()
      })
    };

    // Reiniciar Form
    paciente.nombre = ''
    paciente.propietario = ''
    paciente.email = ''
    paciente.alta = ''
    paciente.sintomas = '',
    paciente.id = null

    // Otra forma de reiniciar el form
    // Object.assign(paciente, {
    //     nombre: '',
    //     propietario: '',
    //     email: '',
    //     alta: '',
    //     sintomas: ''
    // })
  };
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header/>

    <div class="mt-12 md:flex">
      <!-- Lado del formulario -->
      <Formulario
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
        :id="paciente.id"
      />

      <!-- Lado de pacientes -->
      <div class="md:w-1/2 md:h-screen overflow-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus Pacientes</h3>

        <!-- Verifica si hay pacientes -->
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
              Información de
              <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>
          
          <Paciente
            v-for="paciente in pacientes"
            :key="paciente.id"
            :paciente="paciente"
            @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente"
          />
        </div>
        
        <p v-else class="mt-20 text-2xl text-center">No hay Pacientes Registrados</p>
      </div>
    </div>
  </div>
</template>