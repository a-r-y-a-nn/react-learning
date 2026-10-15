import { useEffect, useState } from 'react'
import Flashcard from './Flashcard'
import { INTERVALS, RATINGS, countsToward, describeWait, nextBox } from '../lib/srs'
import { isTypingTarget } from '../lib/keyboard'

// A forgotten card comes back at the end of the session, at most this many extra times.
const MAX_REPEATS = 2

function summarize(ratings) {
  const values = Object.values(ratings)
  const count = (id) => values.filter((rating) => rating === id).length
  return { total: values.length, knew: count('knew'), almost: count('almost'), forgot: count('forgot') }
}

// Shows cards one at a time. Only your first answer to each card changes its schedule.
function ReviewSession({ cards, deck, today, onGrade, onFinish, showSource = false }) {
  const [queue, setQueue] = useState(cards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [firstRatings, setFirstRatings] = useState({})

  const card = queue[index]
  const counts = !(card.id in firstRatings) && countsToward(deck[card.id], today)

  function rate(rating) {
    const isFirst = !(card.id in firstRatings)
    const ratings = isFirst ? { ...firstRatings, [card.id]: rating } : firstRatings
    if (isFirst) onGrade(card.id, rating)

    const timesShown = queue.filter((c) => c.id === card.id).length
    const repeat = rating === 'forgot' && timesShown <= MAX_REPEATS
    const nextQueue = repeat ? [...queue, card] : queue

    if (index + 1 >= nextQueue.length) {
      onFinish(summarize(ratings))
      return
    }
    setFirstRatings(ratings)
    setQueue(nextQueue)
    setIndex(index + 1)
    setFlipped(false)
  }

  // Space or Enter flips the card. 1, 2 and 3 rate it.
  // No dependency list: it re-subscribes each render so it always sees the current card.
  useEffect(() => {
    function onKey(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) return
      if (!flipped && (event.key === ' ' || event.key === 'Enter')) {
        if (event.target.closest?.('button, a')) return
        event.preventDefault()
        setFlipped(true)
      } else if (flipped) {
        const rating = RATINGS.find((r) => r.key === event.key)
        if (rating) rate(rating.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const percent = Math.round((index / queue.length) * 100)

  return (
    <div className="session">
      <div className="session__top">
        <span>
          Card {index + 1} of {queue.length}
        </span>
        <div className="session__bar">
          <div style={{ width: `${percent}%` }} />
        </div>
      </div>

      <Flashcard
        key={`${card.id}-${index}`}
        card={card}
        flipped={flipped}
        onFlip={() => setFlipped(true)}
        source={showSource ? `Lesson ${card.lessonNumber} · ${card.sectionTitle}` : null}
      />

      {flipped ? (
        <div className="session__rate">
          <p className="session__ask">How well did you remember it?</p>
          <div className="rate-buttons">
            {RATINGS.map((rating) => (
              <button
                key={rating.id}
                type="button"
                className={`rate-btn rate-btn--${rating.id}`}
                onClick={() => rate(rating.id)}
              >
                <kbd>{rating.key}</kbd>
                <span className="rate-btn__emoji" aria-hidden="true">
                  {rating.emoji}
                </span>
                <span className="rate-btn__label">{rating.label}</span>
                <span className="rate-btn__when">
                  {counts
                    ? `see it ${describeWait(INTERVALS[nextBox(deck[card.id]?.box ?? 0, rating.id)])}`
                    : 'practice round'}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="session__show">
          <button type="button" className="btn btn--primary btn--wide" onClick={() => setFlipped(true)}>
            Show answer
          </button>
          <span className="hint">
            or press <kbd>Space</kbd>
          </span>
        </div>
      )}
    </div>
  )
}

export default ReviewSession
