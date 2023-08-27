import { ListAnime } from './components/listAnime.jsx'
import { AnimeDetails } from './components/animeDetails.jsx'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
    const [search, setsearch] = useState("");
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [animedata, setdata] = useState();

    async function getData() {
        let url
        if (search == "") {
            url = "https://api.jikan.moe/v4/top/anime"
        }   
        else {
            url = `https://api.jikan.moe/v4/anime?q=${search}&sort=asc&limit=20&sfw=true`
        }
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {setdata(data.data)})
        .catch((error) => {console.log("Ocurrio un error! ",error); setError(error)})
        .finally(() => {setLoading(false)})
    }
    useEffect(() => {
        getData()
    }, [search])

    if (error) return "Ocurrio un error!";
    if (loading) return "Cargando...";

    return (
        <div>
            <header className='header-content'>
                <nav className='nav-container'>
                    <h1>AnimeInfo</h1>
                    <div className='nav-search'>
                        <label>Buscar: </label>
                        <input type="text" onChange={(e) => setsearch(e.target.value)}/>
                    </div>
                </nav>
            </header>

            <div className='main-container'>
                <Routes>
                    <Route path="/" exact element={<ListAnime list={animedata} />} />
                    <Route path="/listAnime" exact element={<ListAnime list={animedata} />} />
                    <Route path="/animeDetails/:id" exact element={<AnimeDetails />} />
                </Routes>
            </div>
        </div>

    )
}

export default App
