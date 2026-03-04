<template>
  <v-chip :color="color">
    {{ statusTranslate }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    rewuired: true,
  },
})

const color = computed(() => {
  if (props.status === 'active') {
    return 'green'
  } else if (props.status === 'inactive') {
    return 'red'
  } else {
    return ''
  }
})

const statusTranslate = computed(() => {
  if (props.status === 'active') {
    return 'Ativo'
  } else if (props.status === 'inactive') {
    return 'Inativo'
  } else {
    return props.status
  }
})
</script>
