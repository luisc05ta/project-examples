import { useEffect, useState } from 'react'
import { ClimaContainer, Titulo } from './AppStyles'
import ClimaAtual from './components/ClimaAtual'
import { IClima } from './components/interfaces'
import Previsao from './components/Previsao'
import Busca from './components/Busca'
import { emptyClima } from './data'

import { searchForecastsByCity, searchForecastsByCoords, searchWheatherByCity, searchWheatherByCoords } from './services/WeatherApi'

const App = (): JSX.Element => {
    const [cidade, setCidade] = useState<string>("");
    const [clima, setClima] = useState<IClima>(emptyClima);
    const [previsao, setPrevisao] = useState([]);

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            const respostaClima = await searchWheatherByCoords(lat, lon)
            setCidade(respostaClima.data.name)
            setClima(respostaClima.data)

            const respostaPrevisao = await searchForecastsByCoords(lat, lon)
            setPrevisao(respostaPrevisao.data.list.slice(0, 5))
        })
    }, [apiKey])

    const buscarClima = async () => {
        try {
            const respostaClima = await searchWheatherByCity(cidade);
            const dataClima = respostaClima.data;
            const auxClima: IClima = {
                main: dataClima.main || emptyClima.main,
                name: dataClima.name || emptyClima.name,
                weather: dataClima.weather || emptyClima.weather
            }
            setClima(auxClima);

            const respostaPrevisao = await searchForecastsByCity(cidade);
            const dataPrevisao = respostaPrevisao.data.list.slice(0, 5);
            setPrevisao(dataPrevisao)
        } catch (error) {
            console.log("Erro ao buscar clima: ", error)
        }
    }

    return (
        <ClimaContainer>
            <Titulo>Condições Climáticas</Titulo>
            <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
            {clima && <ClimaAtual  {...clima} />}
            {previsao.length && <Previsao previsoes={previsao} />}
        </ClimaContainer>
    )
}
export default App
