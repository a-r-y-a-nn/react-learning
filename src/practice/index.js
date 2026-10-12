// Maps a practice file path (as written in lessons.js) to the component it exports.
import Lesson1App from './lesson1/App.jsx'
import Lesson2App from './lesson2/App.jsx'
import Lesson2PropsDemo from './lesson2/PropsDemo.jsx'
import Lesson3App from './lesson3/App.jsx'
import Lesson3StateDemo from './lesson3/StateDemo.jsx'

export const practiceApps = {
  'src/practice/lesson1/App.jsx': Lesson1App,
  'src/practice/lesson2/App.jsx': Lesson2App,
  'src/practice/lesson2/PropsDemo.jsx': Lesson2PropsDemo,
  'src/practice/lesson3/App.jsx': Lesson3App,
  'src/practice/lesson3/StateDemo.jsx': Lesson3StateDemo,
}
