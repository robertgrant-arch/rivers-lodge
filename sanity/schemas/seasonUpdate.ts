import { defineField, defineType } from 'sanity'
export const seasonUpdate = defineType({
  name: 'seasonUpdate', title: 'Season Update', type: 'document',
  fields: [
    defineField({ name: 'season', title: 'Season', type: 'string', validation: (r) => r.required(), options: { list: [{ title: 'Deer', value: 'deer' }, { title: 'Duck', value: 'duck' }, { title: 'Turkey', value: 'turkey' }], layout: 'radio' } }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Date', type: 'datetime', validation: (r) => r.required(), initialValue: () => new Date().toISOString() }),
    defineField({ name: 'body', title: 'Update', type: 'text', rows: 4, validation: (r) => r.required().max(150) }),
    defineField({ name: 'images', title: 'Cell Cam Photos', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })] }], validation: (r) => r.max(4) }),
    defineField({ name: 'seasonStatus', title: 'Season Status', type: 'string', initialValue: 'open', options: { list: [{ title: 'Open', value: 'open' }, { title: 'Closed', value: 'closed' }, { title: 'Upcoming', value: 'upcoming' }], layout: 'radio' } }),
    defineField({ name: 'visibility', title: 'Visibility', type: 'string', initialValue: 'members_only', options: { list: [{ title: 'Members only', value: 'members_only' }, { title: 'Public teaser', value: 'public_teaser' }], layout: 'radio' } }),
  ],
  preview: { select: { title: 'title', subtitle: 'season', date: 'publishedAt' }, prepare: ({ title, subtitle, date }) => ({ title: title as string, subtitle: `${(subtitle as string).charAt(0).toUpperCase() + (subtitle as string).slice(1)} · ${new Date(date as string).toLocaleDateString()}` }) },
})
