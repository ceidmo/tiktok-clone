const sizes = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px',
};

export const devices = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(max-width: ${sizes.desktop})`,
};

// Optional: Add mixin functions if you're using CSS-in-JS
export const mobile = `@media ${devices.mobile}`;
export const tablet = `@media ${devices.tablet}`;
export const laptop = `@media ${devices.laptop}`;
export const desktop = `@media ${devices.desktop}`;
