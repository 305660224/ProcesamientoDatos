const ParkingResult = ({ resultado }) => {
  if (!resultado) return null

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor)
  }

  return (
    <div className="mt-4">
      <div className="card border-success">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0"><i className="fas fa-check-circle"></i> Resultado del cálculo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <strong><i className="fas fa-id-card"></i> Placa:</strong>
              <span className="ms-2">{resultado.placa}</span>
            </div>
            <div className="col-6">
              <strong><i className="fas fa-tag"></i> Tipo:</strong>
              <span className="ms-2">{resultado.tipo.charAt(0).toUpperCase() + resultado.tipo.slice(1)}</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <strong><i className="far fa-clock"></i> Tiempo:</strong>
              <span className="ms-2">{resultado.tiempo}</span>
            </div>
            <div className="col-6">
              <strong><i className="fas fa-dollar-sign"></i> Tarifa/hora:</strong>
              <span className="ms-2">{formatearMoneda(resultado.tarifa)}</span>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <h3 className="text-success">
              <strong>Total a pagar: {formatearMoneda(resultado.total)}</strong>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingResult