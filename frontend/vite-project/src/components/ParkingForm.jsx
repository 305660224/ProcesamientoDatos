import { useState } from 'react'
import VehicleTypeSelector from './VehicleTypeSelector'
import TimeInput from './TimeInput'
import RateInfo from './RateInfo'
import ParkingResult from './ParkingResult'
import ParkingError from './ParkingError'

const ParkingForm = () => {
  const [formData, setFormData] = useState({
    placa: '',
    tipo: 'carro',
    horas: 1,
    minutos: 0
  })
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const API_URL = 'http://localhost:7777/api/parqueo/calcular'

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setResultado(null)
    setError(null)
    
    if (!formData.placa.trim()) {
      setError('Por favor ingrese la placa del vehículo')
      return
    }
    
    setCargando(true)
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placa: formData.placa.trim().toUpperCase(),
          tipo: formData.tipo,
          horas: parseInt(formData.horas) || 0,
          minutos: parseInt(formData.minutos) || 0
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Ocurrió un error al procesar la solicitud')
        return
      }
      
      setResultado(data)
      
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión. Verifique que el servidor esté funcionando.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="card shadow-lg">
      <div className="card-header bg-primary text-white text-center">
        <h3><i className="fas fa-parking"></i> Sistema de Parqueo</h3>
        <p className="mb-0">Calcule el costo de su estadía</p>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* Campo de placa */}
          <div className="mb-3">
            <label htmlFor="placa" className="form-label">
              <i className="fas fa-car"></i> Placa del vehículo
            </label>
            <input
              type="text"
              className="form-control"
              id="placa"
              placeholder="Ej: ABC-123"
              maxLength="10"
              value={formData.placa}
              onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))}
              required
            />
          </div>

          {/* Selector de tipo de vehículo */}
          <VehicleTypeSelector 
            tipo={formData.tipo} 
            onChange={(value) => handleInputChange('tipo', value)} 
          />

          {/* Tiempo de estadía */}
          <div className="row">
            <div className="col-md-6">
              <TimeInput 
                label="Horas"
                id="horas"
                value={formData.horas}
                onChange={(value) => handleInputChange('horas', value)}
                min={0}
                max={24}
              />
            </div>
            <div className="col-md-6">
              <TimeInput 
                label="Minutos"
                id="minutos"
                value={formData.minutos}
                onChange={(value) => handleInputChange('minutos', value)}
                min={0}
                max={59}
              />
            </div>
          </div>

          {/* Información de tarifas */}
          <RateInfo />

          {/* Botón calcular */}
          <button 
            type="submit" 
            className="btn btn-primary w-100 btn-lg"
            disabled={cargando}
          >
            {cargando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Calculando...
              </>
            ) : (
              <>
                <i className="fas fa-calculator"></i> Calcular costo
              </>
            )}
          </button>
        </form>

        {/* Mostrar error */}
        <ParkingError error={error} />

        {/* Mostrar resultado */}
        <ParkingResult resultado={resultado} />
      </div>
    </div>
  )
}

export default ParkingForm