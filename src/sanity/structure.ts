import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
        ),
      S.listItem()
        .title('Authors')
        .child(
          S.documentTypeList('author')
            .title('Authors')
        ),
    ])
