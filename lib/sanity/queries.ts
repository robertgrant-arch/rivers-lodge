import { sanityClient } from './client'
export interface SanityPropertyUpdate { _id: string; title: string; body: string; publishedAt: string; category: 'water_conditions' | 'game_activity' | 'property' | 'events' }
export interface SanitySeasonUpdate { _id: string; season: 'deer' | 'duck' | 'turkey'; title: string; body: string; publishedAt: string; seasonStatus: 'open' | 'closed' | 'upcoming'; visibility: 'members_only' | 'public_teaser'; images: { asset: { url: string; _id: string }; alt?: string }[] }
export interface SanityWeddingPackage { _id: string; name: string; tagline: string; description: string; inclusions: string[]; capacityMin?: number; capacityMax?: number; startingPrice?: number; displayOrder: number }
export interface SanityVenueSpace { _id: string; name: string; type: 'indoor' | 'outdoor' | 'both'; ceremonyCapacity?: number; receptionCapacity?: number; description: string; images: { asset: { url: string }; alt?: string; hotspot?: { x: number; y: number } }[] }
export interface SanityMediaAsset { _id: string; title?: string; altText: string; isFeatured: boolean; section: string; subject: string[]; season: string[]; visibility: 'public' | 'members-only' | 'staff-only'; asset: { url: string; _id: string; metadata: { dimensions: { width: number; height: number } } } }

export async function getPropertyUpdates(): Promise<SanityPropertyUpdate[]> {
  return sanityClient.fetch(`*[_type == "propertyUpdate"] | order(publishedAt desc) [0...3] { _id, title, body, publishedAt, category }`)
}
export async function getSeasonUpdates(): Promise<SanitySeasonUpdate[]> {
  return sanityClient.fetch(`*[_type == "seasonUpdate" && visibility == "members_only"] | order(publishedAt desc) { _id, season, title, body, publishedAt, seasonStatus, visibility, images[] { asset -> { url, _id }, alt } }`)
}
export async function getWeddingPackages(): Promise<SanityWeddingPackage[]> {
  return sanityClient.fetch(`*[_type == "weddingPackage"] | order(displayOrder asc) { _id, name, tagline, description, inclusions, capacityMin, capacityMax, startingPrice, displayOrder }`)
}
export async function getVenueSpaces(): Promise<SanityVenueSpace[]> {
  return sanityClient.fetch(`*[_type == "venueSpace"] | order(_createdAt asc) { _id, name, type, ceremonyCapacity, receptionCapacity, description, images[] { asset -> { url }, alt, hotspot } }`)
}
export async function getGalleryImages(section: string, limit = 20, visibilityFilter: 'public' | 'members-only' = 'public'): Promise<SanityMediaAsset[]> {
  return sanityClient.fetch(`*[_type == "mediaAsset" && section == $section && visibility == $visibility] | order(_createdAt desc) [0...$limit] { _id, title, altText, isFeatured, section, subject, season, visibility, asset -> { url, _id, metadata { dimensions { width, height } } } }`, { section, visibility: visibilityFilter, limit })
}
