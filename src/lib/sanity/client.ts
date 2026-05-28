import { createClient } from '@sanity/client';

const requiredEnvVars = {
  PUBLIC_SANITY_PROJECT_ID: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET: import.meta.env.PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_API_VERSION: import.meta.env.PUBLIC_SANITY_API_VERSION,
};

const missingEnvVarNames = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([name]) => name);

function getMissingEnvError() {
  return new Error(
    `Sanity client is not configured. Missing required public environment variable(s): ${missingEnvVarNames.join(', ')}.`
  );
}

export function isSanityConfigured() {
  return missingEnvVarNames.length === 0;
}

export function getSanityClient() {
  if (!isSanityConfigured()) {
    throw getMissingEnvError();
  }

  return createClient({
    projectId: requiredEnvVars.PUBLIC_SANITY_PROJECT_ID,
    dataset: requiredEnvVars.PUBLIC_SANITY_DATASET,
    apiVersion: requiredEnvVars.PUBLIC_SANITY_API_VERSION,
    useCdn: true,
    perspective: 'published',
  });
}

export const sanityClient = isSanityConfigured() ? getSanityClient() : null;
