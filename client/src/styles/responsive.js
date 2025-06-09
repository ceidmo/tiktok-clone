// /src/styles/responsive.js

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

// TikTok-specific responsive breakpoints
export const tiktokBreakpoints = {
  mobile: `(max-width: ${size.tablet})`, // 0-768px
  tablet: `(min-width: ${size.tablet}) and (max-width: ${size.laptop})`, // 768-1024px
  desktop: `(min-width: ${size.laptop})` // 1024px+
};

// Responsive layout helpers
export const responsiveHelpers = {
  // Hide elements based on screen size
  hideOnMobile: `@media ${tiktokBreakpoints.mobile} { display: none !important; }`,
  hideOnTablet: `@media ${tiktokBreakpoints.tablet} { display: none !important; }`,
  hideOnDesktop: `@media ${tiktokBreakpoints.desktop} { display: none !important; }`,

  // Show elements based on screen size
  showOnMobile: `@media not all and ${tiktokBreakpoints.mobile} { display: none !important; }`,
  showOnTablet: `@media not all and ${tiktokBreakpoints.tablet} { display: none !important; }`,
  showOnDesktop: `@media not all and ${tiktokBreakpoints.desktop} { display: none !important; }`
};

// Common responsive values
export const responsiveValues = {
  // Container widths
  containerWidth: {
    mobile: '100%',
    tablet: '90%',
    desktop: '80%',
    maxWidth: '1200px'
  },

  // Padding
  pagePadding: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px'
  },

  // Font sizes
  fontSize: {
    small: {
      mobile: '12px',
      desktop: '14px'
    },
    medium: {
      mobile: '14px',
      desktop: '16px'
    },
    large: {
      mobile: '18px',
      desktop: '20px'
    },
    xlarge: {
      mobile: '22px',
      desktop: '24px'
    }
  }
};

// TikTok-specific responsive styles
export const tiktokStyles = {
  // Video player dimensions
  videoPlayer: {
    mobile: {
      width: '100vw',
      height: 'calc(100vh - 120px)' // Account for bottom nav
    },
    desktop: {
      width: '375px', // Similar to mobile device width
      height: '667px'
    }
  },

  // Bottom navigation
  bottomNav: {
    height: {
      mobile: '60px',
      desktop: '70px'
    },
    padding: {
      mobile: '8px 0',
      desktop: '12px 0'
    }
  },

  // Sidebar (for desktop)
  sidebar: {
    width: {
      collapsed: '72px',
      expanded: '240px'
    }
  }
};

// Helper function to get responsive value
export const getResponsiveValue = (values, currentDevice) => {
  if (currentDevice === 'mobile') return values.mobile || values.default;
  if (currentDevice === 'tablet') return values.tablet || values.mobile || values.default;
  return values.desktop || values.tablet || values.mobile || values.default;
};

// Media query generator
export const mediaQuery = (breakpoint, styles) => {
  return `@media ${breakpoint} { ${styles} }`;
};

