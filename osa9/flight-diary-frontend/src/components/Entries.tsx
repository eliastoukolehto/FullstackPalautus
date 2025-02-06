import { DiaryEntry } from '../types'

interface EntryProps {
  entries: DiaryEntry[]
}

const Entries = (props: EntryProps) => {
  const entries = props.entries

  return(
    <div>
      <h2>Diary entries</h2>
      {entries.map((e) => {
        return(
          <div key={e.date}>
            <p><b>{e.date}</b></p>
            <div>visibility: {e.visibility}</div>
            <div>weather: {e.weather}</div>
          </div>
      )})}
    </div>
  )
}

export default Entries