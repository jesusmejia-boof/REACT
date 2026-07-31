import { LuAlignVerticalDistributeCenter } from "react-icons/lu";
import { BASE_URL } from "../../Utils/constants"
import styles from "./App.module.css"
import Card from "./Card"
import { useState, useEffect } from "react"
import { LiaVectorSquareSolid } from "react-icons/lia";
import { GiDeadEye } from "react-icons/gi";

export default function App() {

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [gender, setGender] = useState("");


  const genders = [
    "Femenino",
    "Masculino",
    "Sin genero",
    "Desconocido",
  ]

  const gendersEnum = {
    "Femenino": "female",
    "Masculino": "male",
    "Sin genero": "genderless",
    "Desconocido": "unknown",
  }


  const fetchApi = async (endpoint) => {
    const params = new URLSearchParams();

    if (page != 1) {
      params.append('page', page);
    }
    if (busqueda != "") {
      params.append("name", busqueda);
    }

    if (gender != '') {
      params.append("gender", gender)
    }

    const response = await fetch(`${BASE_URL}/character?${params.toString()}`)
    const data = await response.json()
    setCharacters(data.results)
    // setLoading(false)
  }

  useEffect(() => {
    buscarPersonaje()
  }, [page, gender])

  const buscarPersonaje = () => {
    fetchApi("character").then(data => {
      setCharacters(data.results)

    })
  }

const statusesEnum = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
}

const statuses = [
  "Vivo",
  "Muerto",
  "Desconocido",
]


const statusClass = {
  Alive: styles.alive,
  Dead: styles.dead,
  unknown: styles.unknown,
}

  return (
    <div>
      <input onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Buscar personaje" />
      <button onClick={buscarPersonaje}>Buscar</button>
      <div>
        {
          genders.map(
            (genero) => (
              <button onClick={() => setGender(gendersEnum[genero])}>
                {genero}
              </button>
            )
          )
        }
      </div>
      <div className={styles.wrapper}>
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