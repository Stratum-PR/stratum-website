import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project / Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'titleEs',
      title: 'Title (Spanish)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client Name (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'clientEs',
      title: 'Client Name (Spanish)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sector',
      title: 'Sector (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sectorEs',
      title: 'Sector (Spanish)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary (English)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'summaryEs',
      title: 'Summary (Spanish)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge (English)',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'challengeEs',
      title: 'Challenge (Spanish)',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'solution',
      title: 'Solution (English)',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'solutionEs',
      title: 'Solution (Spanish)',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'results',
      title: 'Results (English)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'resultsEs',
      title: 'Results (Spanish)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'timelineEs',
      title: 'Timeline (Spanish)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Size (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'teamSizeEs',
      title: 'Team Size (Spanish)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide Icon)',
      type: 'string',
      description: 'Name of the Lucide icon (e.g., Brain, ActivitySquare)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (English)',
      type: 'string',
      description: 'Optional: Custom SEO title (defaults to title if empty)'
    }),
    defineField({
      name: 'seoTitleEs',
      title: 'SEO Title (Spanish)',
      type: 'string',
      description: 'Optional: Custom SEO title (defaults to titleEs if empty)'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (English)',
      type: 'text',
      rows: 2,
      description: 'Optional: Custom SEO description'
    }),
    defineField({
      name: 'seoDescriptionEs',
      title: 'SEO Description (Spanish)',
      type: 'text',
      rows: 2,
      description: 'Optional: Custom SEO description'
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords (English)',
      type: 'string',
      description: 'Comma-separated keywords for SEO'
    }),
    defineField({
      name: 'seoKeywordsEs',
      title: 'SEO Keywords (Spanish)',
      type: 'string',
      description: 'Comma-separated keywords for SEO'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'mainImage',
      featured: 'featured'
    },
    prepare(selection) {
      const { featured } = selection
      return { 
        ...selection, 
        subtitle: `${selection.subtitle}${featured ? ' • Featured' : ''}`
      }
    }
  }
})

