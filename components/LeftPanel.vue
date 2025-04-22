<template>
  <div>
    <v-list-item>
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
    <v-list v-else density="compact" nav>
      <v-list-item
        v-for="agent in agentsData"
        :key="agent.id"
        :title="agent.name"
        :prepend-icon="agent.image || 'mdi-robot-confused'"
        draggable="true"
        @dragstart="handleDragStart($event, agent)"
        class="agent-item"
      >
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

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
.agent-item {
  cursor: move; /* Indique qu'on peut déplacer */
  border-radius: 0; /* Style pixel art */
}

.agent-item:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Léger feedback au survol */
}

.v-list-item-title {
  /* font-family: 'PixelFont', sans-serif; */
}
</style> 