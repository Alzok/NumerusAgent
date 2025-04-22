<template>
  <v-dialog :model-value="isVisible" @update:model-value="handleVisibilityChange" max-width="600px" persistent>
    <v-card>
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

// Options statiques pour le sélecteur de modèle
const aiModels = ['Modèle X (OpenAI)', 'Modèle Y (Anthropic)', 'Modèle Z (Local)'];

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
/* Styles spécifiques si nécessaires */
.v-card-title {
  border-bottom: 1px solid #ccc;
}
.v-card-actions {
    border-top: 1px solid #ccc;
}
</style> 