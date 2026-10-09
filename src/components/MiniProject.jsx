import InlineText from './InlineText'

function MiniProject({ project, checked, onToggle }) {
  const done = project.tasks.filter((_, i) => checked[i]).length

  return (
    <section className="project" id="project">
      <div className="project__head">
        <h2>{project.title}</h2>
        <span className="project__count">
          {done} / {project.tasks.length}
        </span>
      </div>
      <p className="prose">
        <InlineText text={project.intro} />
      </p>

      <ul className="checklist">
        {project.tasks.map((task, i) => (
          <li key={task}>
            <label>
              <input type="checkbox" checked={!!checked[i]} onChange={() => onToggle(i)} />
              <span>
                <InlineText text={task} />
              </span>
            </label>
          </li>
        ))}
      </ul>

      <p className="prose project__outro">
        <InlineText text={project.outro} />
      </p>
    </section>
  )
}

export default MiniProject
