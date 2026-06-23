const TimeInput = ({ label, id, value, onChange, min, max }) => {
  const handleChange = (e) => {
    let val = parseInt(e.target.value) || 0
    if (min !== undefined) val = Math.max(min, val)
    if (max !== undefined) val = Math.min(max, val)
    onChange(val)
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        <i className="far fa-clock"></i> {label}
      </label>
      <input
        type="number"
        className="form-control"
        id={id}
        placeholder="0"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default TimeInput