function Sidebar({ lessons, activeId, completed, open, onClose }) {
  return (
    <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
      <a href="#/" className="brand" onClick={onClose}>
        <span className="brand__logo">⚛</span> React Learning
      </a>

      <div className="sidebar__label">Lessons</div>
      <ul className="lesson-nav">
        {lessons.map((lesson) => {
          const isDone = completed.includes(lesson.id)
          const classes = [
            'lesson-nav__item',
            lesson.id === activeId && 'is-active',
            lesson.locked && 'is-locked',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li key={lesson.id}>
              <a
                className={classes}
                href={lesson.locked ? undefined : `#/${lesson.id}`}
                aria-disabled={lesson.locked}
                onClick={onClose}
              >
                <span className={`lesson-nav__num ${isDone ? 'is-done' : ''}`}>
                  {isDone ? '✓' : lesson.locked ? '🔒' : lesson.number}
                </span>
                <span>{lesson.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
