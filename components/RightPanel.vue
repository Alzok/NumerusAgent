<template>
  <div class="right-panel-container">
    <v-list-item> <!-- This v-list-item contains the title and rail toggle -->
      <v-list-item-title v-if="!localRail">Détails Agent</v-list-item-title>
      <template v-slot:append>
        <v-btn
          :icon="localRail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
          variant="text"
          @click="toggleRailMode" 
          class="right-panel-rail-toggle"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>

    <div v-if="!localRail" class="pa-4 right-panel-content"> <!-- Added class for content padding -->
      <div v-if="selectedAgent">
        <p class="text-h6 mb-1">{{ selectedAgent.name }}</p>
        <v-select
          v-if="selectedAgent.modelName"
          :model-value="selectedAgent.modelName"
          :label="selectedAgent.modelProvider ? `Modèle (${selectedAgent.modelProvider})` : 'Modèle'"
          :items="[selectedAgent.modelName]"
          readonly
          variant="outlined"
          density="compact"
          class="mb-2"
        ></v-select>
         <p v-else class="text-body-2 text-grey mb-2">Aucun modèle configuré</p>
        <p class="text-body-2 mb-4">Tâche actuelle: {{ selectedAgentTask?.name || 'Inactive' }}</p>

        <v-divider class="mb-4"></v-divider>

        <v-btn block variant="tonal" color="primary" class="mb-2" prepend-icon="mdi-plus-box" @click="showCreateTaskModal">
          Créer Tâche
        </v-btn>
        <v-btn block variant="tonal" color="secondary" class="mb-2" prepend-icon="mdi-pencil" @click="showEditTaskModal" :disabled="!selectedAgentTask">
          Éditer Tâche
        </v-btn>
        <!-- TODO: Implement 'Change Task' functionality (e.g., select from a list of predefined/saved tasks) -->
         <v-btn block variant="tonal" color="secondary" class="mb-2" prepend-icon="mdi-swap-horizontal" :disabled="true">
          Changer Tâche
        </v-btn>
         <v-btn block variant="tonal" color="error" class="mb-2" prepend-icon="mdi-delete" @click="removeSelectedAgent">
          Supprimer Agent
        </v-btn>

        <!-- Section to display the last AI response -->
        <div v-if="selectedAgent && selectedAgent.lastResponse" class="mt-4">
          <p class="text-subtitle-1">Dernière Réponse de l'IA:</p>
          <v-card variant="outlined" class="pa-3" style="max-height: 200px; overflow-y: auto;">
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.875rem;">{{ selectedAgent.lastResponse }}</pre>
          </v-card>
        </div>
      </div>
      <div v-else class="text-center text-grey">
        Aucun agent sélectionné
      </div>
    </div>
    <div v-else class="pa-2 text-center">
       <!-- Peut-être juste afficher une icône ou rien en mode rail -->
       <v-icon>mdi-information-outline</v-icon>
    </div>

    <!-- Modal de Tâche -->
    <TaskModal
      :is-visible="isTaskModalVisible"
      :editing-task="editingTask"
      @close="hideTaskModal"
      @save="handleTaskSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import { useAgentStore, type WorkspaceAgent, type Task } from '~/stores/agentStore';
import TaskModal from '~/components/TaskModal.vue';

// Utilise le store
const agentStore = useAgentStore();

// Props
const props = defineProps({
  isRail: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:isRail'])

// State
const localRail = ref(props.isRail)

// État pour la visibilité du modal de tâche
const isTaskModalVisible = ref(false);
// État pour savoir si on édite
const editingTask = ref<Task | null>(null);

// Obtient l'agent sélectionné depuis le store
const selectedAgent = computed<WorkspaceAgent | null>(() => agentStore.selectedAgent);

// Obtient la tâche de l'agent sélectionné (si elle existe)
const selectedAgentTask = computed<Task | null>(() => selectedAgent.value?.task || null);

// Methods
const toggleRailMode = () => {
  localRail.value = !localRail.value
  emit('update:isRail', localRail.value)
}

// Ouvre le modal pour créer une tâche
const showCreateTaskModal = () => {
    editingTask.value = null; // Assure qu'on est en mode création
    isTaskModalVisible.value = true;
};

// Ouvre le modal pour éditer une tâche
const showEditTaskModal = () => {
    if (selectedAgentTask.value) {
        editingTask.value = { ...selectedAgentTask.value }; // Copie pour éviter la modification directe
        isTaskModalVisible.value = true;
    } else {
        alert('Aucune tâche à éditer pour cet agent.');
    }
};

// Ferme le modal
const hideTaskModal = () => {
    isTaskModalVisible.value = false;
};

// Gère la sauvegarde de la tâche (appelé par l'event 'save' du modal)
const handleTaskSave = (taskData: Task) => {
    if (!selectedAgent.value) {
        console.error('Cannot save task, no agent selected');
        hideTaskModal();
        return;
    }
    console.log('Sauvegarde de la tâche (depuis RightPanel):', taskData);
    // Appelle l'action du store pour mettre à jour la tâche
    agentStore.updateAgentTask(selectedAgent.value.workspaceId, taskData);

    hideTaskModal(); // Ferme le modal après sauvegarde
};

// Action pour supprimer l'agent (appelle le store)
const removeSelectedAgent = () => {
    if (selectedAgent.value) {
        agentStore.removeAgentFromWorkspace(selectedAgent.value.id);
        // Le store désélectionne automatiquement l'agent
    }
}

</script>

<style scoped>
/* TODO: Globally import and set 'Press Start 2P' or chosen pixel font */

.right-panel-container {
  font-family: 'Press Start 2P', monospace;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Content area specific padding, distinct from overall panel container if needed */
.right-panel-content {
  flex-grow: 1;
  overflow-y: auto;
  /* padding: 12px; /* Already has pa-4, this could be adjusted if pa-4 is removed */
}

/* General styling for all buttons within the right panel, including the rail toggle */
:deep(.right-panel-container .v-btn) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  box-shadow: none !important;
  font-family: inherit !important;
  text-transform: none !important; /* Keep case as defined */
  margin-bottom: 10px !important; /* Spacing between block buttons */
}

/* Specific styling for the rail toggle if needed (e.g., if it's not a block button) */
:deep(.right-panel-rail-toggle) {
  margin-bottom: 0 !important; /* Rail toggle usually doesn't need bottom margin like action buttons */
  min-width: auto !important; /* Allow it to be small */
  padding: 0 8px !important; /* Adjust padding for icon button */
}
:deep(.right-panel-rail-toggle .v-icon) {
  color: var(--v-theme-on-surface); /* Ensure icon color matches */
}


/* Styling for text elements */
:deep(.right-panel-container .v-list-item-title) { /* "Détails Agent" title */
  font-family: inherit !important;
  font-size: 1rem !important;
}

:deep(.right-panel-container .text-h6) { /* Agent Name */
  font-size: 1.2rem !important;
  font-family: inherit !important;
  margin-bottom: 12px !important;
  color: var(--v-theme-on-surface);
}

:deep(.right-panel-container .v-select .v-field),
:deep(.right-panel-container .text-body-2) { /* Task display & other text */
  font-family: inherit !important;
  font-size: 0.9rem !important;
  color: var(--v-theme-on-surface);
}

:deep(.right-panel-container .v-select .v-field) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important; /* Border for the select field */
  box-shadow: none !important;
}
:deep(.right-panel-container .v-select .v-field__input) {
  padding-top: 4px !important; /* Adjust input padding if needed */
  padding-bottom: 4px !important;
}


:deep(.right-panel-container .text-subtitle-1) { /* "Dernière Réponse de l'IA:" */
  font-family: inherit !important;
  font-size: 1rem !important;
  margin-top: 16px !important;
  margin-bottom: 8px !important;
  color: var(--v-theme-on-surface);
}

:deep(.right-panel-container .v-card[variant="outlined"]) { /* Card for AI response */
  border-radius: 0 !important;
  border: 2px solid #424242 !important; /* Consistent border */
  font-family: inherit !important;
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.05) !important;
}

:deep(.right-panel-container .v-card[variant="outlined"] pre) {
  font-family: 'Press Start 2P', monospace !important; /* Specific for pre */
  font-size: 0.8rem !important;
  white-space: pre-wrap !important;
  word-break: break-all; /* Prevent overflow */
  color: var(--v-theme-on-surface); /* Ensure pre text is also themed */
}

/* Text for "Aucun agent sélectionné" */
:deep(.right-panel-container .text-center.text-grey) {
  font-family: inherit !important;
  font-size: 0.9rem !important;
  color: #757575 !important;
}

/* Rail mode icon */
:deep(.right-panel-container .v-icon[icon="mdi-information-outline"]) {
  font-family: inherit !important; /* Should not be needed for MDI icons */
  /* Color can be set if needed, but Vuetify usually handles icon colors */
}
</style>