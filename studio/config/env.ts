type ResolvedSanityEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

const DEFAULT_DATASET = 'development';
const DEFAULT_API_VERSION = '2026-01-01';

function firstNonEmpty(...values: Array<string | undefined>) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }

  return undefined;
}

function readEnv() {
  return {
    studioProjectId: process.env.SANITY_STUDIO_PROJECT_ID,
    publicProjectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    studioDataset: process.env.SANITY_STUDIO_DATASET,
    publicDataset: process.env.PUBLIC_SANITY_DATASET,
    studioApiVersion: process.env.SANITY_STUDIO_API_VERSION,
    publicApiVersion: process.env.PUBLIC_SANITY_API_VERSION,
  };
}

export function resolveSanityEnv(): ResolvedSanityEnv {
  const env = readEnv();
  const projectId = firstNonEmpty(env.studioProjectId, env.publicProjectId) ?? '';
  const dataset =
    firstNonEmpty(env.studioDataset, env.publicDataset) ?? DEFAULT_DATASET;
  const apiVersion =
    firstNonEmpty(env.studioApiVersion, env.publicApiVersion) ??
    DEFAULT_API_VERSION;

  if (!projectId) {
    throw new Error(
      'Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID.'
    );
  }

  return {projectId, dataset, apiVersion};
}
