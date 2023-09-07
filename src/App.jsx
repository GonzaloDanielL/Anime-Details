import { ListAnime } from './components/listAnime.jsx'
import { AnimeDetails } from './components/animeDetails.jsx'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
    const [search, setsearch] = useState("");
    const [animedata, setdata] = useState();

    async function getData() {
        let url
        if (search == "") {
            url = "https://api.jikan.moe/v4/top/anime"
        }
        else {
            url = `https://api.jikan.moe/v4/anime?q=${search}&sort=asc&limit=20&sfw=true`
        }

        const res = await fetch(url)
        const data = await res.json()
        setdata(data.data)
    }

    useEffect(() => {
        getData()
    }, [search])


    return (
        <div className='main'>
            <header className='header-content'>
                <nav className='nav-container'>
                    <h1><Link to="/listAnime">AnimeInfo</Link></h1>
                    <div className='nav-search'>
                        <label>Buscar: </label>
                        <input type="text" onChange={(e) => setsearch(e.target.value)} />
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
