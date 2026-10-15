// Spaced repetition, Leitner style.
// Every flashcard sits in a box. Each time you remember it, it moves up a box and
// you wait longer before seeing it again. Forget it and it drops back to box 1.

// Days to wait before the next review, by box number. Box 0 means "review today".
export const INTERVALS = [0, 1, 3, 7, 14, 30, 60]
const MAX_BOX = INTERVALS.length - 1

export const RATINGS = [
  { id: 'forgot', label: 'Forgot', emoji: '😕', key: '1' },
  { id: 'almost', label: 'Almost', emoji: '🤔', key: '2' },
  { id: 'knew', label: 'Knew it', emoji: '😎', key: '3' },
]

// Memory strength, weakest first. Used for the memory bars and dots.
export const LEVELS = [
  { id: 'new', label: 'New' },
  { id: 'learning', label: 'Learning' },
  { id: 'strong', label: 'Strong' },
  { id: 'mastered', label: 'Mastered' },
]

export function levelOf(box) {
  if (box >= 5) return 'mastered'
  if (box >= 3) return 'strong'
  if (box >= 1) return 'learning'
  return 'new'
}

// Days are stored as local "YYYY-MM-DD" text, so comparing them as strings works.
export function todayKey(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function parseDay(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(dayKey, days) {
  const date = parseDay(dayKey)
  date.setDate(date.getDate() + days)
  return todayKey(date)
}

export function daysBetween(fromKey, toKey) {
  return Math.round((parseDay(toKey) - parseDay(fromKey)) / 86_400_000)
}

export function weekdayName(dayKey) {
  return parseDay(dayKey).toLocaleDateString(undefined, { weekday: 'short' })
}

export function describeWait(days) {
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days < 7) return `in ${days} days`
  if (days < 30) {
    const weeks = Math.round(days / 7)
    return `in ${weeks} week${weeks > 1 ? 's' : ''}`
  }
  const months = Math.round(days / 30)
  return `in ${months} month${months > 1 ? 's' : ''}`
}

// Which box a card moves to after you rate it.
export function nextBox(box, rating) {
  if (rating === 'forgot') return 1
  if (rating === 'almost') return Math.max(1, box)
  return Math.min(MAX_BOX, Math.max(2, box + 1))
}

export function schedule(state, rating, today) {
  const box = nextBox(state?.box ?? 0, rating)
  return { box, due: addDays(today, INTERVALS[box]) }
}

export function isDue(state, today) {
  return Boolean(state) && state.due <= today
}

// Only new or due cards move between boxes. Looking at a card early is just practice.
export function countsToward(state, today) {
  return !state || state.due <= today
}

// The soonest day after today when cards come back, and how many come back then.
export function nextReview(cards, deck, today) {
  const upcoming = cards.map((card) => deck[card.id]?.due).filter((due) => due && due > today)
  if (upcoming.length === 0) return null
  const day = upcoming.reduce((a, b) => (a < b ? a : b))
  return { day, count: upcoming.filter((due) => due === day).length }
}

// Every flashcard in the course, with a stable id and the topic it came from.
// Cards are numbered by position, so new cards should be added at the end of a list.
export function collectCards(lessons) {
  return lessons.flatMap((lesson) =>
    lesson.sections.flatMap((section) =>
      (section.cards ?? []).map((card, i) => ({
        ...card,
        id: `${lesson.id}/${section.id}/${i}`,
        lessonId: lesson.id,
        lessonNumber: lesson.number,
        sectionId: section.id,
        sectionTitle: section.title,
      })),
    ),
  )
}

export function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// A streak counts the days in a row on which you finished a topic or rated a card.
export function bumpStreak(streak, today) {
  if (streak.last === today) return streak
  const continues = streak.last === addDays(today, -1)
  return { count: continues ? streak.count + 1 : 1, last: today }
}

export function currentStreak(streak, today) {
  return streak.last === today || streak.last === addDays(today, -1) ? streak.count : 0
}

// "3 days", "2 weeks": the length of a wait, without "in".
export function formatSpan(days) {
  if (days === 1) return '1 day'
  return describeWait(days).replace(/^in /, '')
}
