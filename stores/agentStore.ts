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

// Structure pour un agent dans l'espace de travail (incluant la position)
export interface WorkspaceAgent extends AgentConfig {
  workspaceId: string; // Identifiant unique dans l'espace de travail
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  task: Task | null; // Ajout de la propriété task
}

export const useAgentStore = defineStore('agentStore', {
  state: () => ({
    workspaceAgents: [] as WorkspaceAgent[],
    selectedAgentId: null as string | null,
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

    updateAgentTask(workspaceId: string, task: Task | null) {
      const agent = this.workspaceAgents.find(a => a.workspaceId === workspaceId);
      if (agent) {
        agent.task = task;
        console.log(`Task updated for agent ${workspaceId}:`, task);
      } else {
        console.error(`Agent with workspaceId ${workspaceId} not found for task update.`);
      }
    },
  }
}); 