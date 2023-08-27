import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import {Generos} from './listFeatures'


export function ListAnime(props) {
  const data = props.list  

  return (
    <div className='container-list-animetop'>
      <Suspense fallback={<div>Cargado...</div>}>
        {data?.map((item) => (
          <Link to={`/AnimeDetails/${item.mal_id}`} key={item.mal_id} className='button-container-card' >
            <div className='card-anime'>
              <div className='card-anime-cabecera'>
                <img className='card-anime-img' src={item.images.jpg.image_url} alt="" />
              </div>
              <div className='card-anime-body'>
                <h2 className='card-anime-title'>{item.title}</h2>
                <div className='card-anime-body-content'>
                  <h3>Episodios: {item.episodes}</h3>
                  <h3>
                    Genero: {<Generos list={item.genres}/>}
                  </h3>
                  <h3>Estado: {item.status}</h3>
                  <h3>Puntuacion: {item.score}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Suspense>
    </div>
  )
}