<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title> Meu projeto Vuetify </v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-logout" @click="dialogLogout = true"></v-btn>
        <!-- pesquisar no google poor MDI-ICONS para mais opções de icones -->
      </template>
    </v-app-bar>

    <!-- responsável pela barra lateral -->
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="menu in items"
          :key="menu.name"
          :title="menu.title"
          :value="menu.name"
          :to="{ name: menu.value }"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100dvh">
      <router-view> </router-view>

      <!-- Responsável pela caixa de dialogo para o lougout -->
      <v-dialog v-model="dialogLogout" max-width="400">
        <v-card prepend-icon="mdi-logout" title="Deseja encerrar a sua sessão?">
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn @click="handleLogout"> Sair </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

const drawer = ref(false)
const dialogLogout = ref(false)
const router = useRouter()

const items = [
  {
    title: 'Dasboard',
    value: 'home',
  },
  {
    title: 'Categorias',
    value: 'category',
  },
  {
    title: 'Produtos',
    value: 'product',
  },
]

function handleLogout() {
  localStorage.removeItem('v-token')
  router.push('/')
}
</script>
