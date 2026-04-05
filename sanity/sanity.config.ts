import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { publicConfig } from '@/lib/config'
import { seasonUpdate } from './schemas/seasonUpdate'
import { memberEvent } from './schemas/memberEvent'
import { weddingPackage } from './schemas/weddingPackage'
import { venueSpace } from './schemas/venueSpace'
import { propertyUpdate } from './schemas/propertyUpdate'
import { mediaAsset } from './schemas/mediaAsset'

export default defineConfig({
  name: 'rivers-lodge', title: 'Rivers Lodge & Hunt Club',
  projectId: publicConfig.sanity.projectId,
  dataset: publicConfig.sanity.dataset,
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Rivers Lodge').items([
        S.listItem().title('Property Updates').schemaType('propertyUpdate').child(S.documentTypeList('propertyUpdate').title('Property Updates')),
        S.listItem().title('Season Intelligence').schemaType('seasonUpdate').child(S.list().title('Seasons').items([
          S.listItem().title('Deer').child(S.documentTypeList('seasonUpdate').title('Deer Season').filter('_type == "seasonUpdate" && season == "deer"')),
          S.listItem().title('Duck').child(S.documentTypeList('seasonUpdate').title('Duck Season').filter('_type == "seasonUpdate" && season == "duck"')),
          S.listItem().title('Turkey').child(S.documentTypeList('seasonUpdate').title('Turkey Season').filter('_type == "seasonUpdate" && season == "turkey"')),
        ])),
        S.divider(),
        S.listItem().title('Member Events').schemaType('memberEvent').child(S.documentTypeList('memberEvent').title('Member Events')),
        S.divider(),
        S.listItem().title('Wedding Packages').schemaType('weddingPackage').child(S.documentTypeList('weddingPackage').title('Packages')),
        S.listItem().title('Venue Spaces').schemaType('venueSpace').child(S.documentTypeList('venueSpace').title('Venue Spaces')),
        S.divider(),
        S.listItem().title('Media Library').schemaType('mediaAsset').child(S.documentTypeList('mediaAsset').title('Media Assets')),
      ]),
    }),
    visionTool(),
  ],
  schema: { types: [seasonUpdate, memberEvent, weddingPackage, venueSpace, propertyUpdate, mediaAsset] },
})
