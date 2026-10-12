// ─────────────────────────────────────────────
//  LESSON 4 DEMO: CONDITIONAL RENDERING AND LISTS
//  Each numbered example matches one idea from the lesson.
//  Change things, save, and watch the browser update.
// ─────────────────────────────────────────────
import { useState } from 'react'

// The "dough" for Examples 4 and 5. Add a fruit here (with a new id)
// and it shows up in both examples automatically.
const fruits = [
  { id: 1, emoji: '🍎', name: 'Apple', price: 30 },
  { id: 2, emoji: '🍌', name: 'Banana', price: 10 },
  { id: 3, emoji: '🥭', name: 'Mango', price: 60 },
  { id: 4, emoji: '🍇', name: 'Grapes', price: 45 },
]

// EXAMPLE 1: if / else before the return
// The whole picture changes, so we choose BEFORE drawing anything.
function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return (
      <p>
        Example 1: Welcome back!{' '}
        <button onClick={() => setIsLoggedIn(false)}>Log out</button>
      </p>
    )
  }
  return (
    <p>
      Example 1: Please log in.{' '}
      <button onClick={() => setIsLoggedIn(true)}>Log in</button>
    </p>
  )
}

// EXAMPLE 2: the ternary, condition ? A : B
// Read ? as "if yes" and : as "otherwise".
function ToyStock() {
  const [inStock, setInStock] = useState(true)

  return (
    <p>
      Example 2: Toy car is {inStock ? 'in stock ✅' : 'sold out ❌'}{' '}
      <button onClick={() => setInStock(!inStock)}>Change stock</button>
    </p>
  )
}

// EXAMPLE 3: && means "show this only if true"
// Try changing count > 0 && to count && and press "Read all". A stray 0 appears!
function Notifications() {
  const [count, setCount] = useState(3)

  return (
    <p>
      Example 3: {count > 0 && <strong>You have {count} new messages</strong>}{' '}
      <button onClick={() => setCount(0)}>Read all</button>{' '}
      <button onClick={() => setCount(count + 1)}>New message</button>
    </p>
  )
}

// EXAMPLE 4: lists with .map() (the cookie cutter)
// The key goes on the outermost element inside the map.
function FruitList() {
  return (
    <div>
      <p>Example 4: All fruits</p>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.emoji} {fruit.name}: ₹{fruit.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

// EXAMPLE 5: .filter() first, then .map()
// Change PRICE_LIMIT from 40 to 50 and watch the list change.
const PRICE_LIMIT = 40

function CheapFruits() {
  const [onlyCheap, setOnlyCheap] = useState(false)

  const shown = onlyCheap ? fruits.filter((f) => f.price < PRICE_LIMIT) : fruits

  return (
    <div>
      <p>
        Example 5:{' '}
        <label>
          <input type="checkbox" checked={onlyCheap} onChange={() => setOnlyCheap(!onlyCheap)} />{' '}
          Only fruits under ₹{PRICE_LIMIT}
        </label>
      </p>
      <ul>
        {shown.map((fruit) => (
          <li key={fruit.id}>
            {fruit.emoji} {fruit.name}: ₹{fruit.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

// EXAMPLE 6: changing arrays in state
// Add with spread [...todos, newTodo]. Remove with .filter().
// TodoItem can't change its parent's state, so the parent hands it
// a walkie-talkie: the onDelete function (the idea from Lesson 3).
function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text} <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}

let nextTodoId = 3

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn state' },
    { id: 2, text: 'Learn lists' },
  ])

  function addTodo() {
    const newTodo = { id: nextTodoId, text: `Todo number ${nextTodoId}` }
    nextTodoId = nextTodoId + 1
    setTodos([...todos, newTodo])
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div>
      <p>
        Example 6: <button onClick={addTodo}>Add todo</button>
      </p>
      {todos.length === 0 ? (
        <p>Nothing to do! 🎉</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
          ))}
        </ul>
      )}
    </div>
  )
}

// EXAMPLE 7: the key bug
// Type a note in every box on BOTH sides, then click "Add to top".
// Left (key = index): React thinks "seat 0" is still the same kid,
// so your notes stay in their seats and end up next to the wrong animals.
// Right (key = id): every animal wears a name tag, so notes follow them.
const newAnimals = ['🦊 Fox', '🐼 Panda', '🐸 Frog', '🦁 Lion', '🐧 Penguin']

function KeyBug() {
  const [animals, setAnimals] = useState([
    { id: 1, name: '🐶 Dog' },
    { id: 2, name: '🐱 Cat' },
    { id: 3, name: '🐰 Rabbit' },
  ])

  function addToTop() {
    const name = newAnimals[(animals.length - 3) % newAnimals.length]
    setAnimals([{ id: animals.length + 1, name }, ...animals])
  }

  return (
    <div>
      <p>
        Example 7: <button onClick={addToTop}>Add to top</button>
      </p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <strong>❌ key = index</strong>
          <ul>
            {animals.map((animal, index) => (
              <li key={index}>
                {animal.name} <input placeholder="note" size={10} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>✅ key = id</strong>
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>
                {animal.name} <input placeholder="note" size={10} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ListDemo() {
  return (
    <div>
      <h2>Lesson 4: Conditions and Lists Demo</h2>

      <LoginStatus />
      <ToyStock />
      <Notifications />
      <FruitList />
      <CheapFruits />
      <TodoList />
      <KeyBug />
    </div>
  )
}

export default ListDemo
