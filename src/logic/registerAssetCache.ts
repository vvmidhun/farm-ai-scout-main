export function registerAssetCache(): void {
  if (typeof window === 'undefined') return
  if (!('serviceWorker' in navigator)) return
  const onLoad = () => {
    const base = import.meta.env.BASE_URL ?? '/'
    const swUrl = new URL('sw.js', window.location.origin + base).href
    void navigator.serviceWorker.register(swUrl, { scope: base }).catch(() => undefined)
  }
  if (document.readyState === 'complete') {
    onLoad()
  } else {
    window.addEventListener('load', onLoad, { once: true })
  }
}
