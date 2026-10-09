import { useEffect, useState } from 'react'

// useState that remembers its value in localStorage between visits.
export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be unavailable (private mode); progress just won't persist.
    }
  }, [key, value])

  return [value, setValue]
}
