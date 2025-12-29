import React from 'react'
import { useTranslation } from 'react-i18next'
import './Loading.css'

const Loading = ({ type = 'spinner' }) => {
  const { t } = useTranslation()

  if (type === 'skeleton') {
    return (
      <div className="loading-skeleton">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-price"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        {t('common.loading')}
        <span className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  )
}

export default Loading

