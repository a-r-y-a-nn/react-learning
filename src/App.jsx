import { useEffect, useState } from 'react'
import { lessons } from './data/lessons'
import { useHashRoute } from './hooks/useHashRoute'
import { useStoredState } from './hooks/useStoredState'
import { bumpStreak, collectCards, countsToward, currentStreak, isDue, nextReview, schedule, todayKey } from './lib/srs'
import { sectionKey } from './lib/steps'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import LessonView from './components/LessonView'
import SectionView from './components/SectionView'
import ProjectView from './components/ProjectView'
import ReviewPage from './components/ReviewPage'
import './App.css'

const allCards = collectCards(lessons)

function App() {
  const { lessonId, sectionId, step } = useHashRoute()
  const [completed, setCompleted] = useStoredState('rl:completed', [])
  const [tasks, setTasks] = useStoredState('rl:tasks', {})
  const [sectionsDone, setSectionsDone] = useStoredState('rl:sections', [])
  const [deck, setDeck] = useStoredState('rl:deck', {})
  const [streak, setStreak] = useStoredState('rl:streak', { count: 0, last: null })
  const [menuOpen, setMenuOpen] = useState(false)

  const today = todayKey()
  const dueCount = allCards.filter((card) => isDue(deck[card.id], today)).length
  const deckSize = allCards.filter((card) => deck[card.id]).length

  const isReview = lessonId === 'review'
  const index = lessons.findIndex((l) => l.id === lessonId && !l.locked)
  const lesson = index >= 0 ? lessons[index] : null
  const next = lesson ? lessons[index + 1] : null
  const section = lesson?.sections.find((s) => s.id === sectionId)
  const showProject = Boolean(lesson?.project) && sectionId === 'project'

  // Start at the top whenever the page or the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [lessonId, sectionId, step])

  function toggleDone(id) {
    setCompleted((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }

  function toggleTask(id, i) {
    setTasks((all) => {
      const current = all[id] ?? {}
      return { ...all, [id]: { ...current, [i]: !current[i] } }
    })
  }

  function completeSection(key) {
    setSectionsDone((list) => (list.includes(key) ? list : [...list, key]))
    setStreak((s) => bumpStreak(s, today))
  }

  // Saves your rating for a flashcard and picks the day it comes back.
  function gradeCard(cardId, rating) {
    setDeck((all) =>
      countsToward(all[cardId], today) ? { ...all, [cardId]: schedule(all[cardId], rating, today) } : all,
    )
    setStreak((s) => bumpStreak(s, today))
  }

  // Puts cards in the deck to review today. Used when you skip a quick check.
  function addToDeck(cardIds) {
    setDeck((all) => {
      const added = cardIds.filter((id) => !all[id]).map((id) => [id, { box: 0, due: today }])
      return { ...all, ...Object.fromEntries(added) }
    })
  }

  function firstOpenTopicHref() {
    for (const l of lessons.filter((x) => !x.locked)) {
      const open = l.sections.find((s) => !sectionsDone.includes(sectionKey(l.id, s.id)))
      if (open) return `#/${l.id}/${open.id}`
    }
    return `#/${lessons[0].id}`
  }

  let page
  if (isReview) {
    page = (
      <ReviewPage
        lessons={lessons}
        cards={allCards}
        deck={deck}
        today={today}
        streak={currentStreak(streak, today)}
        firstTopicHref={firstOpenTopicHref()}
        onGrade={gradeCard}
      />
    )
  } else if (lesson && showProject) {
    page = (
      <ProjectView lesson={lesson} checked={tasks[lesson.id] ?? {}} onToggle={(i) => toggleTask(lesson.id, i)} />
    )
  } else if (lesson && section) {
    const key = sectionKey(lesson.id, section.id)
    page = (
      <SectionView
        key={key}
        lesson={lesson}
        section={section}
        step={step}
        cards={allCards.filter((card) => card.lessonId === lesson.id && card.sectionId === section.id)}
        isDone={sectionsDone.includes(key)}
        deck={deck}
        today={today}
        onGrade={gradeCard}
        onAddToDeck={addToDeck}
        onComplete={() => completeSection(key)}
      />
    )
  } else if (lesson) {
    page = (
      <LessonView
        key={lesson.id}
        lesson={lesson}
        next={next}
        cards={allCards.filter((card) => card.lessonId === lesson.id)}
        sectionsDone={sectionsDone}
        deck={deck}
        today={today}
        isDone={completed.includes(lesson.id)}
        onToggleDone={() => toggleDone(lesson.id)}
      />
    )
  } else {
    page = (
      <Home
        lessons={lessons}
        completed={completed}
        sectionsDone={sectionsDone}
        dueCount={dueCount}
        deckSize={deckSize}
        upcoming={nextReview(allCards, deck, today)}
        today={today}
        streak={currentStreak(streak, today)}
      />
    )
  }

  return (
    <div className="layout">
      <button
        type="button"
        className="menu-btn"
        aria-label="Open lessons menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        ☰
      </button>

      <Sidebar
        lessons={lessons}
        activeId={isReview ? 'review' : lesson?.id}
        completed={completed}
        sectionsDone={sectionsDone}
        dueCount={dueCount}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="content">{page}</main>
    </div>
  )
}

export default App
