import { useEffect, useEffectEvent, useState } from 'react'
import { useStoredState } from '../hooks/useStoredState'
import { todayKey } from '../lib/srs'

// The daily study goal, in seconds.
const DAILY_GOAL = 5 * 60

const RADIUS = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function format(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

// Counts the time you spend on topic pages today, toward a 5 minute daily goal.
// It keeps its own state, so its tick every second never redraws the lesson or the live previews.
function StudyTimer() {
  const [study, setStudy] = useStoredState('rl:study', { day: null, seconds: 0 })
  const [paused, setPaused] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const seconds = study.day === todayKey() ? study.seconds : 0
  const done = seconds >= DAILY_GOAL

  // Adds one second, unless the timer is paused or the page is hidden in another tab.
  const tick = useEffectEvent(() => {
    if (paused || document.visibilityState !== 'visible') return
    const day = todayKey()
    const before = study.day === day ? study.seconds : 0
    if (before < DAILY_GOAL && before + 1 >= DAILY_GOAL) setCelebrate(true)
    setStudy({ day, seconds: before + 1 })
  })

  useEffect(() => {
    const id = setInterval(() => tick(), 1000)
    return () => clearInterval(id)
  }, [])

  // The "goal reached" message hides itself after a while.
  useEffect(() => {
    if (!celebrate) return
    const id = setTimeout(() => setCelebrate(false), 12000)
    return () => clearTimeout(id)
  }, [celebrate])

  const label = done ? `✓ ${format(seconds)} today` : `${format(DAILY_GOAL - seconds)} left today`
  const spoken = done
    ? `Daily goal reached. ${Math.floor(seconds / 60)} minutes studied today.`
    : `${Math.ceil((DAILY_GOAL - seconds) / 60)} minutes left of today's 5 minute goal.`

  return (
    <>
      <div
        className={`study-timer ${done ? 'is-done' : ''} ${paused ? 'is-paused' : ''}`}
        title="Daily goal: 5 minutes. Time on any topic page counts toward it."
      >
        <span className="study-timer__clock" role="timer" aria-label={spoken}>
          <svg className="study-timer__ring" viewBox="0 0 20 20" aria-hidden="true">
            <circle className="study-timer__track" cx="10" cy="10" r={RADIUS} />
            <circle
              className="study-timer__fill"
              cx="10"
              cy="10"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - Math.min(1, seconds / DAILY_GOAL))}
            />
          </svg>
          <span aria-hidden="true">{paused ? `Paused · ${label}` : label}</span>
        </span>
        <button
          type="button"
          className="study-timer__toggle"
          aria-label={paused ? 'Resume the daily timer' : 'Pause the daily timer'}
          title={paused ? 'Resume' : 'Pause'}
          onClick={() => setPaused((p) => !p)}
        >
          <svg viewBox="0 0 10 10" aria-hidden="true">
            {paused ? <path d="M2 1 L9 5 L2 9 Z" /> : <path d="M2 1 H4 V9 H2 Z M6 1 H8 V9 H6 Z" />}
          </svg>
        </button>
      </div>

      <div className="study-toast-region" role="status">
        {celebrate && (
          <div className="study-toast">
            <span className="study-toast__icon" aria-hidden="true">
              🎉
            </span>
            <span className="study-toast__text">
              <strong>Your 5 minutes for today are done!</strong>
              <span>Great work. Keep going if you like, or come back tomorrow for a fresh 5 minutes.</span>
            </span>
            <button type="button" className="study-toast__close" aria-label="Close" onClick={() => setCelebrate(false)}>
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default StudyTimer
