function BarraBusqueda({ TerminoBusqueda, setTerminoBusqueda }) {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        value={TerminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        placeholder="Buscar Canciones"
      />
    </div>
  )
}

export default BarraBusqueda
