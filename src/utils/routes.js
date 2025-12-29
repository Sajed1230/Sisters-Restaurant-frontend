/**
 * Obfuscated route paths - random-looking hashes
 * This makes routes less obvious and more secure
 */

// Generate random-looking but consistent route hashes
const generateRouteHash = (seed) => {
  // Simple hash function to create consistent "random" strings
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to base36 and add random-looking characters
  const base36 = Math.abs(hash).toString(36);
  const randomChars = 'x7k9m2p5q8w3n6v4b1c9d8f2';
  const randomSuffix = randomChars.substring(
    Math.abs(hash) % randomChars.length,
    Math.abs(hash) % randomChars.length + 6
  );
  return `${base36}${randomSuffix}`.substring(0, 14).replace(/\s/g, '');
};

// Route mappings - obfuscated paths
export const ROUTES = {
  HOME: generateRouteHash('home'),
  MENU: generateRouteHash('menu'),
  // Add more routes here as needed
};

// Reverse lookup for navigation
export const getRoutePath = (routeName) => {
  return `#/${ROUTES[routeName]}`;
};

// Check if current hash matches a route
export const matchRoute = (hash) => {
  const cleanHash = hash.replace('#/', '').replace('#', '');
  return Object.entries(ROUTES).find(([_, value]) => value === cleanHash)?.[0];
};

// Get current route name from hash
export const getCurrentRoute = () => {
  const hash = window.location.hash;
  return matchRoute(hash) || 'HOME';
};

