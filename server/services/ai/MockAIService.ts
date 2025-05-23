import { type AIModelService, type AIModelServiceContext } from './base';
import { type AIModelConfig } from './config';

export class MockAIService implements AIModelService {
  constructor(public config: AIModelConfig) {}

  async execute(prompt: string, context?: AIModelServiceContext): Promise<string> {
    console.log(`MockAIService (${this.config.modelId}) received prompt: "${prompt}"`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    let response = `Mock response from ${this.config.displayName}: `;

    if (this.config.modelId === "mock/basic-responder") {
      response += `You said "${prompt}". That's interesting!`;
    } else if (this.config.modelId === "mock/advanced-responder") {
      if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("hi")) {
        response += "Hello there! How can I assist you today?";
      } else if (prompt.toLowerCase().includes("help")) {
        response += "I am a mock assistant. I can respond to simple prompts.";
      } else {
        response += `I'm processing your advanced query about "${prompt}". Result: The answer is 42.`;
      }
    } else {
      // Fallback for any other mock models that might be defined but not specifically handled here
      response += `I am a generic mock model (${this.config.modelId}). I received your prompt: "${prompt}".`;
    }
    
    console.log(`MockAIService (${this.config.modelId}) sending response: "${response}"`);
    return response;
  }
}
