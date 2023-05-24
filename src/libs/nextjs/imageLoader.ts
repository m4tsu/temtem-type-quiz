import type { ImageLoader } from 'next/image'

export const imageLoader: ImageLoader = (p) => p.src
