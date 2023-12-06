<!-- Componente formulario -->
<script setup>
    import { reactive, computed } from 'vue'
    import Alerta from './Alerta.vue'
    
    // State de Alerta
    const alerta = reactive ({
        tipo: '',
        mensaje: ''
    })

    const emit = defineEmits(['update:nombre', 'update:propietario', 'update:email', 'update:alta', 'update:sintomas', 'guardar-paciente'])

    const props = defineProps({
        id: {
            type: [String, null],
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        propietario: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        alta: {
            type: String,
            required: true
        },
        sintomas: {
            type: String,
            required: true
        }
    })

    // Función para validar al momento del submit
    const validar = () => {
        // Aquí se validan que los input no esten vacíos
        // Object.values quiere decir que esta verificando los valores del objeto que se le pasa
        // En este caso es props
        // Con el metodo includes se verifica que no este vacío
        if(Object.values(props).includes('')){
            // Modificando el state de alerta
            alerta.mensaje = 'Todos los campos son obligatorios'
            alerta.tipo = 'error'
            return 
        };

        emit('guardar-paciente')
        if(props.id) {
            alerta.mensaje = 'Paciente Actualizado Correctamente'
        } else {
            alerta.mensaje = 'Paciente Agregado Correctamente'
        }
        alerta.tipo = 'exito'

        setTimeout(() => {
            Object.assign(alerta, {
                tipo: '',
                mensaje: ''
            })
        }, 3000)
    };

    const editando = computed(() => {
        return props.id
    })
</script>

<template>
    <div class="md:w-1/2">
        <!-- Titulo -->
        <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <!-- Parrafo -->
        <p class="text-lg mt-5 text-center mb-10">
            Añade Pacientes y
            <span class="text-indigo-600 font-bold">Adminístralos</span>
        </p>

        <!-- Componente de Alerta -->
        <Alerta v-if="alerta.mensaje" :alerta="alerta"/>

        <!-- Formulario -->
        <form class="bg-white shadow-md rounded-lg py-10 px-5 mb-10" @submit.prevent="validar">
            
            <!-- Nombre Mascota -->
            <div class="mb-5">
                <label for="mascota" class="block text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>

                <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    :value="nombre"
                    @input="$emit('update:nombre', $event.target.value)"
                >
                <!-- v-model="paciente.nombre" -->
            </div>

            <!-- Nombre Propietario -->
            <div class="mb-5">
                <label for="propietario" class="block text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>

                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    :value="propietario"
                    @input="$emit('update:propietario', $event.target.value)"
                >
            </div>

            <!-- Correo Electronico -->
            <div class="mb-5">
                <label for="email" class="block text-gray-700 uppercase font-bold">
                    Correo Electronico
                </label>

                <input 
                    id="email"
                    type="email"
                    placeholder="Correo electrónico del propietario"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    :value="email"
                    @input="$emit('update:email', $event.target.value)"
                >
            </div>

            <!-- Alta -->
            <div class="mb-5">
                <label for="alta" class="block text-gray-700 uppercase font-bold">
                    Alta
                </label>

                <input 
                    id="alta"
                    type="date"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    :value="alta"
                    @input="$emit('update:alta', $event.target.value)"
                >
            </div>

            <!-- Síntomas -->
            <div class="mb-5">
                <label for="sintomas" class="block text-gray-700 uppercase font-bold">
                    Síntomas
                </label>

                <textarea
                    id="sintomas"
                    placeholder="Describe los síntomas del paciente"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    :value="sintomas"
                    @input="$emit('update:sintomas', $event.target.value)"
                />
            </div>

            <!-- Botón -->
            <input 
                type="submit"
                class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                :value="[editando ? 'Guardar Cambios' : 'Registrar Paciente']"   
            />
        </form>
    </div>
</template>