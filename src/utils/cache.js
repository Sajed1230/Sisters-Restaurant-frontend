/**
 * Cache utility for menu data with expiration
 */

const CACHE_KEY = 'sisters-menu-cache';
const CACHE_TIMESTAMP_KEY = 'sisters-menu-cache-timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Get cached menu data if it exists and is not expired
 * @returns {Object|null} Cached menu data or null if expired/missing
 */
export const getCachedMenuData = () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cachedData || !cachedTimestamp) {
      return null;
    }
    
    const now = Date.now();
    const cacheAge = now - parseInt(cachedTimestamp, 10);
    
    // Check if cache is still valid (not expired)
    if (cacheAge < CACHE_DURATION) {
      console.log(`✅ Using cached menu data (${Math.round(cacheAge / 1000)}s old)`);
      return JSON.parse(cachedData);
    } else {
      console.log(`⏰ Cache expired (${Math.round(cacheAge / 1000)}s old, max ${CACHE_DURATION / 1000}s)`);
      // Clear expired cache
      clearMenuCache();
      return null;
    }
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

/**
 * Save menu data to cache with timestamp
 * @param {Object} menuData - Menu data to cache
 */
export const setCachedMenuData = (menuData) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(menuData));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    console.log('💾 Menu data cached successfully');
  } catch (error) {
    console.error('Error saving cache:', error);
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('⚠️ LocalStorage quota exceeded, clearing old cache');
      clearMenuCache();
    }
  }
};

/**
 * Clear menu data cache
 */
export const clearMenuCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log('🗑️ Cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Check if cache exists and is valid
 * @returns {boolean} True if valid cache exists
 */
export const hasValidCache = () => {
  return getCachedMenuData() !== null;
};

/**
 * Get cache age in seconds
 * @returns {number} Cache age in seconds, or 0 if no cache
 */
export const getCacheAge = () => {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!cachedTimestamp) {
      return 0;
    }
    const now = Date.now();
    const cacheAge = now - parseInt(cachedTimestamp, 10);
    return Math.round(cacheAge / 1000);
  } catch (error) {
    return 0;
  }
};

