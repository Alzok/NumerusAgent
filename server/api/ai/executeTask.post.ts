import { defineEventHandler, readBody, createError, H3Error } from 'h3';
import { getModelConfig } from '~/server/services/ai/config';
import { type AIModelService } from '~/server/services/ai/base'; // Import base interface
import { MockAIService } from '~/server/services/ai/MockAIService';
import { OpenAIService } from '~/server/services/ai/OpenAIService'; // Import OpenAIService


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

  let service: AIModelService; // Use the base interface type

  if (modelConfig.provider === 'mock') {
    service = new MockAIService(modelConfig);
  } else if (modelConfig.provider === 'openai') {
    service = new OpenAIService(modelConfig);
  } else {
    console.error(`Unsupported AI provider: ${modelConfig.provider} for model ${body.modelIdentifier}`);
    throw createError({
      statusCode: 501,
      statusMessage: `AI Provider '${modelConfig.provider}' is not implemented yet for model '${body.modelIdentifier}'.`
    });
  }

  try {
    // const context = { services: body.services }; // Future: pass context
    const aiResponse = await service.execute(body.prompt /*, context */);
    return {
      success: true,
      message: `Task processed successfully by ${modelConfig.displayName || modelConfig.modelId}`,
      result: aiResponse,
    };
  } catch (error: any) {
    // Log the error with more context before re-throwing or creating a new error
    console.error(`Error during service execution for model ${modelConfig.modelId} (Provider: ${modelConfig.provider}):`, error);
    
    // Check if the error is already an H3Error (thrown by the service)
    // H3Error has a 'statusCode' property.
    if (error instanceof H3Error || error.statusCode) {
        throw error; // Re-throw it directly
    }
    
    // For other types of errors, wrap them in a generic H3Error
    throw createError({
      statusCode: 500,
      statusMessage: `An error occurred while executing task with ${modelConfig.displayName || modelConfig.modelId}. ${error.message || 'Unknown error'}`,
    });
  }
});
