import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schemas} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Stratum PR Blog',
  basePath: '/studio',
  projectId: 's7h6olb5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  
  schema: {
    types: schemas,
  },
  
  plugins: [
    structureTool(), // Sin customStructure
    visionTool({defaultApiVersion: apiVersion}),
  ],
})