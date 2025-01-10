import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Country = ({ country }) => {
  //console.log('rendering country ' + country)
  const [info, setInfo] = useState(null)
  if (!country) {
    return null
  }
  
  const hook = () => {
    countriesService
      .getOne(country.toLowerCase())
      .then(response => {
        setInfo(response)
      })
      console.log('recieved ' + country)

    
  }
  
  useEffect(hook,[country])
  
    if (!info) {
      return null
    }
    return(
      <div>
      <h1>{info.name.common}</h1>
      <div>capital: {info.capital[0]}</div>
      <div>area: {info.area}</div>
      <b><p>languanges:</p></b>
      <Languages languages={Object.values(info.languages)}/>
      <br />
      <img src={info.flags.png} alt="country_flag_here" />
      <Weather capital={info.capital[0]}/>
      </div>
      
      
      
    )
  }



const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
    if (!weather) {
      weatherService
      .getWeather(capital)
      .then(weatherResponse => 
        setWeather(weatherResponse)
      )
        return null
    }
    console.log(`weather icon url: ${`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}`)
    return(

      <div>
      <h2>weather in {capital}</h2>
      <div>Temperature: {Math.round(((weather.main.temp)-272.15)*100)/100} Celcius</div>
      
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon here" />
      <div>wind: {weather.wind.speed} m/s</div>
      </div>
      
      
      
    )

}


const Countries = ({ countries, chooseCountry }) => {
  if (countries.length === 1) {
    return <Country country={countries[0].name.common}/>
  }
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  return (
    countries.map(country => 
      <div key={country.name.common}>{country.name.common} <button
      onClick={() => chooseCountry(country.name.common)}
      > Show </button> </div>
  )
  
  )

}

const Languages = ( {languages} ) => {
  return (
    languages.map(language => 
      <li key={language}>{language} </li>
  )
  
  )
}


const App = () => { 
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    countriesService
      .getAll()
      .then(response =>
        setCountries(response)
      )
  } 

  useEffect(hook,[])

  const countriesToShow = 
  countries.filter(country =>
    country.name.common.toUpperCase()
                        .includes(filter.toUpperCase())
  )

  const handleFilterChange = (event) => {
    const search = event.target.value
    setFilter(search)
   
  }

  const chooseCountry = (name) => {
    setFilter(name)
  }


  return (
    <div>
      find countries: <input
        onChange={handleFilterChange} />
      <Countries countries={countriesToShow} chooseCountry={chooseCountry}/>

    </div>
  )
}


export default App
