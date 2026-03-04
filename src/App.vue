<template>
  <v-app>
    <router-view />
    <v-snackbar
      v-model="notification.show.value"
      :color="notification.color.value"
      :timeout="notification.timeout.value"
    >
      {{ notification.message.value }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'

const notification = useNotification()
</script>
