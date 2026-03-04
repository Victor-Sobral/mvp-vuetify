<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Categorias</h2>
      <v-btn color="primary" append-icon="$plus" :to="{ name: 'form-category' }"> Nova </v-btn>
    </div>

    <v-data-table :headers="headers" :items="categories" :loading="loading">
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status"></ChipStatus>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn size="small" color="primary" @click="editCategory(item.id)"> Editar </v-btn>
      </template>
    </v-data-table>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'
import ChipStatus from '@/components/ChipStatus.vue'
import { useCategoryService } from '@/services'

const notification = useNotification()
const categories = ref([])
const router = useRouter()
const categoryService = useCategoryService()
const loading = ref(false)

const headers = [
  { title: 'Nome', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Ação', value: 'actions' },
]

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

// responsável or capiturar a id de uma categoria e permitir que ea seja editavel.//
function editCategory(id) {
  router.push({
    name: 'form-category',
    params: {
      id: id,
    },
  })
}
</script>
