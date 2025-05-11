import { useEffect, useRef } from "react"

function ModalVideo({ song, isOpen, onClose }) {
  const modalRef = useRef(null)

  // Extraer ID de video de YouTube
  const extraerVideo = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : ""
  }

  const videoId = extraerVideo(song.url)

  // Cerrar modal al hacer clic fuera o con Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [isOpen, onClose])

  // Cargar lite-youtube-embed
  useEffect(() => {
    
    import("lite-youtube-embed")
      .then(() => {
      
        import("lite-youtube-embed/src/lite-yt-embed.css")
      })
      .catch((err) => {
        console.error("Error loading lite-youtube-embed:", err)
      })
  }, [])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="video-modal">
        <div className="modal-header">
          <h3>{song.name}</h3>
          <button onClick={onClose} className="close-button" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="video-container">
            {videoId ? (
              <lite-youtube videoid={videoId} playlabel={`Play: ${song.name}`}></lite-youtube>
            ) : (
              <div className="video-error">no se pudo cargar el video</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalVideo
