import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './i18n/config'
import LanguageSwitcher from './components/LanguageSwitcher'
import Menu from './components/Menu'
import { ROUTES, getRoutePath } from './utils/routes'
import './App.css'

// Component to handle route obfuscation and redirects
function RouteHandler() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash || window.location.hash
    
    // If someone tries to access root hash or empty, redirect to obfuscated route
    if (hash === '' || hash === '#/' || hash === '#') {
      const obfuscatedPath = getRoutePath('MENU')
      window.location.hash = obfuscatedPath
    }
  }, [location])

  return null
}

function AppContent() {
  return (
    <div className="App">
      <RouteHandler />
      <LanguageSwitcher />
      <Routes>
        {/* Obfuscated routes - random-looking hashes */}
        <Route path={`/${ROUTES.MENU}`} element={<Menu />} />
        <Route path={`/${ROUTES.HOME}`} element={<Menu />} />
        {/* Redirect any unknown routes to the obfuscated menu route */}
        <Route path="/" element={<Navigate to={`/${ROUTES.MENU}`} replace />} />
        <Route path="*" element={<Navigate to={`/${ROUTES.MENU}`} replace />} />
      </Routes>
    </div>
  )
}

function App() {
  // Initialize with obfuscated route on mount
  useEffect(() => {
    const currentHash = window.location.hash
    
    // Only redirect if hash is empty or root
    if (currentHash === '' || currentHash === '#/' || currentHash === '#') {
      const obfuscatedPath = getRoutePath('MENU')
      // Use replace to avoid adding to history
      window.history.replaceState(null, '', obfuscatedPath)
    }
  }, [])

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
