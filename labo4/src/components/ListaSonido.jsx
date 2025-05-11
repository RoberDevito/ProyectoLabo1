import { useState } from "react"
import ElementoCancion from "./ElementoCancion"
import ModalVideo from "./ModalVideo"

function ListaSonido({ canciones, IncrementoPlayCount }) {

  const [cancionSeleccionada, setcancionSeleccionada] = useState(null)
  const [modalAbier, setmodalAbier] = useState(false)

  const handlePlay = (song) => {
    setcancionSeleccionada(song)
    setmodalAbier(true)
    IncrementoPlayCount(song.id)
  }

  const cerrarModal = () => {
    setmodalAbier(false)
    setcancionSeleccionada(null)
  }

  return (
    <div className="song-list">
      {canciones.map((song) => (
        <ElementoCancion key={song.id} song={song} onPlay={() => handlePlay(song)} />
      ))}

      {modalAbier && cancionSeleccionada && <ModalVideo song={cancionSeleccionada} isOpen={modalAbier} onClose={cerrarModal} />}
    </div>
  )
}

export default ListaSonido
