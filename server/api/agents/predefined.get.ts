import { promises as fs } from 'fs';
import path from 'path';
import { defineEventHandler } from 'h3';

// Type pour la configuration d'un agent (peut être affiné)
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

export default defineEventHandler(async (event) => {
  // Chemin vers le dossier des agents prédéfinis
  // Utilise process.cwd() pour obtenir le répertoire de travail actuel du serveur
  const agentsDir = path.join(process.cwd(), 'server', 'data', 'agents');
  let agentConfigs: AgentConfig[] = [];

  try {
    // Lire les noms des fichiers dans le dossier
    const filenames = await fs.readdir(agentsDir);

    // Filtrer pour ne garder que les fichiers .json
    const jsonFiles = filenames.filter(filename => path.extname(filename) === '.json');

    // Lire et parser chaque fichier JSON
    for (const filename of jsonFiles) {
      const filePath = path.join(agentsDir, filename);
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const config = JSON.parse(fileContent) as AgentConfig;
        // Validation simple (pourrait être plus robuste avec Zod/Valibot)
        if (config && config.id && config.name) {
            agentConfigs.push(config);
        } else {
            console.warn(`Invalid or incomplete config found in ${filename}`);
        }
      } catch (parseError) {
        console.error(`Error parsing JSON from file ${filename}:`, parseError);
        // Ne pas bloquer si un fichier est mal formé
      }
    }

    return agentConfigs;

  } catch (error) {
    console.error('Error reading predefined agents directory:', error);
    // Retourner une erreur H3 appropriée
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Could not read agent configurations',
    });
  }
}); 