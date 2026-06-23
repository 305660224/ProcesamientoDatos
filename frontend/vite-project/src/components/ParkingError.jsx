const ParkingError = ({ error }) => {
  if (!error) return null

  return (
    <div className="mt-3">
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-circle"></i> {error}
      </div>
    </div>
  )
}

export default ParkingError