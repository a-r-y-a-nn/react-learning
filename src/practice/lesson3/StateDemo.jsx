// ─────────────────────────────────────────────
//  LESSON 3 DEMO: STATE AND EVENTS
//  Each numbered example matches one idea from the lesson.
//  Change things, save, and watch the browser update.
// ─────────────────────────────────────────────
import { useState } from 'react'

// EXAMPLE 1: why a normal variable doesn't work
// The number changes in memory (watch the console with F12),
// but nobody rings React's bell, so the screen stays at 0.

function BrokenCounter() {
  let count = 0

  function handleClick() {
    count = count + 1
    console.log('BrokenCounter count is now', count)
  }

  return (
    <p>
      Example 1: {count}{' '}
      <button onClick={handleClick}>+1 (broken)</button>
    </p>
  )
}

// EXAMPLE 2: useState gives you the notebook (count) and the bell (setCount)
// This brick is drawn twice below. Each copy has its own notebook.
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <p>
      Example 2: {count}{' '}
      <button onClick={() => setCount(count + 1)}>+1</button>{' '}
      <button onClick={() => setCount(count - 1)}>-1</button>{' '}
      <button onClick={() => setCount(0)}>Reset</button>
    </p>
  )
}

// EXAMPLE 3: the updater function
// count is a snapshot. Inside one click it stays the same value,
// so three setCount(count + 1) calls all write the SAME number.
// c => c + 1 asks React for the freshest value each time.
function PlusThree() {
  const [count, setCount] = useState(0)

  function addThreeWrong() {
    setCount(count + 1) // set to 1
    setCount(count + 1) // set to 1 again
    setCount(count + 1) // set to 1 again
  }

  function addThreeRight() {
    setCount((c) => c + 1) //// 0 → 1
    setCount((c) => c + 1) // 1 → 2
    setCount((c) => c + 1) // 2 → 3
  }

  return (
    <p>
      Example 3: {count}{' '}
      <button onClick={addThreeWrong}>+3 wrong</button>{' '}
      <button onClick={addThreeRight}>+3 right</button>
    </p>
  )
}

// EXAMPLE 4: a true/false state and an event handler
// handleClick is passed WITHOUT () so it runs when clicked, not while drawing.
function LightSwitch() {
  const [isOn, setIsOn] = useState(false)

  function handleClick() {
    setIsOn(!isOn)
  }

  return (
    <p>
      Example 4: The light is {isOn ? '💡 ON' : '🌑 OFF'}{' '}
      <button onClick={handleClick}>Flip the switch</button>
    </p>
  )
}

// EXAMPLE 5: how children talk back (the walkie-talkie)
// The parent owns the state and hands the child a function as a prop.
// The child calls it, and the parent's state changes.
function CheerButton({ onCheer }) {
  return <button onClick={onCheer}>Cheer 🎉</button>
}

function CheerBoard() {
  const [cheers, setCheers] = useState(0)

  return (
    <p>
      Example 5: The parent heard {cheers} cheers.{' '}
      <CheerButton onCheer={() => setCheers((c) => c + 1)} />{' '}
      <CheerButton onCheer={() => setCheers((c) => c + 1)} />
    </p>
  )
}

function StateDemo() {
  return (
    <div>
      <h2>Lesson 3: State Demo</h2>

      <BrokenCounter />

      <Counter />
      <Counter />{/* click one, the other doesn't move */}

      <PlusThree />

      <LightSwitch />

      <CheerBoard />
    </div>
  )
}

export default StateDemo
