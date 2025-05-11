import { useState, useEffect } from "react"
import FormularioAgregarCancion from "./components/FormularioAgregarCancion"
import ListaSonido from "./components/ListaSonido"
import BarraBusqueda from "./components/BarraBusqueda"
import "./App.css"

function App() {
  const [canciones, setCanciones] = useState([]) 
  const [cancionesFiltradas, setCancionesFiltradas] = useState([]) 
  const [terminoBusqueda, setTerminoBusqueda] = useState("") 
  const [ordRepro, setOrdRepro] = useState(false) 

  // Cargar canciones desde localStorage al iniciar
  useEffect(() => {
    const storedCanciones = localStorage.getItem("canciones")
    if (storedCanciones) {
      setCanciones(JSON.parse(storedCanciones))
    }
  }, [])

  // Actualizar localStorage cuando cambian las canciones
  useEffect(() => {
    if (canciones.length > 0) {
      localStorage.setItem("canciones", JSON.stringify(canciones))
    }
    filterCanciones()
  }, [canciones, terminoBusqueda, ordRepro])

  // Filtrar canciones según término de búsqueda y ordenamiento
  const filterCanciones = () => {
    let result = [...canciones]

    
    if (terminoBusqueda) {
      result = result.filter((song) => song.name.toLowerCase().includes(terminoBusqueda.toLowerCase()))
    }

    
    if (ordRepro) {
      result = result.sort((a, b) => b.playCount - a.playCount)
    }

    setCancionesFiltradas(result)
  }

  // Agregar nueva canción
  const nuevaCancion = (nuevaCancion) => {
    setCanciones((prevCanciones) => [...prevCanciones, nuevaCancion])
  }

  // Incrementar contador de reproducciones
  const incrementarPlayCount = (id) => {
    setCanciones((prevCanciones) =>
      prevCanciones.map((song) =>
        song.id === id ? { ...song, playCount: song.playCount + 1 } : song
      )
    )
  }

  // Alternar ordenamiento
  const alternarOrdenar = () => {
    setOrdRepro(!ordRepro)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1> Reproductor </h1>
      </header>

      <main className="app-main">
        <section className="form-section">
          <FormularioAgregarCancion NuevaCancion={nuevaCancion} CancionesExistentes={canciones} />
        </section>

        <section className="canciones-section">
          <div className="canciones-header">
            <div className="canciones-controls">
              <BarraBusqueda
                TerminoBusqueda={terminoBusqueda}
                setTerminoBusqueda={setTerminoBusqueda}
              />
              <button
                onClick={alternarOrdenar}
                className={`sort-button ${ordRepro ? "active" : ""}`}
              >
                {ordRepro ? "Ordenado por reproducciones" : "Ordenar por reproducciones"}
              </button>
            </div>
          </div>

          <ListaSonido canciones={cancionesFiltradas} IncrementoPlayCount={incrementarPlayCount} />
        </section>
      </main>
    </div>
  )
}

export default App
