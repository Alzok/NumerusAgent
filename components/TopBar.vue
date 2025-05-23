<template>
  <!-- Assuming the parent v-app-bar in default.vue will have class="top-bar-pixel" -->
  <v-toolbar-title class="top-bar-title-text">PlayerOne</v-toolbar-title> 
  <span class="top-bar-text">Points: 0</span>
  <v-spacer></v-spacer>
  <v-btn prepend-icon="mdi-cog" variant="text" class="top-bar-btn">
    <!-- Settings Icon -->
  </v-btn>
  <v-btn variant="outlined" class="ml-2 top-bar-btn">
    Déconnexion
  </v-btn>
</template>

<script setup lang="ts">
// Logique pour TopBar si nécessaire (ex: récupérer user/points)
</script>

<style scoped>
/* TODO: Globally import and set 'Press Start 2P' or chosen pixel font in nuxt.config or global CSS */

/* Styles for elements within TopBar.vue, assuming parent v-app-bar has .top-bar-pixel */
/* The font-family is inherited from .top-bar-pixel on the parent v-app-bar */

.top-bar-title-text { /* More specific class for the title if needed */
  font-size: 1.2rem !important; /* Adjust size for pixel font */
  color: var(--v-theme-on-surface);
  font-family: 'Press Start 2P', monospace; /* Apply directly here for now */
  margin-right: 16px;
}

.top-bar-text {
  font-size: 0.9rem !important; /* Adjust size for pixel font */
  margin-right: 16px;
  color: var(--v-theme-on-surface);
  font-family: 'Press Start 2P', monospace; /* Apply directly here for now */
  align-self: center; /* Align with title and buttons */
}

.top-bar-btn { /* General class for buttons in the top bar */
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 2px solid var(--v-theme-on-surface) !important; /* Border for buttons */
  margin: 0 4px; /* Adjust spacing */
  color: var(--v-theme-on-surface) !important; /* Ensure text color is applied */
  font-family: 'Press Start 2P', monospace; /* Apply directly here for now */
  text-transform: none; /* Prevent uppercase default for some Vuetify buttons */
}

.top-bar-btn:hover {
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.1) !important; /* Slight hover effect */
}

/* Icon color should also be set, assuming v-icon is used inside v-btn or separately */
.top-bar-btn .v-icon {
  color: var(--v-theme-on-surface) !important;
}

/* Legacy styles cleanup if any were present */
/* .v-btn { border-radius: 0; } */
/* .v-toolbar-title, .text-subtitle-1 { font-family: 'PixelFont', sans-serif; } */
</style>