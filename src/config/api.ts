export const getApiUrl = (path: string): string => {
  const base = (import.meta.env.VITE_BACKEND_URL as string | undefined) || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base.replace(/\/$/, '')}${cleanPath}` : cleanPath;
};

export const getWebSocketUrl = (): string => {
  const configured = import.meta.env.VITE_WS_URL as string | undefined;
  if (configured && configured.trim()) {
    let url = configured.trim();
    if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      url = `${proto}//${url}`;
    }
    if (!url.includes('/ws-presence')) {
      url = `${url.replace(/\/$/, '')}/ws-presence`;
    }
    return url;
  }
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws-presence`;
};
