// Splits a section's blocks into bite-size steps. A new step starts at every heading.
export function splitIntoSteps(blocks) {
  const steps = []
  for (const block of blocks) {
    if (block.type === 'heading' || steps.length === 0) steps.push([])
    steps[steps.length - 1].push(block)
  }
  return steps
}

// Section ids repeat across lessons ("try", "demo"), so progress is saved per lesson.
export function sectionKey(lessonId, sectionId) {
  return `${lessonId}/${sectionId}`
}
