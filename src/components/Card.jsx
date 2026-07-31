import { useState } from 'react'
import styles from './Card.module.css'
import {CiHeart} from "react-icons/ci";
import { Link } from 'react-router'

export default function Card({ personaje }) {

    const { name, image, status, specie, created, episode, gender, id, location, origin, type } = personaje

    const [like, setLike] = useState(false)
    const [comments, setComments] = useState([])  
    const [comment, setComment] = useState('')     


    const meGustaActor = () => {
        setLike(!like)
    }

    const agreagarComentario = () => {
        setComments([...comments, comment])
        setComment('')                             
    }

    return (
        <Link to={`/personaje/${personaje.id}`} className={styles.body}>
            <div className={styles.carta}>

                <img src={image} alt=''/>
                <h1>{name}</h1>
              


                <div className={styles.boton} onClick={meGustaActor}>
                    {
                        like ? <CiHeart size={40} fill='red' /> : <CiHeart size={40} fill='black' />
                    }
                </div>

                <div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button onClick={agreagarComentario}>Comentar</button>
                </div>

                <div>
                    {
                        comments.map(
                            (comment) => (
                                <div>           
                                    <p>{comment}</p>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </Link>
    )
}