import { useState } from "react";
import { DiaryEntry } from "../types";
import { createEntry } from "../services/diaryService";
import axios from "axios";

interface EntryFormProps {
  entries: DiaryEntry[]
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const EntryForm = ({ entries, setEntries }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({
      date, visibility, weather, comment
    }).then(data => {
      setEntries(entries.concat(data))
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data)
        setTimeout(() => {
          setNotification('')
        }, 5000);
      }})
    }
    /* setDate('')
    setVisibility('')
    setWeather('')
    setComment('') */


  return(
    <div>
      <h2>Add new entry</h2>
      {notification && 
      <p style={{ color: 'red' }}>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          date <input  type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility   
          great <input type="radio" name="visibility" onChange={() => setVisibility("great")} />
          good <input type="radio" name="visibility" onChange={() => setVisibility("good")} />
          ok <input type="radio" name="visibility" onChange={() => setVisibility("ok")} />
          poor <input type="radio" name="visibility" onChange={() => setVisibility("poor")} />
        </div>
        <div>
          weather 
          sunny <input type="radio" name="weather" onChange={() => setWeather("sunny")} />
          rainy <input type="radio" name="weather" onChange={() => setWeather("rainy")} />
          cloudy <input type="radio" name="weather" onChange={() => setWeather("cloudy")} />
          stormy <input type="radio" name="weather" onChange={() => setWeather("stormy")} />
          windy <input type="radio" name="weather" onChange={() => setWeather("windy")} />
        </div>
        <div>
          comment <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default EntryForm