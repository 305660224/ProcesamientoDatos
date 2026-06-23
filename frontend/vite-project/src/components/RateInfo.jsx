const RateInfo = () => {
  return (
    <div className="alert alert-info" role="alert">
      <i className="fas fa-info-circle"></i>
      <strong>Tarifas:</strong>
      <span className="badge bg-primary ms-1">Carro: $1,200/hora</span>
      <span className="badge bg-success ms-1">Moto: $500/hora</span>
      <small className="d-block mt-1">* Los minutos se redondean a la hora superior si superan los 5</small>
    </div>
  )
}

export default RateInfo