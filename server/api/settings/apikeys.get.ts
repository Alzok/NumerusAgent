import { defineEventHandler } from 'h3';

interface ApiKeysResponse {
  openai: string;
  anthropic: string;
}

export default defineEventHandler(async (event): Promise<ApiKeysResponse> => {
  // TODO: In the future, fetch these from a secure backend store (e.g., database, encrypted user settings)
  // For now, returning placeholders or empty strings to simulate fetching.
  console.log('GET /api/settings/apikeys called (mock response)');
  return {
    openai: '', // Example: 'sk-xxxx...xxxx' if you want to test pre-fill
    anthropic: '',
  };
});
