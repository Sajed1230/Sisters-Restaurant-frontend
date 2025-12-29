import { getDefaultMenuData } from '../data/menuData'

const STORAGE_KEY = 'sister-restaurant-menu'

export const getMenuData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with default to ensure all categories exist
      const defaultData = getDefaultMenuData()
      return {
        appetizers: parsed.appetizers || defaultData.appetizers,
        mainDishes: parsed.mainDishes || defaultData.mainDishes,
        grills: parsed.grills || defaultData.grills,
        desserts: parsed.desserts || defaultData.desserts,
        beverages: parsed.beverages || defaultData.beverages,
        sandwiches: parsed.sandwiches || defaultData.sandwiches
      }
    }
  } catch (error) {
    console.error('Error loading menu data:', error)
  }
  return getDefaultMenuData()
}

export const saveMenuData = (menuData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData))
  } catch (error) {
    console.error('Error saving menu data:', error)
  }
}

export const resetMenuData = () => {
  const defaultData = getDefaultMenuData()
  saveMenuData(defaultData)
  return defaultData
}

