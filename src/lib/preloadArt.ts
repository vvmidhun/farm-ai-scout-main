const preloadLinks = new Map<string, HTMLLinkElement>()

export function setLcpPreload(url: string | undefined | null): void {
  if (typeof document === 'undefined') return
  if (!url) return
  try {
    const existing = document.querySelector<HTMLLinkElement>(
      'link[rel="preload"][as="image"][data-lcp-preload]',
    )
    if (existing && existing.href.endsWith(url.split('/').pop() ?? '')) return
    if (existing) existing.remove()
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    link.dataset.lcpPreload = 'true'
    if (url.toLowerCase().endsWith('.webp')) link.type = 'image/webp'
    document.head.appendChild(link)
  } catch {
    /* ignore */
  }
}

export function preloadUrls(
  urls: readonly string[],
  priority: 'high' | 'auto' | 'low' = 'auto',
  delayMs = 0,
): Promise<void> {
  if (typeof window === 'undefined' || urls.length === 0) return Promise.resolve()

  const run = () => {
    for (const url of urls) {
      if (!url) continue
      const existing = preloadLinks.get(url)
      if (existing) continue
      if (priority === 'high') {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = url
        link.imageSrcset = ''
        if (url.toLowerCase().endsWith('.webp')) link.type = 'image/webp'
        document.head.appendChild(link)
        preloadLinks.set(url, link)
      } else {
        const img = new Image()
        img.decoding = 'async'
        img.fetchPriority = priority === 'low' ? 'low' : 'auto'
        img.src = url
      }
    }
  }

  if (delayMs <= 0) {
    run()
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    window.setTimeout(() => {
      run()
      resolve()
    }, delayMs)
  })
}
