// API configuration
// In development, uses proxy from vite.config.js
// In production, use VITE_API_URL environment variable or default to relative path

const getApiUrl = () => {
  // Check if we have an explicit API URL set
  const apiUrl = import.meta.env.VITE_API_URL
  
  if (apiUrl) {
    // If API URL is set, use it (for production backend hosting)
    return apiUrl.replace(/\/$/, '') // Remove trailing slash
  }
  
  // Default to relative path (will use proxy in dev, or same origin in production)
  return ''
}

export const API_BASE_URL = getApiUrl()

export const getChatApiEndpoint = () => {
  return `${API_BASE_URL}/api/chat`
}

