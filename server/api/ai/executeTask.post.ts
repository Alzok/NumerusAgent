import { defineEventHandler, readBody, createError } from 'h3';
import { getModelConfig } from '~/server/services/ai/config';
import { MockAIService } from '~/server/services/ai/MockAIService';
// Note: constructModelIdentifier is not used in this file as per current plan
// import { getModelConfig, constructModelIdentifier } from '~/server/services/ai/config';


// Interface for the expected request body
interface ExecuteTaskRequestBody {
  prompt: string;
  modelIdentifier: string; // e.g., "mock/basic-responder"
  services: string[]; // Kept for potential future use
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ExecuteTaskRequestBody>(event);

  // Basic validation for the new request body structure
  if (!body || typeof body.prompt !== 'string' || typeof body.modelIdentifier !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Prompt and modelIdentifier are required.',
    });
  }

  console.log('Received task for AI execution:', {
    prompt: body.prompt,
    modelIdentifier: body.modelIdentifier,
    services: body.services, // Logged if present
  });

  const modelConfig = getModelConfig(body.modelIdentifier);

  if (!modelConfig) {
    throw createError({
      statusCode: 400, // Or 404 if preferred for "resource not found"
      statusMessage: `Invalid model identifier provided: ${body.modelIdentifier}`,
    });
  }

  let aiResponse: string;

  if (modelConfig.provider === 'mock') {
    const service = new MockAIService(modelConfig);
    try {
      // Pass services array as part of context if MockAIService is adapted to use it
      // For now, context is not deeply used by MockAIService, but could be:
      // const context = { services: body.services };
      // aiResponse = await service.execute(body.prompt, context);
      aiResponse = await service.execute(body.prompt);
    } catch (e: any) {
      console.error(`Error during MockAIService execution for ${modelConfig.modelId}:`, e);
      throw createError({
        statusCode: 500,
        statusMessage: `Error processing task with mock service: ${e.message}`,
      });
    }
  } else {
    // Handle other providers in the future (OpenAI, Ollama, etc.)
    console.warn(`Provider '${modelConfig.provider}' not implemented yet for model ${modelConfig.modelId}.`);
    throw createError({
      statusCode: 501,
      statusMessage: `Provider '${modelConfig.provider}' not implemented yet.`,
    });
  }

  return {
    success: true,
    message: `Task processed successfully by ${modelConfig.displayName || modelConfig.modelId}`,
    result: aiResponse,
  };
});
