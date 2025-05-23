<template>
  <div class="left-panel-container"> <!-- Added a container class for overall font scope -->
    <v-list-item class="left-panel-top-controls">
      <template v-slot:prepend>
        <v-btn
          :icon="localRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          @click="toggleRailMode"
        ></v-btn>
      </template>
      <v-list-item-title v-if="!localRail">Agents Disponibles</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Affiche un chargement ou une erreur -->
    <div v-if="pending" class="pa-4 text-center">Chargement...</div>
    <div v-else-if="error" class="pa-4 text-center text-error">Erreur: {{ error.message }}</div>

    <!-- Affiche la liste des agents -->
    <v-list v-else density="compact" nav class="left-panel-list">
      <v-list-item
        v-for="agent in agentsData"
        :key="agent.id"
        :title="agent.name"
        :prepend-icon="agent.image || 'mdi-robot-confused'"
        draggable="true"
        @dragstart="handleDragStart($event, agent)"
        class="agent-item"
      >
      <template v-slot:append>
        <v-btn
          icon="mdi-information-outline"
          variant="text"
          size="small"
          @click.stop="showAgentInfo(agent)" 
          title="Show agent info"
        ></v-btn>
      </template>
      </v-list-item>
    </v-list>

  <!-- Agent Info Dialog -->
  <v-dialog v-model="showInfoDialog" max-width="500px" class="agent-info-dialog">
    <v-card v-if="infoAgent">
      <v-card-title class="text-h5">{{ infoAgent.name }} - Agent Details</v-card-title>
      <v-card-text>
        <p><strong>ID:</strong> {{ infoAgent.id }}</p>
        <p class="mt-2"><strong>Default Prompt:</strong></p>
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f0f0f0; /* Adjusted for better contrast if theme changes */
            padding: 8px;
            border-radius: 4px;
            max-height: 150px; /* Scrollable prompt */
            overflow-y: auto;
            font-family: monospace;
          "
        >{{ infoAgent.prompt }}</pre>
        <p class="mt-2"><strong>Default Model:</strong> {{ infoAgent.modelProvider || 'N/A' }} - {{ infoAgent.modelName || 'N/A' }}</p>
        <p><strong>Speed:</strong> {{ infoAgent.speed }}</p>
        <p><strong>Image Icon:</strong> {{ infoAgent.image }}</p>
        <p v-if="infoAgent.services && infoAgent.services.length > 0"><strong>Default Services:</strong> {{ infoAgent.services.join(', ') }}</p>
        <p v-else><strong>Default Services:</strong> None</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="showInfoDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue' // computed is not used, can be removed if not needed elsewhere

// Type pour correspondre à la structure renvoyée par l'API
interface AgentConfig {
  id: string;
  name: string;
  speed: number;
  image: string;
  modelName: string | null;
  modelProvider: string | null;
  prompt: string;
  services: string[];
}

// Props et Emits pour le mode rail
const props = defineProps({ isRail: { type: Boolean, default: false } })
const emit = defineEmits(['update:isRail'])
const localRail = ref(props.isRail)
const toggleRailMode = () => {
  localRail.value = !localRail.value
  emit('update:isRail', localRail.value)
}

// State for Agent Info Dialog
const showInfoDialog = ref(false);
const infoAgent = ref<AgentConfig | null>(null);

const showAgentInfo = (agent: AgentConfig) => {
  infoAgent.value = agent;
  showInfoDialog.value = true;
};

// Récupération des données des agents depuis l'API avec useFetch
const { data: agentsData, pending, error } = useFetch<AgentConfig[]>(
  '/api/agents/predefined'
  // Options facultatives pour useFetch peuvent être ajoutées ici si nécessaire
)

// Gestion du drag start (utilise le type AgentConfig)
const handleDragStart = (event: DragEvent, agent: AgentConfig) => {
  console.log('Drag Start:', agent.id, 'with data:', agent);
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(agent));
    event.dataTransfer.effectAllowed = 'move';
  } else {
    console.error('event.dataTransfer is null during dragstart');
  }
}
</script>

<style scoped>
/* TODO: Globally import and set 'Press Start 2P' or chosen pixel font in nuxt.config or global CSS */

/* This class now applies the font to the whole panel content */
.left-panel-container {
  /* font-family: 'Press Start 2P', monospace; */ /* Removed, should inherit */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border-right styling is typically on v-navigation-drawer itself, not this inner div.
     If this div is meant to BE the panel, then add border styles here.
     Assuming v-navigation-drawer is the actual panel container from default.vue layout. */
}

/* Styling for the rail toggle button and its container */
:deep(.left-panel-top-controls .v-btn) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  box-shadow: none !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
  min-width: auto !important; /* Allow button to be small */
  padding: 0 8px !important;
}
:deep(.left-panel-top-controls .v-list-item-title) {
  font-size: 1rem !important; /* Adjust for pixel font */
  /* font-family: inherit !important; */ /* Removed, should inherit */
}


/* List specific styling */
.left-panel-list {
  flex-grow: 1;
  overflow-y: auto;
}

:deep(.left-panel-list .v-list-item) {
  border-radius: 0 !important;
  border-bottom: 2px solid #424242 !important; /* Darker gray for item separation */
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  cursor: move; /* Indicates draggable */
}

:deep(.left-panel-list .v-list-item:hover) {
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.1) !important;
}

:deep(.left-panel-list .v-list-item-title) {
  font-size: 0.9rem !important; /* Adjust for pixel font */
  /* font-family: inherit !important; */ /* Removed, should inherit */
}

:deep(.left-panel-list .v-list-item .v-icon) { /* Icon styling for agent image */
  /* font-family: inherit !important; */ /* Removed, was likely not needed */
}

/* Info button within list items */
:deep(.left-panel-list .v-list-item .v-btn) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  box-shadow: none !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
  min-width: auto !important;
  padding: 0 4px !important; /* Adjust for small icon button */
}
:deep(.left-panel-list .v-list-item .v-btn .v-icon) {
  color: var(--v-theme-on-surface); /* Ensure icon color matches */
}


/* Styling for the Info Dialog */
:deep(.agent-info-dialog .v-card) {
  /* font-family: 'Press Start 2P', monospace; */ /* Removed, should inherit */
  border-radius: 0 !important;
  border: 3px solid #212121 !important; /* Dark main border for dialog */
  background-color: var(--v-theme-surface);
  box-shadow: none !important;
}

:deep(.agent-info-dialog .v-card-title) {
  font-size: 1.1rem !important;
  border-bottom: 2px solid #424242 !important; /* Separator for title */
  padding: 12px 16px !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
}

:deep(.agent-info-dialog .v-card-text) {
  font-size: 0.85rem !important; /* Base size for dialog text */
  padding: 16px !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
}
:deep(.agent-info-dialog .v-card-text p) {
  margin-bottom: 12px !important;
}

:deep(.agent-info-dialog .v-card-text pre) {
  /* font-family: 'Press Start 2P', monospace !important; */ /* Assuming inherit will work */
  font-size: 0.8rem !important;
  background-color: rgba(var(--v-theme-on-surface-rgb), 0.05) !important;
  border: 2px solid #424242 !important;
  padding: 10px !important;
  white-space: pre-wrap !important;
  word-break: break-all; /* Ensure long prompts wrap */
  border-radius: 0 !important; /* Pixel-art pre tag */
}

:deep(.agent-info-dialog .v-card-actions) {
  border-top: 2px solid #424242 !important; /* Separator for actions */
  padding: 12px 16px !important;
}
:deep(.agent-info-dialog .v-card-actions .v-btn) {
  border-radius: 0 !important;
  border: 2px solid var(--v-theme-on-surface) !important;
  /* font-family: inherit !important; */ /* Removed, should inherit */
  padding: 4px 16px !important;
  font-size: 0.8rem !important;
  text-transform: none !important;
  box-shadow: none !important;
}

/* Cleanup old specific styles if they conflict */
/* .agent-item { cursor: move; border-radius: 0; } */
/* .agent-item:hover { background-color: rgba(0, 0, 0, 0.1); } */
/* .v-list-item-title { font-family: 'PixelFont', sans-serif; } */
</style>