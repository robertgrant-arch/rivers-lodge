import { defineField, defineType } from 'sanity'
export const weddingPackage = defineType({
  name: 'weddingPackage', title: 'Wedding Package', type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Package Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({ name: 'inclusions', title: "What's Included", type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'capacityMin', title: 'Minimum Capacity', type: 'number' }),
    defineField({ name: 'capacityMax', title: 'Maximum Capacity', type: 'number' }),
    defineField({ name: 'startingPrice', title: 'Starting Price ($)', type: 'number' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'name', subtitle: 'tagline' } },
})
