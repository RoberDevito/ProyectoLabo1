import { useState } from "react"

function FormularioAgregarCancion({ NuevaCancion, CancionesExistentes }) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  // Función para validar que la URL es de YouTube.
  const ValidarUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*)?$/ 
    return youtubeRegex.test(url) // Retorna true si la URL es válida
  }

  // Función para extraer el ID del video de la URL de YouTube.
  const extraerVideo = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) 
    return match ? match[1] : "" // Si coincide con el patrón de YouTube, retorna el ID
  }

  // Función para evitar duplicados de canciones
  const duplicarUrl = (url) => {
    const videoId = extraerVideo(url)
    return CancionesExistentes.some((song) => extraerVideo(song.url) === videoId) // Verifica si la canción ya existe
  }

  // Manejo del evento de envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault() // Evitar recargar la página al enviar el formulario.

    
    if (!name.trim()) {
      alert("El nombre de la pista es obligatorio.")
      return
    }

    
    if (!url.trim()) {
      alert("Se requiere la URL de YouTube.")
      return
    }

   
    if (!ValidarUrl(url)) {
      alert("La URL debe ser de YouTube (youtube.com o youtu.be).")
      return
    }

    
    if (duplicarUrl(url)) {
      alert("Esta pista ya ha sido añadida.")
      return
    }

    // Extraer el ID del video y generar la miniatura.
    const videoId = extraerVideo(url)
    const miniatura = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

    // Crear un objeto nuevaCancion con los detalles de la canción.
    const nuevaCancion = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), 
      name: name.trim(),
      url: url.trim(),
      thumbnail: miniatura, 
      playCount: 0, 
    }

    // Llamar a la función NuevaCancion que viene como props, pasando la nueva canción.
    NuevaCancion(nuevaCancion)
    
  }

  return (
    <form onSubmit={handleSubmit} className="agr-can-form">
      <div className="form-group">
        <label htmlFor="nombre-cancion">Nombre de la Canción</label>
        <input
          id="nombre-cancion"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="youtube-url">URL Youtube</label>
        <input
          id="youtube-url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
        />
      </div>

      <button type="submit" className="agregar-boton pulse-animation">
        Agregar Canción
      </button>
    </form>
  )
}

export default FormularioAgregarCancion
