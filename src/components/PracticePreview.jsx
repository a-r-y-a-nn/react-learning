import { Component } from 'react'
import { practiceApps } from '../practice'

// Catches errors from the learner's code so one typo doesn't break the whole lesson page.
// Vite's Fast Refresh resets this boundary automatically when the file is saved again.
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="preview__error">
          <strong>Your code threw an error:</strong>
          <pre>{String(this.state.error.message)}</pre>
          <p>Fix it and save. The preview will try again.</p>
        </div>
      )
    }
    return this.props.children
  }
}

function PracticePreview({ file }) {
  const PracticeApp = practiceApps[file]

  return (
    <section className="preview">
      <div className="preview__bar">
        <span className="preview__dot" /> Live preview
        <code>{file}</code>
      </div>
      <div className="preview__stage">
        {PracticeApp ? (
          <ErrorBoundary>
            <PracticeApp />
          </ErrorBoundary>
        ) : (
          <p>No practice file registered for {file}.</p>
        )}
      </div>
    </section>
  )
}

export default PracticePreview
