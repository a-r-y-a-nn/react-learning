import { useState } from 'react'
import ReviewSession from './ReviewSession'
import {
  INTERVALS,
  LEVELS,
  addDays,
  daysBetween,
  describeWait,
  formatSpan,
  isDue,
  levelOf,
  nextReview,
  shuffle,
  weekdayName,
} from '../lib/srs'

// Strongest first, so each bar fills from the left like a meter.
const BAR_ORDER = [...LEVELS].reverse()

function ReviewPage({ lessons, cards, deck, today, streak, firstTopicHref, onGrade }) {
  const [session, setSession] = useState(null)
  const [summary, setSummary] = useState(null)

  const inDeck = cards.filter((card) => deck[card.id])
  const due = inDeck.filter((card) => isDue(deck[card.id], today))
  const mastered = inDeck.filter((card) => levelOf(deck[card.id].box) === 'mastered').length
  const upcoming = nextReview(cards, deck, today)

  function start(list, title) {
    setSummary(null)
    setSession({ cards: shuffle(list), title })
  }

  if (session) {
    return (
      <article className="review">
        <div className="focus__bar">
          <button type="button" className="link-btn focus__back" onClick={() => setSession(null)}>
            ← End session
          </button>
          <span className="eyebrow">{session.title}</span>
        </div>
        <ReviewSession
          cards={session.cards}
          deck={deck}
          today={today}
          onGrade={onGrade}
          showSource
          onFinish={(result) => {
            setSummary({ ...result, title: session.title })
            setSession(null)
          }}
        />
      </article>
    )
  }

  return (
    <article className="review">
      <div className="eyebrow">Spaced repetition</div>
      <h1>Daily review</h1>
      <p className="lesson__summary">
        A few minutes a day moves what you learned into long-term memory. Cards you know well come
        back less often. Cards you forget come back sooner.
      </p>

      <section className="review-stage">
        {summary && (
          <div className="review-done">
            <div className="wrapup__badge" aria-hidden="true">
              🎉
            </div>
            <h2>Session done!</h2>
            <p>
              You knew {summary.knew} of {summary.total} cards right away.
            </p>
            <div className="wrapup__score">
              <span>😎 {summary.knew} knew it</span>
              <span>🤔 {summary.almost} almost</span>
              <span>😕 {summary.forgot} forgot</span>
            </div>
          </div>
        )}

        {due.length > 0 ? (
          <div className="review-start">
            <div className="hero-figure">{due.length}</div>
            <div className="review-start__text">
              <strong>{due.length === 1 ? 'card is' : 'cards are'} ready for review</strong>
              <span>About {Math.max(1, Math.round((due.length * 12) / 60))} min. Answer in your head, then flip.</span>
            </div>
            <button type="button" className="btn btn--primary" onClick={() => start(due, 'Daily review')}>
              {summary ? 'Keep going' : 'Start review'} →
            </button>
          </div>
        ) : inDeck.length > 0 ? (
          !summary && (
            <div className="review-empty">
              <div className="wrapup__badge" aria-hidden="true">
                ✅
              </div>
              <h2>All caught up</h2>
              <p>
                {upcoming
                  ? `${upcoming.count} ${upcoming.count === 1 ? 'card comes' : 'cards come'} back ${describeWait(daysBetween(today, upcoming.day))}.`
                  : 'Nothing is scheduled yet.'}{' '}
                Want more? Practice a lesson below, or finish a new topic.
              </p>
            </div>
          )
        ) : (
          <div className="review-empty">
            <div className="wrapup__badge" aria-hidden="true">
              🃏
            </div>
            <h2>Your deck is empty</h2>
            <p>Finish a topic in any lesson. Its flashcards land here, ready for review.</p>
            <a className="btn btn--primary" href={firstTopicHref}>
              Start a topic →
            </a>
          </div>
        )}

        {summary && due.length === 0 && upcoming && (
          <p className="review-next">
            Next review: {upcoming.count} {upcoming.count === 1 ? 'card' : 'cards'}{' '}
            {describeWait(daysBetween(today, upcoming.day))}.
          </p>
        )}
      </section>

      <div className="stat-row">
        <div className="stat">
          <div className="stat__label">Day streak</div>
          <div className="stat__value">🔥 {streak}</div>
          <div className="stat__note">{streak > 0 ? 'Keep it alive today' : 'Review today to start one'}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Cards in your deck</div>
          <div className="stat__value">{inDeck.length}</div>
          <div className="stat__note">of {cards.length} in the course</div>
        </div>
        <div className="stat">
          <div className="stat__label">Mastered</div>
          <div className="stat__value">{mastered}</div>
          <div className="stat__note">remembered for a month or more</div>
        </div>
      </div>

      {inDeck.length > 0 && <Forecast cards={inDeck} deck={deck} today={today} />}

      <section className="review-section">
        <h2>Your memory, lesson by lesson</h2>
        <p>Practice a lesson any time. Early practice does not change when cards are due.</p>
        <div className="memory-legend">
          {BAR_ORDER.map((level) => (
            <span key={level.id}>
              <i className={`swatch swatch--${level.id}`} /> {level.label}
            </span>
          ))}
          <span>
            <i className="swatch swatch--locked" /> Not unlocked yet
          </span>
        </div>
        <ul className="memory-rows">
          {lessons
            .filter((lesson) => !lesson.locked)
            .map((lesson) => (
              <MemoryRow
                key={lesson.id}
                lesson={lesson}
                cards={cards.filter((card) => card.lessonId === lesson.id)}
                deck={deck}
                onPractice={(list) => start(list, `Lesson ${lesson.number} practice`)}
              />
            ))}
        </ul>
      </section>

      <section className="review-section">
        <h2>How it works</h2>
        <p>
          Every card sits in a box. 😎 <strong>Knew it</strong> moves it up a box. 🤔{' '}
          <strong>Almost</strong> keeps it where it is. 😕 <strong>Forgot</strong> sends it back to box 1.
          The higher the box, the longer the wait.
        </p>
        <ol className="ladder">
          {INTERVALS.slice(1).map((days, i) => (
            <li key={days}>
              <span>Box {i + 1}</span>
              <strong>{formatSpan(days)}</strong>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}

// How many cards come back on each of the next seven days.
function Forecast({ cards, deck, today }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(today, i)
    const count = cards.filter((card) => (i === 0 ? deck[card.id].due <= day : deck[card.id].due === day)).length
    const label = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : weekdayName(day)
    return { day, count, label }
  })
  const max = Math.max(1, ...days.map((d) => d.count))

  return (
    <section className="review-section">
      <h2>Coming up this week</h2>
      <p>Cards come back on the day you are about to forget them.</p>
      <div className="forecast">
        {days.map((d) => (
          <div className="forecast__day" key={d.day} title={`${d.label}: ${d.count} cards`}>
            <span className="forecast__value">{d.count}</span>
            <span className="forecast__bar" style={{ height: `${Math.round((d.count / max) * 80)}px` }} />
            <span className="forecast__label">{d.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function MemoryRow({ lesson, cards, deck, onPractice }) {
  const unlocked = cards.filter((card) => deck[card.id])
  const counts = { locked: cards.length - unlocked.length }
  for (const level of LEVELS) counts[level.id] = 0
  for (const card of unlocked) counts[levelOf(deck[card.id].box)] += 1

  const segments = [...BAR_ORDER, { id: 'locked', label: 'Not unlocked yet' }].filter((s) => counts[s.id] > 0)
  const description = segments.map((s) => `${counts[s.id]} ${s.label.toLowerCase()}`).join(', ')

  return (
    <li className="memory-row">
      <div>
        <div className="memory-row__title">
          Lesson {lesson.number}: {lesson.title}
        </div>
        <div className="memory-row__note">
          {unlocked.length} of {cards.length} cards unlocked
          {counts.mastered > 0 && ` · ${counts.mastered} mastered`}
        </div>
      </div>
      <button
        type="button"
        className="btn btn--ghost btn--small"
        disabled={unlocked.length === 0}
        onClick={() => onPractice(unlocked)}
      >
        Practice
      </button>
      <div className="memory-bar" role="img" aria-label={description}>
        {segments.map((s) => (
          <span
            key={s.id}
            className={`memory-bar__seg swatch--${s.id}`}
            style={{ flexGrow: counts[s.id] }}
            title={`${s.label}: ${counts[s.id]} ${counts[s.id] === 1 ? 'card' : 'cards'}`}
          />
        ))}
      </div>
    </li>
  )
}

export default ReviewPage
