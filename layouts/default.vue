<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app color="surface" density="compact" class="top-bar-pixel">
      <TopBar />
    </v-app-bar>

    <!-- Left Panel -->
    <v-navigation-drawer
      app
      permanent
      width="300"
      :rail="isLeftPanelRail"
      @update:rail="isLeftPanelRail = $event"
      class="left-drawer-pixel-style"
      color="surface" 
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
      class="right-drawer-pixel-style"
      color="surface"
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
/* TODO: Globally import and set 'Press Start 2P' or chosen pixel font in nuxt.config or global CSS */
/* @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); */

:deep(.v-application .v-app-bar.top-bar-pixel) {
  font-family: 'Press Start 2P', monospace; /* Specific pixel font with fallback */
  box-shadow: none !important;
  border-bottom: 3px solid #212121 !important; /* Dark grey border, assuming #212121 is your 'on-surface' or similar dark color */
  border-radius: 0 !important;
  /* background-color is handled by the 'color="surface"' prop of v-app-bar */
}

/* Ensure components inside TopBar.vue inherit the font if not explicitly set there */
:deep(.top-bar-pixel .v-toolbar-title),
:deep(.top-bar-pixel .v-btn),
:deep(.top-bar-pixel span) { /* Targeting the points span */
  font-family: inherit !important; /* Inherit 'Press Start 2P' */
}


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

/* Styling for the Left Navigation Drawer Container */
:deep(.v-navigation-drawer.left-drawer-pixel-style) {
  font-family: 'Press Start 2P', monospace !important; /* Ensure drawer itself has the font */
  border-right: 3px solid #212121 !important; /* Dark border */
  border-radius: 0 !important; /* No rounded corners */
  box-shadow: none !important; /* Remove default shadow */
  /* background-color is explicitly set by color="surface" prop on v-navigation-drawer,
     but can be overridden here if needed: var(--v-theme-surface) !important; */
}

/* If LeftPanel.vue's root div .left-panel-container also sets font-family,
   this ensures the v-navigation-drawer itself has it for any direct text/elements if any.
   The styles from LeftPanel.vue for its internal content should still apply. */

/* Styling for the Right Navigation Drawer Container */
:deep(.v-navigation-drawer.right-drawer-pixel-style) {
  font-family: 'Press Start 2P', monospace !important; /* Ensure drawer itself has the font */
  border-left: 3px solid #212121 !important; /* Dark border on the left */
  border-radius: 0 !important; /* No rounded corners */
  box-shadow: none !important; /* Remove default shadow */
  /* background-color is explicitly set by color="surface" prop */
}
</style>