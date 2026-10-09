import { useEffect, useState } from 'react'
import { lessons } from './data/lessons'
import { useHashRoute } from './hooks/useHashRoute'
import { useStoredState } from './hooks/useStoredState'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import LessonView from './components/LessonView'
import './App.css'

function App() {
  const { lessonId, sectionId } = useHashRoute()
  const [completed, setCompleted] = useStoredState('rl:completed', [])
  const [tasks, setTasks] = useStoredState('rl:tasks', {})
  const [menuOpen, setMenuOpen] = useState(false)

  const index = lessons.findIndex((l) => l.id === lessonId && !l.locked)
  const lesson = index >= 0 ? lessons[index] : null
  const next = lesson ? lessons[index + 1] : null

  // Jump to the section in the URL, or to the top when the lesson changes.
  useEffect(() => {
    const target = sectionId && document.getElementById(sectionId)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0 })
  }, [lessonId, sectionId])

  function toggleDone(id) {
    setCompleted((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }

  function toggleTask(id, i) {
    setTasks((all) => {
      const current = all[id] ?? {}
      return { ...all, [id]: { ...current, [i]: !current[i] } }
    })
  }

  return (
    <div className="layout">
      <button
        type="button"
        className="menu-btn"
        aria-label="Open lessons menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        ☰
      </button>

      <Sidebar
        lessons={lessons}
        activeId={lesson?.id}
        completed={completed}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="content">
        {lesson ? (
          <LessonView
            key={lesson.id}
            lesson={lesson}
            next={next}
            isDone={completed.includes(lesson.id)}
            onToggleDone={() => toggleDone(lesson.id)}
            checked={tasks[lesson.id] ?? {}}
            onToggleTask={(i) => toggleTask(lesson.id, i)}
          />
        ) : (
          <Home lessons={lessons} completed={completed} />
        )}
      </main>
    </div>
  )
}

export default App
