import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'

// Each kind of code gets its own color, so the parts are easy to tell apart at a glance.
const theme = {
  plain: { color: '#ece9f5', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog'], style: { color: '#8bc48a', fontStyle: 'italic' } },
    { types: ['keyword', 'operator'], style: { color: '#ff7ab8' } },
    { types: ['string', 'attr-value', 'char'], style: { color: '#ffd479' } },
    { types: ['number', 'boolean'], style: { color: '#ffa65c' } },
    { types: ['function', 'class-name'], style: { color: '#7fd4ff' } },
    { types: ['tag'], style: { color: '#ff8a7a' } },
    { types: ['attr-name'], style: { color: '#c3a6ff' } },
    { types: ['punctuation'], style: { color: '#a19cb3' } },
    { types: ['variable', 'parameter'], style: { color: '#ece9f5' } },
  ],
}

function CodeBlock({ code, lang, caption }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked; nothing else to do.
    }
  }

  return (
    <figure className="code-block">
      <div className="code-block__bar">
        <span>{caption ?? lang}</span>
        <button type="button" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <Highlight code={code} language={lang ?? 'jsx'} theme={theme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

export default CodeBlock
