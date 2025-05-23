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

    <v-snackbar
      v-model="showErrorSnackbar"
      color="error"
      :timeout="6000"
      multi-line
      location="top right"
      @update:modelValue="handleSnackbarClose"
    >
      {{ agentStore.taskError }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="closeSnackbarManual">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'; // Ensured watch is imported
import TopBar from '~/components/TopBar.vue';
import LeftPanel from '~/components/LeftPanel.vue';
import RightPanel from '~/components/RightPanel.vue';
import { useAgentStore } from '~/stores/agentStore'; // Added import

const isLeftPanelRail = ref(false);
const isRightPanelRail = ref(false);

const agentStore = useAgentStore(); // Added store instance

const showErrorSnackbar = ref(false);

// Watch for errors from the store
watch(() => agentStore.taskError, (newError) => {
  if (newError) {
    showErrorSnackbar.value = true;
  }
});

// Called when snackbar's model-value changes (e.g. timeout, user click)
const handleSnackbarClose = (isVisible: boolean) => {
  if (!isVisible && agentStore.taskError) {
    // If snackbar is hidden and there was an error, clear it.
    agentStore.clearTaskError();
  }
};

const closeSnackbarManual = () => {
  showErrorSnackbar.value = false;
  // handleSnackbarClose will be called due to v-model update
  // or we can explicitly call:
  // agentStore.clearTaskError();
};

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