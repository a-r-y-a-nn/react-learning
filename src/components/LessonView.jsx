import Block from './Block'
import MiniProject from './MiniProject'

function LessonView({ lesson, next, isDone, onToggleDone, checked, onToggleTask }) {
  return (
    <article className="lesson">
      <header className="lesson__header">
        <div className="eyebrow">
          Lesson {lesson.number} · {lesson.duration}
        </div>
        <h1>{lesson.title}</h1>
        <p className="lesson__summary">{lesson.summary}</p>

        <nav className="toc">
          {lesson.sections.map((section) => (
            <a key={section.id} href={`#/${lesson.id}/${section.id}`}>
              {section.title}
            </a>
          ))}
          {lesson.project && <a href={`#/${lesson.id}/project`}>Mini project</a>}
        </nav>
      </header>

      {lesson.sections.map((section) => (
        <section className="lesson__section" key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}

      {lesson.project && (
        <MiniProject project={lesson.project} checked={checked} onToggle={onToggleTask} />
      )}

      <footer className="lesson__footer">
        <button
          type="button"
          className={`btn ${isDone ? 'btn--ghost' : 'btn--primary'}`}
          onClick={onToggleDone}
        >
          {isDone ? '✓ Completed (undo)' : 'Mark lesson as complete'}
        </button>
        {next && !next.locked && (
          <a className="btn btn--ghost" href={`#/${next.id}`}>
            Next: Lesson {next.number} →
          </a>
        )}
        {next && next.locked && <span className="muted">Lesson {next.number} unlocks soon</span>}
      </footer>
    </article>
  )
}

export default LessonView
