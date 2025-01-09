import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const Country = ({ country }) => {
  //console.log('rendering country ' + country)
  const [info, setInfo] = useState(null)
  if (!country) {
    return null
  }
  
  const hook = () => {
    countriesService
      .getOne(country.toLowerCase())
      .then(response =>
        setInfo(response)
      )
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
      </div>
      
      
    )

}

const Countries = ({ countries }) => {
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
      <div key={country.name.common}>{country.name.common} </div>
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
  const [search, setSearch] = useState('')

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

  const handleSearchChange = (event) => {
    const search = event.target.value
    setSearch(search)
    setFilter(search)
   
  }


  return (
    <div>
      find countries: <input
        onChange={handleSearchChange} />
      <Countries countries={countriesToShow}/>

    </div>
  )
}


export default App
