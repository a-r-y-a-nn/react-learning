import InlineText from './InlineText'
import CodeBlock from './CodeBlock'
import PracticePreview from './PracticePreview'

const calloutLabels = { tip: 'Tip', note: 'Remember', try: 'Your turn', idea: 'Think of it like this' }

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="prose">
          <InlineText text={block.text} />
        </p>
      )

    case 'heading':
      return <h3>{block.text}</h3>

    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} caption={block.caption} />

    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag className="prose-list">
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ListTag>
      )
    }

    case 'analogy':
      return (
        <div className="analogy">
          {block.items.map((item) => (
            <div className="analogy__card" key={item.file}>
              <div className="analogy__icon">{item.icon}</div>
              <div className="analogy__label">{item.label}</div>
              <code>{item.file}</code>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )

    case 'rules':
      return (
        <ol className="rules">
          {block.items.map((rule) => (
            <li key={rule.title}>
              <strong>{rule.title}</strong>
              <p>
                <InlineText text={rule.text} />
              </p>
            </li>
          ))}
        </ol>
      )

    case 'table':
      return (
        <div className="table-wrap">
          <table className="compare">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell}>
                    <InlineText text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>
                      <InlineText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <aside className={`callout callout--${block.tone}`}>
          <strong>{calloutLabels[block.tone]}</strong>
          <p>
            <InlineText text={block.text} />
          </p>
        </aside>
      )

    case 'practice':
      return <PracticePreview file={block.file} />

    default:
      return null
  }
}

export default Block
