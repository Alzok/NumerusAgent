<template>
  <v-dialog :model-value="isVisible" @update:model-value="handleClose" max-width="600px" persistent scrollable>
    <v-card class="settings-modal-card">
      <v-card-title class="text-h5">
        Paramètres
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text style="min-height: 200px;">
        <p class="mb-4">Configurez vos clés API pour les services externes.</p>
        
        <v-text-field
          v-model="openaiApiKey"
          label="Clé API OpenAI"
          variant="outlined"
          density="compact"
          class="mb-3"
          placeholder="sk-..."
          hint="Laissez vide si configuré côté serveur et non surchargé ici."
          persistent-hint
          clearable
          type="password"
        ></v-text-field>
        
        <v-text-field
          v-model="anthropicApiKey"
          label="Clé API Anthropic"
          variant="outlined"
          density="compact"
          placeholder="sk-ant-..."
          hint="Laissez vide si configuré côté serveur et non surchargé ici."
          persistent-hint
          clearable
          type="password"
        ></v-text-field>
        
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="handleClose">
          Fermer
        </v-btn>
        <v-btn color="primary" variant="flat" @click="handleSaveSettings">
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'; // Added ref

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

// Refs for API Key input fields
const openaiApiKey = ref('');
const anthropicApiKey = ref('');

const handleClose = () => {
  emit('close');
};

// Placeholder for save logic - will be fully implemented in a later step
const handleSaveSettings = () => {
  // TODO: Implement save settings logic (API call) in a subsequent step
  console.log('Settings save initiated (placeholder):');
  console.log('OpenAI Key:', openaiApiKey.value);
  console.log('Anthropic Key:', anthropicApiKey.value);
  // emit('close'); // Typically close after successful save
};
</script>

<style scoped>
/* Styling from previous step - ensure it's preserved */
.settings-modal-card {
  /* font-family: 'Press Start 2P', monospace; */ /* Assuming global font */
  border-radius: 0 !important;
  border: 3px solid #212121 !important;
  box-shadow: none !important;
  background-color: var(--v-theme-surface) !important;
}

.settings-modal-card .v-card-title {
  font-size: 1.1rem !important;
  border-bottom: 2px solid #424242 !important;
  padding: 12px 16px !important;
  font-family: inherit;
}

.settings-modal-card .v-card-text {
  padding: 16px !important;
  font-family: inherit;
}

.settings-modal-card .v-card-text p {
  font-size: 0.9rem !important;
  margin-bottom: 16px;
  font-family: inherit;
}

:deep(.settings-modal-card .v-text-field .v-field) {
  border-radius: 0 !important;
  border: 2px solid #424242 !important;
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.05) !important;
}
:deep(.settings-modal-card .v-text-field .v-field input),
:deep(.settings-modal-card .v-text-field .v-label) {
   font-family: inherit !important;
}
:deep(.settings-modal-card .v-text-field .v-input__details) {
  font-family: inherit !important;
  font-size: 0.75rem !important;
}

.settings-modal-card .v-card-actions {
  border-top: 2px solid #424242 !important;
  padding: 12px 16px !important;
}

.settings-modal-card .v-card-actions .v-btn {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  font-family: inherit !important;
  text-transform: none !important;
  font-size: 0.85rem !important;
  padding: 4px 12px !important;
}
</style>
