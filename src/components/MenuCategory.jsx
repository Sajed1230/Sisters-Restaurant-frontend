import React from 'react'
import { useTranslation } from 'react-i18next'
import './MenuCategory.css'

const MenuCategory = ({ category, isActive, onClick }) => {
  const { t } = useTranslation()

  return (
    <button
      className={`menu-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {t(`categories.${category}`)}
    </button>
  )
}

export default MenuCategory

