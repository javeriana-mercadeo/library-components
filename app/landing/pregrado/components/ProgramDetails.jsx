const ProgramDetails = ({ icon, title, detail }) => {
  return (
    <div className="program-details__item">
      <div className="program-details__icon_container">{icon}</div>
      <div>
        <span className="program-details__label">{title}</span>
        <p className="program-details__value">
          <strong>{detail}</strong>
        </p>
      </div>
    </div>
  )
}

export default ProgramDetails
