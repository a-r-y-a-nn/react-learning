// Maps a practice file path (as written in lessons.js) to the component it exports.
import Lesson1App from './lesson1/App.jsx'
import Lesson2App from './lesson2/App.jsx'
import Lesson2PropsDemo from './lesson2/PropsDemo.jsx'

export const practiceApps = {
  'src/practice/lesson1/App.jsx': Lesson1App,
  'src/practice/lesson2/App.jsx': Lesson2App,
  'src/practice/lesson2/PropsDemo.jsx': Lesson2PropsDemo,
}
