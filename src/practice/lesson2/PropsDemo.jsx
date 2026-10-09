// ─────────────────────────────────────────────
//  LESSON 2 DEMO: PROPS
//  Each numbered example matches one idea from the lesson.
//  Change things, save, and watch the browser update.
// ─────────────────────────────────────────────

// IDEA 1: the props "box"
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

export default PropsDemo
