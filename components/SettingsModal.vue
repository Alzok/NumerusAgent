<template>
  <v-dialog :model-value="isVisible" @update:model-value="handleClose" max-width="600px" persistent scrollable>
    <v-card class="settings-modal-card">
      <v-card-title class="text-h5">
        Paramètres
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text style="min-height: 200px;"> {/* Added min-height for better structure if content is sparse initially */}
        <p class="mb-4">Les configurations des clés API et autres paramètres apparaîtront ici bientôt.</p>
        <!-- Placeholder for future form elements, e.g., API key inputs -->
        <!-- 
        <v-text-field
          label="Clé API OpenAI"
          variant="outlined"
          density="compact"
          class="mb-3"
          hint="Laissez vide pour utiliser la configuration du serveur (si disponible)."
          persistent-hint
        ></v-text-field>
        <v-text-field
          label="Clé API Anthropic"
          variant="outlined"
          density="compact"
          hint="Laissez vide pour utiliser la configuration du serveur (si disponible)."
          persistent-hint
        ></v-text-field> 
        -->
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="handleClose">
          Fermer
        </v-btn>
        <!-- <v-btn color="primary" variant="flat" @click="handleSaveSettings">
          Sauvegarder
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

// Placeholder for save logic
// const handleSaveSettings = () => {
//   // TODO: Implement save settings logic
//   console.log('Settings saved (placeholder)');
//   emit('close'); 
// };
</script>

<style scoped>
/* Assuming global font 'Press Start 2P' is set on body or inherited effectively.
   If not, uncomment the font-family for .settings-modal-card. */

.settings-modal-card {
  /* font-family: 'Press Start 2P', monospace; */ /* Uncomment if needed */
  border-radius: 0 !important;
  border: 3px solid #212121 !important; /* Main dialog border */
  box-shadow: none !important;
  background-color: var(--v-theme-surface) !important;
}

.settings-modal-card .v-card-title {
  font-size: 1.1rem !important; /* Adjusted for pixel font */
  border-bottom: 2px solid #424242 !important;
  padding: 12px 16px !important; /* Adjust padding */
  font-family: inherit; /* Ensure it inherits from .settings-modal-card or global */
}

.settings-modal-card .v-card-text {
  padding: 16px !important;
  font-family: inherit;
}

.settings-modal-card .v-card-text p {
  font-size: 0.9rem !important; /* Adjusted for pixel font */
  margin-bottom: 16px;
  font-family: inherit;
}

/* Styling for (future) v-text-field elements, if uncommented for testing */
:deep(.settings-modal-card .v-text-field .v-field) {
  border-radius: 0 !important;
  border: 2px solid #424242 !important;
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.05) !important;
}
:deep(.settings-modal-card .v-text-field .v-field input),
:deep(.settings-modal-card .v-text-field .v-label) {
   font-family: inherit !important; /* Should inherit pixel font */
}
:deep(.settings-modal-card .v-text-field .v-input__details) { /* Hint text */
  font-family: inherit !important;
  font-size: 0.75rem !important;
}


.settings-modal-card .v-card-actions {
  border-top: 2px solid #424242 !important;
  padding: 12px 16px !important; /* Adjust padding */
}

.settings-modal-card .v-card-actions .v-btn {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  font-family: inherit !important;
  text-transform: none !important;
  font-size: 0.85rem !important;
  padding: 4px 12px !important; /* Adjust padding */
}
</style>
