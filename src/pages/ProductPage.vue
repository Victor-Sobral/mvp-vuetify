<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Cadastro de Produtos</h2>
      <v-btn color="primary" append-icon="$plus" :to="{ name: 'form-product' }"> Novo </v-btn>
    </div>

    <v-data-table :headers="headers" :items="products" :loading="loading">
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status"></ChipStatus>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn size="small" color="primary" @click="editProduct(item.id)"> Editar </v-btn>
      </template>
    </v-data-table>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'
import { useProductService } from '@/services'

const notification = useNotification()
const router = useRouter()
const productService = useProductService()

const products = ref([])
const loading = ref(false)

const headers = [
  { title: 'Nome', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Categoria', value: 'category' },
  { title: 'Ação', value: 'actions' },
]

async function getProducts() {
  loading.value = true
  try {
    products.value = await productService.getAll()
  } catch (error) {
    notification.error('Não foi possível recuperar os produtos', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProducts()
})

// responsável or capiturar a id de uma categoria e permitir que ea seja editavel.//
function editProduct(id) {
  router.push({
    name: 'form-product',
    params: {
      id: id,
    },
  })
}
</script>
