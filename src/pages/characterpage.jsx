import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { BASE_URL } from "../../Utils/constants"
import styles from "./characterpage.module.css"
import { BsJournalPlus } from "react-icons/bs"

export default function CharacterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const response = await fetch(`${BASE_URL}/character/${id}`)
        const data = await response.json()
        setCharacter(data)

        if (data.episode) {
          const episodePromises = data.episode.map(episodeUrl => fetch(episodeUrl).then(res => res.json()));
          const episodeData = await Promise.all(episodePromises);
          setEpisodes(episodeData);
        }

      } catch (error) {
        console.error("Error fetching character data:", error)
      }
    }
    getCharacter()
  }, [id])

  if (!character) return <p className={styles.loading}>Cargando...</p>

  const { name, image, status, species, gender, created, origin, location, type } = character

  const statusClass = {
    Alive: styles.alive,
    Dead: styles.dead,
    unknown: styles.unknown,
  }[status] ?? styles.unknown

  const statusLabel = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" }[status] ?? status

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        &#x2190; Volver
      </button>

      <div className={styles.hero}>
        <img className={styles.avatar} src={image} alt={name} />
        <div>
          <h1 className={styles.name}>{name}</h1>
          <span className={`${styles.badge} ${statusClass}`}>
            <span className={styles.dot} />
            {statusLabel} &middot; {species}
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <span className={styles.label}>Origen</span>
            <span className={styles.value}>{origin.name}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Ubicación</span>
            <span className={styles.value}>{location.name}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Género</span>
            <span className={styles.value}>{gender}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>ID</span>
            <span className={styles.value}>#{id}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Tipo</span>
            <span className={styles.value}>{type || "—"}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Creado</span>
            <span className={styles.value}>
              {new Date(created).toLocaleDateString("es-CO", { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className={styles.episodes}>
          <span className={styles.epLabel}>Aparece en episodios</span>
          <span className={styles.epCount}>{episodes.length}</span>
        </div>
      </div>

      <h3>Episodios en donde sale</h3>
      <select>
        {
          episodes.map(episodio =>
            <option key={episodio.id}>{episodio.name}</option>
          )
        }
      </select>
    </div>
  )
}