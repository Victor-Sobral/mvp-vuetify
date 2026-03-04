<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Cadastro de Categoria</h2>
    </div>
    <v-form class="mt-4" v-model="valid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formCategory.name"
        label="Nome"
        required
        variant="outlined"
        type="name"
        class="mb-4"
        :rules="[rules.required]"
      ></v-text-field>

      <v-select
        v-model="formCategory.status"
        label="Status"
        variant="outlined"
        :items="status"
        item-title="title"
        item-value="value"
        persistent-hint
        single-line
        :rules="[rules.required]"
      >
      </v-select>

      <div class="d-flex justify-end ga-6">
        <v-btn :to="{ name: 'category' }"> Voltar </v-btn>
        <v-btn :disabled="!valid" color="primary" type="submit">
          {{ idCategory ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </div>
    </v-form>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useCategoryService } from '@/services'

const router = useRouter()
const route = useRoute() // sem o R no final, serve para analisar uma URL //
const notification = useNotification()
const categoryService = useCategoryService()

const idCategory = ref('')
const valid = ref(false)
const formCategory = ref({
  name: '',
  status: 'active',
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
    idCategory.value = route.params?.id
    getCategory(route.params?.id)
  }
})

function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulário Incompleto')
  }
  idCategory.value ? updateCategory(idCategory.value) : createCategory() // se o id de categoria existir ele atualiza na primeira parte, se não ele cria uma nova categoria //
}

async function createCategory() {
  try {
    await categoryService.create(formCategory.value)

    notification.success('Categoria criada com sucesso!')
    router.push({ name: 'category' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar categoria. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}

async function getCategory(id) {
  try {
    const data = await categoryService.getById(id)
    formCategory.value = {
      name: data.name,
      status: data.status,
    }
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar buscar a categoria. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}

async function updateCategory(id) {
  try {
    categoryService.update(id, formCategory.value)

    notification.success('Categoria atualizada com sucesso')
    router.push({ name: 'category' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Erro ao salvar buscar a categoria. Erro:' +
          (error.response?.data?.detail || error.code || error.message || ''),
      )
    }
  }
}
</script>
