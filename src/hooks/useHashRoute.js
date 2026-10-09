import { useEffect, useState } from 'react'

// Tiny router: "#/lesson-1/jsx" -> { lessonId: 'lesson-1', sectionId: 'jsx' }
function parse() {
  const [lessonId = null, sectionId = null] = window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
  return { lessonId, sectionId }
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
