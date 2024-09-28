import './App.css'
import Admin from './component/admin/Admin'
import Faculty from './component/faculty/Faculty'
import Student from './component/student/Student'

function App() {

  return (
    <>
      <div className="app">
        <Student />
        <Faculty  />
        <Admin />
      </div>
    </>
  )
}

export default App
