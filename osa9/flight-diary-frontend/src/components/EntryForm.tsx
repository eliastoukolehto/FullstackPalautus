import { useState } from "react";
import { DiaryEntry } from "../types";
import { createEntry } from "../services/diaryService";

interface EntryFormProps {
  entries: DiaryEntry[]
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const EntryForm = ({ entries, setEntries }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({
      date, visibility, weather, comment
    }).then(data => {
      setEntries(entries.concat(data))
    })
    /* setDate('')
    setVisibility('')
    setWeather('')
    setComment('') */
  }


  return(
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </div>
        <div>
          weather <input value={weather} onChange={(event) => setWeather(event.target.value)} />
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