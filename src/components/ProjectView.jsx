import MiniProject from './MiniProject'

function ProjectView({ lesson, checked, onToggle }) {
  return (
    <article className="lesson">
      <a className="focus__back" href={`#/${lesson.id}`}>
        ← All topics in Lesson {lesson.number}
      </a>
      <MiniProject project={lesson.project} checked={checked} onToggle={onToggle} />
    </article>
  )
}

export default ProjectView
