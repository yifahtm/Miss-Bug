export function BugSort({ setSortBy, sortBy }) {
    function handleChange({ target }) {
        let { type, value } = target
        if (type === 'select-one') {
            const currDir = Object.values(sortBy)[0]
            setSortBy({ [value]: currDir || 1 })
        }

        if (type === 'checkbox') {
            const currSort = Object.keys(sortBy)[0]
            const dir = sortBy[currSort] === 1 ? -1 : 1
            setSortBy({ [currSort]: dir })
        }
    }

    return (
        <section>
            <select name="select-sort" id="select-sort" onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="title">Title</option>
                <option value="severity">Severity</option>
                <option value="createdAt">Created At</option>
            </select>

            <label htmlFor="sort-dir">Ascending</label>
            <input
                type="checkbox"
                name="sort-dir"
                id="sort-dir"
                onChange={handleChange}
            />
        </section>
    )
}
