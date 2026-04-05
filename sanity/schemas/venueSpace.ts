import { defineField, defineType } from 'sanity'
export const venueSpace = defineType({
  name: 'venueSpace', title: 'Venue Space', type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Space Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: [{ title: 'Indoor', value: 'indoor' }, { title: 'Outdoor', value: 'outdoor' }, { title: 'Indoor/Outdoor', value: 'both' }], layout: 'radio' } }),
    defineField({ name: 'ceremonyCapacity', title: 'Ceremony Capacity', type: 'number' }),
    defineField({ name: 'receptionCapacity', title: 'Reception Capacity', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 6, validation: (r) => r.required() }),
    defineField({ name: 'images', title: 'Photos', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() })] }] }),
  ],
  preview: { select: { title: 'name', subtitle: 'type', media: 'images.0' }, prepare: ({ title, subtitle, media }) => ({ title, subtitle: (subtitle as string | undefined) ?? '', media: media as object }) },
})
