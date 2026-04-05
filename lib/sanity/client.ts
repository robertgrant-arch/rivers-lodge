import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { publicConfig } from '@/lib/config'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: publicConfig.sanity.projectId,
  dataset: publicConfig.sanity.dataset,
  apiVersion: publicConfig.sanity.apiVersion,
  useCdn: true,
  perspective: 'published',
})
export function createSanityWriteClient() {
  const token = process.env['SANITY_API_TOKEN']
  if (!token) throw new Error('SANITY_API_TOKEN is not set')
  return createClient({ projectId: publicConfig.sanity.projectId, dataset: publicConfig.sanity.dataset, apiVersion: publicConfig.sanity.apiVersion, token, useCdn: false })
}
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource) { return builder.image(source) }
export function urlForWidth(source: SanityImageSource, width: number, quality = 85): string {
  return builder.image(source).width(width).quality(quality).auto('format').url()
}
