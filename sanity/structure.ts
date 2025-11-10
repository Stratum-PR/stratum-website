// @ts-ignore - StructureResolver type is available at runtime
export const customStructure = (S: any) =>
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
      S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects / Case Studies')
        ),
    ])

