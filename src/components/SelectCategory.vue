<template>
  <v-select
    v-model="model"
    label="Categorias"
    variant="outlined"
    :items="categories"
    item-title="name"
    item-value="id"
    persistent-hint
    :rules="props.rules"
    :loading="loading"
  >
  </v-select>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { onMounted } from 'vue'
import { useCategoryService } from '@/services'

const notification = useNotification()
const categoryService = useCategoryService()

const props = defineProps({
  rules: {
    type: Array,
    default: () => [],
  },
})

const model = defineModel({ required: true })
const categories = ref([])
const loading = ref(false)

async function getCategories() {
  loading.value = true
  try {
    categories.value = await categoryService.getAll()
  } catch (error) {
    notification.error('Não foi possível recuperar as categorias', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCategories()
})
</script>
