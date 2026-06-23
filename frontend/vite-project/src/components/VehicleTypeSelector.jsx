const VehicleTypeSelector = ({ tipo, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        <i className="fas fa-tag"></i> Tipo de vehículo
      </label>
      <div className="d-flex gap-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="tipo"
            id="carro"
            value="carro"
            checked={tipo === 'carro'}
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="form-check-label" htmlFor="carro">
            <i className="fas fa-car-side text-primary"></i> Carro
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="tipo"
            id="moto"
            value="moto"
            checked={tipo === 'moto'}
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="form-check-label" htmlFor="moto">
            <i className="fas fa-motorcycle text-success"></i> Moto
          </label>
        </div>
      </div>
    </div>
  )
}

export default VehicleTypeSelector