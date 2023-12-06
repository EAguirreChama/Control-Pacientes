<!-- Componente Alerta -->
<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        alerta: {
            type: Object,
            required: true
        }
    })

    // Función para verificar el error
    const isError = computed(() => {
        return  props.alerta.tipo === 'error'
    })

    // El computed comunica el script con el template

</script>

<!-- Cuando tiene los 2 puntos se vuelve una clase dinamica -->
<!-- Cuando no tiene los 2 puntos significa que esa clase es estatico -->

<template>
    <div 
        :class="[isError ? 'bg-red-500' : 'bg-green-500']"
        class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
    >
        {{ alerta.mensaje }}
    </div>
</template>