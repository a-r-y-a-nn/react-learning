import InlineText from './InlineText'
import CodeBlock from './CodeBlock'

// A card with the question on the front and the answer on the back. Clicking it flips it.
function Flashcard({ card, flipped, onFlip, source }) {
  return (
    <div className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={flipped ? undefined : onFlip}>
      <div className="flashcard__inner">
        <div className="flashcard__face flashcard__front" aria-hidden={flipped}>
          <div className="flashcard__top">
            <span className="flashcard__label">Question</span>
            {source && <span className="flashcard__source">{source}</span>}
          </div>
          <div className="flashcard__body">
            <p className="flashcard__question">
              <InlineText text={card.q} />
            </p>
            {card.qCode && <CodeBlock code={card.qCode} bare />}
          </div>
          <span className="flashcard__hint">Answer it in your head, then flip the card</span>
        </div>

        <div className="flashcard__face flashcard__back" aria-hidden={!flipped}>
          <div className="flashcard__top">
            <span className="flashcard__label">Answer</span>
            {source && <span className="flashcard__source">{source}</span>}
          </div>
          <div className="flashcard__body">
            <p className="flashcard__recall">
              <InlineText text={card.q} />
            </p>
            <p className="flashcard__answer">
              <InlineText text={card.a} />
            </p>
            {card.aCode && <CodeBlock code={card.aCode} bare />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
