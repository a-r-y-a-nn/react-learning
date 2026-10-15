import { useEffect, useState } from 'react'

// Tiny router: "#/lesson-1/jsx/2" -> { lessonId: 'lesson-1', sectionId: 'jsx', step: 2 }
function parse() {
  const [lessonId = null, sectionId = null, step = '0'] = window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
  return { lessonId, sectionId, step: Math.max(0, Number.parseInt(step, 10) || 0) }
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
