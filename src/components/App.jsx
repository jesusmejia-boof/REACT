import { LuAlignVerticalDistributeCenter } from "react-icons/lu";
import { BASE_URL } from "../../Utils/constants"
import styles from "./App.module.css"
import Card from "./Card"
import { useState, useEffect } from "react"
import { LiaVectorSquareSolid } from "react-icons/lia";
import { GiDeadEye } from "react-icons/gi";

export default function App() {

  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  const fetchApi = async (endpoint) => {
    setLoading(true)
    const params = new URLSearchParams()

    if (page != 1) {
      params.append("page", page)
    }

       if (busqueda != '') {
      params.append("name", busqueda)
    }

    const response = await fetch(`${BASE_URL}/${endpoint}?${params}`)
    const data = await response.json()
    setCharacters(data.results)
    // setLoading(false)
  }

  useEffect(() => {
    buscarPersonaje()
  }, [])

 const buscarPersonaje = () => {
    fetchApi("character").then(data => {
      setCharacters(data.results || [])
    })
  }
  return (
    <div className={styles.wrapper}>

      <input onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Buscar personaje..." className={styles.search} />

      <button className={styles.searchBtn} onClick={buscarPersonaje}>Buscar</button>

      <h1 className={styles.titulo}>PERSONAJES DE RICK AND MORTY</h1>


        <div className={styles.container}>
          {characters.map((character) => (
            <Card personaje={character} key={character.id} />
          ))}
        </div>

        <div className={styles.paginacion}>
          <button
            className={styles.btnPag}
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
          >
          </button>

          <span className={styles.pageInfo}>
            {page} <span className={styles.pageSep}>/</span>
          </span>
          <button
            className={styles.btnPag}
            onClick={() => setPage(p => p + 1)}
          >
          </button>
        </div>
      </div>
    </div>
  )
}