import { defineEventHandler, createError } from 'h3';
import fs from 'node:fs/promises';
import path from 'node:path';

interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default defineEventHandler(async (event): Promise<ServiceConfig[]> => {
  // Construct the path to the services.json file
  // process.cwd() gives the root of the Nuxt project
  const filePath = path.join(process.cwd(), 'server', 'data', 'services.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const services: ServiceConfig[] = JSON.parse(fileContent);
    return services;
  } catch (error: any) {
    console.error(`Error reading or parsing services.json from ${filePath}:`, error);
    
    // Check for specific file not found error
    if (error.code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Service configuration file (services.json) not found.',
      });
    }
    
    // For other errors (e.g., JSON parsing error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not retrieve service configurations due to a server error.',
    });
  }
});
