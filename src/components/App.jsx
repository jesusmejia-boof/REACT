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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [gender, setGender] = useState("");

  const genders = [
    "Femenino",
    "Masculino",
    "Sin genero",
    "Desconocido",
  ];

  const gendersEnum = {
    "Femenino": "female",
    "Masculino": "male",
    "Sin genero": "genderless",
    "Desconocido": "unknown",
  };

  const fetchApi = async (endpoint) => {
    setLoading(true);
    const params = new URLSearchParams();

    if (page > 1) {
      params.append('page', page);
    }
    if (busqueda) {
      params.append("name", busqueda);
    }
    if (gender) {
      params.append("gender", gender);
    }

    try {
      const response = await fetch(`${BASE_URL}/${endpoint}?${params.toString()}`);
      const data = await response.json();
      setCharacters(data.results || []);
      setTotalPages(data.info?.pages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi("character");
  }, [page, gender]);

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    fetchApi("character");
  }

  return (
    <div>
      <input onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Buscar personaje..." className={styles.search} />
      <button className={styles.searchBtn} onClick={handleSearch}>Buscar</button>
      <div>
        {
          genders.map(
            (genero) => (
              <button key={genero} onClick={() => setGender(gendersEnum[genero])}>
                {genero}
              </button>
            )
          )
        }
         <button onClick={() => setGender("")}>Limpiar filtro</button>
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.titulo}>PERSONAJES DE RICK AND MORTY</h1>

        <div className={styles.container}>
          {loading ? <p>Cargando...</p> : characters.length > 0 ? characters.map((character) => (
            <Card personaje={character} key={character.id} />
          )) : <p>No se encontraron personajes.</p>}
        </div>

        <div className={styles.paginacion}>
          <button
            className={styles.btnPag}
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>

          <span className={styles.pageInfo}>
            {page} <span className={styles.pageSep}>{'/'}</span> {totalPages}
          </span>
          <button
            className={styles.btnPag}
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}