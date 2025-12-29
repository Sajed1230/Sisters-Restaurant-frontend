import React from 'react'
import { useTranslation } from 'react-i18next'
import './MenuItem.css'

const MenuItem = ({ item, index = 0 }) => {
  const { i18n, t } = useTranslation()
  const language = i18n.language || 'ar'

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img 
          src={item.image || 'no image'} 
          alt={item.name?.[language] || item.name?.en || 'Menu item'} 
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.name?.[language] || item.name?.en || 'Item'}</h3>
        <p className="menu-item-description">{item.description?.[language] || item.description?.en || ''}</p>
        <div className="menu-item-price">
          {item.price?.toLocaleString() || '0'} {t('common.currency')}
        </div>
      </div>
    </div>
  )
}

export default MenuItem

