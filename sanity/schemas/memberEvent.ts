import { defineField, defineType } from 'sanity'
export const memberEvent = defineType({
  name: 'memberEvent', title: 'Member Event', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'eventDate', title: 'Date & Time', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'capacity', title: 'Max Capacity', type: 'number' }),
    defineField({ name: 'host', title: 'Hosted by', type: 'string' }),
    defineField({ name: 'image', title: 'Event Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'visibility', title: 'Visibility', type: 'string', initialValue: 'all_members', options: { list: [{ title: 'All Members', value: 'all_members' }] } }),
    defineField({ name: 'supabaseId', title: 'Supabase ID', type: 'string', readOnly: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'eventDate', media: 'image' }, prepare: ({ title, subtitle, media }) => ({ title: title as string, subtitle: subtitle ? new Date(subtitle as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '', media: media as object }) },
})
