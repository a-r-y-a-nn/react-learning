import { isDue, levelOf } from '../lib/srs'
import { sectionKey, splitIntoSteps } from '../lib/steps'

// The lesson page: a map of topic cards. Each card opens one topic in focus mode.
function LessonView({ lesson, next, cards, sectionsDone, deck, today, isDone, onToggleDone }) {
  const doneCount = lesson.sections.filter((s) => sectionsDone.includes(sectionKey(lesson.id, s.id))).length
  const upNext = lesson.sections.find((s) => !sectionsDone.includes(sectionKey(lesson.id, s.id)))
  const percent = Math.round((doneCount / lesson.sections.length) * 100)

  return (
    <article className="lesson">
      <header className="lesson__header">
        <div className="eyebrow">
          Lesson {lesson.number} · {lesson.duration}
        </div>
        <h1>{lesson.title}</h1>
        <p className="lesson__summary">{lesson.summary}</p>

        <div className="progress">
          <div className="progress__bar">
            <div className="progress__fill" style={{ width: `${percent}%` }} />
          </div>
          <span>
            {doneCount} of {lesson.sections.length} topics done
          </span>
        </div>
      </header>

      <ol className="topic-grid">
        {lesson.sections.map((section, i) => (
          <TopicCard
            key={section.id}
            lesson={lesson}
            section={section}
            number={i + 1}
            cards={cards.filter((card) => card.sectionId === section.id)}
            deck={deck}
            today={today}
            isDone={sectionsDone.includes(sectionKey(lesson.id, section.id))}
            isNext={section === upNext}
          />
        ))}

        {lesson.project && (
          <li>
            <a className="topic-card topic-card--project" href={`#/${lesson.id}/project`}>
              <div className="topic-card__top">
                <span className="topic-card__num">★</span>
                <span className="topic-card__icon" aria-hidden="true">
                  🏗️
                </span>
              </div>
              <h3>{lesson.project.title}</h3>
              <p>Put every topic together and build something real.</p>
              <div className="topic-card__meta">
                <span>{lesson.project.tasks.length} tasks</span>
                <span className="topic-card__cta">Build it →</span>
              </div>
            </a>
          </li>
        )}
      </ol>

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

function TopicCard({ lesson, section, number, cards, deck, today, isDone, isNext }) {
  const stepCount = splitIntoSteps(section.blocks).length
  const dueCount = cards.filter((card) => isDue(deck[card.id], today)).length
  const classes = ['topic-card', isDone && 'is-done', isNext && 'is-next'].filter(Boolean).join(' ')

  let cta = 'Open'
  if (isNext) cta = 'Start →'
  else if (isDone) cta = 'Revisit'

  return (
    <li>
      <a className={classes} href={`#/${lesson.id}/${section.id}`}>
        {isNext && <span className="topic-card__flag">Up next</span>}
        <div className="topic-card__top">
          <span className="topic-card__num">{isDone ? '✓' : number}</span>
          {dueCount > 0 && <span className="chip chip--due">🔁 {dueCount} due</span>}
          <span className="topic-card__icon" aria-hidden="true">
            {section.icon}
          </span>
        </div>
        <h3>{section.title}</h3>
        <p>{section.hook}</p>
        <div className="topic-card__meta">
          <span>
            {stepCount} {stepCount === 1 ? 'step' : 'steps'}
          </span>
          {cards.length > 0 && <MemoryDots cards={cards} deck={deck} />}
          <span className="topic-card__cta">{cta}</span>
        </div>
      </a>
    </li>
  )
}

// One dot per flashcard. Empty until the card is in your deck, then darker as memory grows.
function MemoryDots({ cards, deck }) {
  const levels = cards.map((card) => (deck[card.id] ? levelOf(deck[card.id].box) : 'locked'))
  const inDeck = levels.filter((level) => level !== 'locked').length
  const label = inDeck
    ? `${cards.length} flashcards, ${inDeck} in your review deck`
    : `${cards.length} flashcards, unlocked when you finish the topic`

  return (
    <span className="memory-dots" title={label}>
      {levels.map((level, i) => (
        <span key={i} className={`memory-dot memory-dot--${level}`} />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default LessonView
