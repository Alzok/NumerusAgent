import { defineStore } from 'pinia';

// Structure de données complète pour un agent
export interface AgentConfig {
  id: string;
  name: string;
  speed: number;
  image: string;
  modelName: string | null;
  modelProvider: string | null;
  prompt: string;
  services: string[];
}

// Interface pour une tâche
export interface Task {
  id: string; // Peut-être généré ou basé sur la tâche
  name: string; // Le prompt ou nom de la tâche
  model: string | null; // Le modèle IA sélectionné
  services: string[]; // Services connectés
}

// Statut des tâches de l'agent
export type AgentTaskStatus = 'idle' | 'processing' | 'completed' | 'error';

// Structure pour un agent dans l'espace de travail (incluant la position)
export interface WorkspaceAgent extends AgentConfig {
  workspaceId: string; // Identifiant unique dans l'espace de travail
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  task: Task | null; // Ajout de la propriété task
  taskStatus: AgentTaskStatus; // Ajout du statut de la tâche
  lastResponse?: string | null; // New property for AI response
}

export const useAgentStore = defineStore('agentStore', {
  state: () => ({
    workspaceAgents: [] as WorkspaceAgent[],
    selectedAgentId: null as string | null,
    taskError: null as string | null, // Added for task error reporting
  }),

  getters: {
    // Getter pour obtenir l'agent sélectionné
    selectedAgent: (state): WorkspaceAgent | null => {
      if (!state.selectedAgentId) return null;
      return state.workspaceAgents.find(agent => agent.workspaceId === state.selectedAgentId) || null;
    },
    // Getter pour obtenir la liste des agents dans le workspace (utile pour l'affichage)
    agentsInWorkspace: (state): WorkspaceAgent[] => {
        return state.workspaceAgents;
    }
  },

  actions: {
    // Ajoute un agent au workspace et retourne son workspaceId
    addAgentToWorkspace(agentConfig: AgentConfig, x: number, y: number): string {
      const workspaceId = `ws_${Date.now()}_${Math.random().toString(16).substring(2, 8)}`;
      const newAgent: WorkspaceAgent = {
        ...agentConfig,
        workspaceId,
        x,
        y,
        targetX: x,
        targetY: y,
        task: null,
        taskStatus: 'idle', // Initialisation du statut de la tâche
        lastResponse: null, // Initialize lastResponse
      };
      this.workspaceAgents.push(newAgent);
      this.selectedAgentId = workspaceId;
      console.log('Agent added to workspace:', newAgent);
      return workspaceId;
    },

    // Met à jour la position et la cible d'un agent (appelé depuis MainWorkspace après nextTick et dans la boucle)
    updateAgentPosition(workspaceId: string, x: number, y: number) {
      const agent = this.workspaceAgents.find(a => a.workspaceId === workspaceId);
      if (agent) {
        agent.x = x;
        agent.y = y;
      }
    },

    // Met à jour toutes les positions (utilisé par la boucle de mouvement)
    updateAllAgentPositions(newPositions: Array<{ workspaceId: string; x: number; y: number; targetX: number; targetY: number }>) {
      newPositions.forEach(newPos => {
        const agentIndex = this.workspaceAgents.findIndex(a => a.workspaceId === newPos.workspaceId);
        if (agentIndex !== -1) {
          this.workspaceAgents[agentIndex] = {
            ...this.workspaceAgents[agentIndex],
            x: newPos.x,
            y: newPos.y,
            targetX: newPos.targetX,
            targetY: newPos.targetY
          };
        }
      });
    },

    // Sélectionne un agent (appelé depuis MainWorkspace au clic)
    setSelectedAgent(agentId: string | null) {
      this.selectedAgentId = agentId;
      console.log('[Store] Selected Agent ID:', agentId);
    },

    // Supprime un agent (pourra être utilisé par RightPanel plus tard)
    removeAgentFromWorkspace(workspaceId: string) {
      this.workspaceAgents = this.workspaceAgents.filter(agent => agent.workspaceId !== workspaceId);
      if (this.selectedAgentId === workspaceId) {
        this.selectedAgentId = null; // Désélectionne si l'agent supprimé était sélectionné
      }
      console.log('[Store] Agent removed:', workspaceId);
    },

    async updateAgentTask(workspaceId: string, task: Task | null) {
      const agent = this.workspaceAgents.find(a => a.workspaceId === workspaceId);
      if (agent) {
        agent.task = task;
        console.log(`Task data updated for agent ${workspaceId}:`, task);

        if (task) {
          this.updateAgentTaskStatus(workspaceId, 'processing');

          // Add console warning for models requiring API keys (UX Hint)
          if (task.model && (task.model.startsWith('openai/') || task.model.startsWith('anthropic/'))) {
            const providerName = task.model.split('/')[0];
            const apiKeyEnvVar = providerName === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
            console.warn(
              `[User Hint] Agent '${agent.name}' is using a ${providerName} model ('${task.model}'). ` +
              `Ensure your ${apiKeyEnvVar} is correctly set in the server's .env file. ` +
              `The application will proceed, but the backend will return an error if the key is missing or invalid.`
            );
          }

          try {
            const response = await fetch('/api/ai/executeTask', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: task.name, // Utiliser task.name comme prompt
                modelIdentifier: task.model, // Changed 'model' to 'modelIdentifier'
                services: task.services,
              }),
            });

            if (response.ok) {
              const result = await response.json();
              this.updateAgentTaskStatus(workspaceId, 'completed');
              console.log('AI task result for agent', workspaceId, ':', result.result);
              if (agent) { // Agent should still be in scope here
                agent.lastResponse = result.result; // Store the AI response
              }
            } else {
              this.updateAgentTaskStatus(workspaceId, 'error');
              // No specific lastResponse update here, as it's an error
              let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
              try {
                const errorBody = await response.json();
                if (errorBody && errorBody.message) {
                  errorMessage = errorBody.message;
                }
              } catch (e) {
                // Ignore if error body is not JSON or doesn't have message
              }
              this.taskError = `Failed to execute task for agent ${agent.name}: ${errorMessage}`;
              console.error('AI task execution failed for agent', workspaceId, ':', errorMessage);
            }
          } catch (error) {
            this.updateAgentTaskStatus(workspaceId, 'error');
            this.taskError = `Network error for agent ${agent.name}: Could not connect to AI service. Please check your connection.`;
            console.error('AI task execution network error for agent', workspaceId, ':', error);
          }
        } else {
          // Task is null, so set status to idle and clear last response
          this.updateAgentTaskStatus(workspaceId, 'idle');
          if (agent) {
            agent.lastResponse = null; // Clear last response when task is removed
          }
        }
      } else {
        console.error(`Agent with workspaceId ${workspaceId} not found for task update.`);
      }
    },

    updateAgentTaskStatus(workspaceId: string, status: AgentTaskStatus) {
      const agent = this.workspaceAgents.find(a => a.workspaceId === workspaceId);
      if (agent) {
        agent.taskStatus = status;
        if (status === 'processing') {
          agent.lastResponse = null; // Clear last response when processing starts
        }
        console.log(`Task status updated for agent ${workspaceId}:`, status);
      } else {
        console.error(`Agent with workspaceId ${workspaceId} not found for task status update.`);
      }
    },

    clearTaskError() {
      this.taskError = null;
    },
  }
}); 