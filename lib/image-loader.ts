type ImageLoaderProps = { src: string; width: number; quality?: number }
export default function imageLoader({ src, width, quality = 85 }: ImageLoaderProps): string {
  const accountHash = process.env['NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH']
  if (accountHash && src.includes('imagedelivery.net')) {
    return `https://imagedelivery.net/${accountHash}/${src}/w=${width},q=${quality}`
  }
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality))
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'max')
    return url.toString()
  }
  return src
}
