import { AIModelService, AIModelServiceContext } from './base'; // Using English interface names
import { AIModelConfig } from './config'; // Using English interface names
import { H3Error } from 'h3'; // For creating errors

export class OpenAIService implements AIModelService {
  public config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  async execute(prompt: string, context?: AIModelServiceContext): Promise<string> {
    const runtimeConfig = useRuntimeConfig();
    // Ensure apiKeyRuntimeConfigKey is not undefined before using it as an index
    if (!this.config.apiKeyRuntimeConfigKey) {
        console.error('apiKeyRuntimeConfigKey is not defined in the model configuration for OpenAIService.');
        throw createError({
            statusCode: 500,
            statusMessage: 'apiKeyRuntimeConfigKey is missing in model config for OpenAIService.'
        });
    }
    const apiKey = runtimeConfig[this.config.apiKeyRuntimeConfigKey as keyof typeof runtimeConfig] as string | undefined;

    if (!apiKey) {
      console.error('OpenAI API key is missing. Key name from config:', this.config.apiKeyRuntimeConfigKey);
      throw createError({ 
        statusCode: 500, 
        statusMessage: `OpenAI API key ('${this.config.apiKeyRuntimeConfigKey}') is not configured on the server. Please set it in the .env file.` 
      });
    }

    if (!this.config.baseUrl) {
      throw createError({ statusCode: 500, statusMessage: 'OpenAI base URL is not configured for this model.' });
    }

    // Extract the actual model name from modelId, e.g., "openai/gpt-3.5-turbo" -> "gpt-3.5-turbo"
    const modelName = this.config.modelId.split('/')[1] || this.config.modelId;

    const requestBody = {
      model: modelName,
      messages: [{ role: 'user', content: prompt }],
      // Add other parameters like temperature, max_tokens if needed from modelConfig or context
    };

    try {
      console.log(`OpenAIService: Calling OpenAI API at ${this.config.baseUrl}/chat/completions for model ${modelName}`);
      const response = await $fetch.raw(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      // console.log('OpenAI API raw response status:', response.status);
      // console.log('OpenAI API raw response body:', response._data);


      if (!response._data || !response._data.choices || response._data.choices.length === 0) {
        console.error('OpenAI API response is missing choices:', response._data);
        throw createError({ statusCode: 500, statusMessage: 'Invalid response structure from OpenAI API.' });
      }

      const messageContent = response._data.choices[0]?.message?.content;

      if (typeof messageContent !== 'string') {
        console.error('OpenAI API response message content is not a string:', messageContent);
        throw createError({ statusCode: 500, statusMessage: 'Invalid message content from OpenAI API.' });
      }
      
      console.log(`OpenAIService: Successfully received response from OpenAI for model ${modelName}.`);
      return messageContent.trim();

    } catch (error: any) {
      // Log the detailed error
      console.error(`Error calling OpenAI API for model ${modelName}:`, error);

      // Check if the error is an H3Error from $fetch (which includes statusCode and data)
      if (error.response && error.response._data) {
        const statusCode = error.response.status || 500;
        // Try to get a more specific message from OpenAI's error structure
        const openAIErrorMessage = error.response._data?.error?.message || error.response.statusText;
        const statusMessage = openAIErrorMessage || 'Failed to call OpenAI API';
        
        // console.error(`OpenAI API Error - Status: ${statusCode}, Message: ${statusMessage}, Details:`, error.response._data);
        throw createError({
          statusCode: statusCode,
          statusMessage: `OpenAI API Error: ${statusMessage} (Model: ${modelName})`,
          data: error.response._data // Include OpenAI's error details if available
        });
      }

      // Fallback for other types of errors (e.g., network issues before response, $fetch internal errors)
      throw createError({
        statusCode: 500,
        statusMessage: `An unexpected error occurred while communicating with OpenAI (Model: ${modelName}). ${error.message || ''}`,
      });
    }
  }
}
