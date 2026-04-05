import { defineField, defineType } from 'sanity'
export const mediaAsset = defineType({
  name: 'mediaAsset', title: 'Media Asset', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'asset', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'altText', title: 'Alt Text', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'isFeatured', title: 'Featured (spans 2 columns)', type: 'boolean', initialValue: false }),
    defineField({ name: 'section', title: 'Site Section', type: 'string', options: { list: ['home','estate','weddings','events','lodging','gallery','membership','members-portal'].map(v => ({ title: v.charAt(0).toUpperCase() + v.slice(1), value: v })) } }),
    defineField({ name: 'subject', title: 'Subject Tags', type: 'array', of: [{ type: 'string' }], options: { list: ['landscape','interior','couple','ceremony','reception','wildlife','water','aerial','people'].map(v => ({ title: v.charAt(0).toUpperCase() + v.slice(1), value: v })), layout: 'grid' } }),
    defineField({ name: 'season', title: 'Season Tags', type: 'array', of: [{ type: 'string' }], options: { list: ['spring','summer','fall','winter','deer','duck','turkey'].map(v => ({ title: v.charAt(0).toUpperCase() + v.slice(1), value: v })), layout: 'grid' } }),
    defineField({ name: 'visibility', title: 'Visibility', type: 'string', initialValue: 'public', options: { list: [{ title: 'Public', value: 'public' }, { title: 'Members Only', value: 'members-only' }, { title: 'Staff Only', value: 'staff-only' }], layout: 'radio' } }),
  ],
  preview: { select: { title: 'title', section: 'section', media: 'asset' }, prepare: ({ title, section, media }) => ({ title: (title as string | undefined) ?? 'Untitled', subtitle: section as string | undefined, media: media as object }) },
})
