import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchMenuData } from '../services/api'
import MenuCategory from './MenuCategory'
import MenuItem from './MenuItem'
import Loading from './Loading'
import './Menu.css'

const categories = ['appetizers', 'mainDishes', 'grills', 'desserts', 'beverages', 'sandwiches']

const Menu = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language || 'ar'
  const [menuData, setMenuData] = useState({
    appetizers: [],
    mainDishes: [],
    grills: [],
    desserts: [],
    beverages: [],
    sandwiches: []
  })
  const [activeCategory, setActiveCategory] = useState('appetizers')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load menu data with cache support
  useEffect(() => {
    const loadMenuData = async (forceRefresh = false) => {
      try {
        // Only show loading skeleton on initial load, not on refresh
        if (!forceRefresh) {
          setLoading(true)
        } else {
          setIsRefreshing(true)
        }
        setError(null)
        
        const data = await fetchMenuData(forceRefresh)
        setMenuData(data)
      } catch (err) {
        console.error('Failed to load menu data:', err)
        setError(t('errors.loadFailed'))
      } finally {
        setLoading(false)
        setIsRefreshing(false)
      }
    }

    
    loadMenuData(false)
    
    // Refresh data every 5 minutes (cache duration) to get updates
    // This will fetch fresh data and update cache
    const interval = setInterval(() => {
      loadMenuData(true) // Force refresh from API
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => clearInterval(interval)
  }, [t])


  const handleShowAll = () => {
    setShowAll(true)
    setActiveCategory(null)
  }

  const handleCategoryClick = (category) => {
    setShowAll(false)
    setActiveCategory(category)
  }

  const filteredItems = useMemo(() => {
    let items = []
    
    if (showAll) {
      // Get all items from all categories
      categories.forEach(category => {
        const categoryItems = menuData[category] || []
        items = [...items, ...categoryItems]
      })
    } else {
      items = menuData[activeCategory] || []
    }

    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase()
    return items.filter(item => {
      const name = item.name?.[language] || item.name?.en || ''
      const description = item.description?.[language] || item.description?.en || ''
      return name.toLowerCase().includes(query) || description.toLowerCase().includes(query)
    })
  }, [menuData, activeCategory, searchQuery, language, showAll])

  return (
    <div className="menu-container">
      {/* Header */}
      <header className="menu-header">
        <h1 className="restaurant-name">
          {t('restaurant.name')}
        </h1>
        <p className="restaurant-slogan">
          {t('restaurant.slogan')}
        </p>
      </header>

      {/* Search and Categories */}
      <div className="menu-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder={t('common.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="categories-container">
          <button
            className={`show-all-button ${showAll ? 'active' : ''}`}
            onClick={handleShowAll}
          >
            {t('common.showAll')}
          </button>
          {categories.map(category => (
            <MenuCategory
              key={category}
              category={category}
              isActive={!showAll && activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-items-section">
        <h2 className="category-title">
          {showAll ? t('common.allProducts') : t(`categories.${activeCategory}`)}
          {isRefreshing && (
            <span style={{ 
              fontSize: '14px', 
              marginLeft: '10px', 
              color: 'var(--text-light)',
              fontWeight: 'normal'
            }}>
              🔄 {t('common.refreshing')}
            </span>
          )}
        </h2>
        {loading ? (
          <Loading type="skeleton" />
        ) : error ? (
          <div className="no-items">
            <p style={{ color: 'var(--navy-red)' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                background: 'var(--navy-red)',
                color: 'var(--yellow-gold)',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              {t('common.retry')}
            </button>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="menu-items-grid">
            {filteredItems.map((item, index) => (
              <MenuItem key={item._id || item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-items">
            <p>{t('common.noItems')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu

