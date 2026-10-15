// Every lesson is plain data. To add a lesson, add a new object to this array.
//
// Block types:
//   { type: 'p', text }                      paragraph (supports `code` and **bold**)
//   { type: 'heading', text }                section heading
//   { type: 'code', lang, code, caption? }   code block with a copy button
//   { type: 'list', items, ordered? }        bullet or numbered list
//   { type: 'analogy', title, items }        "think of it like..." cards
//   { type: 'rules', items: [{title, text}]} numbered rule cards
//   { type: 'callout', tone, text }          tone: 'tip' | 'note' | 'try' | 'idea'
//   { type: 'table', head, rows }            comparison table; head is a row of strings, rows an array of them
//   { type: 'practice', file }               live preview of a practice file
//
// Each section is shown one step at a time. A new step starts at every 'heading' block.
//
// Section fields besides id, title and blocks:
//   icon    an emoji for the topic card
//   hook    one short line that says what the topic is about
//   cards   flashcards for the quick check and Daily review: [{ q, a, qCode?, aCode? }]
//           q and a support `code` and **bold**. qCode and aCode add a code block.
//           Cards are tracked by position, so add new cards at the end of the list.

import stateDemoCode from '../practice/lesson3/StateDemo.jsx?raw'
import listDemoCode from '../practice/lesson4/ListDemo.jsx?raw'

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
        icon: '🚀',
        hook: 'One command starts your app and keeps the page live.',
        blocks: [
          { type: 'p', text: 'Open a terminal in your project folder and run:' },
          { type: 'code', lang: 'bash', code: 'npm run dev' },
          {
            type: 'p',
            text: 'Open the link it prints, usually `http://localhost:5173`. Leave it running. Every time you save a file, the page updates by itself.',
          },
        ],
        cards: [
          {
            q: 'Which command starts your React app while you work?',
            a: '`npm run dev`. It prints a link, usually `http://localhost:5173`.',
          },
          {
            q: 'While `npm run dev` is running, do you need to refresh the page after saving a file?',
            a: 'No. The page updates by itself every time you save.',
          },
        ],
      },
      {
        id: 'screen',
        title: 'How your app gets on the screen',
        icon: '🖼️',
        hook: 'Three files work together, like hanging a picture.',
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
        cards: [
          {
            q: 'In the picture analogy, what is `index.html`?',
            a: '**The frame.** It holds one empty box: a div with the id "root".',
          },
          {
            q: 'What does `main.jsx` do?',
            a: "It's **the person hanging the picture**. It finds the empty root box and puts your `App` inside it.",
          },
          {
            q: 'Which file is "the picture", where you draw what people see?',
            a: '`App.jsx` and the components inside it. You almost never touch the frame.',
          },
        ],
      },
      {
        id: 'component',
        title: 'What is a component?',
        icon: '🧱',
        hook: 'Small bricks that snap together into a whole app.',
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
        cards: [
          {
            q: 'What is a component, in code?',
            a: 'A **function that returns what should appear on screen**. Like a LEGO brick, it is small and does one job.',
          },
          {
            q: "Why must a component's name start with a capital letter?",
            a: 'So React knows it is **your brick** and not a normal HTML tag like `div`.',
          },
        ],
      },
      {
        id: 'jsx',
        title: 'What is JSX?',
        icon: '🎭',
        hook: 'HTML in a JavaScript costume, with three rules.',
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
        cards: [
          {
            q: 'Can a component return two elements side by side?',
            a: 'No. Return **one parent**. Wrap them in a `div`, or in an empty wrapper written as `<>` and `</>`.',
          },
          {
            q: 'Why do you write `className` instead of `class` in JSX?',
            a: 'The word `class` is already taken in JavaScript.',
          },
          {
            q: 'What happens to whatever you put inside `{ }` in JSX?',
            a: 'It gets **calculated as JavaScript**. `{2 + 2}` shows 4, and `{name}` shows the value of `name`.',
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        icon: '🛠️',
        hook: 'Paste, save, and watch your bricks show up.',
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
          { type: 'heading', text: 'Watch it work' },
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
        cards: [
          {
            q: 'You write `<Greeting />` twice inside `App`. What appears on the page?',
            a: 'The greeting appears **twice**. Write a brick once and reuse it as often as you like.',
          },
        ],
      },
      {
        id: 'js-map',
        title: 'Important JavaScript: map',
        icon: '🔁',
        hook: 'Turn an array of data into a list on screen.',
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
          { type: 'heading', text: 'Strings in, JSX out' },
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
        cards: [
          {
            q: 'What does `[1, 2, 3].map((n) => n * 2)` give you?',
            a: '`[2, 4, 6]`. The original array is not changed.',
          },
          {
            q: 'Inside JSX, what does `.map()` turn your array of data into?',
            a: 'An array of **JSX elements**. React knows how to draw an array of elements, so they all show up.',
          },
          {
            q: 'Nothing appears and React shows no error. What is wrong?',
            qCode: `hobbies.map((hobby) => {
  <li>{hobby}</li>
})`,
            a: 'With `{ }` after the arrow, you must write `return` yourself. Use `( )` instead to return automatically.',
          },
          {
            q: 'Why does each list item need a `key`?',
            a: 'It is a unique label, so React can tell the items apart when the list changes. Without one, React prints a warning in the console.',
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
        icon: '🤔',
        hook: 'Why a hard-coded name makes a brick hard to reuse.',
        blocks: [
          {
            type: 'p',
            text: 'Look at your `Bio`. It always says "Aryan Sharma". If you want a second card for a friend, you would have to copy the whole file and change the name. That defeats the point of reusable bricks.',
          },
        ],
        cards: [
          {
            q: 'What problem do props solve?',
            a: 'Without props, a component always shows the same thing. Props let **one component show different data** each time you use it.',
          },
        ],
      },
      {
        id: 'what',
        title: 'What props are',
        icon: '🎁',
        hook: 'Notes a parent hands down to its child.',
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
          { type: 'heading', text: 'Reading props in the child' },
          { type: 'p', text: 'The child receives them all packed in one box called `props`:' },
          {
            type: 'code',
            lang: 'jsx',
            code: `function Bio(props) {
  return <h2>{props.name}</h2>
}`,
          },
          { type: 'heading', text: 'Unpack the box' },
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
        cards: [
          {
            q: 'What are props?',
            a: 'Information a **parent** component passes down to a **child**. You write them like HTML attributes.',
            aCode: '<Bio name="Aryan Sharma" birthYear={2003} />',
          },
          {
            q: 'When does a prop value go in quotes, and when in curly braces?',
            a: '**Strings** go in quotes. Everything else, like numbers, arrays and `true` or `false`, goes in `{ }`.',
          },
          {
            q: 'What does destructuring do here?',
            qCode: 'function Bio({ name, birthYear }) { ... }',
            a: 'It unpacks the props box right in the brackets, so you can write `name` instead of `props.name`.',
          },
        ],
      },
      {
        id: 'rules',
        title: 'Four rules to remember',
        icon: '📜',
        hook: 'Four rules every prop follows.',
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
        cards: [
          {
            q: 'Which way do props flow?',
            a: '**Downward only**, from parent to child. A child cannot send props back up.',
          },
          {
            q: 'Can a child change a prop it received?',
            a: 'No. Props are **read-only**, like a gift with a "do not edit" sticker.',
          },
          {
            q: 'How do you give the `name` prop a default value?',
            a: 'Set it right in the brackets.',
            aCode: 'function Bio({ name = "Anonymous" }) { ... }',
          },
          {
            q: 'What arrives in the special `children` prop?',
            a: 'Whatever you put **between** the opening and closing tags, like everything between `<Card>` and `</Card>`.',
          },
        ],
      },
      {
        id: 'demo',
        title: 'All the ideas in one file',
        icon: '🧪',
        hook: 'Every props idea in one runnable file.',
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
          { type: 'heading', text: 'Read the code' },
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
          { type: 'heading', text: 'Play with it' },
          {
            type: 'callout',
            tone: 'try',
            text: 'This file already exists at `src/practice/lesson2/PropsDemo.jsx`. Change a name, remove `role="Designer"`, or add a skill, then save and watch the preview below.',
          },
          { type: 'practice', file: 'src/practice/lesson2/PropsDemo.jsx' },
        ],
        cards: [
          {
            q: 'This passes no role. What does `RoleTag` show?',
            qCode: '<RoleTag name="Riya" />',
            a: '"Riya is a Team Member." The default value `role = "Team Member"` kicks in.',
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        icon: '🛠️',
        hook: 'Build team member cards in your playground.',
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
        icon: '📌',
        hook: 'Printed posters never change. Real apps must.',
        blocks: [
          {
            type: 'p',
            text: 'So far your components are like **printed posters**. They show something, but nothing changes when you click. Real apps need to remember things, like how many likes a post has, or whether a menu is open.',
          },
        ],
        cards: [
          {
            q: 'Why do real apps need state?',
            a: 'To **remember** things that change, like how many likes a post has or whether a menu is open.',
          },
        ],
      },
      {
        id: 'state',
        title: "State is a component's memory",
        icon: '📒',
        hook: 'A notebook and a bell for every component.',
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
        cards: [
          {
            q: 'What do you get from this line?',
            qCode: 'const [count, setCount] = useState(0)',
            a: '`count` is what is in the notebook right now. `setCount` is the bell: it writes a new value and tells React to redraw. `0` is the starting value.',
          },
          {
            q: 'Why does `count = count + 1` on a normal variable not update the screen?',
            a: 'Nobody rings the bell. The value changes in memory, but React does not know it should redraw.',
          },
          {
            q: 'How should you always change a state value like `count`?',
            a: 'With its setter, `setCount`. Never assign to `count` directly.',
          },
        ],
      },
      {
        id: 'events',
        title: 'Events let you react to the user',
        icon: '👆',
        hook: 'Run code when someone clicks or types.',
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
        cards: [
          {
            q: 'What is wrong with this button?',
            qCode: '<button onClick={handleClick()}>',
            a: 'The `()` calls the function **right now, while drawing**. Write `onClick={handleClick}` so it runs **when clicked**.',
          },
          {
            q: 'How do you run `setCount(count + 1)` when a button is clicked?',
            a: 'Wrap it in a small arrow function.',
            aCode: '<button onClick={() => setCount(count + 1)}>',
          },
        ],
      },
      {
        id: 'rules',
        title: 'Three more ideas',
        icon: '💡',
        hook: 'Updater functions, separate memories, and walkie-talkies.',
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
        cards: [
          {
            q: 'When should you write `setCount((c) => c + 1)` instead of `setCount(count + 1)`?',
            a: 'When the new value **depends on the old one**. React hands you the freshest value each time.',
          },
          {
            q: 'Two `Counter`s are on the page. You click one. Does the other change?',
            a: 'No. Each copy of a component has **its own memory**.',
          },
          {
            q: "How can a child change its parent's state?",
            a: 'The parent passes a **function** as a prop. The child calls it, like talking on a walkie-talkie.',
          },
        ],
      },
      {
        id: 'demo',
        title: 'Explore the demo',
        icon: '🧪',
        hook: 'Click, break and fix a real state demo.',
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
          { type: 'heading', text: 'Play with it' },
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
        cards: [
          {
            q: 'Why does this add only 1 instead of 3?',
            qCode: `setCount(count + 1)
setCount(count + 1)
setCount(count + 1)`,
            a: '`count` keeps the same value during one click, so all three calls write the same number. `setCount((c) => c + 1)` uses the freshest value and adds 3.',
          },
        ],
      },
      {
        id: 'remember',
        title: 'Points to remember: why the broken counter stays at 0',
        icon: '🔍',
        hook: 'Two reasons the broken counter stays at 0.',
        blocks: [
          { type: 'heading', text: "Reason 1: React doesn't know the number changed" },
          { type: 'p', text: 'When you click, this runs:' },
          { type: 'code', lang: 'jsx', code: 'count = count + 1;' },
          {
            type: 'p',
            text: "The variable really does go up. You can see 1, 2, 3... in the Console (F12). But changing a normal variable doesn't tell React anything, so React never redraws the screen and keeps showing the old number.",
          },
          {
            type: 'callout',
            tone: 'idea',
            text: "Think of the screen as a **photo** React took of your component. Changing `count` is like changing things in the room after the photo was taken. The photo doesn't update unless someone takes a new one.",
          },

          { type: 'heading', text: 'Reason 2: Even if React redrew the screen, count would start at 0 again' },
          {
            type: 'p',
            text: 'Every time React draws a component, it runs the **whole function again from the top**:',
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `function BrokenCounter() {
  let count = 0;   // ← runs again on every redraw, so count is 0 again
  ...
}`,
          },
          {
            type: 'p',
            text: "So even if something else made React redraw, `let count = 0` would run again and your clicks would be lost. A normal variable can't remember anything between redraws.",
          },

          { type: 'heading', text: 'How useState fixes both problems' },
          { type: 'code', lang: 'jsx', code: 'const [count, setCount] = useState(0);' },
          {
            type: 'table',
            head: ['', 'Normal variable (`let count`)', 'State (`useState`)'],
            rows: [
              ['Remembers its value between redraws?', '❌ No, goes back to 0', '✅ Yes, React stores it'],
              ['Tells React to redraw the screen?', '❌ No', '✅ Yes, `setCount` does'],
            ],
          },
          {
            type: 'p',
            text: 'So `setCount(count + 1)` saves the new number **and** tells React to redraw, and the screen updates.',
          },
          {
            type: 'callout',
            tone: 'note',
            text: 'In short: use `useState` for any value that changes and needs to show on screen. A normal `let` variable won\'t work for that.',
          },
        ],
        cards: [
          {
            q: 'Give the two reasons a normal `let` variable cannot work as a counter.',
            a: 'One: changing it does not tell React to redraw. Two: every redraw runs the whole function from the top, so `let count = 0` resets it.',
          },
          {
            q: 'What does `useState` do that a normal variable cannot?',
            a: 'It **remembers** the value between redraws, and its setter **tells React to redraw**.',
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        icon: '🛠️',
        hook: 'Build a counter and a mood switcher.',
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
    duration: '45 min',
    sections: [
      {
        id: 'conditional',
        title: 'Part 1: Conditional rendering',
        icon: '🚦',
        hook: 'Show different things depending on the situation.',
        blocks: [
          {
            type: 'p',
            text: "Sometimes a component should draw different things depending on the situation. It's like a **traffic light**. It's the same light, but it shows red or green depending on what's happening. React gives you three ways to choose.",
          },
          { type: 'heading', text: 'if / else, before the return' },
          { type: 'p', text: 'Use this when the whole picture changes.' },
          {
            type: 'code',
            lang: 'jsx',
            code: `if (isLoggedIn) {
  return <p>Welcome back!</p>
}
return <p>Please log in.</p>`,
          },
          { type: 'heading', text: 'The ternary, condition ? A : B' },
          {
            type: 'p',
            text: 'This is a tiny if/else that fits inside JSX. Read the question mark as **"if yes"** and the colon as **"otherwise"**.',
          },
          { type: 'code', lang: 'jsx', code: '<p>Toy car is {inStock ? "in stock" : "sold out"}</p>' },
          { type: 'heading', text: '&& means "show this only if true"' },
          { type: 'p', text: 'If the condition is false, nothing appears.' },
          { type: 'code', lang: 'jsx', code: '{count > 0 && <strong>You have {count} new messages</strong>}' },
          {
            type: 'callout',
            tone: 'note',
            text: '**The && trap.** If you write `{count && ...}` and `count` is 0, React prints a "0" on the screen. Always turn it into a clear true or false first, like `count > 0`.',
          },
        ],
        cards: [
          {
            q: 'Name the three ways to show something only in some situations.',
            a: '`if / else` before the return, the ternary `condition ? A : B`, and `condition && <Thing />`.',
          },
          {
            q: 'How do you read this ternary out loud?',
            qCode: 'inStock ? "in stock" : "sold out"',
            a: '"If yes, in stock. Otherwise, sold out." The `?` means **if yes** and the `:` means **otherwise**.',
          },
          {
            q: 'Why can this print a stray 0 on the screen?',
            qCode: '{count && <strong>New messages</strong>}',
            a: 'When `count` is 0, React prints the 0. Turn it into a clear true or false first, like `count > 0 &&`.',
          },
        ],
      },
      {
        id: 'lists',
        title: 'Part 2: Lists with .map()',
        icon: '🍪',
        hook: 'Cookie-cutter your data into list items.',
        blocks: [
          {
            type: 'p',
            text: 'Real apps show lists, like products, messages or todos. You keep the data in an array and use `.map()` to turn each item into JSX.',
          },
          {
            type: 'callout',
            tone: 'idea',
            text: 'Think of a **cookie cutter**. The array is the dough, `.map()` is pressing the cutter, and each cookie is a list item.',
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `{fruits.map((fruit) => (
  <li key={fruit.id}>{fruit.emoji} {fruit.name}</li>
))}`,
          },
          { type: 'heading', text: '.filter() picks only some items' },
          { type: 'p', text: 'It keeps items that pass a test. You often filter first, then map.' },
          { type: 'code', lang: 'jsx', code: 'fruits.filter((f) => f.price < 40)' },
        ],
        cards: [
          {
            q: 'What is the difference between `.map()` and `.filter()`?',
            a: '`.map()` turns **every** item into something new, like JSX. `.filter()` keeps **only** the items that pass a test.',
          },
          {
            q: 'In the cookie cutter picture, what are the dough, the cutter and the cookies?',
            a: 'The array is the dough, `.map()` is the cutter, and each list item is a cookie.',
          },
        ],
      },
      {
        id: 'keys',
        title: 'Part 3: Keys',
        icon: '🏷️',
        hook: 'Name tags so React never mixes up items.',
        blocks: [
          {
            type: 'callout',
            tone: 'idea',
            text: 'Imagine a teacher with a class of kids who keep changing seats. If the teacher only remembers "the kid in seat 2", they\'ll mix everyone up when the kids move. If each kid wears a **name tag**, the teacher always knows who\'s who.',
          },
          {
            type: 'p',
            text: 'A key is that name tag. React uses it to know which list item is which when items are added, removed or reordered.',
          },
          {
            type: 'rules',
            items: [
              { title: 'Use a stable unique id', text: 'Take it from your data, like `fruit.id`.' },
              {
                title: 'Avoid the index when the list can change',
                text: 'Using the array index as a key causes bugs when items are added, removed or reordered. Example 7 in the demo shows the bug.',
              },
              {
                title: 'Put the key on the outermost element',
                text: 'The key goes on the outermost element inside the map.',
              },
            ],
          },
        ],
        cards: [
          {
            q: 'What makes a good key for a list item?',
            a: 'A **stable unique id** from your data, like `fruit.id`.',
          },
          {
            q: 'When does using the array index as a key cause bugs?',
            a: 'When items are **added, removed or reordered**. React can mix up which item is which.',
          },
          {
            q: 'Where does the key go?',
            a: 'On the **outermost element** inside the map.',
          },
        ],
      },
      {
        id: 'arrays',
        title: 'Part 4: Changing arrays in state',
        icon: '🆕',
        hook: 'Always build a new array. Never push.',
        blocks: [
          {
            type: 'p',
            text: 'React only redraws when it sees a **new** array. If you use `.push()`, you change the old array, and React may not notice. Always build a new one.',
          },
          {
            type: 'code',
            lang: 'jsx',
            code: `// Add one item: copy everything, then add the new one
setTodos([...todos, newTodo])

// Remove one item: keep everything except that id
setTodos(todos.filter((t) => t.id !== id))`,
          },
          {
            type: 'callout',
            tone: 'tip',
            text: 'The three dots are called **spread**. They mean "copy everything from this array here".',
          },
        ],
        cards: [
          {
            q: 'Why should you not use `.push()` on an array in state?',
            a: 'It changes the old array, so React may not notice. React redraws when it sees a **new** array.',
          },
          {
            q: 'How do you add one todo and remove one todo in state?',
            a: 'Build a new array each time.',
            aCode: `// add
setTodos([...todos, newTodo])

// remove
setTodos(todos.filter((t) => t.id !== id))`,
          },
          {
            q: 'What do the three dots in `[...todos, newTodo]` mean?',
            a: 'That is **spread**. It means "copy everything from this array here".',
          },
        ],
      },
      {
        id: 'demo',
        title: 'Explore the demo',
        icon: '🧪',
        hook: 'Seven examples to click, break and fix.',
        blocks: [
          {
            type: 'p',
            text: 'Run `npm run dev`, then open `src/practice/lesson4/ListDemo.jsx` next to the browser.',
          },
          {
            type: 'code',
            lang: 'jsx',
            caption: 'src/practice/lesson4/ListDemo.jsx',
            code: listDemoCode,
          },
          { type: 'heading', text: 'Play with it' },
          { type: 'practice', file: 'src/practice/lesson4/ListDemo.jsx' },
          { type: 'p', text: 'Try these one at a time:' },
          {
            type: 'list',
            ordered: true,
            items: [
              'Click **Log in** and **Log out** to watch Example 1 switch pictures.',
              '**See the && trap.** In `Notifications`, change `count > 0 &&` to `count &&`, then click "Read all". A stray "0" appears. Change it back.',
              'Add a fruit to the `fruits` array with a new id. It appears in Examples 4 and 5 automatically.',
              'Tick the checkbox in Example 5, then change `PRICE_LIMIT` from 40 to 50.',
              'Add and delete todos in Example 6. Then read how `TodoItem` tells its parent to delete, using the walkie-talkie idea from Lesson 3.',
              '**See the key bug.** In Example 7, type a note in every box on both sides, then click "Add to top". On the left, your notes end up next to the wrong animals.',
              '**Break a key on purpose.** Remove `key={fruit.id}` in `FruitList` and look at the browser console. React warns you that each child needs a key.',
            ],
          },
        ],
        cards: [
          {
            q: 'In Example 7, why do your notes end up next to the wrong animals on the left?',
            a: 'The left list uses the **index** as its key. After adding to the top, React thinks seat 0 is still the same item, so the notes stay in their seats.',
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        icon: '🛠️',
        hook: 'Build a shopping list in your playground.',
        blocks: [
          {
            type: 'callout',
            tone: 'try',
            text: 'Your playground for Lesson 4 is `src/practice/lesson4/App.jsx`. Build the mini project below there, and the live preview updates by itself.',
          },
          { type: 'practice', file: 'src/practice/lesson4/App.jsx' },
        ],
      },
    ],
    project: {
      title: 'Mini project 4: Shopping list',
      intro: 'Build this yourself inside `src/practice/lesson4/`. Put your components in a `components` folder there.',
      tasks: [
        'Start with an array of items in state. Each item has an `id`, a `name`, a `quantity`, and `bought` set to `true` or `false`.',
        'Show the list with `.map()` using a `ShoppingItem` child component and proper keys.',
        'Add a "Bought" toggle button on each item. Bought items show with a line through them, using `style={{ textDecoration: item.bought ? "line-through" : "none" }}`. Hint: use `.map()` to build a new array where only the clicked item\'s `bought` flips.',
        'Add a delete button on each item that uses `.filter()`.',
        'Add an "Add item" button that adds a new item using spread.',
        'Show "Your list is empty 🛒" when there are no items, using a ternary.',
        'Show a counter like "3 of 5 bought" at the top. Hint: `items.filter(i => i.bought).length`.',
        'Bonus: add a checkbox "Hide bought items" that filters them out of view.',
      ],
      outro: "When you're done, share your code for a review. Lesson 5 comes next, where you'll handle real typing in **forms**, so your shopping list can add items with any name you choose.",
    },
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Forms: handling what people type',
    summary: 'Read real typing from inputs so users can add anything they like.',
    duration: 'Coming soon',
    locked: true,
    sections: [],
  },
]
