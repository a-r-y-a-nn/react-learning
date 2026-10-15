import { sectionKey } from '../lib/steps'

function Sidebar({ lessons, activeId, completed, sectionsDone, dueCount, open, onClose }) {
  return (
    <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
      <a href="#/" className="brand" onClick={onClose}>
        <span className="brand__logo">⚛</span> React Learning
      </a>

      <a
        href="#/review"
        className={`lesson-nav__item review-link ${activeId === 'review' ? 'is-active' : ''}`}
        onClick={onClose}
      >
        <span className="lesson-nav__num review-link__icon" aria-hidden="true">
          🧠
        </span>
        <span>Daily review</span>
        {dueCount > 0 && (
          <span className="badge">
            {dueCount}
            <span className="sr-only"> cards due</span>
          </span>
        )}
      </a>

      <div className="sidebar__label">Lessons</div>
      <ul className="lesson-nav">
        {lessons.map((lesson) => {
          const isDone = completed.includes(lesson.id)
          const topicsDone = lesson.sections.filter((s) => sectionsDone.includes(sectionKey(lesson.id, s.id))).length
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
                <span className="lesson-nav__text">
                  <span>{lesson.title}</span>
                  {!lesson.locked && (
                    <span className="lesson-nav__meta">
                      {topicsDone} of {lesson.sections.length} topics
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
