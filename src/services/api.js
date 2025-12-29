import { getCachedMenuData, setCachedMenuData } from '../utils/cache.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sisters-restaurant-backend.onrender.com/api';

/**
 * Fetch all menu items from the backend API with caching
 * @param {boolean} forceRefresh - Force refresh from API, bypass cache
 * @returns {Promise<Object>} Menu data organized by category
 */
export const fetchMenuData = async (forceRefresh = false) => {
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cachedData = getCachedMenuData();
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    console.log('🌐 Fetching menu data from API...');
    const response = await fetch(`${API_BASE_URL}/menu`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Ensure all categories exist with empty arrays if missing
    const categories = ['appetizers', 'mainDishes', 'grills', 'desserts', 'beverages', 'sandwiches'];
    const menuData = {};
    
    categories.forEach(category => {
      menuData[category] = data[category] || [];
    });
    
    // Cache the fetched data
    setCachedMenuData(menuData);
    
    return menuData;
  } catch (error) {
    console.error('Error fetching menu data from API:', error);
    
    // Try to return cached data as fallback
    const cachedData = getCachedMenuData();
    if (cachedData) {
      console.log('⚠️ Using cached data as fallback due to API error');
      return cachedData;
    }
    
    // Return empty structure if no cache available
    return {
      appetizers: [],
      mainDishes: [],
      grills: [],
      desserts: [],
      beverages: [],
      sandwiches: []
    };
  }
};

/**
 * Fetch items by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of menu items
 */
export const fetchItemsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/${category}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} items:`, error);
    return [];
  }
};

