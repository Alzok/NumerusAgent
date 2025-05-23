import { defineEventHandler, createError } from 'h3'; // Added createError
import { aiModels, type AIModelConfig } from '~/server/services/ai/config'; // Adjust path if needed

// Define the structure for the frontend
interface FrontendSelectableModel {
  title: string;
  value: string; // This will be the modelId
  provider?: string; // Optional: pass provider info if useful for frontend logic
  // Potentially add other fields like 'description', 'capabilities' in the future
}

export default defineEventHandler(async (event) => {
  try {
    const selectableModels: FrontendSelectableModel[] = Object.values(aiModels)
      .map((modelConfig: AIModelConfig) => ({
        title: modelConfig.displayName || modelConfig.modelId,
        value: modelConfig.modelId, // e.g., "openai/gpt-3.5-turbo" or "mock/basic-responder"
        provider: modelConfig.provider,
        // Add any other flags like modelConfig.requiresApiKey if you want to inform the frontend
      }));

    // Optional: Add a default "Select a model" option if TaskModal doesn't handle it
    // selectableModels.unshift({ title: 'Select a model', value: '', provider: '' });
    
    return selectableModels;

  } catch (error: any) {
    console.error('Error fetching AI model configurations:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not retrieve AI model configurations.',
    });
  }
});
