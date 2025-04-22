<template>
  <div>
    <v-list-item>
      <v-list-item-title v-if="!localRail">Détails Agent</v-list-item-title>
      <template v-slot:append>
        <v-btn
          :icon="localRail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
          variant="text"
          @click="toggleRailMode"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>

    <div v-if="!localRail" class="pa-4">
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
         <v-btn block variant="tonal" color="secondary" class="mb-2" prepend-icon="mdi-swap-horizontal" :disabled="!selectedAgentTask">
          Changer Tâche
        </v-btn>
         <v-btn block variant="tonal" color="error" class="mb-2" prepend-icon="mdi-delete" @click="removeSelectedAgent">
          Supprimer Agent
        </v-btn>
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
.v-btn {
    border-radius: 0; /* Style pixel art */
    justify-content: flex-start; /* Aligner texte/icône à gauche */
    padding-left: 16px;
}
</style> 