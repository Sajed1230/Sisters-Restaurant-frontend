import React from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
  }

  const currentLang = i18n.language || 'ar'
  const displayLang = currentLang === 'ar' ? 'EN' : 'AR'

  return (
    <button 
      className="language-switcher"
      onClick={handleClick}
      type="button"
      aria-label={t('language.switchTo')}
      title={t('language.switchTo')}
    >
      <span>{displayLang}</span>
    </button>
  )
}

export default LanguageSwitcher

