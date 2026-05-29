import type {StructureResolver} from 'sanity/desk';
import {CogIcon, DocumentTextIcon, TagIcon} from '@sanity/icons';

const hiddenFromAutoListTypes = new Set(['episode', 'topic', 'siteSettings']);

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Episodes')
        .id('episode')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('episode').title('Episodes').defaultOrdering([{field: 'publishDate', direction: 'desc'}])),
      S.listItem()
        .title('Topics')
        .id('topic')
        .icon(TagIcon)
        .child(S.documentTypeList('topic').title('Topics').defaultOrdering([{field: 'title', direction: 'asc'}])),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document()
            .title('Site Settings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      ...S.documentTypeListItems().filter((listItem) => !hiddenFromAutoListTypes.has(listItem.getId() ?? '')),
    ]);

export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
