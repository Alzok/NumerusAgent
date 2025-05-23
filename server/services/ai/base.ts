import { type AIModelConfig } from './config'; // Assuming config.ts is in the same directory

export interface AIModelServiceContext {
  // Could include things like conversation history, user preferences, etc. in the future
  // For now, it remains empty but serves as a placeholder for future enhancements.
}

export interface AIModelService {
  config: AIModelConfig;
  execute(prompt: string, context?: AIModelServiceContext): Promise<string>;
}
