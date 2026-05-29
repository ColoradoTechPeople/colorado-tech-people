import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';

function applyEnvFile(path) {
  if (!existsSync(path)) return;

  const source = readFileSync(path, 'utf8');
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    if (!key) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

const cwd = process.cwd();
applyEnvFile(resolve(cwd, '.env'));
applyEnvFile(resolve(cwd, '.env.local'));

if (!process.env.SANITY_STUDIO_PROJECT_ID && process.env.PUBLIC_SANITY_PROJECT_ID) {
  process.env.SANITY_STUDIO_PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID;
}

if (!process.env.SANITY_STUDIO_DATASET && process.env.PUBLIC_SANITY_DATASET) {
  process.env.SANITY_STUDIO_DATASET = process.env.PUBLIC_SANITY_DATASET;
}

if (!process.env.SANITY_STUDIO_API_VERSION && process.env.PUBLIC_SANITY_API_VERSION) {
  process.env.SANITY_STUDIO_API_VERSION = process.env.PUBLIC_SANITY_API_VERSION;
}

const sanityBin = resolve(cwd, 'node_modules/sanity/bin/sanity');
const sanityArgs = process.argv.slice(2);

const child = spawn(process.execPath, [sanityBin, ...sanityArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
