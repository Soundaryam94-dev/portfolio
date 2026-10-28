import Sheet from './Sheet'

// Small line icons for `steps`: name -> [colour, svg paths]
const STEP_ICONS = {
  bulb: ['#8b5cf6', <path key="b" d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />],
  layout: ['#3b82f6', <path key="l" d="M4 5h16v14H4zM4 11h16M10 11v8" />],
  bug: ['#10b981', <path key="g" d="M8 7a4 4 0 0 1 8 0M7 9h10v5a5 5 0 0 1-10 0V9ZM3 12h4M17 12h4M4 18l3-2M20 18l-3-2M12 9v10" />],
}

// Simple popup for a pin: optional eyebrow, title, subtitle, paragraphs, steps, tag groups, label/value details.
// Used for a project popup when the project has no case study; the content comes from that project in data.js.
export default function InfoSheet({ open, onClose, id, content }) {
  const labelId = `info-sheet-${id}`
  return (
    <Sheet open={open} onClose={onClose} labelId={labelId} compact>
      {content.image && <img className="sheet-image" src={content.image} alt="" />}
      {content.eyebrow && <p className="sheet-eyebrow">{content.eyebrow}</p>}
      <h2 id={labelId}>{content.title}</h2>
      {content.subtitle && <p className="sheet-tagline">{content.subtitle}</p>}
      {(content.paragraphs ?? []).map((text) => (
        <p key={text} className="sheet-body">{text}</p>
      ))}
      {content.steps && (
        <ol className="sheet-steps">
          {content.steps.map((st) => {
            const [color, paths] = STEP_ICONS[st.icon] ?? STEP_ICONS.bulb
            return (
              <li key={st.title}>
                <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>
                <div>
                  <b>{st.title}</b>
                  <span>{st.text}</span>
                </div>
              </li>
            )
          })}
        </ol>
      )}
      {content.groups && (
        <div className="sheet-groups">
          {content.groups.map((g) => (
            <div key={g.label}>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
      {content.details && (
        <dl className="sheet-details">
          {content.details.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Sheet>
  )
}
