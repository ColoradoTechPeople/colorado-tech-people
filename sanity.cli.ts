import {defineCliConfig} from 'sanity/cli';
import {resolveSanityEnv} from './studio/config/env';

const {projectId, dataset} = resolveSanityEnv();

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
