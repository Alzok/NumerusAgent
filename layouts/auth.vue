<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Pas de script spécifique nécessaire pour ce layout minimaliste
</script>

<style scoped>
/* Style pour s'assurer que le contenu remplit l'espace si nécessaire */
.v-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Assure que le main prend au moins toute la hauteur de la vue */
}
</style> 