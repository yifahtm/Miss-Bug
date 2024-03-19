export function BugPreview({bug}) {
  return (
    <article className="bug-preview">
      <h2>Bug Title: {bug.title}</h2>
      <h4>Description: {bug.description}</h4>
      <h4>Severity: {bug.severity}</h4>
      <h1>🐛</h1>
      {/* <img src={`../assets/img/audu.png`} alt="" /> */}
    </article>
  )
}
