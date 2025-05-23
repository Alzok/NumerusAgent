<template>
  <v-card
    :style="styleObject"
    class="agent-robot-card pa-2 d-inline-flex flex-column align-center"
    variant="outlined"
    hover
    @click="handleClick"
  >
    <v-icon size="x-large" class="mb-1" :color="statusIconColor">{{ image }}</v-icon>
    <span class="text-caption">{{ agentName }}</span>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, watch } from 'vue'
// Potentially: import type { AgentTaskStatus } from '~/stores/agentStore'; // If you want stricter typing

const props = defineProps({
  agentId: {
    type: String,
    required: true
  },
  agentName: {
    type: String,
    default: 'Agent'
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'mdi-robot'
  },
  taskStatus: {
    type: String, // Should ideally be PropType<AgentTaskStatus>
    default: 'idle'
  }
})

// Log props whenever they change
watch(props, (newProps) => {
  console.log(`AgentRobot ${newProps.agentId} received props: x=${newProps.x}, y=${newProps.y}, status=${newProps.taskStatus}`);
});

const emit = defineEmits(['selected'])

const statusIconColor = computed(() => {
  switch (props.taskStatus) {
    case 'processing':
      return 'blue';
    case 'completed':
      return 'green';
    case 'error':
      return 'red';
    case 'idle':
    default:
      return undefined; // Vuetify's default icon color
  }
});

// Calcule l'objet style pour la position absolue
const styleObject = computed(() => {
  const style = {
    position: 'absolute',
    // Applique seulement si x et y sont valides (même si requis, la valeur initiale peut être -1 brièvement)
    left: props.x >= 0 ? `${props.x}px` : undefined,
    top: props.y >= 0 ? `${props.y}px` : undefined,
    opacity: props.x >= 0 ? 1 : 0,
    // Transition plus courte et 'ease-out'
    transition: 'left 0.1s ease-out, top 0.1s ease-out, opacity 0.2s ease-in'
  };
  return style;
})

const handleClick = () => {
  console.log('AgentRobot clicked:', props.agentId)
  emit('selected', props.agentId)
}
</script>

<style scoped>
.agent-robot-card {
  cursor: pointer;
  border-radius: 4px;
  min-width: 80px;
  user-select: none;
}

.text-caption {
  font-size: 0.75rem;
  text-align: center;
}
</style>