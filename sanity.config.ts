import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {resolveSanityEnv} from './studio/config/env';
import {deskStructure, singletonActions} from './studio/config/deskStructure';
import {schemaTypes} from './studio/schemaTypes/index';

const {projectId, dataset} = resolveSanityEnv();

export default defineConfig({
  name: 'default',
  title: 'Colorado Tech People Studio',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings') {
        return prev.filter(({action}) => action && singletonActions.has(action));
      }

      return prev;
    },
  },
});
