import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Bio (English)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'bioEs',
      title: 'Bio (Spanish)',
      type: 'text',
      rows: 3
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
})


