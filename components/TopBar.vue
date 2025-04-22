<template>
  <v-toolbar-title style="margin-right: 16px;">PlayerOne</v-toolbar-title>

  <span class="text-subtitle-1 mr-4">Points: 0</span>

  <v-spacer></v-spacer> <!-- Pousse les éléments suivants vers la droite -->

  <v-btn prepend-icon="mdi-cog" variant="text">
    <!-- Icône Paramètres (mdi-cog) -->
  </v-btn>

  <v-btn variant="outlined" class="ml-2">
    Déconnexion
  </v-btn>
</template>

<script setup lang="ts">
// Logique pour TopBar si nécessaire (ex: récupérer user/points)
</script>

<style scoped>
/* Styles spécifiques pour TopBar si nécessaire */
.v-btn {
  /* Styles pixel art potentiels pour les boutons - ex: pas de coins arrondis */
  border-radius: 0;
}
.v-toolbar-title, .text-subtitle-1 {
  /* Styles pixel art potentiels pour le texte - ex: police spécifique */
  /* font-family: 'PixelFont', sans-serif; */
}
</style> 