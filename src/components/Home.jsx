function Home({ lessons, completed }) {
  const available = lessons.filter((l) => !l.locked)
  const percent = Math.round((completed.length / available.length) * 100)

  return (
    <div className="home">
      <div className="eyebrow">Learn React one brick at a time</div>
      <h1>React Learning</h1>
      <p className="lesson__summary">
        Short lessons, a live playground, and a mini project at the end of each one.
      </p>

      <div className="progress">
        <div className="progress__bar">
          <div className="progress__fill" style={{ width: `${percent}%` }} />
        </div>
        <span>
          {completed.length} of {available.length} lessons complete
        </span>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <a
            key={lesson.id}
            className={`lesson-card ${lesson.locked ? 'is-locked' : ''}`}
            href={lesson.locked ? undefined : `#/${lesson.id}`}
          >
            <div className="eyebrow">
              Lesson {lesson.number}
              {completed.includes(lesson.id) && ' · ✓ Done'}
              {lesson.locked && ' · 🔒 Locked'}
            </div>
            <h3>{lesson.title}</h3>
            <p>{lesson.summary}</p>
            <span className="muted">{lesson.duration}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Home
