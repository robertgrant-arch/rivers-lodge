import { defineField, defineType } from 'sanity'
export const propertyUpdate = defineType({
  name: 'propertyUpdate', title: 'Property Update', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Date', type: 'datetime', validation: (r) => r.required(), initialValue: () => new Date().toISOString() }),
    defineField({ name: 'body', title: 'Update', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Water Conditions', value: 'water_conditions' }, { title: 'Game Activity', value: 'game_activity' }, { title: 'Property', value: 'property' }, { title: 'Events', value: 'events' }], layout: 'radio' } }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt' }, prepare: ({ title, subtitle }) => ({ title: title as string, subtitle: subtitle ? new Date(subtitle as string).toLocaleDateString() : '' }) },
})
