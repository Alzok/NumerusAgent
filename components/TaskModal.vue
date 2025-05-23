<template>
  <v-dialog :model-value="isVisible" @update:model-value="handleVisibilityChange" max-width="600px" persistent>
    <v-card class="task-modal-card">
      <v-card-title>
        <span class="text-h5">{{ editingTask ? 'Éditer Tâche' : 'Créer Tâche' }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="taskName" 
                label="Nom / Prompt de la tâche *"
                required
                variant="outlined"
                rows="3"
                :rules="[v => !!v || 'Le nom/prompt est requis']"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="selectedModel"
                label="Modèle d'IA"
                :items="aiModels"
                item-title="title"
                item-value="value"
                variant="outlined"
                density="compact"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
               <p class="text-subtitle-2 mb-1">Services à connecter :</p>
               <v-checkbox v-model="selectedServices" label="Service Mail" value="mail" density="compact" hide-details></v-checkbox>
               <v-checkbox v-model="selectedServices" label="Service Calendrier" value="calendar" density="compact" hide-details></v-checkbox>
               <v-checkbox v-model="selectedServices" label="Accès Web" value="web" density="compact" hide-details></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <small>*champs requis</small>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="closeModal">
          Annuler
        </v-btn>
        <v-btn color="primary" variant="flat" @click="saveTask" :disabled="!taskName">
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Task } from '~/stores/agentStore'; // Importer le type Task

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  editingTask: {
    type: Object as () => Task | null, // Préciser le type
    default: null
  }
});

// Emits
const emit = defineEmits(['update:isVisible', 'close', 'save']);

// Refs pour les champs du formulaire
const taskName = ref('');
const selectedModel = ref<string | null>(null);
const selectedServices = ref<string[]>([]);

// Structured AI model options for the select component
const aiModels = ref([
  { title: 'Select a model', value: null as string | null, disabled: true }, // Placeholder
  { title: 'Basic Responder (Mock)', value: 'mock/basic-responder' },
  { title: 'Advanced Responder (Mock)', value: 'mock/advanced-responder' },
  { title: 'GPT-3.5 Turbo (OpenAI)', value: 'openai/gpt-3.5-turbo' }, // Added
  // Future models can be added here. These values should match modelIdentifiers in backend config.
  // { title: 'GPT-4o (OpenAI)', value: 'openai/gpt-4o' }, // Example for another OpenAI model
  // { title: 'Mistral (Ollama)', value: 'ollama/mistral' }, // Example if configured
]);

// Fonction pour fermer le modal
const closeModal = () => {
    emit('close');
};

// Fonction pour gérer le changement de visibilité (utilisé par v-dialog update)
const handleVisibilityChange = (value: boolean) => {
    // Si on utilise persistent, on doit quand même émettre close pour réinitialiser l'état externe
    if (!value) {
        emit('close');
    }
    // On ne gère pas l'ouverture ici, le watch s'en charge
};

// Watcher sur la visibilité pour pré-remplir ou réinitialiser
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    if (props.editingTask) {
      // Mode édition: pré-remplir
      taskName.value = props.editingTask.name;
      selectedModel.value = props.editingTask.model;
      selectedServices.value = [...props.editingTask.services]; // Copie du tableau
    } else {
      // Mode création: réinitialiser
      taskName.value = '';
      selectedModel.value = null;
      selectedServices.value = [];
    }
  }
}, { immediate: true }); // immediate: true pour vérifier l'état initial

// Logique de sauvegarde
const saveTask = () => {
  if (!taskName.value) return; // Vérification simple

  // Créer l'objet Task à sauvegarder
  const taskData: Task = {
    // Générer un ID si nouveau, ou réutiliser l'ancien si édition
    id: props.editingTask?.id || `task_${Date.now()}`,
    name: taskName.value,
    model: selectedModel.value,
    services: selectedServices.value
  };

  emit('save', taskData);
  // La fermeture est maintenant gérée par handleTaskSave dans RightPanel qui appelle hideTaskModal
  // closeModal(); // Ne plus fermer ici directement
};
</script>

<style scoped>
/* TODO: Globally import and set 'Press Start 2P' or chosen pixel font */

:deep(.v-dialog .v-card.task-modal-card) {
  /* font-family: 'Press Start 2P', monospace; */ /* Removed, should inherit from body */
  border-radius: 0 !important;
  border: 3px solid #212121 !important;
  box-shadow: none !important;
  background-color: var(--v-theme-surface) !important;
}

:deep(.task-modal-card .v-card-title) {
  font-size: 1.1rem !important;
  border-bottom: 2px solid #424242 !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
  padding: 12px 16px !important; /* Adjusted padding */
}

:deep(.task-modal-card .v-label),
:deep(.task-modal-card .v-checkbox .v-label),
:deep(.task-modal-card small) {
  /* font-family: inherit !important; */ /* Removed, should inherit */
  font-size: 0.8rem !important;
  color: var(--v-theme-on-surface);
  opacity: 1; /* Ensure labels are not semi-transparent by default */
}

:deep(.task-modal-card .v-textarea .v-field),
:deep(.task-modal-card .v-select .v-field) {
  border-radius: 0 !important;
  border: 2px solid #424242 !important;
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.05) !important;
  box-shadow: none !important; /* Remove inner shadows if any */
}

:deep(.task-modal-card .v-textarea .v-field textarea), /* Target actual input element */
:deep(.task-modal-card .v-select .v-field .v-select__selection-text) {
   /* font-family: inherit !important; */ /* Removed, should inherit */
   font-size: 0.9rem !important; /* Ensure input text is also styled */
   color: var(--v-theme-on-surface);
}

/* Checkbox styling - focus on label and container if icon is hard to change */
:deep(.task-modal-card .v-checkbox .v-selection-control) {
  /* Minor adjustments if needed, but deep icon changes are complex */
}
:deep(.task-modal-card .v-checkbox .v-selection-control__input .v-icon) {
  /* Default MDI icons are hard to make pixelated without custom SVG/font.
     Can try to make it appear more "solid" */
  /* color: var(--v-theme-primary) !important; */ /* Example: color change */
}


:deep(.task-modal-card .v-card-actions) {
  border-top: 2px solid #424242 !important;
  padding-top: 16px !important; /* Adjusted padding */
  padding-bottom: 16px !important; /* Adjusted padding */
  padding-left: 16px !important;
  padding-right: 16px !important;
}

:deep(.task-modal-card .v-card-actions .v-btn) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
  text-transform: none !important;
  font-size: 0.85rem !important;
  box-shadow: none !important;
  padding: 8px 16px !important; /* Adjust button padding */
}

/* Remove default Vuetify fieldset border on v-field if it appears and conflicts */
:deep(.task-modal-card .v-field__outline fieldset) {
    border: none !important;
}

/* Ensure clearable icon in v-select is also styled if possible, or consider removing for pixel look */
:deep(.task-modal-card .v-select .v-field__append-inner .v-icon) {
    color: var(--v-theme-on-surface);
}

/* Existing styles if any, ensure they don't conflict or remove if redundant */
/* .v-card-title { border-bottom: 1px solid #ccc; } */
/* .v-card-actions { border-top: 1px solid #ccc; } */
</style>