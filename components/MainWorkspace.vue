<template>
  <v-card
    ref="workspaceCardRef" 
    flat
    class="main-workspace-card pa-4 fill-height"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <v-card-title>Espace de Travail Principal</v-card-title>
    <v-card-subtitle>Déposez les agents ici</v-card-subtitle>
    <v-divider class="my-2"></v-divider>

    <div v-if="agentsInWorkspace.length === 0" class="text-center text-grey fill-height d-flex align-center justify-center">
      <span>Aucun agent actif.</span>
    </div>
    <div v-else ref="agentContainerRef" class="agent-container">
      <AgentRobot
        v-for="agent in agentsInWorkspace"
        :key="agent.workspaceId"
        :agent-id="agent.workspaceId"
        :agent-name="agent.name"
        :x="agent.x"
        :y="agent.y"
        :image="agent.image"
        :task-status="agent.taskStatus"
        @selected="handleAgentSelected"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import AgentRobot from './AgentRobot.vue'
import { useAgentStore, type AgentConfig, type WorkspaceAgent } from '~/stores/agentStore';

const agentStore = useAgentStore();

const agentsInWorkspace = computed(() => agentStore.agentsInWorkspace);

const workspaceCardRef = ref<any>(null);
const agentContainerRef = ref<HTMLDivElement | null>(null);
let animationFrameId: number | null = null;
const isMoving = ref(false);
const proximityThreshold = 10;

const handleDragOver = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

const handleDrop = (event: DragEvent) => {
  if (!event.dataTransfer) {
    console.error('event.dataTransfer is null during drop');
    return;
  }
  const cardComponentInstance = workspaceCardRef.value;
  if (!cardComponentInstance) {
    console.error('Cannot drop agent, v-card component instance ref is not available.');
    return;
  }
  const cardElement = cardComponentInstance.$el as HTMLElement;
  if (!cardElement) {
     console.error('Cannot drop agent, v-card DOM element ($el) is not available.');
     return;
  }

  try {
    const agentJson = event.dataTransfer.getData('application/json');
    const agentData = JSON.parse(agentJson) as AgentConfig;

    const cardRect = cardElement.getBoundingClientRect();
    const dropX = event.clientX - cardRect.left;
    const dropY = event.clientY - cardRect.top;
    
    const padding = 16;
    const adjustedDropX = dropX - padding;
    const adjustedDropY = dropY - padding;

    const containerWidth = Math.max(0, cardRect.width - padding * 2 - 80);
    const containerHeight = Math.max(0, cardRect.height - padding * 2 - 60);

    const initialX = Math.max(0, Math.min(adjustedDropX, containerWidth));
    const initialY = Math.max(0, Math.min(adjustedDropY, containerHeight));
    
    console.log(`Drop at: client(${event.clientX},${event.clientY}), card(${cardRect.left},${cardRect.top}), relative(${dropX},${dropY}), adjusted(${adjustedDropX}, ${adjustedDropY}), initial(${initialX}, ${initialY})`);

    const newWorkspaceId = agentStore.addAgentToWorkspace(agentData, initialX, initialY);

    if (!isMoving.value && agentStore.agentsInWorkspace.length > 0) {
        console.log("Starting animation loop after drop...");
        isMoving.value = true;
        animationLoop();
    }

  } catch (e) {
    console.error("Error parsing dropped data or adding agent:", e);
  }
}

const handleAgentSelected = (workspaceId: string) => {
  agentStore.setSelectedAgent(workspaceId);
}

const moveAgents = () => {
  if (!agentContainerRef.value) return;
  const containerRect = agentContainerRef.value.getBoundingClientRect();
  const containerWidth = Math.max(0, containerRect.width - 80);
  const containerHeight = Math.max(0, containerRect.height - 60);

  const newPositions = agentStore.agentsInWorkspace.map(agent => {
    let { workspaceId, x, y, targetX, targetY, speed, taskStatus } = agent; // Destructure taskStatus

    // If agent is processing a task, it should stop moving.
    if (taskStatus === 'processing') {
      return { workspaceId, x, y, targetX: x, targetY: y }; // Target current position
    }

    // Existing movement logic for 'idle', 'completed', 'error' statuses
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < proximityThreshold) {
      targetX = Math.random() * containerWidth;
      targetY = Math.random() * containerHeight;
    } else {
      const moveX = (dx / distance) * speed;
      const moveY = (dy / distance) * speed;
      x += moveX;
      y += moveY;
      x = Math.max(0, Math.min(x, containerWidth));
      y = Math.max(0, Math.min(y, containerHeight));
    }
    return { workspaceId, x, y, targetX, targetY };
  });

  agentStore.updateAllAgentPositions(newPositions);
}

const animationLoop = () => {
  if (!isMoving.value || agentStore.agentsInWorkspace.length === 0) {
      isMoving.value = false;
      return;
  }
  moveAgents();
  animationFrameId = requestAnimationFrame(animationLoop);
}

onMounted(() => {
});

onUnmounted(() => {
  isMoving.value = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.main-workspace-card {
  border: 2px dashed #9E9E9E;
  background-color: var(--v-theme-background);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.agent-container {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
</style> 