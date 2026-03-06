<template>
  <container-default>
    <div class="d-flex justify-space-between">
      <h2>Dashboard</h2>
    </div>
    <v-row>
      <v-col cols="12" sm="4">
        <CardDashboard
          card-title="Categorias"
          :card-value="categoriesTotal"
          card-icon="mdi-bulletin-board"
        >
        </CardDashboard>
      </v-col>
      <v-col cols="12" sm="4">
        <CardDashboard
          card-title="Produtos"
          :card-value="productsTotal"
          card-icon="mdi-package-variant"
        ></CardDashboard>
      </v-col>
    </v-row>
  </container-default>
</template>

<script setup>
/* import { ref } from 'vue'  - ao incluir o plugin de auto import, tem que fazer uma inserção no "eslint.config.js" para evitar erro no ref 
na parte de globals, colocar o código abaixo:
        ref: 'readonly',
        rules: {
          'vue/multi-word-component-names': 3, // 0 disables the rule
        },*/

import { useCategoryService, useProductService } from '@/services'
import { onMounted } from 'vue'

const categoryService = useCategoryService()
const productService = useProductService()
const categoriesTotal = ref(0)
const productsTotal = ref(0)

async function getCategoriesTotal() {
  try {
    categoriesTotal.value = await categoryService.getTotal()
  } catch (error) {
    notification.error('Não foi possível recuperar as categorias', error)
  }
}

async function getProductsTotal() {
  try {
    productsTotal.value = await productService.getTotal()
  } catch (error) {
    notification.error('Não foi possível recuperar os produtos', error)
  }
}
onMounted(() => {
  getCategoriesTotal()
  getProductsTotal()
})
</script>
