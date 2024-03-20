const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { BugFilter } from '..BugFilter.jsx'
import { BugSort } from '..BugSort.jsx'
import { BugList } from '..BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '..event-bus.service.js'

export function BugIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [bugs, setBugs] = useState([])
  const [sortBy, setSortBy] = useState({})
  const [filterBy, setFilterBy] = useState(
    bugService.getFilterFromParams(searchParams)
  )

  useEffect(() => {
    loadBugs()
    showSuccessMsg('Welcome to bug index!')
    setSearchParams(filterBy)
  }, [filterBy, sortBy])

  function loadBugs() {
    bugService.query(filterBy, sortBy).then(setBugs)
  }

  function onRemoveBug(bugId) {
    bugService.remove(bugId).then(() => {
      const updatedBugs = bugs.filter((bug) => bug._id !== bugId)
      setBugs(updatedBugs)
      showSuccessMsg(`Bug (${bugId}) removed!`)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  function onChangePage(diff) {
    let nextPageIdx = filterBy.pageIdx + diff
    if (nextPageIdx < 0) nextPageIdx = 0
    setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: nextPageIdx }))
  }

  return (<section>
    <section className="bug-index full main-layout">
      <BugFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <BugSort setSortBy={setSortBy} sortBy={sortBy} />
      <Link to="/bug/edit">Add Bug</Link>
      <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
    </section>
    <button onClick={() => onChangePage(-1)}>-</button>
    <span>{filterBy.pageIdx + 1}</span>
    <button onClick={() => onChangePage(1)}>+</button>
  </section>
  )
}
