export interface AIProviderConfig {
  apiKeyRuntimeConfigKey?: string; // New: e.g., 'openaiApiKey' which matches runtimeConfig key
  baseUrl?: string;      // e.g., 'https://api.openai.com/v1' or 'http://localhost:11434/api' for Ollama
  // Add other common provider-specific settings if needed later
}

export interface AIModelConfig extends AIProviderConfig {
  modelId: string; // Fully qualified model ID, e.g., "openai/gpt-3.5-turbo" or "ollama/mistral"
  provider: string; // e.g., "openai", "ollama", "mock"
  displayName: string; // e.g., "GPT-3.5 Turbo (OpenAI)"
  // Potentially add model-specific params here later
}

export const aiModels: Record<string, AIModelConfig> = {
  "openai/gpt-3.5-turbo": { // Example for a future real model
    modelId: "openai/gpt-3.5-turbo",
    provider: "openai",
    displayName: "GPT-3.5 Turbo (OpenAI)",
    apiKeyRuntimeConfigKey: "openaiApiKey", // Reference to the key in runtimeConfig
    baseUrl: "https://api.openai.com/v1",
  },
  "anthropic/claude-3-opus": { // Example for a future real model
    modelId: "anthropic/claude-3-opus",
    provider: "anthropic",
    displayName: "Claude 3 Opus (Anthropic)",
    apiKeyRuntimeConfigKey: "anthropicApiKey",
    baseUrl: "https://api.anthropic.com/v1", // Check actual Anthropic API base URL
  },
  // Example for a future Ollama model - usually no API key needed for local Ollama
  // "ollama/mistral": {
  //   modelId: "ollama/mistral",
  //   provider: "ollama",
  //   displayName: "Mistral (Ollama)",
  //   baseUrl: "http://localhost:11434/api", 
  // },
  "mock/basic-responder": {
    modelId: "mock/basic-responder",
    provider: "mock",
    displayName: "Basic Responder (Mock)",
    // No apiKeyRuntimeConfigKey needed
  },
  "mock/advanced-responder": {
    modelId: "mock/advanced-responder",
    provider: "mock",
    displayName: "Advanced Responder (Mock)",
  }
};

export function getModelConfig(modelIdentifier: string): AIModelConfig | undefined {
  return aiModels[modelIdentifier];
}

// Helper function to construct a model identifier from provider and name
export function constructModelIdentifier(provider: string | null, name: string | null): string | null {
  if (provider && name) {
    // Normalize provider to lowercase for consistent key lookup
    return `${provider.toLowerCase()}/${name}`;
  }
  return null;
}
