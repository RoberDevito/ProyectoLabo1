function ElementoCancion({ song, onPlay }) {
  return (
    <div className="song-item">
      <div className="song-info">
        <h3>{song.name}</h3>
      </div>

      <div className="song-controls">
        <span className="play-count">
          {song.playCount} {song.playCount === 1 ? "play" : "plays"}
        </span>

        <button onClick={onPlay} className="play-button" aria-label={`Reproducir ${song.name}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
        </button>
      </div>
    </div>
  )
}

export default ElementoCancion
