<template>
  <v-card class="mx-auto py-4" max-width="368">
    <v-card-item :title="cardTitle"> </v-card-item>

    <v-card-text class="py-0">
      <v-row class="align-center" density="compact">
        <v-col class="text-h2" cols="6">
          {{ cardValue }}
        </v-col>

        <v-col class="text-right" cols="6">
          <v-icon color="primary" :icon="cardIcon" size="50"> </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  cardTitle: {
    type: String,
    default: '',
  },
  cardValue: {
    type: String,
    default: '',
  },
  cardIcon: {
    type: String,
    default: '',
  },
})
</script>
