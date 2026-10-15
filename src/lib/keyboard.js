// True when the user is typing in a field, so page shortcuts should stay out of the way.
export function isTypingTarget(element) {
  if (!element) return false
  const tag = element.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || element.isContentEditable
}
