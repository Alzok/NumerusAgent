<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app color="primary" >
      <TopBar />
    </v-app-bar>

    <!-- Left Panel -->
    <v-navigation-drawer
      app
      permanent
      width="300"
      :rail="isLeftPanelRail"
      @update:rail="isLeftPanelRail = $event"
    >
      <LeftPanel v-model:isRail="isLeftPanelRail" />
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main class="main-content-area">
      <v-container fluid fill-height class="main-content-container">
        <slot /> <!-- Nuxt page content will be injected here -->
      </v-container>
    </v-main>

    <!-- Right Panel -->
    <v-navigation-drawer
      app
      permanent
      location="right"
      width="300"
      :rail="isRightPanelRail"
      @update:rail="isRightPanelRail = $event"
    >
      <RightPanel 
        v-model:isRail="isRightPanelRail" 
      />
    </v-navigation-drawer>

  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopBar from '~/components/TopBar.vue';
import LeftPanel from '~/components/LeftPanel.vue';
import RightPanel from '~/components/RightPanel.vue';

const isLeftPanelRail = ref(false);
const isRightPanelRail = ref(false);
</script>

<style scoped>
.main-content-area {
  /* You could add a temporary background here if needed for visualization */
  /* background-color: #f0f0f0; */
}
.main-content-container {
  height: 100%;
  /* background-color: rgba(0, 255, 0, 0.1); */ /* Optional: for debugging */
}
/* Add any layout-specific styles here if needed */
/* Ensure panels take full height - Vuetify's 'app' prop usually handles this */
</style> 