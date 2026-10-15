import { daysBetween, describeWait } from '../lib/srs'
import { sectionKey } from '../lib/steps'

function Home({ lessons, completed, sectionsDone, dueCount, deckSize, upcoming, today, streak }) {
  const available = lessons.filter((l) => !l.locked)
  const percent = Math.round((completed.length / available.length) * 100)

  let reviewTitle = 'Daily review'
  let reviewText = 'Finish a topic to unlock its flashcards. They come back right before you would forget them.'
  if (dueCount > 0) {
    reviewTitle = `${dueCount} ${dueCount === 1 ? 'card is' : 'cards are'} ready for review`
    reviewText = 'A few minutes now keeps what you learned fresh.'
  } else if (deckSize > 0) {
    reviewTitle = 'All caught up 🎉'
    reviewText = upcoming
      ? `Your next ${upcoming.count === 1 ? 'card comes' : 'cards come'} back ${describeWait(daysBetween(today, upcoming.day))}.`
      : 'Nothing is due right now.'
  }

  return (
    <div className="home">
      <div className="eyebrow">Learn React one brick at a time</div>
      <h1>React Learning</h1>
      <p className="lesson__summary">
        Bite-size topics, flashcards that come back at the right time, and a mini project at the end of
        each lesson.
      </p>

      <div className="progress">
        <div className="progress__bar">
          <div className="progress__fill" style={{ width: `${percent}%` }} />
        </div>
        <span>
          {completed.length} of {available.length} lessons complete
        </span>
      </div>

      <a className={`review-banner ${dueCount > 0 ? 'has-due' : ''}`} href="#/review">
        <span className="review-banner__icon" aria-hidden="true">
          🧠
        </span>
        <span className="review-banner__text">
          <strong>{reviewTitle}</strong>
          <span>{reviewText}</span>
        </span>
        {streak > 0 && <span className="streak">🔥 {streak}-day streak</span>}
        <span className={`btn ${dueCount > 0 ? 'btn--primary' : 'btn--ghost'}`}>
          {dueCount > 0 ? 'Start review' : 'Open'}
        </span>
      </a>

      <div className="lesson-grid">
        {lessons.map((lesson) => {
          const topicsDone = lesson.sections.filter((s) => sectionsDone.includes(sectionKey(lesson.id, s.id))).length
          return (
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
              <span className="muted">
                {lesson.duration}
                {!lesson.locked && ` · ${topicsDone} of ${lesson.sections.length} topics`}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Home
