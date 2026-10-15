import { useEffect, useState } from 'react'
import Block from './Block'
import ReviewSession from './ReviewSession'
import { splitIntoSteps } from '../lib/steps'
import { isTypingTarget } from '../lib/keyboard'

// One topic, shown one small step at a time, ending with a flashcard quick check.
function SectionView({ lesson, section, step, cards, isDone, deck, today, onGrade, onAddToDeck, onComplete }) {
  const steps = splitIntoSteps(section.blocks)
  const total = steps.length + 1 // the last step is the wrap-up
  const current = Math.min(step, total - 1)
  const isWrapUp = current === steps.length
  const isLastContent = current === steps.length - 1
  const position = lesson.sections.indexOf(section)
  const base = `#/${lesson.id}/${section.id}`

  function go(i) {
    window.location.hash = `${base}/${i}`
  }

  function goNext() {
    if (isLastContent && cards.length === 0) onComplete()
    go(current + 1)
  }

  // Arrow keys move between steps.
  // No dependency list: it re-subscribes each render so it always sees the current step.
  useEffect(() => {
    function onKey(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) return
      if (event.key === 'ArrowRight' && !isWrapUp) goNext()
      if (event.key === 'ArrowLeft' && current > 0) go(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  let nextLabel = 'Next →'
  if (isLastContent) nextLabel = cards.length > 0 ? 'Quick check →' : 'Finish topic ✓'

  return (
    <article className="focus">
      <div className="focus__bar">
        <a className="focus__back" href={`#/${lesson.id}`}>
          ← All topics
        </a>
        <ol className="focus__progress" aria-label="Steps in this topic">
          {Array.from({ length: total }, (_, i) => {
            const classes = [i < current && 'is-past', i === current && 'is-current', i === steps.length && 'is-check']
            return (
              <li key={i}>
                <a
                  href={`${base}/${i}`}
                  className={classes.filter(Boolean).join(' ')}
                  aria-label={i === steps.length ? 'Quick check' : `Step ${i + 1}`}
                  aria-current={i === current ? 'step' : undefined}
                />
              </li>
            )
          })}
        </ol>
        <span className="focus__count">
          {current + 1} / {total}
        </span>
      </div>

      <header className="focus__head">
        <span className="focus__icon" aria-hidden="true">
          {section.icon}
        </span>
        <div>
          <div className="eyebrow">
            Lesson {lesson.number} · Topic {position + 1} of {lesson.sections.length}
            {isDone && ' · ✓ Done'}
          </div>
          <h1>{section.title}</h1>
        </div>
      </header>

      {isWrapUp ? (
        <WrapUp
          lesson={lesson}
          nextSection={lesson.sections[position + 1]}
          cards={cards}
          isDone={isDone}
          deck={deck}
          today={today}
          onGrade={onGrade}
          onAddToDeck={onAddToDeck}
          onComplete={onComplete}
          onBack={() => go(current - 1)}
        />
      ) : (
        <>
          <div className="step" key={current}>
            {steps[current].map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <nav className="focus__nav">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => go(current - 1)}
              disabled={current === 0}
            >
              ← Back
            </button>
            <span className="hint">
              <kbd>←</kbd> <kbd>→</kbd> keys work too
            </span>
            <button type="button" className="btn btn--primary" onClick={goNext}>
              {nextLabel}
            </button>
          </nav>
        </>
      )}
    </article>
  )
}

function WrapUp({ lesson, nextSection, cards, isDone, deck, today, onGrade, onAddToDeck, onComplete, onBack }) {
  const [mode, setMode] = useState(isDone || cards.length === 0 ? 'done' : 'check')
  const [result, setResult] = useState(null)

  let nextHref = `#/${lesson.id}`
  let nextLabel = 'Back to all topics'
  if (nextSection) {
    nextHref = `#/${lesson.id}/${nextSection.id}`
    nextLabel = `Next: ${nextSection.title}`
  } else if (lesson.project) {
    nextHref = `#/${lesson.id}/project`
    nextLabel = 'Next: the mini project'
  }

  if (mode === 'check') {
    return (
      <section className="wrapup">
        <div className="wrapup__intro">
          <h2>🧠 Quick check</h2>
          <p>
            Answer each question in your head, then flip the card. Be honest when you rate yourself.
            Your rating decides when the card comes back for review.
          </p>
        </div>
        <ReviewSession
          cards={cards}
          deck={deck}
          today={today}
          onGrade={onGrade}
          onFinish={(summary) => {
            onComplete()
            setResult(summary)
            setMode('done')
          }}
        />
        <div className="wrapup__skip">
          <button type="button" className="link-btn" onClick={onBack}>
            ← Read the last step again
          </button>
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              onAddToDeck(cards.map((card) => card.id))
              onComplete()
              setResult({ skipped: true })
              setMode('done')
            }}
          >
            Skip and review later
          </button>
        </div>
      </section>
    )
  }

  let message = 'Nice work. This topic has no flashcards, so you can move straight on.'
  if (result?.skipped) {
    message = `The ${cards.length} flashcards from this topic are waiting for you in Daily review.`
  } else if (result) {
    message = `You knew ${result.knew} of ${result.total} right away. Each card will come back right before you are likely to forget it.`
  } else if (cards.length > 0) {
    message = `The ${cards.length} flashcards from this topic are in your review deck.`
  }

  return (
    <section className="wrapup wrapup--done">
      <div className="wrapup__badge" aria-hidden="true">
        {isDone ? '🎉' : '🏁'}
      </div>
      <h2>{isDone ? 'Topic complete!' : 'You reached the end'}</h2>
      <p>{message}</p>

      {result && !result.skipped && (
        <div className="wrapup__score">
          <span>😎 {result.knew} knew it</span>
          <span>🤔 {result.almost} almost</span>
          <span>😕 {result.forgot} forgot</span>
        </div>
      )}

      <div className="wrapup__actions">
        {isDone ? (
          <a className="btn btn--primary" href={nextHref}>
            {nextLabel} →
          </a>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onComplete}>
            Mark topic as done ✓
          </button>
        )}
        <a className="btn btn--ghost" href={`#/${lesson.id}`}>
          All topics
        </a>
        {cards.length > 0 && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setResult(null)
              setMode('check')
            }}
          >
            Practice the cards again
          </button>
        )}
      </div>
    </section>
  )
}

export default SectionView
