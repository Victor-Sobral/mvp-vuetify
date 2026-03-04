<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Cadastro de Categoria</h2>
    </div>
    <v-form class="mt-4" v-model="valid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formProduct.name"
        label="Nome"
        required
        variant="outlined"
        type="name"
        class="mb-4"
        :rules="[rules.required]"
      ></v-text-field>

      <v-textarea
        v-model="formProduct.description"
        label="Descrição"
        variant="outlined"
        class="mb-4"
        :rules="[rules.required]"
      ></v-textarea>

      <v-text-field
        v-model="formProduct.price"
        label="Preço"
        variant="outlined"
        type="number"
        class="mb-4"
        :rules="[rules.required]"
      ></v-text-field>

      <v-select
        v-model="formProduct.status"
        label="Status"
        variant="outlined"
        :items="status"
        item-title="title"
        item-value="value"
        persistent-hint
        :rules="[rules.required]"
      >
      </v-select>

      <SelectCategory v-model="formProduct.category_id" :rules="[rules.required]"> </SelectCategory>

      <div class="d-flex justify-end ga-6">
        <v-btn :to="{ name: 'product' }"> Voltar </v-btn>
        <v-btn :disabled="!valid" color="primary" type="submit">
          {{ idProduct ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </div>
    </v-form>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useRouter, useRoute } from 'vue-router'
import SelectCategory from '@/components/SelectCategory.vue'
import { onMounted } from 'vue'
import { useProductService } from '@/services'

const router = useRouter()
const route = useRoute() // sem o R no final, serve para analisar uma URL //
const notification = useNotification()
const productService = useProductService()

const idProduct = ref('')
const valid = ref(false)
const formProduct = ref({
  name: '',
  description: '',
  price: 0,
  status: 'active',
  category_id: null,
})

const status = [
  { title: 'Ativo', value: 'active' },
  { title: 'Inativo', value: 'inactive' },
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
}

onMounted(() => {
  if (route.params?.id) {
    idProduct.value = route.params?.id
    getProduct(route.params?.id)
  }
})

function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulário Incompleto')
  }
  idProduct.value ? updateProduct(idProduct.value) : createProduct() // se o id de categoria existir ele atualiza na primeira parte, se não ele cria uma nova categoria //
}

async function createProduct() {
  try {
    await productService.create(formProduct.value)

    notification.success('Produto criado com sucesso!')
    router.push({ name: 'product' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar Produto. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}

async function getProduct(id) {
  try {
    const data = await productService.getById(id)
    formProduct.value = {
      name: data.name,
      status: data.status,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
    }
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar buscar o produto. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}

async function updateProduct(id) {
  try {
    await productService.update(id, formProduct.value)
    notification.success('Produto atualizado com sucesso')
    router.push({ name: 'product' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar buscar o produto. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}
</script>
