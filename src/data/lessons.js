// Every lesson is plain data. To add a lesson, add a new object to this array.
//
// Block types:
//   { type: 'p', text }                      paragraph (supports `code` and **bold**)
//   { type: 'heading', text }                section heading
//   { type: 'code', lang, code, caption? }   code block with a copy button
//   { type: 'list', items, ordered? }        bullet or numbered list
//   { type: 'analogy', title, items }        "think of it like..." cards
//   { type: 'rules', items: [{title, text}]} numbered rule cards
//   { type: 'callout', tone, text }          tone: 'tip' | 'note' | 'try'
//   { type: 'practice', file }               live preview of a practice file

import stateDemoCode from '../practice/lesson3/StateDemo.jsx?raw'

export const lessons = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'How React works, JSX and components',
    summary: 'How your app reaches the screen, what components are, and the three rules of JSX.',
    duration: '30 min',
    sections: [
      {
        id: 'start',
        title: 'Start your app',
        blocks: [
          { type: 'p', text: 'Open a terminal in your project folder and run:' },
          { type: 'code', lang: 'bash', code: 'npm run dev' },
          {
            type: 'p',
            text: 'Open the link it prints, usually `http://localhost:5173`. Leave it running. Every time you save a file, the page updates by itself.',
          },
        ],
      },
      {
        id: 'screen',
        title: 'How your app gets on the screen',
        blocks: [
          { type: 'p', text: 'Think of it like hanging a picture.' },
          {
            type: 'analogy',
            items: [
              {
                icon: '🖼️',
                label: 'The frame',
                file: 'index.html',
                text: 'It has one empty box inside it: a div with the id "root".',
              },
              {
                icon: '🔨',
                label: 'The person hanging it',
                file: 'main.jsx',
                text: 'Finds that empty box and puts your App inside it.',
              },
              {
                icon: '🎨',
                label: 'The picture',
                file: 'App.jsx',
                text: 'This is where you draw what people see.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            text: 'You almost never touch the frame. You spend your time drawing pictures in components.',
          },
        ],
      },
      {
        id: 'component',
        title: 'What is a component?',
        blocks: [
          {
            type: 'p',
            text: 'A component is a **LEGO brick**. Each brick is small and does one job. You snap bricks together to build something big.',
          },
          {
            type: 'p',
            text: 'In code, a component is just a function that returns what should appear on screen. Its name must start with a **capital letter**, so React knows it is a brick and not a normal HTML tag.',
          },
        ],
      },
      {
        id: 'jsx',
        title: 'What is JSX?',
        blocks: [
          {
            type: 'p',
            text: 'JSX is the HTML-looking stuff inside your function. It looks like HTML, but it is really JavaScript wearing an HTML costume. Three small rules come with the costume:',
          },
          {
            type: 'rules',
            items: [
              {
                title: 'Return one parent',
                text: 'You cannot return two boxes side by side. Wrap them in one `div`, or in an empty wrapper written as `<>` and `</>`.',
              },
              {
                title: 'Use className, not class',
                text: 'The word `class` is already taken in JavaScript.',
              },
              {
                title: 'Curly braces open a window to JavaScript',
                text: 'Anything inside `{ }` gets calculated, like `{2 + 2}` or `{name}`.',
              },
            ],
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        blocks: [
          {
            type: 'callout',
            tone: 'try',
            text: 'In this app, your playground for Lesson 1 is `src/practice/lesson1/App.jsx`. Paste the code below into it and save. The live preview further down updates by itself.',
          },
          {
            type: 'code',
            lang: 'jsx',
            caption: 'src/practice/lesson1/App.jsx',
            code: `import './App.css'

function Greeting() {
  const name = "Harshit"
  return <h2>Hi, {name}! 👋</h2>
}

function FavoriteThing() {
  return <p>My favorite number is {7 * 6}.</p>
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <Greeting />
      <FavoriteThing />
      <Greeting />
    </div>
  )
}

export default App`,
          },
          { type: 'p', text: 'Save it and look at the preview. Notice three things:' },
          {
            type: 'list',
            items: [
              '`Greeting` and `FavoriteThing` are two small bricks.',
              '`App` is the big brick that snaps them together.',
              'You used `<Greeting />` twice, and it appeared twice. Write a brick once and reuse it as many times as you like.',
            ],
          },
          { type: 'practice', file: 'src/practice/lesson1/App.jsx' },
        ],
      },
      {
        id: 'js-map',
        title: 'Important JavaScript: map',
        blocks: [
          { type: 'heading', text: 'A plain JavaScript example first' },
          { type: 'p', text: 'Leave React aside for a moment:' },
          {
            type: 'code',
            lang: 'js',
            code: `const numbers = [1, 2, 3]
const doubled = numbers.map((n) => n * 2)
// doubled is [2, 4, 6]`,
          },
          { type: 'p', text: '`map` does this behind the scenes:' },
          {
            type: 'list',
            items: [
              'Takes `1`, runs `1 * 2`, keeps `2`',
              'Takes `2`, runs `2 * 2`, keeps `4`',
              'Takes `3`, runs `3 * 2`, keeps `6`',
              'Returns `[2, 4, 6]`',
            ],
          },
          { type: 'p', text: 'The original `numbers` array is not changed.' },

          { type: 'heading', text: 'Now your code' },
          {
            type: 'code',
            lang: 'jsx',
            code: `const hobbies = ["Reading", "Swimming", "Playing Guitar"];

{hobbies.map((hobby, index) => (
    <li key={index}>{hobby}</li>
))}`,
          },
          { type: 'p', text: 'Piece by piece:' },
          {
            type: 'list',
            items: [
              '`hobbies.map(...)`: "Go through every item in the `hobbies` array."',
              '`(hobby, index) =>`: a function that runs once per item. `hobby` is the current item and `index` is its position (0, 1, 2). You can name these anything.',
              '`<li>{hobby}</li>`: what to make for each item, a list item showing the hobby.',
              '`key={index}`: a label React needs (explained below).',
              'Outer `{ }`: switches from JSX into JavaScript, as you learned today.',
            ],
          },
          { type: 'p', text: 'So `map` turns this array of **strings**:' },
          { type: 'code', lang: 'js', code: '["Reading", "Swimming", "Playing Guitar"]' },
          { type: 'p', text: 'into this array of **JSX elements**:' },
          { type: 'code', lang: 'jsx', code: '[<li>Reading</li>, <li>Swimming</li>, <li>Playing Guitar</li>]' },
          {
            type: 'p',
            text: 'React knows how to display an array of elements, so all three show up in the `<ul>`. The result is the same as typing the three `<li>` tags by hand, but now you can add a fourth hobby by adding one word to the array.',
          },

          { type: 'heading', text: 'Why ( ) and not { } after the arrow?' },
          {
            type: 'list',
            items: [
              '`=> ( ... )` returns whatever is inside automatically.',
              '`=> { ... }` needs you to write `return` yourself:',
            ],
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `hobbies.map((hobby, index) => {
  return <li key={index}>{hobby}</li>
})`,
          },
          {
            type: 'callout',
            tone: 'tip',
            text: 'Both versions do the same thing. A common beginner bug is using `{ }` and forgetting `return`. When that happens, nothing appears on the page and React shows no error.',
          },

          { type: 'heading', text: 'What is key?' },
          {
            type: 'p',
            text: 'When React draws a list, it wants a unique label on each item so it can tell the items apart if the list changes later. Without one, React prints a warning in the browser console.',
          },
          {
            type: 'p',
            text: "Using `index` is fine for a fixed list like yours. Later you'll learn to use something unique to each item, like an id, because the index can cause problems when items are added, removed or reordered.",
          },

          { type: 'heading', text: 'Try it yourself' },
          {
            type: 'list',
            ordered: true,
            items: [
              'Add a fourth hobby to the array and watch it appear.',
              'Change the `<li>` to show the position too: `{index + 1}. {hobby}`',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            text: 'This `map` counts as your use of curly braces in `Hobbies`, so that mini project requirement is already done.',
          },
        ],
      },
    ],
    project: {
      title: 'Mini project 1: Profile card',
      intro: 'Build a card about yourself using only what you learned today. Work inside `src/practice/lesson1/`.',
      tasks: [
        'Make a folder called `components` inside `src/practice/lesson1`.',
        'Create `Avatar.jsx` that shows an emoji or image.',
        'Create `Bio.jsx` that shows your name and a one-line description.',
        'Create `Hobbies.jsx` that shows a list of three hobbies.',
        'Export each one with `export default`, the same way App does at the bottom.',
        "Import them into App with a line like `import Avatar from './components/Avatar'`.",
        'Put all three inside a `div` with the className `"card"`.',
        'Use curly braces at least once in each component, for example `{2026 - birthYear}` for your age.',
        'Bonus: add CSS for `.card` in `App.css` with a border and rounded corners.',
      ],
      outro: 'When you are done, share your code for a review. Next up is Lesson 2, where your bricks learn to receive information from outside. That idea is called **props**.',
    },
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Props: passing information to components',
    summary: 'Teach your bricks to receive information from outside.',
    duration: '30 min',
    sections: [
      {
        id: 'problem',
        title: 'The problem props solve',
        blocks: [
          {
            type: 'p',
            text: 'Look at your `Bio`. It always says "Aryan Sharma". If you want a second card for a friend, you would have to copy the whole file and change the name. That defeats the point of reusable bricks.',
          },
        ],
      },
      {
        id: 'what',
        title: 'What props are',
        blocks: [
          {
            type: 'p',
            text: 'Think of a component as a **birthday card printer**. The printer is always the same, but each time you tell it "this one is for Riya, she\'s turning 10". That note you hand the printer is a prop. Props are information a parent component passes down to a child.',
          },
          { type: 'p', text: 'You pass props the same way you give an HTML tag attributes:' },
          { type: 'code', lang: 'jsx', code: '<Bio name="Aryan Sharma" birthYear={2003} />' },
          {
            type: 'callout',
            tone: 'note',
            text: 'Strings go in quotes. Anything else, like numbers, arrays, or `true` and `false`, goes in curly braces.',
          },
          { type: 'p', text: 'The child receives them all packed in one box called `props`:' },
          {
            type: 'code',
            lang: 'jsx',
            code: `function Bio(props) {
  return <h2>{props.name}</h2>
}`,
          },
          {
            type: 'p',
            text: 'Most people unpack the box right in the brackets. This is called **destructuring**, and it reads more cleanly:',
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `function Bio({ name, birthYear }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>A {2026 - birthYear}-year-old student from India.</p>
    </div>
  )
}`,
          },
          { type: 'p', text: 'Now one `Bio` brick can show anyone:' },
          {
            type: 'code',
            lang: 'jsx',
            code: `<Bio name="Aryan Sharma" birthYear={2003} />
<Bio name="Riya Verma" birthYear={2005} />`,
          },
        ],
      },
      {
        id: 'rules',
        title: 'Four rules to remember',
        blocks: [
          {
            type: 'rules',
            items: [
              {
                title: 'Props flow downward only',
                text: 'A parent gives props to a child. A child cannot send props back up to its parent. We\'ll learn how children talk back in Lesson 3.',
              },
              {
                title: 'Props are read-only',
                text: 'A child must never change a prop. It\'s like a gift with a "do not edit" sticker. Writing `name = "Bob"` inside `Bio` is not allowed.',
              },
              {
                title: 'You can set default values',
                text: 'Write `function Bio({ name = "Anonymous" })` so the card still works when nobody passes a name.',
              },
              {
                title: 'children is a special prop',
                text: 'Whatever you put between the opening and closing tags arrives as `children`. This lets you build wrapper boxes, like the example below.',
              },
            ],
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `function Card({ children }) {
  return <div className="card">{children}</div>
}

<Card>
  <h2>Anything I put here</h2>
  <p>shows up inside the card.</p>
</Card>`,
          },
        ],
      },
      {
        id: 'demo',
        title: 'All the ideas in one file',
        blocks: [
          {
            type: 'p',
            text: 'Here is every idea from this lesson in one small file. Each numbered example matches one idea:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              '**The props box.** `HelloBox` reads the note it was handed as `props.name`.',
              '**Destructuring.** `Bio` unpacks `name` and `birthYear` right in the brackets.',
              '**Default values.** `RoleTag` falls back to `"Team Member"` when the parent sends no `role`. Riya gets the default.',
              '**The children prop.** Everything between `<Card>` and `</Card>`, even a button, arrives as `children`.',
              '**Non-string props.** `SkillList` gets an array and a `true`/`false` value, both passed in curly braces.',
            ],
          },
          {
            type: 'p',
            text: 'The parent, `PropsDemo`, is where props are **given**. Notice that strings use quotes and everything else uses `{ }`.',
          },
          {
            type: 'code',
            lang: 'jsx',
            caption: 'src/practice/lesson2/PropsDemo.jsx',
            code: `// IDEA 1: the props "box"
// The parent hands over a note. The child reads it as props.name.
function HelloBox(props) {
  return (
    <p>Example 1: Hello, {props.name}!</p>
  )
}

// IDEA 2: destructuring (unpacking the box in the brackets)
// Same as above, but we pull name and birthYear out directly.
function Bio({ name, birthYear }) {
  return (
    <p>
      Example 2: {name} is {2026 - birthYear} years old.
    </p>
  )
}

// IDEA 3: default values
// If the parent forgets to send "role", we use "Team Member".
function RoleTag({ name, role = "Team Member" }) {
  return (
    <p>
      Example 3: {name} is a {role}.
    </p>
  )
}

// IDEA 4: the special "children" prop
// Whatever sits BETWEEN <Card> and </Card> arrives here as children.
function Card({ children }) {
  return (
    <div style={{ border: "2px solid #888", borderRadius: 12, padding: 12, margin: "12px 0" }}>
      {children}
    </div>
  )
}

// IDEA 5: passing non-string props (numbers, booleans, arrays)
function SkillList({ skills, isLearning }) {
  return (
    <div>
      <p>Example 5: Still learning? {isLearning ? "Yes" : "No"}</p>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

// THE PARENT: this is where props are GIVEN.
// Notice: strings use quotes, everything else uses { }.
function PropsDemo() {
  return (
    <div>
      <h2>Lesson 2: Props Demo</h2>

      <HelloBox name="Harshit" />
      <HelloBox name="Riya" />

      <Bio name="Aryan Sharma" birthYear={2003} />

      <RoleTag name="Aryan" role="Designer" />
      <RoleTag name="Riya" />{/* no role passed → default kicks in */}

      <Card>
        <p>Example 4: I am children! I live inside the Card.</p>
        <button>Even a button can be a child</button>
      </Card>

      <SkillList skills={["HTML", "CSS", "React"]} isLearning={true} />
    </div>
  )
}

export default PropsDemo`,
          },
          {
            type: 'callout',
            tone: 'try',
            text: 'This file already exists at `src/practice/lesson2/PropsDemo.jsx`. Change a name, remove `role="Designer"`, or add a skill, then save and watch the preview below.',
          },
          { type: 'practice', file: 'src/practice/lesson2/PropsDemo.jsx' },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        blocks: [
          {
            type: 'callout',
            tone: 'try',
            text: 'Your playground for Lesson 2 is `src/practice/lesson2/App.jsx`. Build the mini project below there, and the live preview updates by itself.',
          },
          { type: 'practice', file: 'src/practice/lesson2/App.jsx' },
        ],
      },
    ],
    project: {
      title: 'Mini project 2: Team member cards',
      intro: 'Build a page that shows three team members, each in their own card, using one set of reusable components. Work inside `src/practice/lesson2/`.',
      tasks: [
        'Make a folder called `components` inside `src/practice/lesson2`.',
        'Create `Card.jsx`. It is a wrapper that uses `children`, like the example above.',
        'Create `MemberCard.jsx`. It receives `name`, `role`, `birthYear`, `avatar`, and `skills` as props. The avatar can be an emoji string like `"🦊"`. Skills is an array, so pass it as `skills={["React", "CSS"]}` and show it with `.map()`.',
        'Give `role` a default value of `"Team Member"`, and leave it out for one person to prove the default works.',
        'Inside `MemberCard`, wrap everything in your `Card` component. This shows a component using another component.',
        'In `src/practice/lesson2/App.jsx`, render three `MemberCard`s with different data.',
        'Bonus: put the three people in an array of objects in App, then use `.map()` to create the cards instead of writing `MemberCard` three times. Pass each person\'s data with `<MemberCard key={person.name} {...person} />`. The `{...person}` part spreads every field of the object as a separate prop.',
      ],
      outro: 'When you are done, share your code for a review. Next up is Lesson 3, where components finally get a memory of their own and respond to clicks. That is called **state**.',
    },
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'State and events: giving components a memory',
    summary: 'Make components remember things and respond to clicks.',
    duration: '40 min',
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            text: 'So far your components are like **printed posters**. They show something, but nothing changes when you click. Real apps need to remember things, like how many likes a post has, or whether a menu is open.',
          },
        ],
      },
      {
        id: 'state',
        title: "State is a component's memory",
        blocks: [
          {
            type: 'p',
            text: 'Imagine each component carries a small **notebook**. It writes things it needs to remember in that notebook. When something in the notebook changes, React redraws that component on screen.',
          },
          { type: 'heading', text: "Why a normal variable doesn't work" },
          {
            type: 'p',
            text: "React only redraws when you **ring a bell**. If you change a normal variable with `count = count + 1`, the number changes in the computer's memory, but nobody rings the bell. The screen stays the same. Example 1 in the demo shows exactly this.",
          },
          { type: 'heading', text: 'useState gives you the notebook and the bell' },
          {
            type: 'code',
            lang: 'jsx',
            code: `import { useState } from 'react'

const [count, setCount] = useState(0)`,
          },
          {
            type: 'list',
            items: [
              "`count` is what's written in the notebook right now.",
              '`setCount` is the bell. Calling it writes a new value and tells React to redraw.',
              '`0` is the starting value, used only the very first time.',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            text: 'Never change `count` directly. Always use `setCount`.',
          },
        ],
      },
      {
        id: 'events',
        title: 'Events let you react to the user',
        blocks: [
          {
            type: 'p',
            text: 'You attach a function to a tag with `onClick`, `onChange`, and similar names. Watch out for the most common beginner mistake:',
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `<button onClick={handleClick}>    // ✅ "call this WHEN clicked"
<button onClick={handleClick()}>  // ❌ "call this RIGHT NOW while drawing"
<button onClick={() => setCount(count + 1)}>  // ✅ small arrow function`,
          },
        ],
      },
      {
        id: 'rules',
        title: 'Three more ideas',
        blocks: [
          {
            type: 'rules',
            items: [
              {
                title: 'The updater function',
                text: 'When the new value depends on the old one, pass a function instead of a value. Write `setCount(c => c + 1)` instead of `setCount(count + 1)`. React gives you the freshest value each time. Example 3 shows why this matters.',
              },
              {
                title: 'Each copy has its own memory',
                text: "The demo draws two `Counter`s. Click one and the other doesn't move. Each brick gets its own notebook.",
              },
              {
                title: 'How children talk back',
                text: "In Lesson 2 you learned props only flow downward. The trick is that a parent can pass a **function** as a prop. The child calls that function, and the parent's state changes. Think of it as the parent giving the child a walkie-talkie. Example 5 shows this.",
              },
            ],
          },
        ],
      },
      {
        id: 'demo',
        title: 'Explore the demo',
        blocks: [
          {
            type: 'p',
            text: 'Run `npm run dev` if it isn\'t running, then open `src/practice/lesson3/StateDemo.jsx` next to the browser.',
          },
          {
            type: 'code',
            lang: 'jsx',
            caption: 'src/practice/lesson3/StateDemo.jsx',
            code: stateDemoCode,
          },
          { type: 'practice', file: 'src/practice/lesson3/StateDemo.jsx' },
          { type: 'p', text: 'Try these one at a time:' },
          {
            type: 'list',
            ordered: true,
            items: [
              '**See the broken counter.** Press F12 to open the console, then click Example 1. The console count goes up, but the page stays at 0.',
              '**Compare the +3 buttons.** "+3 wrong" adds 1. "+3 right" adds 3. Read both functions to see why.',
              '**Add a button.** In `Counter`, add a "+10" button.',
              '**Make a rule.** Stop `Counter` from going below 0. Hint: use `Math.max(0, count - 1)`.',
              '**Change a starting value.** Make `LightSwitch` start with the light on.',
              '**Make your own state.** Add a `MoodSwitcher` with `useState("😊")` and three buttons that set it to 😊, 😢 and 😡.',
            ],
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        blocks: [
          {
            type: 'callout',
            tone: 'try',
            text: 'Your playground for Lesson 3 is `src/practice/lesson3/App.jsx`. Build the mini project below there, and the live preview updates by itself.',
          },
          { type: 'practice', file: 'src/practice/lesson3/App.jsx' },
        ],
      },
    ],
    project: {
      title: 'Mini project 3: Counter and mood switcher',
      intro: 'Build this yourself inside `src/practice/lesson3/`. Put your components in a `components` folder there.',
      tasks: [
        'A `Counter` component with +1, -1 and Reset buttons. It takes a `step` prop, so `<Counter step={5} />` adds 5 at a time. It never goes below 0.',
        'A `MoodSwitcher` component that shows a big emoji and a sentence like "I\'m feeling happy". Clicking buttons changes the mood.',
        'A `ThemeToggle` component with a button that switches the background between light and dark. Hint: use a boolean state and `style={{ background: isDark ? "#222" : "#fff" }}`.',
        'A parent-child walkie-talkie. Make a `ClickTracker` parent that holds a total click count. Render two `ClickButton` children that each receive an `onClick` prop. Clicking either button raises the shared total.',
        'Bonus: finish mini project 2 now. Give `MemberCard` a "❤️ Like" button with its own like count. Each card will remember its own likes.',
      ],
      outro: "When you've built it, share your code for a review. Lesson 4 comes next, where you show different things depending on state and turn arrays into lists properly with keys.",
    },
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Conditional rendering and lists',
    summary: 'Show different things depending on state, and build lists properly with keys.',
    duration: 'Coming soon',
    locked: true,
    sections: [],
  },
]
