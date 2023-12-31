import { TiArrowLeftThick } from "react-icons/ti";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Generos, LinksExternal } from './listFeatures'
import { Link } from 'react-router-dom'

export function AnimeDetails() {
    const [anime, getAnime] = useState([]);
    const [error, setError] = useState();
    const { id } = useParams();

    async function getData () {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)

        if(!res.ok){
            setError(res.status)
        }

        const data = await res.json()
        getAnime(data.data)
    }

    useEffect(() => {
        getData()
    }, [])


    if (error) return "Ocurrio un error!";

    if (anime.length != 0) {
        return (
            <div className="animeDetails-container">

                <div className="anDe-sub-container" key={anime.mal_id}>
                    <div className="anDe-cabecera">
                        <h1 className="anDe-title">{anime.title}</h1>
                        <div>
                            <img className="anDe-img" src={anime.images.jpg.image_url} alt={anime.images.jpg.image_url} />
                            <iframe className="anDe-trailer" width="560" height="315"
                                src={anime.trailer.embed_url}
                                ></iframe>
                        </div>
                    </div>
                    <div className="anDe-body">
                        <div className="anDe-des">
                            <h2>Synopsis</h2>
                            <p>{anime.synopsis
                            }</p>
                        </div>
                        <h3>Title-English: <span>{anime.title_english}</span></h3>
                        <h3>Title-japonese: <span>{anime.title_japanese}</span></h3>
                        <h3>Started: <span>{anime.aired.from}</span></h3>
                        <h3>Culminated: <span>{anime.aired.to}</span></h3>
                        <h3>Episodes: <span>{anime.episodes}</span></h3>
                        <h3>Duration: <span>{anime.duration}</span></h3>
                        <h3>Streaming: <span>{<Generos list={anime.streaming} />}</span></h3>
                        <h3>Rating: <span>{anime.rating}</span></h3>
                        <h3>Score: <span>{anime.score}</span></h3>
                        <h3>Status: <span>{anime.status}</span></h3>
                        <h3>Genres: <span>{<Generos list={anime.genres} />}</span></h3>
                        <h3>Studios: <span>{<Generos list={anime.studios} />}</span></h3>
                        <h3>Producers: <span>{<Generos list={anime.producers} />}</span></h3>

                        <div className="anDe-links-external">
                            <h3>Links External:</h3>
                            <ul>
                                {<LinksExternal list={anime.external}/>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}