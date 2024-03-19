const {useEffect, useState} = React
const {useParams, useNavigate} = ReactRouterDOM

import {bugService} from '../services/bug.service.js'
import {showErrorMsg} from '../services/event-bus.service.js'

export function BugEdit() {
  const [bugToEdit, setBugToEdit] = useState(bugService.getEmptyBug())
  const navigate = useNavigate()
  const {bugId} = useParams()

  useEffect(() => {
    if (bugId) loadBug()
  }, [])

  function loadBug() {
    bugService
      .get(bugId)
      .then(setBugToEdit)
      .catch((err) => {
        console.log('Had issued in bug edit:', err)
        navigate('/bug')
        showErrorMsg('Bug not found!')
      })
  }

  function handleChange({target}) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setBugToEdit((prevBug) => ({...prevBug, [field]: value}))
  }

  function onSaveBug(ev) {
    console.log('onSaveBug -> ev:', ev)
    ev.preventDefault()
    bugService.save(bugToEdit).then(() => {
      navigate('/bug')
    })
  }

  const {title, description, severity} = bugToEdit

  return (
    <section className="bug-edit">
      <h2>{bugToEdit._id ? 'Edit' : 'Add'} Bug</h2>

      <form onSubmit={onSaveBug}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="description">Description:</label>
        <input
          onChange={handleChange}
          value={description}
          type="text"
          name="description"
          id="description"
        />

        <label htmlFor="severity">Severity:</label>
        <input
          onChange={handleChange}
          value={severity}
          type="number"
          name="severity"
          id="severity"
        />

        <button>{bugToEdit._id ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
