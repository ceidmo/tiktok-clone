export const trackEvent = (eventName, properties = {}) => {
  if (process.env.NODE_ENV === 'production') {
    if (window.analytics && typeof window.analytics.track === 'function') {
      try {
        window.analytics.track(eventName, properties);
      } catch (error) {
        console.error('[Analytics] Error sending event:', error);
      }
    } else {
      console.warn('[Analytics] Analytics SDK not initialized or missing "track" method');
    }
  }

  console.log(`[Analytics] Event: ${eventName}`, properties);
