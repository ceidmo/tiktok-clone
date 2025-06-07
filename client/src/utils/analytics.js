export const trackEvent = (eventName, properties = {}) => {
  const event = {
    name: eventName,
    properties,
    timestamp: new Date().toISOString(),
  };

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
  } else {
    // Store in localStorage for development dashboard
    console.log(`[Analytics] Event: ${eventName}`, properties);
    try {
      const current = JSON.parse(localStorage.getItem('dev_events')) || [];
      current.push(event);
      localStorage.setItem('dev_events', JSON.stringify(current));
    } catch (err) {
      console.error('[Analytics] Failed to save event to localStorage:', err);
    }
  }
};
