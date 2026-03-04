<template>
  <v-container class="pa-sm-6 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" max-width="300" src="/undraw/login-icon.svg"></v-img>
          <h1 class="text-primary mb-2">Bem vindo a plataforma Novo Lar Suprimentos</h1>
          <p class="text-grey-darken-1">Sua plataforma de gerenciamento de estoque</p>
        </div>
      </v-col>
      <!-- Closs referesse a largura em mobile e md em monitor -->
      <v-col class="d-flex align-center justify-center" clos="12" md="6">
        <div class="w-100" style="max-width: 400px">
          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <div class="text-center mb-6">
              <h1 class="text-primary">Login</h1>
              <p class="text-grey-darken-1">Prencha seus dados para logar</p>

              <v-text-field
                v-model="formData.email"
                label="Email"
                variant="outlined"
                type="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                :append-inner-icon="passwordIsVisible ? 'mdi-eye-off' : 'mdi-eye'"
                label="Senha"
                required
                variant="outlined"
                :type="passwordIsVisible ? 'text' : 'password'"
                class="mb-4"
                :rules="[rules.required, rules.maxLength, rules.minLength, rules.strongPassword]"
                @click:append-inner="showPassword"
              >
              </v-text-field>

              <v-btn block class="mb-3" color="primary" size="large" type="submit"> Entrar </v-btn>

              <div class="text-center mb-3">ou</div>

              <v-btn
                :to="{ name: 'register' }"
                block
                variant="outlined"
                class="mb-3"
                color="primary"
                size="large"
              >
                <!-- substituiu o type="submit" pelo :to="{ name:'regiter'}" para fins de rdefinição de rota para vltar a tela de login-->
                Cadastre-se
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'

const api = useApi()
const notification = useNotification()
const router = useRouter()
const formData = ref({
  email: '',
  password: '',
})
const passwordIsVisible = ref(false)
const valid = ref(false)

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.'
  },
  maxLength: (value) => value.length <= 12 || 'Máximo 20 caracteres',
  minLength: (value) => value.length >= 6 || 'Mínimo 6 caracteres',

  // Nova regra: Senha forte (minúsculas, maiúsculas e números)
  strongPassword: (value) => {
    if (!value) return 'Campo obrigatório'

    const hasLowerCase = /[a-z]/.test(value)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasMinLength = value.length >= 6

    if (!hasLowerCase) {
      return 'A senha deve conter pelo menos uma letra minúscula'
    }
    if (!hasUpperCase) {
      return 'A senha deve conter pelo menos uma letra maiúscula'
    }
    if (!hasNumber) {
      return 'A senha deve conter pelo menos um número'
    }
    if (!hasMinLength) {
      return 'A senha deve ter no mínimo 6 caracteres'
    }

    return true
  },
}

function showPassword() {
  passwordIsVisible.value = !passwordIsVisible.value
}

function handleSubmit() {
  if (!valid.value) {
    alert('Formulário Incompleto')
  }

  loginUser()
}

async function loginUser() {
  try {
    const response = await api.post('/login', {
      ...formData.value, //os 3 pontos (...) função Javascript faz com que todas as informações do forms (nome, email, senha) sejam passadas juntas
    })
    if (response?.data?.token) {
      localStorage.setItem('v-token', response.data.token)
      notification.success('Login realizado com sucesso.') //código referente a mensagem notificação ligado ao import useNotification e ao componente - composables > useNotification
      router.push({ name: 'home' })
    } else {
      notification.success('Token não encontrado')
    }
  } catch (error) {
    notification.error(
      'Não foi possível reaizar o login. Erro:' +
        (error.response?.data?.detail || error.code || error.message || ''),
      9000,
    )
    console.error('Error', error.data)
  }
}
</script>
